import type { Task } from "../types/task";
import "../styles/TaskCard.css";
import { LuCalendarDays } from "react-icons/lu";
import { LuPencil } from "react-icons/lu";
import { LuTrash2 } from "react-icons/lu";

type TaskCardProps = {
  task: Task;
  onToggle: (id: string, completed: boolean) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
};

export default function TaskCard({
  task,
  onToggle,
  onEdit,
  onDelete,
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

      <span className="task-date">
        <LuCalendarDays />
        {task.dueDate.toLocaleDateString()}
      </span>

      <div className="task-footer">
        <button
          title="Editar"
          onClick={() => onEdit(task)}
        >
        <LuPencil />
        </button>
        
        <button
          title="Eliminar"
          onClick={() => onDelete(task)}
        >
          <LuTrash2 />
        </button>

      </div>

    </article>
  );
}