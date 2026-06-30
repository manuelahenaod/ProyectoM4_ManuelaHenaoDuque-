const errorMessages: Record<string, string> = {
  // Auth
  "auth/invalid-credential": "Email o contraseña incorrectos.",
  "auth/email-already-in-use": "Ese email ya está registrado.",
  "auth/invalid-email": "El email no es válido.",
  "auth/weak-password": "La contraseña es muy débil (mínimo 6 caracteres).",
  "auth/too-many-requests": "Demasiados intentos. Probar más tarde.",
  "auth/popup-closed-by-user": "Inicio con Google cancelado.",

  // Firestore
  "permission-denied": "No tienes permiso para realizar esta acción.",
  "unavailable": "Sin conexión. Verifica tu internet.",
};

/**
 * Traduce cualquier error a un mensaje legible en español usando un mapa literal.
 */
export function getErrorMessage(error: unknown): string {
  if (error && typeof error === "object" && "code" in error) {
    const code = (error as { code: string }).code;
    return errorMessages[code] || "Ocurrió un error. Intenta nuevamente.";
  }

  if (error instanceof Error) return error.message;

  return "Ocurrió un error inesperado.";
}
