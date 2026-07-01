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
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();
  const { toast, handleError } = useToast();

  const confirmPasswordError = confirmPassword && confirmPassword !== password ? "Las contraseñas no coinciden." : "";

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    // Basic validation before calling API //
    if (!name || !email || password.length < 6 || password !== confirmPassword) {
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
            onBlur={() => setPasswordTouched(true)}
            errorMessage={passwordTouched && password.length > 0 && password.length < 6 ? "La contraseña debe tener al menos 6 caracteres." : ""}
          />
          <InputField
            id="confirmPassword"
            label="Confirmar Contraseña"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={setConfirmPassword}
            onBlur={() => setConfirmPasswordTouched(true)}
            errorMessage={(confirmPasswordTouched || submitted) ? confirmPasswordError : ""}
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
