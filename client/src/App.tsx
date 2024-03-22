import "./App.css";

import { useState } from "react";

import { ThemeProvider } from "styled-components";

import Error from "./components/error/Error";
import { CityWeather, WeatherCard } from "./components/features/WeatherCard";
import WeatherService from "./services/WeatherService/WeatherService.service";
import { handleWeatherErrors } from "./services/WeatherService/WeatherServiceErrors";
import defaultTheme from "./styles/themes/defaultTheme";
import GlobalStyle from "./styles/themes/GlobalStyle";
import { OpenWeatherMapReport } from "./types/WeatherDataTypes";

function App() {
  const [weatherData, setWeatherData] = useState<OpenWeatherMapReport>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const onFomSubmit = async (city: string) => {
    setIsLoading(true);
    setError(undefined);
    try {
      const cityData = await WeatherService.getWeatherForCity(city);
      setWeatherData(cityData);
    } catch (error) {
      setWeatherData(undefined);
      handleWeatherErrors(error, setError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <CityWeather onCitySubmit={onFomSubmit} />
      <WeatherCard weatherData={weatherData} isLoading={isLoading} />
      <Error error={error} />
    </ThemeProvider>
  );
}

export default App;
