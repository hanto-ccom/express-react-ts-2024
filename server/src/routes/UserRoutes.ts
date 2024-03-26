import express from 'express';

import { getUserByUserIdFromToken } from '../controllers/UserController';

//router
const router = express.Router();

router.get('/', getUserByUserIdFromToken)

export default router;