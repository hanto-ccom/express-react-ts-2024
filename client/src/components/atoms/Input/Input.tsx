import Styled from "./Input.style";

type InputProps = React.DetailedHTMLProps<
  React.AllHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input: React.FC<InputProps> = (props): JSX.Element => {
  return <Styled.Input {...props} placeholder="Enter city here..." />;
};

export default Input;
