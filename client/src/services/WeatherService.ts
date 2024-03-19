import {
    AxiosInstance,
    AxiosResponse,
    isAxiosError,
} from 'axios';

import { createAxiosClient } from '../clients/axiosClient';
import { OpenWeatherMapReport } from '../types/WeatherDataTypes';

class WeatherService {
    private client: AxiosInstance;

    constructor() {
        this.client = createAxiosClient({ baseURL: 'http://localhost:3001/weather' })
    }


    public getWeatherForLatLong = async (latitude: string, longitude: string) => {
        try {
            const response: AxiosResponse<OpenWeatherMapReport> = await this.client.get<OpenWeatherMapReport>(`/${latitude}/${longitude}`)
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                // Now error is typed as AxiosError
                console.error('Axios error getting weather data: ', error.response?.data || error.message);
            } else {
                // Handling non-Axios errors
                console.error('Unexpected error getting weather data: ', error);
            }
            return undefined;
        }
    }

    public getWeatherForCity = async (city: string) => {
        try {
            const response: AxiosResponse<OpenWeatherMapReport> = await this.client.get<OpenWeatherMapReport>(`/${city}`)
            return response.data
        } catch (error) {
            if (isAxiosError(error)) {
                console.error('Axios error getting weather for city data: ', error.response?.data || error.message);
            } else {
                console.error('Unexpected error getting weather for city data: ', error);
            }
        }
    }
}

export default new WeatherService();