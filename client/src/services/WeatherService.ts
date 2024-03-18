import { AxiosInstance } from 'axios';

import { createAxiosClient } from '../clients/axiosClient';

class WeatherService {
    private client: AxiosInstance;

    constructor() {
        this.client = createAxiosClient({ baseURL: 'http://localhost:3001/weather' })
    }


    public getWeatherForLatLong = async (latitude: string, longitude: string) => {
        try {
            const response = await this.client.get(`/${latitude}/${longitude}`)
            return response.data;
        } catch (error) {
            console.error('Error getting weather data: ', error);
        }
    }
}

export default new WeatherService();