import Styled from "./Error.style";

type ErrorType = {
  error: string | undefined;
};

const Error: React.FC<ErrorType> = ({ error }): JSX.Element => {
  return <Styled.ErrorParagraph>{error}</Styled.ErrorParagraph>;
};

export default Error;
