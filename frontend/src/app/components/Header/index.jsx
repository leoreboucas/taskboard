import { Link } from "react-router-dom";
import LogoutButton from "../authComponents/LogoutButton";
import './style.css'
import '../authComponents/buttonStyle.css'
import logo from '../../../assets/logo.png'
import { useAuth0 } from "@auth0/auth0-react";
import { IoMenu } from "react-icons/io5";
import { useState } from "react";


export default function Header() {
  const { isAuthenticated } = useAuth0()
  const [asideMenu, setAsideMenu] = useState(true)

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
            <div className="menuLinkContainer">
              <Link className="accountButton" to="/profile">
                Perfil
              </Link>
              <LogoutButton />
            </div>
            <div className="menuButtonContainer">
              <button className="menuButton" type="button" onClick={() => {setAsideMenu(!asideMenu)}}>
                <IoMenu size={30}/>
              </button>
              <div className="menuLinkAside" style={{right: asideMenu ? '-100%' : '0'}}>
                <Link className="accountButton" to="/profile" onClick={() => {setAsideMenu(!asideMenu)}}>
                  Perfil
                </Link>
                <LogoutButton />
              </div>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}