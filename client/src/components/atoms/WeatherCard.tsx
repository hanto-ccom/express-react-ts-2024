/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

import WeatherService from "../../services/WeatherService";
import { OpenWeatherMapReport } from "../../types/WeatherDataTypes";
import Styled from "./WeatherCard.style";

const WeatherCard: React.FC<any> = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [weatherData, setWeatherData] = useState<
    OpenWeatherMapReport | undefined
  >();
  useEffect(() => {
    const getWeatherData = async () => {
      const data = await WeatherService.getWeatherForLatLong(
        "58.588455",
        "16.188313"
      );
      setWeatherData(data);
      setIsLoading(false);
    };

    getWeatherData();
  }, []);

  return (
    <Styled.WeatherCard>
      {isLoading && <p>Loading data...</p>}
      {!isLoading &&
        weatherData?.weather.map((w, index) => (
          <Styled.WeatherCardCondition>
            <img
              key={`${index}-${w.icon}`}
              src={`https://openweathermap.org/img/wn/${w.icon}@2x.png`}
              width={100}
              height={100}
            />
            <p>{w.description}</p>
          </Styled.WeatherCardCondition>
        ))}

      {!isLoading && (
        <p>
          Temp in {weatherData?.name} is{" "}
          {weatherData && Math.round(weatherData?.main.temp)} °C
        </p>
      )}
    </Styled.WeatherCard>
  );
};

export default WeatherCard;
