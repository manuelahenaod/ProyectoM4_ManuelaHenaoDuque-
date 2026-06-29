import Header from "../components/Header";
import StatCard from "../components/StatCard";
import TaskList from "../components/TaskList";
import FloatingButton from "../components/FloatingButton";
import TaskCalendar from "../components/Calendar";


import "../styles/Task.css";

export default function Task() {
  return (
    <main className="dashboard">

      <Header />

      <section className="stats-container">
        <StatCard
          title="Pendientes"
          value={5}
          icon="📌"
        />

        <StatCard
          title="Completadas"
          value={12}
          icon="✅"
        />

        <StatCard
          title="Vencen hoy"
          value={2}
          icon="📅"
        />
      </section>

      <section className="dashboard-content">
        <TaskList />
        <TaskCalendar />
      </section>
      <FloatingButton />
    </main>
  );
}