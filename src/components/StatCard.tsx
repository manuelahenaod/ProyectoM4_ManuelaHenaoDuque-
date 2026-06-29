import "../styles/StatCard.css";
type StatCardProps = {
  title: string;
  value: number;
  icon: string;
};

export default function StatCard({
  title,
  value,
  icon,
}: StatCardProps) {
  return (
    <div className="stat-card">
      <span className="stat-icon">{icon}</span>

      <div className="stat-info">
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
    </div>
  );
}

