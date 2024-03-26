import { AxiosError } from 'axios';

import UserClient from '../../clients/UserClient/User.client';

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
                        break;
                    case 404:
                        break;
                    default:
                        throw new Error('An error occoured trying to fetch user data')
                }
            } else {
                throw new Error('Unexpected error getting user data')
            }

        }

    }
}

export default new UserService
