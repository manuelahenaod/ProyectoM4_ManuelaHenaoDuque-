import "../styles/Toast.css";

export type ToastType = "success" | "error";

type ToastProps = {
  message: string;
  type: ToastType;
  visible: boolean;
};

export default function Toast({ message, type, visible }: ToastProps) {
  if (!visible) return null;

  return (
    <div className={`toast-container toast-${type}`}>
      <span className="toast-icon">
        {type === "success" ? "✔️" : "⚠️"}
      </span>
      <p className="toast-message">{message}</p>
    </div>
  );
}
