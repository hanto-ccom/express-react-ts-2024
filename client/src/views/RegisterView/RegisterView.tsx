import { FormEvent, useState } from "react";

import { useNavigate } from "react-router-dom";

import Button from "../../components/atoms/Button/Button";
import Input from "../../components/atoms/Input/Input";
import Error from "../../components/error/Error";
import AuthServiceService from "../../services/AuthService/AuthService.service";
import { handleRegistrationErrors } from "../../services/AuthService/RegistrationErrors";
import Styled from "./RegisterView.style";

const RegisterView = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [verifyPassword, setVerifyPassword] = useState(""); // State for the second password input

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [error, setError] = useState<string>();

  const navigate = useNavigate();

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== verifyPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setError(undefined);
      await AuthServiceService.registerUser(
        username,
        password,
        firstName,
        lastName,
        email
      );

      navigate("/login");
    } catch (error) {
      handleRegistrationErrors(error, setError);
    }
  };

  return (
    <Styled.RegisterViewWrapperDiv>
      <Styled.RegisterForm onSubmit={handleRegister}>
        {/* <label htmlFor="username" style={{ color: "gray" }}>
          Username
        </label> */}
        <Input
          name="username"
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
          required
        />
        {/* <label htmlFor="password" style={{ color: "gray" }}>
          Password
        </label> */}
        <Input
          name="password"
          type="password"
          autoComplete="off"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          required
        />
        <Input
          name="verifyPassword"
          type="password"
          placeholder="verify password"
          autoComplete="off"
          value={verifyPassword}
          onChange={(e) => setVerifyPassword(e.currentTarget.value)}
          required
        />
        <hr />
        <Input
          name="firstName"
          type="text"
          placeholder="Firstname"
          value={firstName}
          onChange={(e) => setFirstName(e.currentTarget.value)}
          required
        />
        <Input
          name="lastName"
          type="text"
          placeholder="Lastname"
          value={lastName}
          onChange={(e) => setLastName(e.currentTarget.value)}
          required
        />
        <Input
          name="email"
          type="email"
          placeholder="you@domain.com"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          required
        />
        <Button type="submit">Register</Button>
        <p style={{ fontSize: "10px", color: "gray" }}>
          Already registered?{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </Styled.RegisterForm>

      <Error error={error} />
    </Styled.RegisterViewWrapperDiv>
  );
};

export default RegisterView;
