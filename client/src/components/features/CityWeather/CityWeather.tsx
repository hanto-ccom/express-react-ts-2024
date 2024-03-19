import { useState } from "react";

import Button from "../../atoms/Button/Button";
import Input from "../../atoms/Input/Input";
import Styled from "./CityWeather.style";

type CityWeatherProps = React.DetailedHTMLProps<
  React.AllHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  onCitySubmit: (city: string) => Promise<void>;
};

const CityWeather: React.FC<CityWeatherProps> = ({ onCitySubmit, ...rest }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await onCitySubmit(inputValue);
      setInputValue("");
    } catch (error) {
      console.error("Error in handleSubmit: ", error);
    }
  };

  return (
    <Styled.CityWeatherDiv {...rest}>
      <form onSubmit={handleOnSubmit}>
        <div className="form-content-wrapper">
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.currentTarget.value)}
          />
          <Button type="submit">Find!</Button>
        </div>
      </form>
    </Styled.CityWeatherDiv>
  );
};

export default CityWeather;
