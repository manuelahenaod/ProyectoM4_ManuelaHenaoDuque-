import type { Task } from "../../src/types/task";

type EmailTemplateProps = {
  name: string;
  tasks: Task[];
};

export function buildEmailTemplate({
  name,
  tasks,
}: EmailTemplateProps) {
  const pending = tasks.filter((t) => !t.completed).length;
  const completed = tasks.filter((t) => t.completed).length;

  const today = new Date();
  const isSameDay = (d1: Date, d2: Date) =>
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear();

  const dueToday = tasks.filter((t) => {
    const taskDate = typeof t.dueDate === "string" ? new Date(t.dueDate) : t.dueDate;
    return isSameDay(taskDate, today);
  }).length;

  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<style>
body {
  font-family: Arial, sans-serif;
  background: #f5f5f5;
  padding: 40px;
}
.container {
  background: white;
  max-width: 600px;
  margin: auto;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}
h1 {
  color: #ff5a7a;
}
ul {
  padding-left: 20px;
}
li {
  margin-bottom: 12px;
}
.footer {
  margin-top: 30px;
  font-size: 14px;
  color: #888;
}
</style>
</head>
<body>
<div class="container">
  <h1>MateCode 🚀</h1>
  <p>Hola <strong>${name}</strong>,</p>
  <p>Este es tu resumen de tareas.</p>
  <p>
    📌 Pendientes: <strong>${pending}</strong><br>
    ✅ Completadas: <strong>${completed}</strong><br>
    📅 Vencen hoy: <strong>${dueToday}</strong>
  </p>
  <h3>Tareas</h3>
  <ul>
    ${tasks
      .map(
        (task) => `
        <li>
          ${task.completed ? "✅" : "📌"}
          <strong>${task.title}</strong>
          ${task.description ? ` - ${task.description}` : ""}
          <span style="font-size: 0.85em; color: #666;">
            (${task.priority ? `Prioridad: ${task.priority}` : ""})
          </span>
        </li>
      `
      )
      .join("")}
  </ul>
  <div class="footer">
    ¡Que tengas un excelente día!
  </div>
</div>
</body>
</html>
`;
}
