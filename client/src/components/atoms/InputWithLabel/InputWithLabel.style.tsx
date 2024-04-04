import styled from "styled-components";

import InputStyle from "../Input/Input.style";

const InputWithLabelWrapperDiv = styled.div`
  position: relative;
  margin: 10px 0 0 0;
`;

const InputLabel = styled.label`
  position: absolute;
  top: 18px;
  left: 15px;
  color: ${(props) => props.theme.palette.lead};
  transition: all 0.3s;
`;

const InputField = styled(InputStyle.Input)`
  width: 100%;
  &:focus + ${InputLabel}, &:not(:placeholder-shown) + ${InputLabel} {
    transform: translate(-15px, -40px);
    font-size: 14px;
    color: ${(props) => props.theme.palette.lead};
  }
  &:focus {
    outline: none;
  }
`;

const Styled = {
  InputWithLabelWrapperDiv,
  InputLabel,
  InputField,
};

export default Styled;
