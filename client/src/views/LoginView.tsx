import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Error from "../components/error/Error";
import { useAuth } from "../contexts/AuthContext/AuthContext";
import { handleAuthErrors } from "../services/WeatherService/AuthService/AuthServiceErrors";

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
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          onChange={(e) => setUserName(e.target.value)}
        ></input>
        <input
          type="password"
          name="password"
          autoComplete="on"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit">Login</button>
        <Error error={error} />
      </form>
    </>
  );
};

export default LoginView;
