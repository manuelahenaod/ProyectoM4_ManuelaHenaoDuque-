import { useNavigate } from "react-router-dom";
import "../styles/NotFound.css";

export default function NotFound() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Regresa a la página anterior en el historial
  };

  const handleGoHome = () => {
    navigate("/"); // Redirige al inicio / login
  };

  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <div className="notfound-emoji">🔍</div>
        <h1 className="notfound-title">404</h1>
        <h2 className="notfound-subtitle">Página no encontrada</h2>
        <p className="notfound-text">
          Lo sentimos, la página que estás buscando no existe o ha sido movida a otra dirección.
        </p>
        <div className="notfound-actions">
          <button onClick={handleGoBack} className="notfound-btn btn-secondary">
            ← Volver atrás
          </button>
          <button onClick={handleGoHome} className="notfound-btn btn-primary">
            Ir al inicio 
          </button>
        </div>
      </div>
    </div>
  );
}
