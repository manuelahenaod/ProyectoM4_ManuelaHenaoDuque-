import { useEffect, useState } from "react";
import type { Task, NewTask } from "../types/task";
import { getTodayLocal, parseLocalDate } from "../utils/date";
import { capitalizeFirstLetter } from "../utils/text";
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
  const [priority, setPriority] = useState<"baja" | "media" | "alta">("media");
  
  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description);
      setDueDate(initialTask.dueDate.toISOString().split("T")[0]);
      setPriority(initialTask.priority || "media");
    } else {
      setTitle("");
      setDescription("");
      setDueDate(getTodayLocal());
      setPriority("media");
    }
  }, [initialTask]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    onSubmit({
      title: capitalizeFirstLetter(title),
      description: description.trim(),
      completed: initialTask?.completed ?? false,
      dueDate: parseLocalDate(dueDate),
      createdAt: initialTask?.createdAt ?? new Date(),
      userId: initialTask?.userId ?? "",
      priority,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2>
        {initialTask ? "Editar tarea" : "Nueva tarea"}
      </h2>

      <div className="form-group">
        <label htmlFor="title">Título</label>

        <input
          id="title"
          type="text"
          value={title}
          maxLength={40}
          onChange={(e) => setTitle(e.target.value)}
          required
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Descripción</label>

        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="dueDate">Fecha límite</label>

        <input
          id="dueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label>Prioridad</label>
        <div className="priority-selector">
          {(["baja", "media", "alta"] as const).map((p) => (
            <button
              key={p}
              type="button"
              className={`priority-btn ${p} ${priority === p ? "active" : ""}`}
              onClick={() => setPriority(p)}
              disabled={loading}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
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