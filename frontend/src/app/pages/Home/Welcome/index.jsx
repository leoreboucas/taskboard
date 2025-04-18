import React from "react";
import "./style.css";
import LoginButton from "../../../components/authComponents/LoginButton";
import SignupButton from "../../../components/authComponents/SignupButton";

function Welcome() {
  return (
    <div className="welcome-window">
      <h1 className="title">Bem-vindo ao TaskBoard</h1>
      <p className="description">
        O TaskBoard é uma ferramenta poderosa para gerenciar tarefas de forma
        eficiente e organizada. Crie, edite e acompanhe suas atividades para
        melhorar sua produtividade.
      </p>

      <div className="features">
        <div className="feature-card">
          <h3>📌 Organização</h3>
          <p>Crie listas de tarefas categorizadas e nunca perca um prazo.</p>
        </div>
        <div className="feature-card">
          <h3>🚀 Produtividade</h3>
          <p>Acompanhe seu progresso e otimize seu tempo de trabalho.</p>
        </div>
        <div className="feature-card">
          <h3>🔒 Segurança</h3>
          <p>Seus dados estão protegidos com autenticação segura.</p>
        </div>
      </div>

      <div className="signin-button">
        <LoginButton>Entrar</LoginButton>
        <SignupButton>Entrar</SignupButton>
      </div>
    </div>
  );
}

export default Welcome;
