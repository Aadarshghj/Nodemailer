const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.USER, 
    pass: process.env.APP_PASSWORD, 
  },
});

app.post("/send-email", async (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: process.env.USER, 
    to: to ,                       
    subject: subject,            
    text: text,                 
  };
//   send as json  in postman eg:{
//   "to": "email@example.com",
//   "subject": "hello",
//   "text": "Hai how r you"
// }


  try {
    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully", info });
  } catch (error) {
    res.status(500).json({ message: "Failed to send email", error });
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
