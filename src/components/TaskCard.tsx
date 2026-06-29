import type { Task } from "../types/task";
import "../styles/TaskCard.css";

type TaskCardProps = {
  task: Task;
  onToggle: (id: string, completed: boolean) => void;
  onEdit: (task: Task) => void;
};

export default function TaskCard({
  task,
  onToggle,
  onEdit,
}: TaskCardProps) {
  return (
    <article className="task-card">

      <div className="task-header">

        <div className="task-title">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() =>
              onToggle(task.id, task.completed)
            }
          />

          <h3>{task.title}</h3>
        </div>

        <span className={`status ${task.completed ? "completed" : "pending"}`}>
          {task.completed ? "Completada" : "Pendiente"}
        </span>

      </div>

      <p className="task-description">
        {task.description}
      </p>

      <div className="task-footer">
        <span>
          📅 {task.dueDate.toLocaleDateString()}
        </span>

        <div className="task-actions">
          <button
            title="Editar"
            onClick={() => onEdit(task)}
          >
            ✏️
          </button>
          <button>🗑️</button>
        </div>
      </div>

    </article>
  );
}