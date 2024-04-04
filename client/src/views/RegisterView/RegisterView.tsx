import { FormEvent, useState } from "react";

import { useNavigate } from "react-router-dom";

import Button from "../../components/atoms/Button/Button";
import InputWithLabel from "../../components/atoms/InputWithLabel/InputWithLabel";
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
        <InputWithLabel
          label={"Username"}
          id="username"
          name="username"
          type="text"
          placeholder=""
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
          required
        />
        {/* <label htmlFor="password" style={{ color: "gray" }}>
          Password
        </label> */}
        <InputWithLabel
          label={"Password"}
          id={"password"}
          name="password"
          type="password"
          autoComplete="off"
          placeholder=""
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          required
        />
        <InputWithLabel
          label={"Verify password"}
          id={"verifypassword"}
          name="verifyPassword"
          type="password"
          placeholder=""
          autoComplete="off"
          value={verifyPassword}
          onChange={(e) => setVerifyPassword(e.currentTarget.value)}
          required
        />
        <hr />
        <InputWithLabel
          label={"Firstname"}
          id={"firstname"}
          name="firstName"
          type="text"
          placeholder=""
          value={firstName}
          onChange={(e) => setFirstName(e.currentTarget.value)}
          required
        />
        <InputWithLabel
          label={"Lastname"}
          id={"lastname"}
          name="lastName"
          type="text"
          placeholder=""
          value={lastName}
          onChange={(e) => setLastName(e.currentTarget.value)}
          required
        />
        <InputWithLabel
          label={"E-mail"}
          id={"email"}
          name="email"
          type="email"
          placeholder=""
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
