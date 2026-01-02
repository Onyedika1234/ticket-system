import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_EMAIL_PASSWORD,
  },
});

// transporter.verify((error, success) => {
//   if (error) {
//     console.log("Email transporter error:", error);
//   } else {
//     console.log("Email transporter is ready to send messages");
//   }
// });

export default transporter;
