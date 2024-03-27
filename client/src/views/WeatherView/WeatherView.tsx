import { useState } from "react";

import Button from "../../components/atoms/Button/Button";
import Error from "../../components/error/Error";
import {
  CityWeather,
  WeatherCard,
} from "../../components/features/WeatherCard";
import { useAuth } from "../../contexts/AuthContext/AuthContext";
import WeatherServiceService from "../../services/WeatherService/WeatherService.service";
import { handleWeatherErrors } from "../../services/WeatherService/WeatherServiceErrors";
import { OpenWeatherMapReport } from "../../types/WeatherDataTypes";

const WeatherView = () => {
  const [weatherData, setWeatherData] = useState<OpenWeatherMapReport>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const { user, logout } = useAuth();

  const onFormSubmit = async (city: string) => {
    setIsLoading(true);
    setError(undefined);
    try {
      const weatherResponseData = await WeatherServiceService.getWeatherForCity(
        city
      );
      setWeatherData(weatherResponseData);
    } catch (error) {
      setWeatherData(undefined);
      handleWeatherErrors(error, setError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <p style={{ color: "gray" }}>
        Welcome {user?.firstname} {user?.lastname}{" "}
        <Button onClick={logout}>Log out</Button>
      </p>
      <CityWeather onCitySubmit={onFormSubmit} />
      <WeatherCard weatherData={weatherData} isLoading={isLoading} />
      <Error error={error} />
    </>
  );
};

export default WeatherView;
