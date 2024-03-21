import styled from "styled-components";

const Button = styled.button`
  padding: ${(props) => props.theme.padding.md};

  transition: border-color 300ms ease-in-out;
  background: orange;
  color: white;
  border-color: orange;
  outline: none;
  border-width: 1px;

  &:hover,
  &:focus {
    border-color: gray;
  }

  &[disabled] {
    background-color: ${(props) => props.theme.palette.gloom};
    border-color: ${(props) => props.theme.palette.pitchBlack};
    cursor: default;
  }
`;

const Styled = {
  Button,
};

export default Styled;
