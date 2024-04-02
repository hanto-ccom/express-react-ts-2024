import jwt from 'jsonwebtoken';

import config from '../config/config';

class TokenService {
    public generateAccessToken(userId: string) {
        return jwt.sign({ _id: userId }, config.jwt.secret, { expiresIn: '30m' })
    }

    generateRefreshToken(userId: string) {
        return jwt.sign({ _id: userId }, config.jwt.refreshSecret, { expiresIn: '7d' })
    }

    async rotateRefreshToken(oldToken: string) {

    }
}