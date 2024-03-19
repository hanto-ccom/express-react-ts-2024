import styled from "styled-components";

const CityWeatherDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & .form-content-wrapper {
      button {
        margin-right: 0;
      }
    }
  }
`;

const Styled = {
  CityWeatherDiv,
};

export default Styled;
