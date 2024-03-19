import { useState } from "react";

import Input from "../../atoms/Input/Input";

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
    <div {...rest}>
      <form onSubmit={handleOnSubmit}>
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.currentTarget.value)}
        />
        <button style={{ padding: "16px" }} type="submit">
          Find!
        </button>
      </form>
    </div>
  );
};

export default CityWeather;
