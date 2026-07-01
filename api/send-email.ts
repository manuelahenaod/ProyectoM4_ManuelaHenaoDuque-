import { sendEmail } from "../functions/email/sendEmail";
import { buildEmailTemplate } from "../functions/email/emailTemplate";

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
    

    return res.status(500).json({
      success: false,
      message: "No se pudo enviar resumen",
    });
  }
}
