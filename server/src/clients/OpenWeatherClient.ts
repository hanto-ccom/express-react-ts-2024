import config from '../config/config';
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
        if (data) {
            return { lat: data.lat, lon: data.lon };
        }
        return undefined
    } catch (error: any) {
        console.error(`Error fetching lat/long for city ${city}:`, error.message);
        return undefined;
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
        return data;
    } catch (error: any) {
        console.error(`Error fetching weather data for lat ${latitude}, long ${longitude}:`, error.message);
        return undefined;
    }
}

const OpenWeatherClient = {
    getLatLongForCity,
    getWeatherLatLong
}

export default OpenWeatherClient;