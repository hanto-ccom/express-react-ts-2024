export interface OpenWeatherMapReport {
    coord: Coordinates;
    weather: WeatherCondition[];
    base: string;
    main: MainWeatherData;
    visibility: number;
    wind: Wind;
    clouds: Clouds;
    dt: number;
    sys: SystemData;
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

export interface Coordinates {
    lon: number;
    lat: number;
}

export interface WeatherCondition {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface MainWeatherData {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
}

export interface Wind {
    speed: number;
    deg: number;
    gust: number;
}

export interface Clouds {
    all: number;
}

export interface SystemData {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
}