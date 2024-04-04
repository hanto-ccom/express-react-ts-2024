import React from "react";

import { InputProps } from "../Input/Input";
import Styled from "./InputWithLabel.style";

type InputWithLabelProps = InputProps & {
  label: string;
};

const InputWithLabel: React.FC<InputWithLabelProps> = ({ label, ...rest }) => {
  return (
    <Styled.InputWithLabelWrapperDiv>
      <Styled.InputField {...rest} />
      <Styled.InputLabel htmlFor={rest.id}>{label}</Styled.InputLabel>
    </Styled.InputWithLabelWrapperDiv>
  );
};

export default InputWithLabel;
