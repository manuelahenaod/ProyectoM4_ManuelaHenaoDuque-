export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: Date;
  createdAt: Date;
  userId: string;
  priority: "baja" | "media" | "alta";
}

export type NewTask = Omit<Task, "id">;