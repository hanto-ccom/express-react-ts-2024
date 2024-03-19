import { OpenWeatherMapReport } from "../../../types/WeatherDataTypes";
import Styled from "./WeatherCard.style";

const WeatherCard: React.FC<{
  weatherData?: OpenWeatherMapReport;
  isLoading: boolean;
}> = ({ weatherData, isLoading }): JSX.Element => {
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

      {!isLoading && weatherData && (
        <p>
          Temp in {weatherData?.name} is{" "}
          {weatherData && Math.round(weatherData?.main.temp)} °C
        </p>
      )}

      {!isLoading && !weatherData && <p>No data for city</p>}
    </Styled.WeatherCard>
  );
};

export default WeatherCard;
