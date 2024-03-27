import express from 'express';

import { getUserByUserIdFromToken } from '../controllers/UserController';

//router
const router = express.Router();

router.get('/data', getUserByUserIdFromToken)

export default router;