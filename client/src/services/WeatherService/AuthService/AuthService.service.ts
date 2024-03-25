import { AxiosError } from 'axios';

import AuthenticationClient
    from '../../../clients/AuthenticationClient/AuthenticationClient';

class AuthService {

    public loginUser = async (username: string, password: string) => {
        try {
            return await AuthenticationClient.loginUser(username, password)
        } catch (error) {
            //TODO:proper errorhandling like in the weatherservice
            const axiosError = error as AxiosError;
            if (axiosError.response?.status) {
                switch (axiosError.response.status) {
                    case 401:
                        throw new Error(`401 - ${axiosError.message}`);
                    case 404:
                        throw new Error(`404 - ${axiosError.message}`)
                    default:
                        throw new Error(`${axiosError.response.status} - ${axiosError.message}`)
                }
            }
        }
    }
}

export default new AuthService();