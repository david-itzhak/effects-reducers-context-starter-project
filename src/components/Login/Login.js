import React, { useContext, useEffect, useReducer, useState } from "react";

import Card from "../UI/Card/Card";
import styles from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/AuthContext";
import Input from "../UI/Input/Input";

const EMAIL_USER_INPUT = "EMAIL_USER_INPUT";
const VALIDATE_EMAIL = "VALIDATE_EMAIL";
const PASSWORD_USER_INPUT = "PASSWORD_USER_INPUT";
const VALIDATE_PASSWORD = "VALIDATE_PASSWORD";

const emailReducer = (prevState, action) => {
  switch (action.type) {
    case EMAIL_USER_INPUT:
      return {
        inputEmail: action.inputEmail.trim(),
        emailIsValid: action.inputEmail.includes("@"),
      };
    case VALIDATE_EMAIL:
      return {
        ...prevState,
        emailIsValid: prevState.inputEmail.includes("@"),
      };
    default:
      return { ...prevState };
  }
};

const passwordReducer = (prevState, action) => {
  switch (action.type) {
    case PASSWORD_USER_INPUT:
      return {
        inputPassword: action.inputPassword.trim(),
        passwordIsValid: action.inputPassword.length > 6,
      };
    case VALIDATE_PASSWORD:
      return {
        ...prevState,
        passwordIsValid: prevState.inputPassword.length > 6,
      };
    default:
      return { ...prevState };
  }
};
const Login = () => {
  const context = useContext(AuthContext);

  const initialEmailState = { inputEmail: "", emailIsValid: true };
  const [emailState, dispatcherEmailState] = useReducer(
    emailReducer,
    initialEmailState
  );

  const initialPasswordState = {
    inputPassword: "",
    passwordIsValid: true,
  };
  const [passwordState, dispatcherPasswordState] = useReducer(
    passwordReducer,
    initialPasswordState
  );

  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    const timeoutSetFormIsValid = setTimeout(() => {
      setFormIsValid(
        emailState.inputEmail.length > 0 &&
          passwordState.inputPassword.length > 0 &&
          emailState.emailIsValid &&
          passwordState.passwordIsValid
      );
    }, 1000);
    return () => {
      clearTimeout(timeoutSetFormIsValid);
    };
  }, [emailState.emailIsValid, passwordState.passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatcherEmailState({
      type: EMAIL_USER_INPUT,
      inputEmail: event.target.value,
    });
  };

  const passwordChangeHandler = (event) => {
    dispatcherPasswordState({
      type: PASSWORD_USER_INPUT,
      inputPassword: event.target.value,
    });
  };

  const validateEmailHandler = () => {
    dispatcherEmailState({ type: VALIDATE_EMAIL });
  };

  const validatePasswordHandler = () => {
    dispatcherPasswordState({ type: VALIDATE_PASSWORD });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    context.onLogin(emailState.inputEmail, passwordState.inputPassword);
  };

  return (
    <Card className={styles.login}>
      <form onSubmit={submitHandler}>
        <Input
          isValid={emailState.emailIsValid}
          label="Email"
          type="email"
          id="email"
          value={emailState.inputEmail}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          isValid={passwordState.passwordIsValid}
          label="Пароль"
          type="password"
          id="password"
          value={passwordState.inputPassword}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={styles.actions}>
          <Button type="submit" disabled={!formIsValid}>
            Вход
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
