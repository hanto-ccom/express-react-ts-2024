import { AxiosError } from 'axios';

import AuthenticationClient
    from '../../../clients/AuthenticationClient/AuthenticationClient';
import {
    AuthServiceError,
    NotFoundError,
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
                throw new AuthServiceError('Unexpected error getting user data')
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
                        break;
                    case 404:
                        break;
                    default:
                        throw new AuthServiceError(`An error occured trying to refresh token`)
                }
            } else {
                throw new AuthServiceError('Unexpected error getting user data')
            }

        }
    }
}

export default new AuthService();