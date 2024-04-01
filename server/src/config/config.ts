import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const config = {
    openWeatherMap: {
        openWeatherApiKey: process.env.OPEN_WEATHER_API_KEY || 'default_key',
        openWeatherBaseUrl: 'http://api.openweathermap.org',
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'default_secret',
        refreshSecret: process.env.JWT_REFRESH_SECRET || 'default_refresh_secret'
    },
    ssl: {
        key: fs.readFileSync('config/ssl/server.key'),
        cert: fs.readFileSync('config/ssl/server.cert')
    }
}

export default config;