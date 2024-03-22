import styled from "styled-components";

const WeatherCard = styled.div.withConfig({
  shouldForwardProp: (prop) => !["isLoading"].includes(prop),
})<{ isLoading: boolean }>`
  margin: 0 auto;

  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.palette.lead};
  padding: ${(props) => props.theme.padding.md};
  width: 300px;
  height: 300px;
  border-radius: 50%;
  border: 2px;
  border-style: solid;
  border-color: orange;
  box-shadow: ${(props) => props.theme.shadows.large};

  &::after {
    content: "";
    display: ${(props) => (props.isLoading ? `none` : `block`)};
    position: absolute;
    top: 50%;

    width: 150px;
    height: 5px;
    margin-bottom: ${(props) => props.theme.margin.sm};

    background-color: green;
  }
`;

const WeatherCardCondition = styled.div`
  & p {
    text-transform: uppercase;
  }
`;

const Styled = {
  WeatherCard,
  WeatherCardCondition,
};

export default Styled;
