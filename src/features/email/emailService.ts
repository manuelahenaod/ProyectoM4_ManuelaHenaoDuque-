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

    const result: SendSummaryEmailResponse = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "No fue posible enviar el correo.");
    }

    return result;
  } catch (error: any) {
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw new Error("No hay conexión con el servidor. Verifica tu internet o el estado del dev server.");
    }
    throw error;
  }
}
