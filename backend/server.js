require('dotenv').config();
const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");
const path = require("path"); 
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "build")));
app.use("/", router);

app.listen(port, () => console.log("Server Running"));

const contactEmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS,
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log("Error:", error);
  } else {
    console.log("Ready to Send");
  }
});

router.get("/", (req, res) => {
  res.send("Server Running");
});

router.post("/contact", (req, res) => {
  const name = `${req.body.firstName} ${req.body.lastName}`;
  const email = req.body.email;
  const message = req.body.message;
  const phone = req.body.phone;
  const mail = {
    from: name,
    to: "koushikpln02@gmail.com",
    subject: "Contact Form Submission - Portfolio",
    html: `<p>Name: ${name}</p>
           <p>Email: ${email}</p>
           <p>Phone: ${phone}</p>
           <p>Message: ${message}</p>`,
  };
  
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json({ error });
    } else {
      res.json({ code: 200, status: "Message Sent" });
    }
  });
});
