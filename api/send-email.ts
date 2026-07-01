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
  const taskList = tasks
    .map(
      (task) => `
      <tr>
        <td style="padding:8px;border:1px solid #ddd;">${task.title}</td>
        <td style="padding:8px;border:1px solid #ddd;">${task.description}</td>
        <td style="padding:8px;border:1px solid #ddd;">${task.dueDate}</td>
        <td style="padding:8px;border:1px solid #ddd;">${task.priority}</td>
        <td style="padding:8px;border:1px solid #ddd;">
          ${task.completed ? "✅" : "⏳"}
        </td>
      </tr>
    `
    )
    .join("");

  return `
    <h2>Hola ${name} 👋</h2>

    <p>Este es el resumen de tus tareas.</p>

    <table style="border-collapse: collapse; width:100%;">
      <thead>
        <tr>
          <th>Título</th>
          <th>Descripción</th>
          <th>Fecha</th>
          <th>Prioridad</th>
          <th>Estado</th>
        </tr>
      </thead>

      <tbody>
        ${taskList}
      </tbody>
    </table>

    <br/>

    <p>Generado desde tu Todo App 🚀</p>
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