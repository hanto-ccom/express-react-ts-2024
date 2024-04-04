import React from "react";

import Styled from "./Input.style";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <Styled.Input {...props} ref={ref} />;
});

export default Input;
