import {
    AxiosError,
    AxiosInstance,
    AxiosResponse,
} from 'axios';

import createAxiosClient from '../axiosClient';

class UserClient {
    private axiosClient: AxiosInstance

    constructor() {
        this.axiosClient = createAxiosClient({ baseURL: 'http://localhost:3001/user' })
    }

    public getUserWithToken = async (token: string) => {
        try {
            const response: AxiosResponse = await this.axiosClient.get('/data', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            if (axiosError.response) {
                console.error(`HTTP errpr from UserClient: ${axiosError.response.status}`, axiosError.message)
            } else {
                console.error("Network or non-HTTP error from UserClient", axiosError.message);
            }

            throw axiosError
        }
    }
}

export default new UserClient();