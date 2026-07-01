import type { Task } from "../types/task";
import TaskCard from "./TaskCard";
import "../styles/TaskList.css";
import { useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

type TaskListProps = {
  tasks: Task[];
  onToggle: (id: string, completed: boolean) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
};

export default function TaskList({
  tasks,
  onToggle,
  onEdit,
  onDelete,
}: TaskListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const TASKS_PER_PAGE = 4;
  const totalPages = Math.ceil(tasks.length / TASKS_PER_PAGE);
  const startIndex = (currentPage - 1) * TASKS_PER_PAGE;
  const endIndex = startIndex + TASKS_PER_PAGE;
  const currentTasks = tasks.slice(startIndex, endIndex);


  return (
    <section className="task-list">

      {tasks.length === 0 ? (
        <p>No tienes tareas aún.</p>
      ) : (
        currentTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      )}

      {totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="page-btn"
            title="Página anterior"
          >
            <LuChevronLeft />
          </button>

          <span className="pagination-info">
            Página {currentPage} de {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="page-btn"
            title="Página siguiente"
          >
            <LuChevronRight />
          </button>
        </div>
      )}
    </section>
  );
}