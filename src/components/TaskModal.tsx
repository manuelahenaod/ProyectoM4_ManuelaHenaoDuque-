import type { ReactNode } from "react";
import "../styles/TaskModal.css";

type TaskModalProps = {
  open: boolean;
  children: ReactNode;
  onClose: () => void;
};

export default function TaskModal({
  open,
  children,
  onClose,
}: TaskModalProps) {
  if (!open) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}