import "../styles/FloatingButton.css";
import { LuPlus } from "react-icons/lu";

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
      <LuPlus size={28} />
    </button>
  );
}