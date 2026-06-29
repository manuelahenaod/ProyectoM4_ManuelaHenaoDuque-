import "../styles/Header.css";
import Button from "./Button";

export default function Header() {
  return (
    <header className="dashboard-header">
      <div className="header-left">
        <h1>MateCode</h1>
        <p>Organiza tu día de forma inteligente</p>
      </div>

      <div className="header-right">
        <span className="welcome">Hola, Manuela</span>

        <Button className="logout-btn">
          Cerrar sesión
        </Button>
      </div>
    </header>
  );
}