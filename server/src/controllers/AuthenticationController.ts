import bcrypt from 'bcryptjs';
import {
    NextFunction,
    Request,
    Response,
} from 'express';
import jwt from 'jsonwebtoken';

import config from '../config/config';
import { HttpError } from '../middleware/errorHandler';
import User from '../models/Users';

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

        const token = jwt.sign({ _id: user._id }, config.jwt.secret);
        res.status(200).json({ user, token })
    } catch (error) {
        next(error)
    }
}