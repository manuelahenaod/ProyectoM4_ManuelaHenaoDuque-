import "../styles/Header.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../features/auth/authService";

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/");
  };

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <h1>MateCode</h1>
        <p>Organiza tu día de forma inteligente</p>
      </div>

      <div className="header-right">
        <span className="welcome">Hola, Manuela</span>

        <Button className="logout-btn" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </div>
    </header>
  );
}