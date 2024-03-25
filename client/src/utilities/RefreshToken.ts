import axios, { AxiosError } from 'axios';

//tokens
export const getRefreshToken = () => localStorage.getItem('r_token');
export const setRefreshToken = (refreshToken: string) => localStorage.setItem('r_token', refreshToken)
export const setAccessToken = (accessToken: string) => localStorage.setItem('a_token', accessToken)

export const RefreshAccessToken = async () => {
    try {
        const refreshToken = getRefreshToken();
        const response = await axios.post('/token', { refreshToken })
        return response.data.accessToken;
    } catch (error) {
        const axiosError = error as AxiosError;
        console.error(`Error refreshing token ${axiosError.response?.status}`, axiosError.message)
        throw axiosError;
    }
}