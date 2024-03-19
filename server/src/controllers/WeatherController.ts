import axios from 'axios';
import {
    Request,
    Response,
} from 'express';

export const getWeatherForLatLong = async (req: Request, res: Response): Promise<void> => {
    const { latitude, longitude } = req.params;

    try {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.OPEN_WEATHER_API_KEY}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        res.status(200).json(data);
    } catch (error: any) {
        console.error('Error fetching weather data:', error);
        const status = error.response ? error.response.status : 500;
        const message = error.response ? error.response.data.message : 'Error fetching weather data';
        res.status(status).json({ message });
    }
}

const getLatLongForCity = async (city: string): Promise<any> => {
    try {
        const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${process.env.OPEN_WEATHER_API_KEY}`;
        const response = await axios.get(apiUrl);
        const data = response.data;
        return data;
    } catch (error: any) {
        console.error('Error fetching lat long for city:', error);
        return undefined;
    }
}

const getWeatherLatLong = async (latitude: string, longitude: string): Promise<any> => {

    try {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.OPEN_WEATHER_API_KEY}`;
        const response = await axios.get(apiUrl);
        const data = response.data;
        return data;
    } catch (error: any) {
        console.error('Error fetching lat long for city:', error);
        return undefined;
    }

}

export const getWeatherForCity = async (req: Request, res: Response): Promise<void> => {
    const { city } = req.params;

    try {
        const latLongData = await getLatLongForCity(city);
        const lat = latLongData[0].lat;
        const lon = latLongData[0].lon;
        const weatherDataResponse = await getWeatherLatLong(lat, lon);
        const data = weatherDataResponse;
        res.status(200).json(data);
    } catch (error: any) {
        console.error('Error fetching weather data:', error);
        const status = error.response ? error.response.status : 500;
        const message = error.response ? error.response.data.message : 'Error fetching weather data';
        res.status(status).json({ message });
    }
}