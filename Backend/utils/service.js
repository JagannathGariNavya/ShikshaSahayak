import nodemailer from 'nodemailer';
import 'dotenv/config';
import Customer from '../models/Loginmodel.js';
import jwt from 'jsonwebtoken';

// Temporary store for OTPs
const otpStore = new Map();

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit OTP
};

export const emailSender = async (req, res) => {
  const { email } = req.body;
  if (!email ) {
    console.log("emailnot found");
    return res.status(400).send("Invalid request body. 'email' is required.");
  }
  const userExist = await Customer.findOne({ email });
  console.log(userExist);
  if (!userExist) {
    return res.status(400).send("user Not Exist Try To Sign-up");
  }

  const otpCode = generateOTP();
  otpStore.set(email, otpCode); // Store OTP temporarily

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.user_email,
      pass: process.env.emailpassword, // Use the app-specific password here
    },
  });

  try {
    const info = await transporter.sendMail({
      from: process.env.user_email, // sender address
      to: email, // list of receivers
      subject: "OTP confirmation", // Subject line
      text: `Hello, your OTP code is ${otpCode}.`, // plain text body
      html: `<p>Your OTP code is <strong>${otpCode}</strong>.</p>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    return res.status(200).send("Email sent successfully.");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Failed to send email.");
  }
};

export const verifyOTP = (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).send("Invalid request body. 'email' and 'otp' are required.");
  }

  const storedOtp = otpStore.get(email);
  if (storedOtp === otp) {
    otpStore.delete(email); // OTP is valid, remove it from store
    return res.status(200).send("OTP verified successfully.");
  } else {
    return res.status(400).send("Invalid OTP.");
  }
};

export const changePassword = async (req, res) => {
    const { token, newPassword } = req.body;
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      // await Customer.
      // await Customer.updateOne({ email: decoded.email }, { password: hashedPassword });
  
      return res.status(200).send('Password changed successfully');
    } catch (error) {
      console.error(error);
      return res.status(400).send('Failed to change password');
    }
  };