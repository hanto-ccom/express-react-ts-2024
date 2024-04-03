import jwt, { JwtPayload } from 'jsonwebtoken';

import config from '../config/config';
import { HttpError } from '../middleware/errorHandler';
import User from '../models/Users';

interface DecodedToken extends JwtPayload {
    _id: string;
}

export class TokenService {
    public generateAccessToken(userId: string) {
        return jwt.sign({ _id: userId }, config.jwt.secret, { expiresIn: '30m' })
    }

    generateRefreshToken(userId: string) {
        return jwt.sign({ _id: userId }, config.jwt.refreshSecret, { expiresIn: '7d' })
    }

    async rotateRefreshToken(oldToken: string) {
        try {
            const decodedToken = jwt.verify(oldToken, config.jwt.refreshSecret);
            const decoded = decodedToken as DecodedToken;

            const user = await User.findById(decoded._id)
            if (!user) {
                throw new HttpError('No matching user for provided token', 403);
            }

            user.refreshTokens = user.refreshTokens.filter(token => token !== oldToken);
            const newRefreshToken = this.generateRefreshToken(user.id)
            user.refreshTokens.push(newRefreshToken)
            await user.save();

            const newAccessToken = this.generateAccessToken(user.id);
            return { newAccessToken, newRefreshToken }
        } catch (error) {
            throw error;
        }
    }
}
const tokenServiceInstance = new TokenService();

export default tokenServiceInstance;