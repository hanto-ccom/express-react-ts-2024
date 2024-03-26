import styled from "styled-components";

const LoginViewWrapperDiv = styled.div`
  min-width: 400px;
  padding: 25px;
  border-radius: ${(props) => props.theme.borderRadii.default};
  box-shadow: ${(props) => props.theme.shadows.large};
`;

const LoginViewForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.md};
`;

const Styled = {
  LoginViewWrapperDiv,
  LoginViewForm,
};

export default Styled;
