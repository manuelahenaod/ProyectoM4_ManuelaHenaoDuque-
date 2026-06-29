import TaskCard from "../components/TaskCard";

const tasks = [
  {
    id: 1,
    title: "Proyecto Henry",
    description: "Terminar el Dashboard",
    dueDate: "30 Jun",
    completed: false,
  },
  {
    id: 2,
    title: "Estudiar React",
    description: "Repasar React Router",
    dueDate: "01 Jul",
    completed: true,
  },
  {
    id: 3,
    title: "Meal Prep",
    description: "Preparar almuerzos de la semana",
    dueDate: "02 Jul",
    completed: false,
  },
];

export default function TaskList() {
  return (
    <section className="task-list">
      <h2>Mis tareas</h2>

      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          title={task.title}
          description={task.description}
          dueDate={task.dueDate}
          completed={task.completed}
        />
      ))}
    </section>
  );
}