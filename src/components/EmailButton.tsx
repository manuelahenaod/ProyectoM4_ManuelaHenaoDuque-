import { LuMail, LuLoader } from "react-icons/lu";

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
      className={`email-button${disabled ? " sending" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {disabled ? <LuLoader className="spin" size={16} /> : <LuMail size={16} />}
      <span>{disabled ? "Enviando..." : "Enviar resumen"}</span>
    </button>
  );
}
