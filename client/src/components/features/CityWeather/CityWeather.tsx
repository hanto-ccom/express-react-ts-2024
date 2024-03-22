import { useCallback, useMemo, useState } from "react";

import Styled from "./CityWeather.style";

type CityWeatherProps = React.DetailedHTMLProps<
  React.AllHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  onCitySubmit: (city: string) => Promise<void>;
};

const CityWeather: React.FC<CityWeatherProps> = ({ onCitySubmit, ...rest }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isWiggling, setIsWiggling] = useState<boolean>(false);

  const hasInput = useMemo(() => {
    return inputValue.trim().length > 0;
  }, [inputValue]);

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //no try-catch needed since any error is caught and handled before this
    e.preventDefault();
    //only fire onCitySubmit if there is an inputValue
    hasInput && (await onCitySubmit(inputValue));
    setInputValue("");
  };

  const onMouseEnter = useCallback(() => {
    setIsWiggling(false);
    setTimeout(() => {
      setIsWiggling(!hasInput);
    }, 10);
  }, [hasInput]);

  return (
    <Styled.CityWeatherDiv {...rest}>
      <form onSubmit={handleOnSubmit}>
        <div>
          <Styled.CityWeatherInput
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.currentTarget.value)}
            isWiggling={isWiggling}
            placeholder="Enter city name"
          />
          <Styled.CityWeatherButton
            type="submit"
            onMouseEnter={() => onMouseEnter()}
            noInput={!hasInput}
          >
            Find
          </Styled.CityWeatherButton>
        </div>
      </form>
    </Styled.CityWeatherDiv>
  );
};

export default CityWeather;
