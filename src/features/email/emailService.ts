import type {
  SendSummaryEmailRequest,
  SendSummaryEmailResponse,
} from "../../types/email";

export async function sendSummaryEmail(
  data: SendSummaryEmailRequest
): Promise<SendSummaryEmailResponse> {
  try {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const contentType = response.headers.get("content-type");
    let result: any = null;

    if (contentType && contentType.includes("application/json")) {
      try {
        result = await response.json();
      } catch (e) {
        // Ignorar error de parsing aquí, se manejará abajo
      }
    }

    if (!response.ok) {
      throw new Error(
        result?.message || 
        "Hubo un problema en el servidor al enviar el correo. Por favor, inténtalo más tarde."
      );
    }

    return result || { success: true, message: "Correo enviado con éxito" };
  } catch (error: any) {
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw new Error("No hay conexión con el servidor. Verifica tu internet o el estado del dev server.");
    }
    if (error instanceof SyntaxError || error.message?.includes("JSON")) {
      throw new Error("El servidor no respondió correctamente. Por favor, inténtalo de nuevo.");
    }
    throw error;
  }
}
