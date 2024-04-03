import { AxiosError } from 'axios';

import UserClient from '../../clients/UserClient/User.client';
import { NetworkOrUnknownError } from '../GeneralErrors';
import {
    UnexpectedUserServiceError,
    UserNotFoundError,
    UserUnauthorizedError,
} from './UserServiceErrors';

class UserService {
    public fectchUser = async () => {
        try {
            const response = await UserClient.getUserWithToken()
            return response
        } catch (error) {
            const axiosError = error as AxiosError;
            if (axiosError.response?.status) {
                switch (axiosError.response.status) {
                    case 401:
                        throw new UserUnauthorizedError()
                    case 404:
                        throw new UserNotFoundError()
                    default:
                        throw new UnexpectedUserServiceError()
                }
            } else {
                throw new NetworkOrUnknownError()
            }

        }

    }
}

export default new UserService()
