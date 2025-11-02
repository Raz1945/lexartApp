import express from 'express';
import { register, login } from '../controllers/authController';
import { authCombined } from '../middlewares/authCombined';

const router = express.Router();

router.post('/register', authCombined, register);
router.post('/login', authCombined, login);

export default router;
