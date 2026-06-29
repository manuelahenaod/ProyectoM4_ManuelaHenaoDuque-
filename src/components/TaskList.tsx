import type { Task } from "../types/task";
import TaskCard from "./TaskCard";

type TaskListProps = {
  tasks: Task[];
};

export default function TaskList({ tasks }: TaskListProps) {
  return (
    <section className="task-list">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          title={task.title}
          description={task.description}
          dueDate={task.dueDate.toLocaleDateString()}
          completed={task.completed}
        />
      ))}
    </section>
  );
}