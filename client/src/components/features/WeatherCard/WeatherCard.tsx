import { OpenWeatherMapReport } from "../../../types/WeatherDataTypes";
import Loader from "../Loader/Loader";
import Styled from "./WeatherCard.style";

const WeatherCard: React.FC<{
  weatherData?: OpenWeatherMapReport;
  isLoading: boolean;
}> = ({ weatherData, isLoading }): JSX.Element => {
  return (
    <Styled.WeatherCard isLoading={isLoading}>
      {isLoading && <Loader isLoading={isLoading} />}
      {!isLoading &&
        weatherData?.weather.map((w, index) => (
          <Styled.WeatherCardCondition key={index}>
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

      {!isLoading && !weatherData && <p>Search a city</p>}
    </Styled.WeatherCard>
  );
};

export default WeatherCard;
