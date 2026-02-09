export default function StatusCard({ label, count, type }) {
    const iconBgColors = {
        success: 'bg-success',
        warning: 'bg-warning',
        danger: 'bg-danger',
    };

    return (
        <div className="flex gap-3.5 rounded-lg bg-card p-4 shadow-[0_6px_20px_rgba(0,0,0,0.06)]">
            <div
                className={`flex h-9 w-9 items-center justify-center rounded-full text-white ${iconBgColors[type] || ''}`}
            >
                {type === 'success' && '✔'}
                {type === 'warning' && '⏳'}
                {type === 'danger' && '✖'}
            </div>
            <div>
                <strong className="text-text">{count}</strong>
                <p className="text-muted">{label}</p>
            </div>
        </div>
    );
}
