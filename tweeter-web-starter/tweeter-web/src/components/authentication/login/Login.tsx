import "./Login.css";
import "bootstrap/dist/css/bootstrap.css";
import { ChangeEvent, useContext, useEffect, useMemo } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthenticationFormLayout from "../AuthenticationFormLayout";
import { AuthToken, FakeData, User } from "tweeter-shared";
import useToastListener from "../../toaster/ToastListenerHook";
import AuthenticationFields from "../authenticationFields/AuthenticationFields";
import useUserInfo from "../../userInfo/UserInfoHook";
import { LoginPresenter } from "../../../presenters/LoginPresenter";

interface Props {
  originalUrl?: string;
  presenter?: LoginPresenter
}

const Login = (props: Props) => {
  const [alias, setAlias] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { updateUser } = useUserInfo();
  const { displayErrorMessage } = useToastListener();

  const presenter = props.presenter || new LoginPresenter({
    displayErrorMessage,
    userAlias: alias,
    password,
    updateUser,
    navigate,
    setLoading: setIsLoading,
  });

  useEffect(() => {
  }, [alias, password]);

  const doLogin = async () => {
    console.log("Is it going into dologin?")
    presenter.doLogin(alias, password, rememberMe, props.originalUrl)
  };

  const inputFieldGenerator = () => {
    const fields = [
      {
        id: "aliasInput",
        type: "text",
        placeholder: "Alias",
        onChange: (event: ChangeEvent<HTMLInputElement>) => setAlias(event.target.value),
        ariaLabel: "Username"
      },
      {
        id: "passwordInput",
        type: "password",
        placeholder: "Password",
        onChange: (event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value),
        ariaLabel: "Password"
      },
    ];
  
    return (
      <>
        {fields.map((field) => (
          <AuthenticationFields
            key={field.id}
            type={field.type}
            id={field.id}
            className="form-control"
            placeholder={field.placeholder}
            onChange={field.onChange}
            submitFunction={doLogin}
            ariaLabel={field.ariaLabel}
          />
        ))}
      </>
    );
  };
  

  const switchAuthenticationMethodGenerator = () => {
    return (
      <div className="mb-3">
        Not registered? <Link to="/register">Register</Link>
      </div>
    );
  };

  return (
    <AuthenticationFormLayout
      headingText="Please Sign In"
      submitButtonLabel="Sign in"
      oAuthHeading="Sign in with:"
      inputFieldGenerator={inputFieldGenerator}
      switchAuthenticationMethodGenerator={switchAuthenticationMethodGenerator}
      setRememberMe={setRememberMe}
      submitButtonDisabled={() => !presenter.checkSubmitButtonStatus()}
      isLoading={isLoading}
      submit={doLogin}
    />
  );
};

export default Login;
