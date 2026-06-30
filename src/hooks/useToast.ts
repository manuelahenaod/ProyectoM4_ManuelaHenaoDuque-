import { useToastContext } from "../context/ToastContext";
import { getErrorMessage } from "../utils/handleError";
import type { ToastType } from "../context/ToastContext";

export function useToast() {
  const { showToast } = useToastContext();

  /**
   * Muestra un toast de éxito o error.
   */
  function toast(message: string, type: ToastType = "error") {
    showToast(message, type);
  }

  /**
   * Traduce el error a mensaje legible y lo muestra como toast de error.
   * Úsalo directamente en cualquier catch: handleError(error)
   */
  function handleError(error: unknown) {
    showToast(getErrorMessage(error), "error");
  }

  return { toast, handleError };
}
