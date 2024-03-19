import Styled from "./Button.style";

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return <Styled.Button {...rest}>{children}</Styled.Button>;
};

export default Button;
