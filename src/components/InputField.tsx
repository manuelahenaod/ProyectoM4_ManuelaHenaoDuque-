type Props = {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  autoComplete?: string;
  errorMessage?: string;
};

export default function InputField({ id, label, type, value, onChange, onBlur, placeholder, autoComplete, errorMessage }: Props) {
  return (
    <div className={`auth-field ${errorMessage ? "has-error" : ""}`}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required
      />
      {errorMessage && (
        <span className="input-error-message">
          {errorMessage}
        </span>
      )}
    </div>
  );
}