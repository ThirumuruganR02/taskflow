export default function StatCard({ label, value, accent }) {
  return (
    <div className={`stat-card ${accent || ""}`}>
      <div className="stat-card-content">
        <span className="stat-label">{label}</span>
        <strong className="stat-value">{value}</strong>
      </div>

      <div className="stat-indicator" />
    </div>
  );
}