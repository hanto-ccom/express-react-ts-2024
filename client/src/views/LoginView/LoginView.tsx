import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Error from "../../components/error/Error";
import { useAuth } from "../../contexts/AuthContext/AuthContext";
import { handleAuthErrors } from "../../services/AuthService/AuthServiceErrors";
import Styled from "./LoginView.style";

const LoginView = () => {
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setError(undefined);
      await login(username, password);
      navigate("/weather");
    } catch (error) {
      handleAuthErrors(error, setError);
    }
  };

  return (
    <Styled.LoginViewWrapperDiv>
      <Styled.LoginViewForm onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="username"
          onChange={(e) => setUserName(e.target.value)}
        ></input>
        <input
          type="password"
          name="password"
          placeholder="password"
          autoComplete="on"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit">Login</button>
        <p style={{ fontSize: "10px", color: "gray" }}>
          Not registered? <span style={{ color: "blue" }}>Sign up</span>
        </p>
        <Error error={error} />
      </Styled.LoginViewForm>
    </Styled.LoginViewWrapperDiv>
  );
};

export default LoginView;
