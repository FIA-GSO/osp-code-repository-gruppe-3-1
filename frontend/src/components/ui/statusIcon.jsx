export default function StatusIcon({ type }) {
  const config = {
    // --- ICON ONLY ---
    accepted: { showIcon: true, showText: false, icon: "✓", text: "Angenommen", color: "#15803d" },
    rejected: { showIcon: true, showText: false, icon: "✕", text: "Abgelehnt", color: "#b91c1c" },
    pending:  { showIcon: true, showText: false, icon: "⌛︎", text: "Wartend", color: "#b45309" },
    closed:   { showIcon: true, showText: false, icon: "🔒︎", text: "Geschlossen", color: "#b91c1c" },
 
    // --- TEXT ONLY ---
    acceptedText: { showIcon: false, showText: true, icon: "✓", text: "Angenommen", color: "#15803d" },
    openText: { showIcon: false, showText: true, icon: "✓", text: "Offen", color: "#15803d" },
    rejectedText: { showIcon: false, showText: true, icon: "✕", text: "Abgelehnt", color: "#b91c1c" },
    pendingText:  { showIcon: false, showText: true, icon: "⌛︎", text: "Wartend", color: "#b45309" },
    closedText:   { showIcon: false, showText: true, icon: "🔒︎", text: "Geschlossen", color: "#b91c1c" },
 
    // --- ICON + TEXT ---
    acceptedFull: { showIcon: true, showText: true, icon: "✓", text: "Angenommen", color: "#15803d" },
    openFull: { showIcon: true, showText: true, icon: "🔓︎", text: "Offen", color: "#15803d" },
    rejectedFull: { showIcon: true, showText: true, icon: "✕", text: "Abgelehnt", color: "#b91c1c" },
    pendingFull:  { showIcon: true, showText: true, icon: "⌛︎", text: "Wartend", color: "#b45309" },
    closedFull:   { showIcon: true, showText: true, icon: "🔒︎", text: "Geschlossen", color: "#b91c1c" }
  };
 
  const current = config[type];
  if (!current) return null;
 
  return (
<span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
      {current.showIcon && (
<span
          style={{
            color: "#000000",
            fontWeight: "bold",
            fontFamily: "Arial, Helvetica, sans-serif",
            width: "18px",
            textAlign: "center"
          }}
>
          {current.icon}
</span>
      )}
 
      {current.showText && (
<span
          style={{
            color: current.color,
            fontWeight: 600,
            fontSize: "14px"
          }}
>
          {current.text}
</span>
      )}
</span>
  );
}