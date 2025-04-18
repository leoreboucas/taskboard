import { Link } from "react-router-dom";
import LogoutButton from "../authComponents/LogoutButton";
import './style.css'
import '../authComponents/buttonStyle.css'
import logo from '../../../assets/logo.png'
import { useAuth0 } from "@auth0/auth0-react";


export default function Header() {
  const { isAuthenticated } = useAuth0()

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo da Página" />
        </Link>
      </div>
      <nav className="navbar">
        {isAuthenticated && (
          <>
            <Link className="accountButton" to="/profile">
              Perfil
            </Link>
            <LogoutButton />
          </>)}
      </nav>
    </header>
  );
}