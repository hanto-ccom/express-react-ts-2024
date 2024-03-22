import { WeatherCondition } from "../../../types/WeatherDataTypes";
import StyledWeatherInfo from "./WeatherInfo.style";

type WeatherInfoProps = {
  weatherData: Array<WeatherCondition> | undefined;
  cityName: string | undefined;
  cityTemp: number | undefined;
};

const WeatherInfo: React.FC<WeatherInfoProps> = ({
  weatherData,
  cityName,
  cityTemp,
}): JSX.Element => {
  return (
    <>
      {weatherData?.map((weather, index) => (
        <StyledWeatherInfo.WeatherCardConditionDiv key={index}>
          <img
            key={`${index}-${weather.icon}`}
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            width={100}
            height={100}
          />
          <p>{weather.description}</p>
        </StyledWeatherInfo.WeatherCardConditionDiv>
      ))}
      <p>
        Temp in {cityName} is {cityTemp && Math.round(cityTemp)}°C
      </p>
    </>
  );
};

export default WeatherInfo;
