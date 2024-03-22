import { OpenWeatherMapReport } from "../../../types/WeatherDataTypes";
import Loader from "../../atoms/Loader/Loader";
import { WeatherInfo } from "./index";
import Styled from "./WeatherCard.style";

const WeatherCard: React.FC<{
  weatherData?: OpenWeatherMapReport;
  isLoading: boolean;
}> = ({ weatherData, isLoading }): JSX.Element => {
  return (
    <Styled.WeatherCard isLoading={isLoading}>
      {isLoading ? (
        <Loader isLoading={isLoading} />
      ) : weatherData ? (
        <WeatherInfo
          cityName={weatherData?.name}
          cityTemp={weatherData?.main.temp}
          weatherData={weatherData?.weather}
        />
      ) : (
        <p>Search a city</p>
      )}
    </Styled.WeatherCard>
  );
};

export default WeatherCard;
