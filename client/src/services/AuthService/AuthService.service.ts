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
import {
    ErrorResponse,
    RegistrationError,
    UserExistError,
} from './RegistrationErrors';

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

    public registerUser = async (username: string, password: string, firstname: string, lastname: string, email: string) => {
        try {
            return await AuthenticationClient.registerUser(username, password, firstname, lastname, email)
        } catch (error) {
            const axiosError = error as AxiosError;
            if (axiosError.response?.status) {
                const { message, errorCode } = axiosError.response.data as ErrorResponse
                switch (axiosError.response.status) {
                    case 400:
                        if (errorCode === 'UserExists') {
                            throw new UserExistError('UserExists', errorCode)
                        } else if (errorCode === 'EmailExists') {
                            throw new UserExistError('EmailExists', errorCode)
                        } else {
                            throw new RegistrationError(message);
                        }
                    case 404:
                        throw new RegistrationError()
                    default:
                        throw new RegistrationError()
                }
            } else {
                throw new NetworkOrUnknownError()
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