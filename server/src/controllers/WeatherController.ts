import {
    NextFunction,
    Request,
    Response,
} from 'express';

import WeatherService from '../services/weatherService.service';

export const getWeatherForCity = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { city } = req.params;

    try {
        const weatherData = await WeatherService.getWeatherForCity(city)
        res.status(200).json(weatherData);
    } catch (error: any) {
        //thrown errors from clients and services are caught here and passed to our errorHandling middleware
        //where it gets sent to the user
        next(error); // Pass the error to the next error handling middleware
    }
}