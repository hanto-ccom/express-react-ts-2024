import {
    AxiosError,
    AxiosInstance,
    AxiosResponse,
} from 'axios';

import createAxiosClient from '../clients/axiosClient';
import { OpenWeatherMapReport } from '../types/WeatherDataTypes';
import {
    NotFoundError,
    UnauthorizedError,
    WeatherServiceError,
} from './WeatherServiceErrors';

class WeatherService {
    private client: AxiosInstance;

    constructor() {
        this.client = createAxiosClient({ baseURL: 'http://localhost:3001/weather' })
    }

    public getWeatherForCity = async (city: string) => {
        try {
            const response: AxiosResponse<OpenWeatherMapReport> = await this.client.get<OpenWeatherMapReport>(`/${city}`)
            return response.data
        } catch (error) {
            const axiosError = error as AxiosError;
            if (axiosError.response?.status) {
                switch (axiosError.response.status) {
                    case 401:
                        throw new UnauthorizedError('Unauthorized access to weather data')
                    case 404:
                        throw new NotFoundError('City not found')
                    default:
                        throw new WeatherServiceError('An error occured fetching weather data')
                }
            } else {
                throw new WeatherServiceError('Unexpected error getting weather data')
            }
        }
    }
}

export default new WeatherService();