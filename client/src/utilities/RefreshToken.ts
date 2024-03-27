import axios, { AxiosError } from 'axios';

//tokens
export const getRefreshToken = () => localStorage.getItem('refreshToken');
export const setRefreshToken = (refreshToken: string) => localStorage.setItem('refreshToken', refreshToken)
export const setAccessToken = (accessToken: string) => localStorage.setItem('accessToken', accessToken)

export const RefreshAccessToken = async () => {
    try {
        const refreshToken = getRefreshToken();
        const response = await axios.post('http://localhost:3001/authentication/token', { refreshToken })
        console.log("response: ", response.data)
        if (!response) {
            throw new Error('Error refreshing token in interceptor')
        }
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        console.error(`Error refreshing token ${axiosError.response?.status}`, axiosError.message)
        throw axiosError;
    }
}