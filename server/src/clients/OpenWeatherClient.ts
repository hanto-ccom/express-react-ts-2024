import config from '../config/config';
import { HttpError } from '../middleware/errorHandler';
import createClient from './axiosClient';

/**
 * request client using axiosClient
 */
const openWeatherRequestClient = createClient({ baseURL: config.openWeatherMap.openWeatherBaseUrl });

/**
 * 
 * @param city 
 * @returns latitude and longitude for city in question
 */
const getLatLongForCity = async (city: string): Promise<{ lat: number, lon: number } | undefined> => {
    try {
        const response = await openWeatherRequestClient.get("/geo/1.0/direct", { params: { q: city, limit: 5, appid: config.openWeatherMap.openWeatherApiKey } })
        const data = response.data[0]
        if (!data) {
            throw new HttpError(`City ${city} not found`, 404);
        }
        return { lat: data.lat, lon: data.lon }
    } catch (error: any) {
        // If the error is already an HttpError (e.g., thrown by Axios interceptors), rethrow it
        if (error instanceof HttpError) {
            throw error;
        }
        // For other errors, log them and throw a more generic error to avoid leaking details
        console.error(`Error fetching lat/long for city ${city}:`, error.message);
        throw new HttpError('Error fetching location data', 500);
    }
}

/**
 * 
 * @param latitude 
 * @param longitude 
 * @returns weather data for requested lat and long
 */
const getWeatherLatLong = async (latitude: number, longitude: number): Promise<any> => {
    try {
        const response = await openWeatherRequestClient.get("/data/2.5/weather", { params: { lat: latitude, lon: longitude, units: "metric", appid: config.openWeatherMap.openWeatherApiKey } })
        const data = response.data;

        if (!data) {
            throw new HttpError('Weather data not found', 404);
        }

        return data;
    } catch (error: any) {
        // Log the error for debugging purposes
        console.error(`Error fetching weather data for lat ${latitude}, long ${longitude}:`, error.message);

        // Check if the error is already an instance of HttpError and rethrow if it is
        if (error instanceof HttpError) {
            throw error;
        }

        // For Axios errors, you might want to check if it's a response error and throw an HttpError accordingly
        if (error.response) {
            // You can customize the message and status based on the actual error response from OpenWeatherMap
            throw new HttpError('Error fetching weather data from OpenWeatherMap', error.response.status);
        }

        // For non-Axios errors, throw a generic HttpError to keep error handling consistent
        throw new HttpError('Unexpected error fetching weather data', 500);
    }
}

const OpenWeatherClient = {
    getLatLongForCity,
    getWeatherLatLong
}

export default OpenWeatherClient;