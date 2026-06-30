import React, { useState } from 'react';
import '../styles/Auth.css';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../features/auth/authService";
import { useToast } from "../hooks/useToast";

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();
  const { toast, handleError } = useToast();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast("Las contraseñas no coinciden", "error");
      return;
    }

    try {
      await registerUser({
        name,
        email,
        password,
      });

      toast("¡Usuario registrado correctamente!", "success");
      navigate("/");
    } catch (error: any) {
      handleError(error);
    }
  };


  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Crear Cuenta</h1>

        <form onSubmit={handleRegister}>
          <InputField
            id="name"
            label="Nombre"
            type="text"
            placeholder="Tu nombre"
            value={name}
            onChange={(val) => setName(val)}
          />
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
          <InputField
            id="confirmPassword"
            label="Confirmar Contraseña"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(val) => setConfirmPassword(val)}
          />
          <Button type="submit" className="auth-btn">Registrarse</Button>
          <p className="auth-link">
            ¿Ya tienes cuenta?{" "}
            <Link to="/" className="link"> Inicia sesión</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
