import {
    NextFunction,
    Response,
} from 'express';

import { AuthRequest } from '../middleware/authenticationHandler';
import { HttpError } from '../middleware/errorHandler';
import userService from '../services/userService.service';

//going through a protected route
export const getUserByUserIdFromToken = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    const user = req.user;
    try {
        const userInfo = await userService.getUserById(user?._id)
        if (!userInfo) {
            throw new HttpError('User not found', 404)
        }
        res.status(200).json(userInfo)
    } catch (error) {
        next(error);
    }
}