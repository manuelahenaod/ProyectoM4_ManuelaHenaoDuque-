import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskForm from "../src/components/TaskForm";
import type { Task } from "../src/types/task";

describe("TaskForm Component", () => {
  const mockOnSubmit = vi.fn();
  const mockOnCancel = vi.fn();

  it("debería renderizar todos los campos del formulario con valores iniciales por defecto", () => {
    render(<TaskForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    expect(screen.getByText("Nueva tarea")).toBeInTheDocument();
    expect(screen.getByLabelText("Título")).toBeInTheDocument();
    expect(screen.getByLabelText("Descripción")).toBeInTheDocument();
    expect(screen.getByLabelText("Fecha límite")).toBeInTheDocument();
    expect(screen.getByText("Prioridad")).toBeInTheDocument();

    // Comprobar la prioridad por defecto
    const mediaBtn = screen.getByRole("button", { name: "Media" });
    expect(mediaBtn).toHaveClass("active");
  });

  it("debería rellenar los campos cuando se pasa initialTask para edición", () => {
    const initialTask: Task = {
      id: "1",
      title: "Tarea Existente",
      description: "Descripción de prueba",
      completed: false,
      dueDate: new Date(2026, 5, 30),
      createdAt: new Date(),
      userId: "user-123",
      priority: "alta",
    };

    render(
      <TaskForm
        initialTask={initialTask}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    expect(screen.getByText("Editar tarea")).toBeInTheDocument();
    expect(screen.getByLabelText("Título")).toHaveValue("Tarea Existente");
    expect(screen.getByLabelText("Descripción")).toHaveValue("Descripción de prueba");
    expect(screen.getByRole("button", { name: "Alta" })).toHaveClass("active");
  });

  it("debería llamar a onSubmit con los datos correctos al enviar el formulario", () => {
    render(<TaskForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    const titleInput = screen.getByLabelText("Título");
    const descInput = screen.getByLabelText("Descripción");

    fireEvent.change(titleInput, { target: { value: "Nueva Tarea de Prueba" } });
    fireEvent.change(descInput, { target: { value: "Explicación" } });
    
    // Seleccionar prioridad baja
    const bajaBtn = screen.getByRole("button", { name: "Baja" });
    fireEvent.click(bajaBtn);

    const submitBtn = screen.getByRole("button", { name: "Crear tarea" });
    fireEvent.click(submitBtn);

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Nueva Tarea de Prueba",
        description: "Explicación",
        priority: "baja",
        completed: false,
      })
    );
  });

  it("debería deshabilitar controles y mostrar estado cargando cuando loading es true", () => {
    render(<TaskForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} loading={true} />);

    expect(screen.getByLabelText("Título")).toBeDisabled();
    expect(screen.getByLabelText("Descripción")).toBeDisabled();
    expect(screen.getByLabelText("Fecha límite")).toBeDisabled();
    expect(screen.getByRole("button", { name: "Baja" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Guardando..." })).toBeDisabled();
  });
});
