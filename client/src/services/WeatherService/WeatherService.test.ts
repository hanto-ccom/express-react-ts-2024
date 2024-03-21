import { AxiosError } from 'axios';

import WeatherClient from '../../clients/WeatherClient/WeatherClient.client';
import WeatherService from './WeatherService.service';
import {
    NotFoundError,
    UnauthorizedError,
    WeatherServiceError,
} from './WeatherServiceErrors';

// Mock WeatherClient
jest.mock('../../clients/WeatherClient/WeatherClient.client', () => ({
    getWeatherForCity: jest.fn(),
}));

// Helper function to create a mock AxiosError
const createMockAxiosError = (status: number, message: string = 'Test error message'): AxiosError => ({
    isAxiosError: true,
    response: {
        status,
        data: { message },
    },
    // Add any other properties required by your implementation
} as AxiosError);

describe('WeatherService', () => {
    it('fetches weather data for a city successfully', async () => {
        const mockWeatherData = { temp: 20, description: 'Sunny' };
        (WeatherClient.getWeatherForCity as jest.Mock).mockResolvedValue(mockWeatherData);

        const data = await WeatherService.getWeatherForCity('TestCity');
        expect(data).toEqual(mockWeatherData);
    });

    it('throws UnauthorizedError on 401 response', async () => {
        (WeatherClient.getWeatherForCity as jest.Mock).mockRejectedValue(createMockAxiosError(401));

        await expect(WeatherService.getWeatherForCity('TestCity'))
            .rejects.toThrow(UnauthorizedError);
    });

    it('throws NotFoundError on 404 response', async () => {
        (WeatherClient.getWeatherForCity as jest.Mock).mockRejectedValue(createMockAxiosError(404));

        await expect(WeatherService.getWeatherForCity('TestCity'))
            .rejects.toThrow(NotFoundError);
    });

    it('throws WeatherServiceError on unexpected errors', async () => {
        (WeatherClient.getWeatherForCity as jest.Mock).mockRejectedValue(new Error('Network failure'));

        await expect(WeatherService.getWeatherForCity('TestCity'))
            .rejects.toThrow(WeatherServiceError);
    });
})