import "../styles/TaskCard.css";

type TaskCardProps = {
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
};

export default function TaskCard({
  title,
  description,
  dueDate,
  completed,
}: TaskCardProps) {
  return (
    <article className="task-card">
      <div className="task-header">
        <h3>{title}</h3>

        <span className={`status ${completed ? "completed" : "pending"}`}>
          {completed ? "Completada" : "Pendiente"}
        </span>
      </div>

      <p className="task-description">{description}</p>

      <div className="task-footer">
        <span className="task-date">📅 {dueDate}</span>

        <div className="task-actions">
          <button title="Editar">✏️</button>
          <button title="Eliminar">🗑️</button>
        </div>
      </div>
    </article>
  );
}