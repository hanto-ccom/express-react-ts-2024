import {
    Request,
    Response,
} from 'express';

import OpenWeatherClient from '../clients/OpenWeatherClient';

export const getWeatherForCity = async (req: Request, res: Response): Promise<void> => {
    const { city } = req.params;

    try {
        const latLongData = await OpenWeatherClient.getLatLongForCity(city);

        if (!latLongData || typeof latLongData.lat !== 'number' || typeof latLongData.lon !== 'number') {
            throw new Error('Invalid latitude or longitude data');
        }

        const weatherDataResponse = await OpenWeatherClient.getWeatherLatLong(latLongData.lat, latLongData.lon);
        const data = weatherDataResponse;
        res.status(200).json(data);
    } catch (error: any) {
        console.error('Error fetching weather data:', error);
        const status = error.response ? error.response.status : 500;
        const message = error.response ? error.response.data.message : 'Error fetching weather data';
        res.status(status).json({ message });
    }
}