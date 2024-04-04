import styled from "styled-components";

const RegisterViewWrapperDiv = styled.div``;

const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  min-width: 450px;
  border-radius: ${(props) => props.theme.borderRadii.default};
  box-shadow: ${(props) => props.theme.shadows.large};
`;

const Styled = {
  RegisterViewWrapperDiv,
  RegisterForm,
};

export default Styled;
