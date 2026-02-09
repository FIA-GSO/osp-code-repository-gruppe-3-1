export default function Card({ title, children, className = '' }) {
    return (
        <div className={`rounded-lg bg-card p-[18px] shadow-[0_6px_20px_rgba(0,0,0,0.06)] ${className}`}>
            <h3 className="mb-3 text-text">{title}</h3>
            {children}
        </div>
    );
}
