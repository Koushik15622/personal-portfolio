const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

// Atlas SRV discovery uses Node's DNS resolver, which can differ from the OS resolver.
if (process.env.BACKEND_DNS_SERVERS) {
  require("node:dns").setServers(process.env.BACKEND_DNS_SERVERS.split(",").map(value => value.trim()));
}

const express = require("express");
const cors = require("cors");
const { mount } = require("./links");

const app = express();
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const entry = {
      timestamp: new Date().toISOString(),
      method: req.method,
      route: req.route?.path || "(unmatched)",
      status: res.statusCode,
      durationMs: Date.now() - start,
      ...res.locals.diagnostic
    };
    const write = res.statusCode >= 500 ? console.error : console.log;
    write(JSON.stringify(entry));
  });
  next();
});
app.use(cors());
app.use(express.json({ limit: "32kb" }));
mount(app);
app.get("/", (req, res) => res.send("Server Running"));
app.post("/contact", (req, res) => res.send("Server Running"));

module.exports = app;

if (require.main === module && !process.env.VERCEL) {
  const port = process.env.PORT || 5001;
  app.listen(port, () => console.log("Backend listening on port", port))
    .on("error", error => {
      console.error(error.code === "EADDRINUSE"
        ? "Port " + port + " is in use. Set PORT in backend/.env to an available port."
        : error.message);
      process.exitCode = 1;
    });
}
