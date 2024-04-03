import axios, { AxiosError } from 'axios';

export const LogoutUser = async () => {
    try {
        console.log("Loggin out user")
        await axios.post('https://localhost:3001/authentication/logout', {}, { withCredentials: true })
    } catch (error) {
        const axiosError = error as AxiosError;
        console.error(`Error loggin out user ${axiosError.response?.status}`, axiosError.message)
        throw axiosError;
    }
}