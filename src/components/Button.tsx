type Props = {
  children: React.ReactNode;
  type?: 'submit' | 'button';
  className?: string;
  onClick?: () => void;
};

export default function Button({ children, type = 'button', className = '', onClick }: Props) {
  return (
    <button type={type} className={className} onClick={onClick}>
      {children}
    </button>
  );
}
