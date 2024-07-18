import express from 'express';
import { register, login, logout } from '../controllers/auth.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

router.get('/admin', protect, authorize(['admin']), (req, res) => {
    res.status(200).json({ message: 'Welcome Admin' });
});

export default router;
