import { AxiosError } from 'axios';

import UserClient from '../../clients/UserClient/User.client';
import { NetworkOrUnknownError } from '../GeneralErrors';
import {
    UnexpectedUserServiceError,
    UserNotFoundError,
    UserUnauthorizedError,
} from './UserServiceErrors';

class UserService {
    public fectchUser = async (accessToken: string) => {
        try {
            return await UserClient.getUserWithToken(accessToken)
        } catch (error) {
            const axiosError = error as AxiosError;
            if (axiosError.response?.status) {
                switch (axiosError.response.status) {
                    //TODO fix proper errors
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

export default new UserService
