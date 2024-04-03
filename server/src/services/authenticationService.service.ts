import bcrypt from 'bcryptjs';
import { JwtPayload } from 'jsonwebtoken';
import { Types } from 'mongoose';

import {
    DetailedHttpError,
    HttpError,
} from '../middleware/errorHandler';
import User from '../models/Users';
import tokenServiceInstance, { TokenService } from './token.service';

interface DecodedToken extends JwtPayload {
    _id: string;
}

export interface LoginResponse {
    user: {
        username: string;
        firstname: string;
        lastname: string;
        email: string;
        _id: Types.ObjectId;
    };
    accessToken: string;
    refreshToken: string;
}

class AuthenticationService {
    private tokenService: TokenService;

    constructor(tokenService: TokenService) {
        this.tokenService = tokenService;
    }

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
            const token = this.tokenService.generateAccessToken(user.id)
            return { user: { username, firstname, lastname, email }, token }
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    }

    async loginUser(username: string, pw: string): Promise<LoginResponse> {
        try {
            const user = await User.findOne({ username });
            if (!user || !(await bcrypt.compare(pw, user.password))) {
                throw new HttpError('Invalid username or password', 401);
            }

            const accessToken = this.tokenService.generateAccessToken(user.id);
            const refreshToken = this.tokenService.generateRefreshToken(user.id);
            user.refreshTokens.push(refreshToken);
            await user.save();


            const { refreshTokens, password, ...userInfo } = user.toObject();
            return { user: userInfo, accessToken, refreshToken };
        } catch (error) {
            throw error
        }
    }

    async logOutUser(token: string) {
        try {
            const user = await User.findOneAndUpdate({ refreshTokens: token }, { $pull: { refreshTokens: token } });
            if (!user) {
                console.warn('Logout called with invalid token')
            }
            //ok, regardless if user was found or not
            return { message: 'Logged out successfully' }

        } catch (error) {
            throw error;
        }
    }

    async refreshToken(oldRefeshToken: string) {
        try {
            const user = await User.findOne({ refreshTokens: oldRefeshToken })
            if (!user) {
                throw new HttpError('No matching user for provided token', 403);
            }

            return await this.tokenService.rotateRefreshToken(oldRefeshToken)

        } catch (error) {

        }
    }

}

export default new AuthenticationService(tokenServiceInstance);