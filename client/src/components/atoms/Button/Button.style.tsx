import styled from "styled-components";

const Button = styled.button`
  padding: ${(props) => props.theme.padding.md};

  transition: border-color 300ms ease-in-out;
  background: orange;
  color: white;
  border-color: orange;

  &:hover,
  &:focus {
    border-color: gray;
  }
`;

const Styled = {
  Button,
};

export default Styled;
