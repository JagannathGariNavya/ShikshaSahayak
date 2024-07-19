import express from 'express';
import { changePassword, emailSender, verifyOTP } from '../utils/service.js';

const Otprouter = express.Router();

Otprouter.post('/send-otp', emailSender);
Otprouter.post('/verify-otp', verifyOTP);
Otprouter.post('/change-password', changePassword);
export default Otprouter;
