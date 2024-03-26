import {
    AxiosError,
    AxiosInstance,
    AxiosResponse,
} from 'axios';

import createAxiosClient from '../axiosClient';

class AuthenticationClient {

    private axiosClient: AxiosInstance

    constructor() {
        this.axiosClient = createAxiosClient({ baseURL: 'http://localhost:3001/authentication' })
    }

    public registerUser = async (username: string, password: string) => {
        try {
            const response: AxiosResponse = await this.axiosClient.post('/register', {
                username,
                password
            })
            return response.data
        } catch (error) {
            const axiosError = error as AxiosError;
            if (axiosError.response) {
                console.error(`HTTP error from AuthClient: ${axiosError.response.status}`, axiosError.message)
            } else {
                console.error("Network or non-HTTP error in AuthClient ", axiosError.message)
            }

            throw axiosError // throw for the respective service to handle
        }
    }

    public loginUser = async (username: string, password: string) => {
        try {
            const response: AxiosResponse = await this.axiosClient.post('/login', {
                username,
                password
            })

            return response.data //username, password, token
        } catch (error) {
            const axiosError = error as AxiosError;
            if (axiosError.response) {
                console.log(`HTTP error from AuthClient: ${axiosError.response.status}`, axiosError.message)
            } else {
                console.error('Network or non-HTTP error in AuthClient ', axiosError.message)
            }

            throw axiosError;
        }
    }

    public refreshToken = async (refreshToken: string) => {
        try {
            const response: AxiosResponse = await this.axiosClient.post('/token', {
                refreshToken
            })

            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            if (axiosError.response) {
                console.error("error refreshing token")
            } else {
                console.error("Network or not-http error in AuthClient ", axiosError.message)
            }
            throw axiosError;
        }

    }


    public setAxiosInstance = (mockInstance: AxiosInstance) => {
        this.axiosClient = mockInstance;
    }
}

export default new AuthenticationClient();