import axios from 'axios';

/**
 * 
 * @param city 
 * @returns latitude and longitude for city in question
 */
const getLatLongForCity = async (city: string): Promise<{ lat: number, lon: number } | undefined> => {
    try {
        const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${process.env.OPEN_WEATHER_API_KEY}`;
        const response = await axios.get(apiUrl);
        const data = response.data;
        return { lat: data[0].lat, lon: data[0].lon };
    } catch (error: any) {
        console.error('Error fetching lat long for city:', error);
        return undefined;
    }
}

const getWeatherLatLong = async (latitude: number, longitude: number): Promise<any> => {
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

const OpenWeatherClient = {
    getLatLongForCity,
    getWeatherLatLong
}

export default OpenWeatherClient;