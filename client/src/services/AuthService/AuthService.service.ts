import { AxiosError } from 'axios';

import AuthenticationClient
    from '../../clients/AuthenticationClient/AuthenticationClient';
import { NetworkOrUnknownError } from '../GeneralErrors';
import {
    AuthServiceError,
    NotFoundError,
    TokenExpiredError,
    TokenInvalidError,
    TokenRefreshNetworkError,
    UnauthorizedError,
} from './AuthServiceErrors';

class AuthService {

    public loginUser = async (username: string, password: string) => {
        try {
            return await AuthenticationClient.loginUser(username, password)
        } catch (error) {
            const axiosError = error as AxiosError;
            if (axiosError.response?.status) {
                switch (axiosError.response.status) {
                    case 401:
                        throw new UnauthorizedError('Unauthorized - wrong credientials');
                    case 404:
                        throw new NotFoundError('Wrong username or password')
                    default:
                        throw new AuthServiceError(`An error occured fetching user data`)
                }
            } else {
                throw new NetworkOrUnknownError();
            }
        }
    }

    public refreshToken = async (refreshToken: string) => {
        try {
            return await AuthenticationClient.refreshToken(refreshToken)
        } catch (error) {
            const axiosError = error as AxiosError
            if (axiosError.response?.status) {
                switch (axiosError.response.status) {
                    case 401:
                        throw new TokenExpiredError()
                    case 404:
                        throw new TokenInvalidError()
                    default:
                        throw new AuthServiceError(`An error occured trying to refresh token`)
                }
            } else {
                throw new TokenRefreshNetworkError();
            }

        }
    }
}

export default new AuthService();