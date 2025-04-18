import { useAuth0 } from "@auth0/auth0-react";

const SignupButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button className="accountButton"
      onClick={() =>
        loginWithRedirect({
          authorizationParams: { screen_hint: "signup" },
        })
      }
    >
      Criar Conta
    </button>
  );
};

export default SignupButton;
