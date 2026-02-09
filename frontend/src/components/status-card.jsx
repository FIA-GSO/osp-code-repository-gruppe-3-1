export default function StatusCard({ label, count, type }) {
  return (
    <div className={`status-card ${type}`}>
      <div className="icons">
        {type === "success" && "✔"}
        {type === "warning" && "⏳"}
        {type === "danger" && "✖"}
      </div>
      <div>
        <strong>{count}</strong>
        <p>{label}</p>
      </div>
    </div>
  );
}