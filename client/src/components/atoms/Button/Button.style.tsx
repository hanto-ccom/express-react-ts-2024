import styled from "styled-components";

const Button = styled.button`
  padding: ${(props) => props.theme.padding.md};

  transition: border-color 300ms ease-in-out;
  background: orange;
  color: white;
  border-color: black;

  &:hover,
  &:focus {
    border-color: orange;
  }
`;

const Styled = {
  Button,
};

export default Styled;
