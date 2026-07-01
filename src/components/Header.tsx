import "../styles/Header.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../features/auth/authService";
import { useAuth } from "../hooks/useAuth";
import { LuUser, LuLogOut } from "react-icons/lu";

export default function Header() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/");
  };

  // Obtiene el nombre a mostrar: primer nombre de displayName, la primera parte del email, o "Usuario"
  const rawName = user?.displayName || user?.email?.split("@")[0] || "Usuario";
  const displayName = rawName.trim().split(" ")[0];

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <h1>MateCode</h1>
        <p>Organiza tus tareas de forma inteligente</p>
      </div>

      <div className="header-right">
        <span className="welcome">
          <LuUser size={17} />
          Hola, {displayName}
        </span>

        <Button className="logout-btn" onClick={handleLogout}>
          <LuLogOut size={16} />
          <span>Cerrar Sesión</span>
        </Button>
      </div>
    </header>
  );
}