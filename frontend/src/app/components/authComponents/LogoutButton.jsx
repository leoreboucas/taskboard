import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import "./buttonStyle.css";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button
      className="accountButton"
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      Sair da conta
    </button>
  );
};

export default LogoutButton;
