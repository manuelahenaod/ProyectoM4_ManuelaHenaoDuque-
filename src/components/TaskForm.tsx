import { useEffect, useState } from "react";
import type { Task, NewTask } from "../types/task";
import "../styles/TaskForm.css"
import Button from "./Button";

type TaskFormProps = {
  initialTask?: Task;
  onSubmit: (task: NewTask) => void;
  onCancel: () => void;
};

export default function TaskForm({
  initialTask,
  onSubmit,
  onCancel,
}: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  // Si estoy editando, lleno el formulario
  useEffect(() => {
    if (!initialTask) return;

    setTitle(initialTask.title);
    setDescription(initialTask.description);
    setDueDate(
      initialTask.dueDate.toISOString().split("T")[0]
    );
  }, [initialTask]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    onSubmit({
      title,
      description,
      completed: initialTask?.completed ?? false,
      dueDate: new Date(dueDate),
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
        />
      </div>

      <div className="form-group">
        <label>Descripción</label>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Fecha límite</label>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <div className="task-form-buttons">

<Button
  type="button"
  className="cancel-btn"
  onClick={onCancel}
>
  Cancelar
</Button>

<Button
  type="submit"
  className="save-btn"
>
  {initialTask ? "Guardar cambios" : "Crear tarea"}
</Button>

      </div>

    </form>
  );
}