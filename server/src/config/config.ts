import dotenv from 'dotenv';

dotenv.config();

const config = {
    openWeatherMap: {
        openWeatherApiKey: process.env.OPEN_WEATHER_API_KEY || 'default_key',
        openWeatherBaseUrl: 'http://api.openweathermap.org',
    }
}

export default config;