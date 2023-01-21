const nodemailer = require("nodemailer");
require("dotenv").config();

// Set up a nodemailer transport for sending emails
const transporter = nodemailer.createTransport({
  host: process.env.HOST_EMAIL,
  port: process.env.PORT_EMAIL,
  secure: true,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});

module.exports = transporter;
