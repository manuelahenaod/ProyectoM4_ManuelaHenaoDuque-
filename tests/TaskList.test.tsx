import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskList from "../src/components/TaskList";
import type { Task } from "../src/types/task";

describe("TaskList Component", () => {
  const mockOnToggle = vi.fn();
  const mockOnEdit = vi.fn();
  const mockOnDelete = vi.fn();

  const createDummyTasks = (count: number): Task[] => {
    return Array.from({ length: count }, (_, i) => ({
      id: `task-${i + 1}`,
      title: `Tarea Número ${i + 1}`,
      description: `Descripción ${i + 1}`,
      completed: false,
      dueDate: new Date(2026, 5, 30),
      createdAt: new Date(),
      userId: "user-1",
      priority: "media",
    }));
  };

  it("debería mostrar mensaje de lista vacía cuando no hay tareas", () => {
    render(
      <TaskList
        tasks={[]}
        onToggle={mockOnToggle}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("No tienes tareas aún.")).toBeInTheDocument();
  });

  it("debería renderizar la primera página de tareas (máximo 4)", () => {
    const tasks = createDummyTasks(6);
    render(
      <TaskList
        tasks={tasks}
        onToggle={mockOnToggle}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    // Deben aparecer las primeras 4 tareas
    expect(screen.getByText("Tarea Número 1")).toBeInTheDocument();
    expect(screen.getByText("Tarea Número 2")).toBeInTheDocument();
    expect(screen.getByText("Tarea Número 3")).toBeInTheDocument();
    expect(screen.getByText("Tarea Número 4")).toBeInTheDocument();

    // No deben aparecer las de la página 2
    expect(screen.queryByText("Tarea Número 5")).not.toBeInTheDocument();
    expect(screen.queryByText("Tarea Número 6")).not.toBeInTheDocument();
  });

  it("debería navegar a la página siguiente y deshabilitar los botones de paginación de forma correspondiente", () => {
    const tasks = createDummyTasks(6);
    render(
      <TaskList
        tasks={tasks}
        onToggle={mockOnToggle}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    const prevBtn = screen.getByTitle("Página anterior");
    const nextBtn = screen.getByTitle("Página siguiente");

    expect(prevBtn).toBeDisabled();
    expect(nextBtn).toBeEnabled();
    expect(screen.getByText("Página 1 de 2")).toBeInTheDocument();

    // Avanzar a página 2
    fireEvent.click(nextBtn);

    expect(prevBtn).toBeEnabled();
    expect(nextBtn).toBeDisabled();
    expect(screen.getByText("Página 2 de 2")).toBeInTheDocument();

    // Deben aparecer las tareas de la página 2
    expect(screen.queryByText("Tarea Número 1")).not.toBeInTheDocument();
    expect(screen.getByText("Tarea Número 5")).toBeInTheDocument();
    expect(screen.getByText("Tarea Número 6")).toBeInTheDocument();
  });
});
