import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import "./buttonStyle.css";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button className="accountButton" onClick={() => loginWithRedirect()}>Login</button>;
};

export default LoginButton;
