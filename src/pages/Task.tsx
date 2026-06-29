import { useState } from "react";

import Header from "../components/Header";
import StatCard from "../components/StatCard";
import TaskList from "../components/TaskList";
import FloatingButton from "../components/FloatingButton";
import TaskCalendar from "../components/Calendar";
import TaskModal from "../components/TaskModal";
import TaskForm from "../components/TaskForm";

import { useAuth } from "../hooks/useAuth";
import { useTasks } from "../hooks/useTasks";

import type { Task, NewTask } from "../types/task";

import { isSameDay } from "../utils/date";

import {LuPin,LuCircleCheckBig, LuCalendarDays} from "react-icons/lu";

import "../styles/Task.css";

export default function Task() {
  const { user } = useAuth();

  const {
    tasks,
    loading,
    createNewTask,
    updateTask,
  } = useTasks();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const dueTodayTasks = tasks.filter((task) =>
    isSameDay(task.dueDate, new Date())
  ).length;

  async function handleToggleTask(
    id: string,
    completed: boolean
  ) {
    await updateTask(id, {
      completed: !completed,
    });
  }

  // Abrir modal para crear
  function handleCreate() {
    setSelectedTask(null);
    setIsModalOpen(true);
  }

  // Abrir modal para editar
  function handleEdit(task: Task) {
    setSelectedTask(task);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setSelectedTask(null);
  }

  async function handleSubmit(task: NewTask) {
    try {
      if (selectedTask) {
        await updateTask(selectedTask.id, task);
      } else {
        await createNewTask({
          ...task,
          userId: user!.uid,
          createdAt: new Date(),
          completed: false,
        });
      }

      handleCloseModal();

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
          value={tasks.filter(task => !task.completed).length}
          icon={<LuPin />}
        />

        <StatCard
          title="Completadas"
          value={tasks.filter(task => task.completed).length}
          icon={<LuCircleCheckBig />}
        />

        <StatCard
          title="Vencen hoy"
          value={dueTodayTasks}
          icon={<LuCalendarDays />}
        />

      </section>

      <section className="dashboard-content">

        {loading ? (
          <p>Cargando tareas...</p>
        ) : (
          <TaskList
            tasks={tasks}
            onToggle={handleToggleTask}
            onEdit={handleEdit}
          />
        )}

        <TaskCalendar />

      </section>

      <FloatingButton onClick={handleCreate} />

      <TaskModal
        open={isModalOpen}
        onClose={handleCloseModal}
      >
        <TaskForm
          initialTask={selectedTask ?? undefined}
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
        />
      </TaskModal>

    </main>
  );
}