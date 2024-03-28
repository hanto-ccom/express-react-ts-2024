import {
    AxiosError,
    AxiosInstance,
    AxiosResponse,
} from 'axios';

import { OpenWeatherMapReport } from '../../types/WeatherDataTypes';
import createAxiosClient from '../axiosClient';

class WeatherClient {
    private axiosClient: AxiosInstance

    constructor() {
        this.axiosClient = createAxiosClient({ baseURL: 'https://localhost:3001/weather' })
    }

    public getWeatherForCity = async (city: string): Promise<OpenWeatherMapReport> => {
        try {
            const response: AxiosResponse<OpenWeatherMapReport> = await this.axiosClient.get<OpenWeatherMapReport>(`/${city}`)
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            // Basic logging for diagnostic purposes
            if (axiosError.response) {
                console.error(`HTTP error from WeatherClient: ${axiosError.response.status}`, axiosError.message);
            } else {
                // This could be a network error or something not related to the HTTP response
                console.error("Network or non-HTTP error in WeatherClient", axiosError.message);
            }
            // Rethrow the error for handling at a higher level (WeatherService)
            throw axiosError;
        }
    }

    //for testing purposes
    public setAxiosInstance = (mockInstance: AxiosInstance) => {
        this.axiosClient = mockInstance;
    }
}

export default new WeatherClient();