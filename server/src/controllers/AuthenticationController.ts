import bcrypt from 'bcryptjs';
import {
    NextFunction,
    Request,
    Response,
} from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import config from '../config/config';
import { HttpError } from '../middleware/errorHandler';
import User from '../models/Users';

interface DecodedToken extends JwtPayload {
    _id: string;
}


export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { username, password } = req.body;
    try {
        let user = new User({ username, password });
        user = await user.save();

        //create jwt token for user
        const token = jwt.sign({ _id: user._id }, config.jwt.secret);
        //respond with user info and token
        res.status(201).json({ user, token });

    } catch (error) {
        next(error) //pass to error middleware
    }
}

export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username: username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new HttpError('Authentication failed', 401);
        }

        const accessToken = jwt.sign({ _id: user._id }, config.jwt.secret, { expiresIn: '30m' });
        const refreshToken = jwt.sign({ _id: user._id }, config.jwt.refreshSecret, { expiresIn: '7d' })
        user.refreshTokens.push(refreshToken);
        await user.save();

        res.status(200).json({ user, accessToken })
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
        const user = await User.findOne({ refreshTokens: refreshToken });
        if (!user) {
            throw new HttpError('No matching user for provided token', 403);
        }

        // Correctly handling the jwt.verify call
        // cant throw errors withing callback
        // return and next solves
        jwt.verify(refreshToken, config.jwt.refreshSecret, (err: any, decoded: any) => {
            if (err) {
                return next(new HttpError('Token verification failed', 403));
            }

            // Now assert the type of decoded as needed
            const decodedToken = decoded as { _id: string }; // Adjust according to your token structure

            if (user._id.toString() !== decodedToken._id) {
                return next(new HttpError('User ID mismatch', 403));
            }

            const accessToken = jwt.sign({ _id: user._id }, config.jwt.secret, { expiresIn: '30m' });
            res.status(201).json({ accessToken });
        });
    } catch (error) {
        next(error);
    }
};