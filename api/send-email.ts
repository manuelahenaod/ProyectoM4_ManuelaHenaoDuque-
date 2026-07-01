import { sendEmail, buildEmailTemplate } from "../functions/email";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Método no permitido" });
  }

  try {
    const { name, email, tasks } = req.body;

    if (!email || !name || !tasks) {
      return res.status(400).json({ success: false, message: "Faltan parámetros requeridos" });
    }

    const htmlContent = buildEmailTemplate({ name, tasks });
    
    await sendEmail({
      to: email,
      subject: `Resumen de Tareas de ${name} 🚀`,
      html: htmlContent,
    });

    return res.status(200).json({ success: true, message: "Resumen enviado con éxito" });
  } catch (error: any) {
    console.error("Error al enviar email:", error);
    
    let userMessage = error.message || "Error interno del servidor";
    
    if (error.name === "MessageRejected" || userMessage.includes("not verified")) {
      userMessage = "El correo de origen o de destino no está verificado en AWS SES. Verifica tu configuración.";
    } else if (error.name === "InvalidParameterValue") {
      userMessage = "Uno de los parámetros de envío de correo no es válido o está mal estructurado.";
    } else if (error.name === "AccessDenied" || error.name === "InvalidSignatureException") {
      userMessage = "Credenciales incorrectas de AWS. No tienes permisos para enviar correos.";
    }

    return res.status(500).json({
      success: false,
      message: userMessage,
    });
  }
}
