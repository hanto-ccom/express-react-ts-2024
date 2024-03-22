import Styled from "./Loader.style";

type LoaderProps = {
  isLoading: boolean;
};

const Loader: React.FC<LoaderProps> = ({ isLoading }): JSX.Element => {
  return <>{isLoading && <Styled.LoaderDiv />}</>;
};

export default Loader;
