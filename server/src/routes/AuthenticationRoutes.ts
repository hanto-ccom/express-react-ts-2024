import express from 'express';

import {
    loginUser,
    refreshToken,
    registerUser,
} from '../controllers/AuthenticationController';

const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/token', refreshToken)

export default router