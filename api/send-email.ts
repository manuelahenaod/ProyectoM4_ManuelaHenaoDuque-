import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const sesClient = new SESClient({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

type Task = {
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  completed: boolean;
};

function buildEmailTemplate({
  name,
  tasks,
}: {
  name: string;
  tasks: Task[];
}) {
  const completed = tasks.filter(t => t.completed).length;
  const pending = tasks.length - completed;

  const taskCards = tasks
    .map(task => {
      const priorityColor = {
        baja: "#22c55e",
        media: "#f59e0b",
        alta: "#ef4444",
      }[task.priority] ?? "#f59e0b";

      return `
      <div style="
        background:#ffffff;
        border:1px solid #e5e5e5;
        border-radius:12px;
        padding:18px;
        margin-bottom:16px;
        box-shadow:0 4px 10px rgba(0,0,0,.05);
      ">

        <div style="
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-bottom:12px;
        ">

          <h3 style="
            margin:0;
            color:#333333;
            font-size:18px;
          ">
            ${task.title}
          </h3>

          <span style="
            background:${priorityColor};
            color:white;
            padding:5px 12px;
            border-radius:20px;
            font-size:12px;
            font-weight:bold;
            text-transform:capitalize;
          ">
            ${task.priority}
          </span>

        </div>

        <p style="
          color:#666666;
          margin:0 0 18px;
          line-height:1.5;
        ">
          ${task.description || "Sin descripción"}
        </p>

        <div style="
          display:flex;
          justify-content:space-between;
          font-size:14px;
          color:#666666;
        ">

          <span>📅 ${task.dueDate}</span>

          <span style="
            font-weight:bold;
            color:${task.completed ? "#2e7d32" : "#d48806"};
          ">
            ${task.completed ? "✅ Completada" : "⏳ Pendiente"}
          </span>

        </div>

      </div>
      `;
    })
    .join("");

  return `
  <body style="
    margin:0;
    padding:40px 20px;
    background:#f6f5f7;
    font-family:Arial,Helvetica,sans-serif;
  ">

    <div style="
      max-width:700px;
      margin:auto;
      background:#ffffff;
      border-radius:16px;
      overflow:hidden;
      box-shadow:0 14px 28px rgba(0,0,0,.12);
    ">

      <div style="
        background:linear-gradient(135deg,#FF4B2B,#FF416C);
        padding:35px;
        color:white;
        text-align:center;
      ">

        <h1 style="margin:0;font-size:30px;">
          MateCode
        </h1>

        <p style="
          margin-top:10px;
          font-size:18px;
          opacity:.95;
        ">
          Resumen de tareas 🚀
        </p>

      </div>

      <div style="padding:30px;">

        <h2 style="color:#333333;">
          Hola ${name} 👋
        </h2>

        <p style="
          color:#666666;
          margin-bottom:30px;
        ">
          Aquí tienes el resumen actualizado de tus tareas.
        </p>

        ${taskCards}

        <div style="
          background:#f6f5f7;
          border-radius:12px;
          padding:20px;
          margin-top:30px;
        ">

          <h3 style="
            margin-top:0;
            color:#333333;
          ">
            Resumen
          </h3>

          <p style="margin:6px 0;">
            📋 Total de tareas: <strong>${tasks.length}</strong>
          </p>

          <p style="margin:6px 0;color:#2e7d32;">
            ✅ Completadas: <strong>${completed}</strong>
          </p>

          <p style="margin:6px 0;color:#d48806;">
            ⏳ Pendientes: <strong>${pending}</strong>
          </p>

        </div>

      </div>

      <div style="
        padding:20px;
        text-align:center;
        color:#666666;
        font-size:13px;
        border-top:1px solid #e5e5e5;
      ">
        Generado automáticamente por <strong>MateCode</strong> 
      </div>

    </div>

  </body>
  `;
}

async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  const command = new SendEmailCommand({
    Source: process.env.SES_FROM_EMAIL!,
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Subject: {
        Data: subject,
      },
      Body: {
        Html: {
          Data: html,
        },
      },
    },
  });

  return sesClient.send(command);
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Método no permitido" });
  }

  try {
    const { name, email, tasks } = req.body;

    if (!name || !email || !tasks) {
      return res.status(400).json({
        success: false,
        message: "Faltan parámetros requeridos",
      });
    }

    const html = buildEmailTemplate({
      name,
      tasks,
    });

    await sendEmail({
      to: email,
      subject: `Resumen de tareas de ${name} 🚀`,
      html,
    });

    return res.status(200).json({
      success: true,
      message: "Correo enviado correctamente",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "No se pudo enviar el correo",
    });
  }
}