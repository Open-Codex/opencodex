export function SkeletonCard() {
  return (
    <div className="card p-5" style={{ pointerEvents: "none" }}>
      {/* Header */}
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 14 }}>
        {/* Avatar skeleton */}
        <div
          className="skeleton"
          style={{ width: 56, height: 56, borderRadius: "50%", flexShrink: 0 }}
        />
        <div style={{ flex: 1 }}>
          <div className="skeleton" style={{ width: 60, height: 10, marginBottom: 8 }} />
          <div className="skeleton" style={{ width: "70%", height: 14, marginBottom: 6 }} />
          <div className="skeleton" style={{ width: "50%", height: 11 }} />
        </div>
      </div>

      {/* Bio skeleton */}
      <div style={{ marginBottom: 14 }}>
        <div className="skeleton" style={{ width: "100%", height: 11, marginBottom: 6 }} />
        <div className="skeleton" style={{ width: "80%", height: 11 }} />
      </div>

      {/* Meta skeleton */}
      <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
        <div className="skeleton" style={{ width: 80, height: 10 }} />
        <div className="skeleton" style={{ width: 50, height: 10 }} />
        <div className="skeleton" style={{ width: 70, height: 10 }} />
      </div>

      {/* Badges skeleton */}
      <div style={{ display: "flex", gap: 6 }}>
        {[60, 80, 55, 70].map((w, i) => (
          <div key={i} className="skeleton" style={{ width: w, height: 22, borderRadius: 999 }} />
        ))}
      </div>
    </div>
  );
}
