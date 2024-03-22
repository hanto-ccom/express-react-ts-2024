import styled, { css } from "styled-components";

import { wiggleMixin } from "../../../../../styles/mixins/wiggleMixin";
import ButtonStyle from "../../../../atoms/Button/Button.style";
import InputStyle from "../../../../atoms/Input/Input.style";

const CityWeatherDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-bottom: 24px;

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const CityWeatherButton = styled(ButtonStyle.Button).withConfig({
  shouldForwardProp: (prop) => !["noInput"].includes(prop),
})<{ noInput: boolean }>`
  margin-right: 0;
  transition: background-color 200ms ease-in-out, border-color 200ms ease-in-out;
  border: ${(props) => (props.noInput ? `none` : "")};
  background-color: ${(props) => (props.noInput ? `gray` : `orange`)};
  cursor: ${(props) => (props.noInput ? `default` : `pointer`)};
`;

interface CityWeatherInputProps {
  isWiggling: boolean;
}

const CityWeatherInput = styled(InputStyle.Input).withConfig({
  shouldForwardProp: (prop) => !["isWiggling"].includes(prop),
})<CityWeatherInputProps>`
  ${(props) =>
    props.isWiggling &&
    css`
      ${wiggleMixin} 0.5s ease-in-out;
    `};
`;

const Styled = {
  CityWeatherDiv,
  CityWeatherInput,
  CityWeatherButton,
};

export default Styled;
