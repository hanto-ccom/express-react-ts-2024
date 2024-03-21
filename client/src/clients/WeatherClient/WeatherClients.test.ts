import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import WeatherClient from './WeatherClient.client';

describe('WeatherClient', () => {
    let mock: MockAdapter;

    beforeEach(() => {
        // Create a new instance of axios and apply the mock adapter
        const axiosInstance = axios.create();
        mock = new MockAdapter(axiosInstance);

        // Inject the mocked Axios instance into the singleton service
        WeatherClient.setAxiosInstance(axiosInstance);
    });

    afterEach(() => {
        mock.reset();
    });

    it('fetches weather data for a city successfully', async () => {
        // Arrange
        const mockWeatherData = { temp: 20, description: 'Sunny' };
        mock.onGet('/TestCity').reply(200, mockWeatherData);

        // Act
        const data = await WeatherClient.getWeatherForCity('TestCity');

        // Assert
        expect(data).toEqual(mockWeatherData);
    });

});