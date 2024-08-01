const { createHmac } = require('crypto');
const os = require('os');
const cons = require('console');
const express = require('express');
const { transporter, generateOTP } = require('./nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const { insertUser , isUser, changePassword } = require('./db_connection');
const app = express();
const PORT = 5000;
const { generateToken,tokenValidation } = require('./auth');

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


app.post('/sign-up', async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  // Check if all required fields are provided
  if (!email || !password || !firstName || !lastName) {
    return res.status(400).send("All fields are required.");
  }

  try {
    const isInsert = await insertUser(email, password, firstName, lastName);
    if (isInsert) {
      return res.status(201).send("User registered successfully.");
    } else {
      return res.status(500).send("Failed to register user.");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error occurred.");
  }
});

app.post('/sign-in', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("All fields are required.");
  }

  const isUsers = await isUser(email, password);
  if (isUsers) {
    const token = generateToken(email,true); // Generate JWT token
    res.status(200).send({ message: "Authenticated Successfully", token , isUsers});
  } else {
    res.status(401).send("Authentication Failed");
  }
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
      storeOtp = otpCode;
      console.log('Email sent :', info.response);
    }
  });
});

app.post('/resetpass', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("All fields are required.");
  }

  const isChange = await changePassword(email, password);
  if (isChange) {
    res.status(200).send({ message: "Password Change Successfully"});
  } else {
    res.status(401).send("Failed");
  }
});
app.post('/auth/verifytoken',async(req,res)=>{
  const {token} = req.body;
  const isValid = await tokenValidation(token);
  if(isValid){
    res.status(200).send("Valid Token")
  }
  if(!isValid){
    res.status(404).send("Expired token")
  }
})