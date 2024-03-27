import {
    NextFunction,
    Request,
    Response,
} from 'express';

import { HttpError } from '../middleware/errorHandler';
import authenticationService from '../services/authenticationService.service';

export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { username, password, firstname, lastname, email } = req.body;
    try {
        const userData = await authenticationService.registerUser(username, password, firstname, lastname, email)
        if (!userData) {
            throw new HttpError('Error getting userdata', 404)
        }
        res.status(201).json(userData);

    } catch (error) {
        next(error) //pass to error middleware
    }
}

export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { username, password } = req.body;

    try {
        const userLogginData = await authenticationService.loginUser(username, password)
        if (!userLogginData) {
            throw new HttpError('Error logging in user', 401)
        }
        res.status(200).json(userLogginData)
    } catch (error) {
        next(error)
    }
}

export const refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        throw new HttpError('No refresh token provided', 401);
    }
    try {
        const refreshTokenData = await authenticationService.refreshToken(refreshToken)

        res.status(201).json(refreshTokenData);
    } catch (error) {
        next(error);
    }
};