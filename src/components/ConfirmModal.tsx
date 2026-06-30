import TaskModal from "./TaskModal";
import "../styles/ConfirmModal.css";

type ConfirmModalProps = {
  open: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({
  open,
  title,
  message,
  confirmText = "Eliminar",
  cancelText = "Cancelar",
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <TaskModal
      open={open}
      onClose={onCancel}
    >
      <div className="confirm-modal">
        <h2>{title}</h2>

        <p>{message}</p>

        <div className="confirm-actions">
          <button
            className="cancel-btn"
            onClick={onCancel}
          >
            {cancelText}
          </button>

          <button
            className="delete-btn"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </TaskModal>
  );
}