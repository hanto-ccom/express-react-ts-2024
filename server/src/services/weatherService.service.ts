import OpenWeatherClient from '../clients/OpenWeatherClient';
import { HttpError } from '../middleware/errorHandler';

class WeatherService {
    async getWeatherForCity(city: string) {
        const latLongData = await OpenWeatherClient.getLatLongForCity(city)
        if (!latLongData) {
            throw new HttpError('Location data not found for the specified city', 404);
        }
        const weatherDataResponse = await OpenWeatherClient.getWeatherLatLong(latLongData.lat, latLongData.lon)
        return weatherDataResponse;
    }
}

export default new WeatherService();