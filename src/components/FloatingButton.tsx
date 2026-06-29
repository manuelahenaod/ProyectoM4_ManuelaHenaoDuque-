import "../styles/FloatingButton.css";

type FloatingButtonProps = {
  onClick?: () => void;
};

export default function FloatingButton({
  onClick,
}: FloatingButtonProps) {
  return (
    <button
      className="floating-button"
      onClick={onClick}
      aria-label="Agregar nueva tarea"
    >
      +
    </button>
  );
}