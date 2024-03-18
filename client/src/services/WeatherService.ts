import {
    AxiosInstance,
    AxiosResponse,
    isAxiosError,
} from 'axios';

import { createAxiosClient } from '../clients/axiosClient';

interface OpenWeatherMapReport {
    coord: Coordinates;
    weather: WeatherCondition[];
    base: string;
    main: MainWeatherData;
    visibility: number;
    wind: Wind;
    clouds: Clouds;
    dt: number;
    sys: SystemData;
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

interface Coordinates {
    lon: number;
    lat: number;
}

interface WeatherCondition {
    id: number;
    main: string;
    description: string;
    icon: string;
}

interface MainWeatherData {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
}

interface Wind {
    speed: number;
    deg: number;
    gust: number;
}

interface Clouds {
    all: number;
}

interface SystemData {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
}


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
}

export default new WeatherService();