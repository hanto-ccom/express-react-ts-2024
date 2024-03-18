import { useEffect, useState } from "react";

import WeatherService from "../../services/WeatherService";

const Test = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [weatherData, setWeatherData] = useState<any>();
  useEffect(() => {
    const getWeatherData = async () => {
      const data = await WeatherService.getWeatherForLatLong(
        "40.712776",
        "-74.005974"
      );
      setWeatherData(data);
    };

    getWeatherData();
  }, []);

  return <p>Hej från Test {weatherData?.name}</p>;
};

export default Test;
