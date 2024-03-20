import {
    NextFunction,
    Request,
    Response,
} from 'express';

import OpenWeatherClient from '../clients/OpenWeatherClient';
import { HttpError } from '../middleware/errorHandler';

interface LatLongData {
    lat: number;
    lon: number;
}

export const getWeatherForCity = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { city } = req.params;

    try {
        const latLongData: LatLongData | undefined = await OpenWeatherClient.getLatLongForCity(city);

        if (!latLongData) {
            throw new HttpError('Location data not found for the specified city', 404);
        }

        const weatherDataResponse = await OpenWeatherClient.getWeatherLatLong(latLongData.lat, latLongData.lon);
        weatherDataResponse;
        res.status(200).json(weatherDataResponse);
    } catch (error: any) {
        next(error); // Pass the error to the next error handling middleware
    }
}