import { describe, it, expect } from "vitest";
import { getErrorMessage } from "../src/utils/handleError";

describe("handleError utility", () => {
  it("debería traducir un error de Firebase con código conocido", () => {
    const firebaseError = { code: "auth/invalid-credential" };
    expect(getErrorMessage(firebaseError)).toBe("Email o contraseña incorrectos.");
  });

  it("debería retornar un mensaje por defecto para un código de error desconocido", () => {
    const unknownFirebaseError = { code: "auth/unknown-error-code" };
    expect(getErrorMessage(unknownFirebaseError)).toBe("Ocurrió un error. Intenta nuevamente.");
  });

  it("debería retornar error.message si el error es una instancia de Error", () => {
    const standardError = new Error("Custom network error");
    expect(getErrorMessage(standardError)).toBe("Custom network error");
  });

  it("debería retornar un mensaje genérico si el error es de tipo desconocido y no tiene código ni es Error", () => {
    expect(getErrorMessage("Random string error")).toBe("Ocurrió un error inesperado.");
    expect(getErrorMessage(null)).toBe("Ocurrió un error inesperado.");
  });
});
