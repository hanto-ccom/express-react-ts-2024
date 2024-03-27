import {
    NextFunction,
    Request,
    Response,
} from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import config from '../config/config';
import { HttpError } from './errorHandler';

/**
 *  Authmiddleware to handle protected routes (routes that include the auth middleware)
 *  - see /test -route for example
 */

export interface AuthRequest extends Request {
    user?: JwtPayload;
}

const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            throw new HttpError('Token not found', 401)
        }

        const decoded = jwt.verify(token, config.jwt.secret);
        req.user = decoded as jwt.JwtPayload;
        next();
    } catch (error) {
        const authError = new HttpError('Authentication failed', 401)
        next(authError)
    }
};

export default auth;