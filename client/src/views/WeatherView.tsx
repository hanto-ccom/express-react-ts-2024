import { useState } from "react";

import Error from "../components/error/Error";
import { CityWeather, WeatherCard } from "../components/features/WeatherCard";
import WeatherServiceService from "../services/WeatherService/WeatherService.service";
import { handleWeatherErrors } from "../services/WeatherService/WeatherServiceErrors";
import { OpenWeatherMapReport } from "../types/WeatherDataTypes";

const WeatherView = () => {
  const [weatherData, setWeatherData] = useState<OpenWeatherMapReport>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const onFomSubmit = async (city: string) => {
    setIsLoading(true);
    setError(undefined);
    try {
      const cityData = await WeatherServiceService.getWeatherForCity(city);
      setWeatherData(cityData);
    } catch (error) {
      setWeatherData(undefined);
      handleWeatherErrors(error, setError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <CityWeather onCitySubmit={onFomSubmit} />
      <WeatherCard weatherData={weatherData} isLoading={isLoading} />
      <Error error={error} />
    </>
  );
};

export default WeatherView;
