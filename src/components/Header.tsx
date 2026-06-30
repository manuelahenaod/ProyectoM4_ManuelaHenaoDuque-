import "../styles/Header.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../features/auth/authService";
import { useAuth } from "../hooks/useAuth";

export default function Header() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/");
  };

  // Obtiene el nombre a mostrar: displayName, la primera parte del email, o "Usuario"
  const displayName = user?.displayName || user?.email?.split("@")[0] || "Usuario";

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <h1>MateCode</h1>
        <p>Organiza tu día de forma inteligente</p>
      </div>

      <div className="header-right">
        <span className="welcome">Hola, {displayName}</span>

        <Button className="logout-btn" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </div>
    </header>
  );
}