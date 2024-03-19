import "./App.css";

import { useState } from "react";

import { ThemeProvider } from "styled-components";

import CityWeather from "./components/features/CityWeather/CityWeather";
import WeatherCard from "./components/features/WeatherCard/WeatherCard";
import WeatherService from "./services/WeatherService";
import defaultTheme from "./styles/themes/defaultTheme";
import GlobalStyle from "./styles/themes/GlobalStyle";
import { OpenWeatherMapReport } from "./types/WeatherDataTypes";

function App() {
  const [weatherData, setWeatherData] = useState<OpenWeatherMapReport>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onFomSubmit = async (city: string) => {
    setIsLoading(true);
    try {
      const cityData = await WeatherService.getWeatherForCity(city);
      cityData ? setWeatherData(cityData) : setWeatherData(undefined);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <CityWeather onCitySubmit={onFomSubmit} />
      <br />
      <WeatherCard weatherData={weatherData} isLoading={isLoading} />
    </ThemeProvider>
  );
}

export default App;
