import type { Task } from "../types/task";
import TaskList from "./TaskList";
import "../styles/TaskFilter.css";
import { LuClipboardList, LuPartyPopper, LuDumbbell, LuCircleCheck, LuLoader } from "react-icons/lu";

type StatusFilter = "all" | "pending" | "completed" | "overdue";

type TaskFilterProps = {
  filteredTasks: Task[];
  statusFilter: StatusFilter;
  loading: boolean;
  onStatusChange: (filter: StatusFilter) => void;
  onToggle: (id: string, completed: boolean) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
};

const FILTERS: { key: StatusFilter; label: string }[] = [
  { key: "all",       label: "Todas" },
  { key: "pending",   label: "Pendientes" },
  { key: "completed", label: "Completadas" },
  { key: "overdue",   label: "Vencidas" },
];

const EMPTY_MESSAGES: Record<StatusFilter, { icon: React.ReactNode; text: string }> = {
  all:       { icon: <LuClipboardList size={40} />, text: "Aún no tienes tareas. ¡Crea una!" },
  pending:   { icon: <LuPartyPopper size={40} />,  text: "No tienes tareas pendientes" },
  completed: { icon: <LuDumbbell size={40} />,     text: "Aún no has completado ninguna tarea" },
  overdue:   { icon: <LuCircleCheck size={40} />,  text: "No tienes tareas vencidas" },
};

export default function TaskFilter({
  filteredTasks,
  statusFilter,
  loading,
  onStatusChange,
  onToggle,
  onEdit,
  onDelete,
}: TaskFilterProps) {
  const empty = EMPTY_MESSAGES[statusFilter];

  return (
    <>
      <div className="status-filters">
        {FILTERS.map(({ key, label }) => (
          <button
            key={key}
            className={`status-filter-btn ${statusFilter === key ? "active" : ""}`}
            onClick={() => onStatusChange(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="tasks-loading">
          <LuLoader className="spin" size={24} />
          <span>Cargando tareas...</span>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="tasks-empty">
          <span className="tasks-empty-icon">{empty.icon}</span>
          <p>{empty.text}</p>
        </div>
      ) : (
        <TaskList
          tasks={filteredTasks}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
    </>
  );
}
