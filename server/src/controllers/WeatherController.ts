import axios from 'axios';
import {
    Request,
    Response,
} from 'express';

export const getWeatherForLatLong = async (req: Request, res: Response): Promise<void> => {
    const { latitude, longitude } = req.params;

    try {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.OPEN_WEATHER_API_KEY}`;
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