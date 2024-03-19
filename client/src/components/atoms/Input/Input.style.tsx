import styled from "styled-components";

const Input = styled.input`
  padding: ${(props) => props.theme.padding.md};
  transition: border-color 300ms ease-in-out;

  &:hover,
  &:focus {
    border-color: orange;
  }
`;

const Styled = {
  Input,
};

export default Styled;
