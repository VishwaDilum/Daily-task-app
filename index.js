const { createHmac } = require('crypto');
const os = require('os');
const cons = require('console');
const db_connection2 = require('./db_connection');
const express = require('express');
const { transporter, generateOTP } = require('./nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 5000;


app.use(bodyParser.json());
app.use(cors());

app.listen(PORT, () => console.log(`Server Connected to port ${PORT}`));

app.get('/', (req, res) => {
  console.log('Got it!');
});

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
      console.log('Email sent :', info.response);
    }
  });
});
