import Styled from "./Button.style";

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant?: "sm" | "md" | "lg";
};

const Button: React.FC<ButtonProps> = ({ children, variant, ...rest }) => {
  return (
    <Styled.Button {...rest} variant={variant}>
      {children}
    </Styled.Button>
  );
};

export default Button;
