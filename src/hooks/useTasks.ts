import { useEffect, useState } from "react";

import type { NewTask, Task } from "../types/task";
import { createTask, getTasks } from "../features/tasks/taskService";
import { useAuth } from "./useAuth";

export function useTasks() {
  const { user } = useAuth();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    loadTasks();
  }, [user]);

  async function loadTasks() {
    try {
      setLoading(true);
      const data = await getTasks(user!.uid);
      setTasks(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("No fue posible obtener las tareas.");
    } finally {
      setLoading(false);
    }
  }

  async function createNewTask(task: NewTask) {
    await createTask(task);
    await loadTasks();
  }

  return {
    tasks,
    loading,
    error,
    loadTasks,
    createNewTask
  };
}