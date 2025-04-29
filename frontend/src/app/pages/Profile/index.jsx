import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { IoMdMail, IoMdPerson, IoMdCalendar } from "react-icons/io";
import "./style.css";
import { api } from "../../../constants";

const Profile = () => {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [user, setUser] = useState({});
  
  useEffect(() => {
    const viewProfile = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await api.get(
          `/user/myprofile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data);
      } catch (error) {
        console.error("Falha na pesquisa:", error);
      }
    };
    if (isAuthenticated) {
      viewProfile();
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  if (isLoading) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    isAuthenticated && (
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-image-wrapper">
            <img
              src={user.imageProfile}
              alt={user.name}
              className="profile-image"
            />
          </div>
          <h2>{user.name}</h2>
          <p className="profile-role">{user.role || "Usuário Padrão"}</p>
          
        </div>

        <div className="profile-info">
          {user.email && (
            <div className="profile-info-row">
              <IoMdMail className="profile-icon" />
              <label>Email:</label>
              <p>{user.email}</p>
            </div>
          )}

          <div className="profile-info-row">
            <IoMdPerson className="profile-icon" />
            <label>Nome:</label>
            <p>{user.name}</p>
          </div>

          <div className="profile-info-row">
            <IoMdCalendar className="profile-icon" />
            <label>Data de Criação:</label>
            <p>{new Date(user.createdAt).toLocaleDateString()}</p>
          </div>

          {user.lastLogin && (
            <div className="profile-info-row">
              <IoMdCalendar className="profile-icon" />
              <label>Último Login:</label>
              <p>{new Date(user.lastLogin).toLocaleString()}</p>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default Profile;
