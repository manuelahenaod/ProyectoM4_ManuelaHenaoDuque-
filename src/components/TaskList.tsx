import type { Task } from "../types/task";
import TaskCard from "./TaskCard";
import "../styles/TaskList.css";

type TaskListProps = {
  tasks: Task[];
  onToggle: (id: string, completed: boolean) => void;
  onEdit: (task: Task) => void;
};

export default function TaskList({
  tasks,
  onToggle,
  onEdit,
}: TaskListProps) {
  return (
    <section className="task-list">

      {tasks.length === 0 ? (
        <p>No tienes tareas aún.</p>
      ) : (
        tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggle={onToggle}
            onEdit={onEdit}
          />
        ))
      )}

    </section>
  );
}