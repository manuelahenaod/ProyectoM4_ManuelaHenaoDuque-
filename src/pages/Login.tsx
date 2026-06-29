import React, { useState } from 'react';
import '../styles/Auth.css';
import InputField from '../components/InputField';
import Button from '../components/Button'
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../features/auth/authService";


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    await loginUser({
      email,
      password,
    });

    navigate("/tasks");
  } catch (error: any) {
    alert("Correo o contraseña incorrectos");
  }
};

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Iniciar Sesión</h1>

        <form onSubmit={handleSignIn}>
          <InputField
            id="email"
            label="Correo Electrónico"
            type="email"
            placeholder="tu@correo.com"
            value={email}
            onChange={(val) => setEmail(val)}
          />
          <InputField
            id="password"
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(val) => setPassword(val)}
          />
          <Button type="submit" className="auth-btn">Ingresar</Button>
        </form>
        <p className="auth-link">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="link"> Regístrate</Link>
        </p>
      </div>
    </div>
  );
}
