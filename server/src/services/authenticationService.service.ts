import bcrypt from 'bcryptjs';
import jwt, { JwtPayload } from 'jsonwebtoken';

import config from '../config/config';
import {
    DetailedHttpError,
    HttpError,
} from '../middleware/errorHandler';
import User from '../models/Users';

interface DecodedToken extends JwtPayload {
    _id: string;
}


class AuthenticationService {
    async registerUser(username: string, password: string, firstname: string, lastname: string, email: string) {
        try {

            const existingUser = await User.findOne({ username });
            if (existingUser) {
                throw new DetailedHttpError('User already exists', 400, 'UsernameExists');
            }

            // Check if the email already exists
            const existingUserByEmail = await User.findOne({ email });
            if (existingUserByEmail) {
                throw new DetailedHttpError('Email is already registered', 400, 'EmailExists');
            }

            let user = new User({ username, password, firstname, lastname, email });
            user = await user.save();

            //create jwt token for user
            const token = jwt.sign({ _id: user._id }, config.jwt.secret);
            //respond with user info and token
            return { user, token }

        } catch (error) {
            throw error
        }
    }

    async loginUser(username: string, pw: string) {
        try {
            const user = await User.findOne({ username: username });
            if (!user || !(await bcrypt.compare(pw, user.password))) {
                throw new HttpError('Invalid username or password', 401);
            }

            const accessToken = jwt.sign({ _id: user._id }, config.jwt.secret, { expiresIn: '30m' });
            const refreshToken = jwt.sign({ _id: user._id }, config.jwt.refreshSecret, { expiresIn: '7d' })
            user.refreshTokens.push(refreshToken);
            await user.save();

            let userObject = user.toObject();
            const { refreshTokens, password, ...userInfo } = userObject; // remove refrestokens and password, we do not want to send them in our response

            return { user: userInfo, accessToken, refreshToken } // only senmd userInfo from user object
        } catch (error) {
            throw error
        }
    }

    async logOutUser(token: string) {
        try {
            const user = await User.findOne({ refreshTokens: token });
            if (!user) {
                throw new HttpError("User's token not found", 404);
            }
            //remove user's refreshtoken
            user.refreshTokens = [];
            await user.save();
            return user;

        } catch (error) {
            throw error;
        }
    }

    async refreshToken(oldRefeshToken: string) {
        try {
            const user = await User.findOne({ refreshTokens: oldRefeshToken });
            if (!user) {
                throw new HttpError('No matching user for provided token', 403);
            }

            // Correctly handling the jwt.verify call            
            const decodedToken = await new Promise((resolve, reject) => {
                jwt.verify(oldRefeshToken, config.jwt.refreshSecret, (err: any, decoded: any) => {
                    if (err) {
                        reject(new HttpError('Token verification failed', 403))
                    }
                    resolve(decoded)
                })
            })

            const decoded = decodedToken as DecodedToken;

            if (user._id.toString() !== decoded._id) {
                throw new HttpError('User ID missmatch', 403);
            }

            const accessToken = jwt.sign({ _id: user._id }, config.jwt.secret, { expiresIn: '30m' })
            return { accessToken };
        } catch (error) {
            throw error;
        }
    }

}

export default new AuthenticationService();