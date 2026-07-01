import { LuMail } from "react-icons/lu";

type EmailButtonProps = {
  onClick: () => void;
  disabled?: boolean;
};

export default function EmailButton({
  onClick,
  disabled = false,
}: EmailButtonProps) {
  return (
    <button
      className="email-button"
      onClick={onClick}
      disabled={disabled}
    >
      <LuMail />
      <span>Enviar resumen</span>
    </button>
  );
}
