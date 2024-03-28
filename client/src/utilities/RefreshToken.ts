import axios, { AxiosError } from 'axios';

//tokens
export const getRefreshToken = () => localStorage.getItem('refreshToken');
export const setRefreshToken = (refreshToken: string) => localStorage.setItem('refreshToken', refreshToken)
export const setAccessToken = (accessToken: string) => localStorage.setItem('accessToken', accessToken)

export const RefreshAccessToken = async () => {
    try {
        await axios.post('https://localhost:3001/authentication/token', {}, { withCredentials: true })
    } catch (error) {
        const axiosError = error as AxiosError;
        console.error(`Error refreshing token ${axiosError.response?.status}`, axiosError.message)
        throw axiosError;
    }
}