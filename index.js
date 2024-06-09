const { createHmac } = require('crypto');
const os = require('os');
const cons = require('console');
require('./db_connection');
const express = require('express');
const { transporter, generateOTP } = require('./nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const { insertCustomer } = require('./db_connection');
const app = express();
const PORT = 5000;

let storeOtp = null;

app.use(bodyParser.json());
app.use(cors());

app.listen(PORT, () => console.log(`Server Connected to port ${PORT}`));

app.get('/', (req, res) => {
  console.log('Got it!');
});

app.post('/confirm-otp', (req, res) => {
  const { otp } = req.body
  const otpNumber = Number(otp);
  const otpNumN = Number(storeOtp)
  if (otpNumN === otpNumber) {
    res.send("Got it")
    return
  }
  res.status(500).send("Error fuck")
})


app.post('/sign-up', (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  insertCustomer(email,password,firstName,lastName)
  if (!email || !password || !firstName || !lastName) {
    return res.status(400).send("All fields are required.");
  }
  res.status(500).send("Internal server error occurred.");
})


app.post('/send-otp', (req, res) => {
  console.log(req.body.email);
  const { email } = req.body;

  // Generate OTP code
  const otpCode = generateOTP();
  console.log(otpCode);

  // Define email content
  const mailOptions = {
    from: 'vishwadilum91@gmail.com',
    to: email,
    subject: 'OTP Verification Code',
    text: `Your OTP verification code is: ${otpCode}`
  };

  // Send email with OTP code
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email');
    } else {
      res.send('Email sent successfully');
      storeOtp = otpCode;
      console.log('Email sent :', info.response);
    }
  });
});
