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
        const { user, accessToken, refreshToken } = await authenticationService.loginUser(username, password)
        if (!user) {
            throw new HttpError('Error logging in user', 401)
        }

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true, // send only over HTTPS
            sameSite: 'none', // strict or lax depending on your needs
            maxAge: 30 * 60 * 1000 // expires in 30 minutes
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000 // expires in 7 days
        });

        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

export const logoutUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    //TODO: implement
}

export const refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
        throw new HttpError('No refresh token provided', 401);
    }
    try {
        const { accessToken } = await authenticationService.refreshToken(refreshToken)
        res.cookie('accessToken', accessToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 30 * 60 * 1000 });
        res.send('Token refreshed');

    } catch (error) {
        next(error);
    }
};