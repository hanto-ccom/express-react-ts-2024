import { FormEvent, useState } from "react";

import { useNavigate } from "react-router-dom";

import Button from "../../components/atoms/Button/Button";
import Input from "../../components/atoms/Input/Input";
import Error from "../../components/error/Error";
import Styled from "./RegisterView.style";

const RegisterView = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [verifyPassword, setVerifyPassword] = useState(""); // State for the second password input

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== verifyPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setError("");
      //call register enpdoint

      //navigat to login
      navigate("/login");
    } catch (error) {
      //TODO:handle auth errors with handlefunction like the other
      setError("failed to register, please try again");
    }

    console.log("Registeration submitted");
  };

  return (
    <Styled.RegisterViewWrapperDiv>
      <Styled.RegisterForm onSubmit={handleRegister}>
        <Input
          name="username"
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
          required
        />
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
      </Styled.RegisterForm>
      <Error error={error} />
    </Styled.RegisterViewWrapperDiv>
  );
};

export default RegisterView;
