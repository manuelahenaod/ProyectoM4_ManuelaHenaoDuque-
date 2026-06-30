import React, { useState } from 'react';
import '../styles/Auth.css';
import InputField from '../components/InputField';
import Button from '../components/Button'
import { Link, useNavigate } from "react-router-dom";
import { loginUser, signInWithGoogle } from "../features/auth/authService";
import { FcGoogle } from "react-icons/fc";
import { useToast } from "../hooks/useToast";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { handleError } = useToast();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await loginUser({
        email,
        password,
      });

      navigate("/tasks");
    } catch (error: any) {
      handleError(error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/tasks");
    } catch (error: any) {
      handleError(error);
    }
  };


  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Iniciar Sesión</h1>

        <form onSubmit={handleSignIn} autoComplete="off">
          <InputField
            id="email"
            label="Correo Electrónico"
            type="email"
            placeholder="tu@correo.com"
            value={email}
            onChange={(val) => setEmail(val)}
            autoComplete="off"
          />
          <InputField
            id="password"
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(val) => setPassword(val)}
            autoComplete="new-password"
          />
          <Button type="submit" className="auth-btn">
            Ingresar
          </Button>

          <Button
            type="button"
            className="google-btn"
            onClick={handleGoogleSignIn}
          >
            <FcGoogle size={20} />
            <span>Continuar con Google</span>
          </Button>
        </form>
        <p className="auth-link">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="link"> Regístrate</Link>
        </p>
      </div>
    </div>
  );
}
