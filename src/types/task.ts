export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: Date;
  createdAt: Date;
  userId: string;
}

export type NewTask = Omit<Task, "id">;