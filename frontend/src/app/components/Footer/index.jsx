import { Link } from "react-router-dom";
import "./style.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-info">
          <h3>TaskBoard</h3>
          <p>Gerencie suas tarefas de forma simples e eficiente.</p>
        </div>

        <nav className="footer-links">
          <h4>Links Úteis</h4>
          <Link to="/">Home</Link>
          <Link to="/about">Sobre</Link>
          <Link to="/contact">Contato</Link>
        </nav>

        <nav className="footer-social">
          <h4>Conecte-se</h4>
          <a
            href="https://github.com/leoreboucas"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a href="/" target="_blank" rel="noopener noreferrer">
            Repositório
          </a>
          <a
            href="https://www.linkedin.com/in/leoreboucas/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </nav>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} TaskBoard. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
