import styled from "styled-components";

const Input = styled.input`
  padding: ${(props) => props.theme.padding.md};
  transition: border-color 300ms ease-in-out;
  border-color: orange;

  &:hover,
  &:focus {
    border-color: gray;
    cursor: pointer;
  }
`;

const Styled = {
  Input,
};

export default Styled;
