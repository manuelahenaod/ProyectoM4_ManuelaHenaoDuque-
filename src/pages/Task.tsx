import Header from "../components/Header";
import StatCard from "../components/StatCard";
import TaskList from "../components/TaskList";
import FloatingButton from "../components/FloatingButton";
import TaskCalendar from "../components/Calendar";
import { useAuth } from "../hooks/useAuth";
import "../styles/Task.css";
import { useTasks } from "../hooks/useTasks";

export default function Task() {

  const { user } = useAuth();
  const { tasks, loading, createNewTask } = useTasks();

  const dueTodayTasks = tasks.filter((task) => {
  const dueDate = task.dueDate;
  const today = new Date();
    return (
      dueDate.getDate() === today.getDate() &&
      dueDate.getMonth() === today.getMonth() &&
      dueDate.getFullYear() === today.getFullYear()
    );
  }).length;

  async function handleCreateTask() {
    if (!user) return;

    try {
      await createNewTask({
        title: "hola, soy un ejemplo",
        description: "hola, soy una descripcion de ejemplo",
        completed: false,
        dueDate: new Date(),
        createdAt: new Date(),
        userId: user.uid,
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="dashboard">

      <Header />

      <section className="stats-container">
        <StatCard
          title="Pendientes"
          value={tasks.filter((task) => !task.completed).length}
          icon="📌"
        />

        <StatCard
          title="Completadas"
          value={tasks.filter((task) => task.completed).length}
          icon="✅"
        />

        <StatCard
          title="Vencen hoy"
          value={dueTodayTasks}
          icon="📅"
        />
      </section>

      <section className="dashboard-content">
        {loading ? (
          <p>Cargando tareas...</p>
        ) : (
          <TaskList tasks={tasks} />
        )}

        <TaskCalendar />
      </section>
      <FloatingButton onClick={handleCreateTask} />
    </main>
  );
}