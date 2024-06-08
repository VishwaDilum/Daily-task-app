const nodemailer = require('nodemailer');

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'vishwadilum91@gmail.com',
        pass: 'bqer dhvu dfyh pcog'
    }
});

// Generate a random OTP code
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000);
};

module.exports = { transporter, generateOTP };
