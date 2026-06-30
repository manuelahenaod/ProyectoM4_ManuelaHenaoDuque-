import { useEffect, useState } from "react";
import type { Task, NewTask } from "../types/task";
import { parseLocalDate } from "../utils/date";
import "../styles/TaskForm.css";
import Button from "./Button";

type TaskFormProps = {
  initialTask?: Task;
  onSubmit: (task: NewTask) => void;
  onCancel: () => void;
  loading?: boolean;
};

export default function TaskForm({
  initialTask,
  onSubmit,
  onCancel,
  loading = false,
}: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description);
      setDueDate(initialTask.dueDate.toISOString().split("T")[0]);
    } else {
      setTitle("");
      setDescription("");
      setDueDate("");
    }
  }, [initialTask]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      completed: initialTask?.completed ?? false,
      dueDate: parseLocalDate(dueDate),
      createdAt: initialTask?.createdAt ?? new Date(),
      userId: initialTask?.userId ?? "",
    });
  }

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2>
        {initialTask ? "Editar tarea" : "Nueva tarea"}
      </h2>

      <div className="form-group">
        <label>Título</label>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label>Descripción</label>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label>Fecha límite</label>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          disabled={loading}
        />
      </div>

      <div className="task-form-buttons">
        <Button
          type="button"
          className="cancel-btn"
          onClick={onCancel}
          disabled={loading}
        >
          Cancelar
        </Button>

        <Button
          type="submit"
          className="save-btn"
          disabled={loading}
        >
          {loading
            ? "Guardando..."
            : initialTask
            ? "Guardar cambios"
            : "Crear tarea"}
        </Button>
      </div>
    </form>
  );
}