import React, { useState } from 'react';
import '../styles/Auth.css';
import InputField from '../components/InputField';
import Button from '../components/Button'
import { Link } from "react-router-dom";


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Iniciando sesión con: ${email}`);
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
