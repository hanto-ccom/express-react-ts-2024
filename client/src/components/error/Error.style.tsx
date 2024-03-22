import styled from "styled-components";

const ErrorParagraph = styled.p`
  color: ${(props) => props.theme.palette.gloom};
  min-height: 24px;
  margin-top: ${(props) => props.theme.spacing.lg};
`;

const Styled = {
  ErrorParagraph,
};

export default Styled;
