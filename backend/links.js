const { randomBytes } = require("crypto");
const { MongoClient } = require("mongodb");

const suffixPattern = /^[A-Za-z0-9_-]{1,64}$/;
let client;
function links() {
  if (!process.env.MONGODB_URI) throw Object.assign(new Error("Missing MongoDB configuration"), { code: "MISSING_MONGODB_URI" });
  client ??= new MongoClient(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
  return client.db(process.env.MONGODB_DB || "portfolio").collection("short_links");
}

function storageFailure(error) {
  return {
    component: "mongodb",
    errorType: error.name,
    errorCode: error.code || error.cause?.code,
    syscall: error.syscall || error.cause?.syscall
  };
}

async function create(req, res) {
  if (req.method !== "POST") return res.setHeader("Allow", "POST").status(405).end();
  let destination;
  try {
    const value = req.body?.url;
    if (typeof value !== "string" || value.length > 4096) throw new Error();
    destination = new URL(value);
    if (!["https:", "http:"].includes(destination.protocol) || destination.username || destination.password) throw new Error();
  } catch {
    return res.status(400).json({ error: "Enter a valid HTTP or HTTPS URL without embedded credentials." });
  }

  const suffix = req.body.suffix === undefined ? "" : req.body.suffix;
  if (typeof suffix !== "string" || (suffix && !suffixPattern.test(suffix))) {
    return res.status(400).json({ error: "Use up to 64 letters, numbers, hyphens or underscores for the suffix." });
  }

  try {
    const collection = links();
    for (let attempt = 0; attempt < 3; attempt++) {
      const code = suffix || randomBytes(6).toString("hex");
      try {
        await collection.insertOne({ _id: code, destination: destination.href, createdAt: new Date() });
        return res.status(201).json({ path: "/s/" + code });
      } catch (error) {
        if (error.code !== 11000) throw error;
        if (suffix) return res.status(409).json({ error: "That suffix is taken. Choose another or leave it blank." });
      }
    }
    res.locals.diagnostic = { errorCode: "SHORT_CODE_RETRIES_EXHAUSTED" };
  } catch (error) {
    res.locals.diagnostic = storageFailure(error);
  }
  return res.status(503).json({ error: "Link storage is unavailable. Please try again later." });
}

async function redirect(req, res, code) {
  if (!["GET", "HEAD"].includes(req.method)) return res.setHeader("Allow", "GET, HEAD").status(405).end();
  if (typeof code !== "string" || !suffixPattern.test(code)) return res.status(404).send("Short link not found.");
  try {
    const link = await links().findOne({ _id: code });
    if (!link) return res.status(404).send("Short link not found.");
    res.setHeader("Location", link.destination);
    return res.status(302).end();
  } catch (error) {
    res.locals.diagnostic = storageFailure(error);
    return res.status(503).send("Link storage is unavailable. Please try again later.");
  }
}

function mount(app) {
  app.all("/api/links", create);
  app.all("/s/:code", (req, res) => redirect(req, res, req.params.code));
}

module.exports = { create, redirect, mount };
