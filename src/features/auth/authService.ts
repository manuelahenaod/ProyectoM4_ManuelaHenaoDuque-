import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";


import { auth } from "../../services/firebase";
import type { LoginData, RegisterData } from "../../types/auth";

/**
 * Registrar un nuevo usuario
 */
export async function registerUser({
  name,
  email,
  password,
}: RegisterData) {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  // Guarda el nombre del usuario en Firebase Authentication
  await updateProfile(userCredential.user, {
    displayName: name,
  });

  return userCredential.user;
}

/**
 * Iniciar sesión
 */
export async function loginUser({
  email,
  password,
}: LoginData) {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  return userCredential.user;
}

/**
 * Iniciar sesión con Google
 */
const googleProvider = new GoogleAuthProvider();

export async function signInWithGoogle() {
  const userCredential = await signInWithPopup(
    auth,
    googleProvider
  );

  return userCredential.user;
}

/**
 * Cerrar sesión
 */
export async function logoutUser() {
  await signOut(auth);
}

/**
 * Obtener el usuario autenticado actualmente
 */
export function getCurrentUser() {
  return auth.currentUser;
}

