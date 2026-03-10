import { Developer } from "@/lib/types";
import { DeveloperCard } from "@/components/ui/DeveloperCard";
import { Users } from "lucide-react";

interface DeveloperGridProps {
  developers: Developer[];
  total: number;
  page: number;
  totalPages: number;
}

export function DeveloperGrid({
  developers,
  total,
  page,
  totalPages,
}: DeveloperGridProps) {
  if (developers.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "80px 24px",
          color: "var(--text-muted)",
        }}
      >
        <Users
          size={48}
          style={{ margin: "0 auto 16px", opacity: 0.4, display: "block" }}
        />
        <h3
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "var(--text-secondary)",
            marginBottom: 8,
          }}
        >
          No developers found
        </h3>
        <p style={{ fontSize: 14 }}>
          Try adjusting your filters to see more results.
        </p>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      {/* Results count */}
      <p
        style={{
          fontSize: 13,
          color: "var(--text-muted)",
          marginBottom: 16,
          fontWeight: 500,
        }}
      >
        {total} developer{total !== 1 ? "s" : ""} found
      </p>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 16,
          marginBottom: 32,
        }}
      >
        {developers.map((dev) => (
          <DeveloperCard key={dev.id} developer={dev} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <PaginationLinks page={page} totalPages={totalPages} />
        </div>
      )}
    </div>
  );
}

function PaginationLinks({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) {
  // Renders simple anchor links (server-compatible)
  // The page value is synced via URL ?page=N
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <>
      {pages.map((p) => (
        <a
          key={p}
          href={`?page=${p}`}
          style={{
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "var(--radius-md)",
            fontSize: 14,
            fontWeight: 500,
            textDecoration: "none",
            background: p === page ? "var(--brand-primary)" : "var(--bg-elevated)",
            color: p === page ? "white" : "var(--text-secondary)",
            border: p === page ? "none" : "1px solid var(--border-base)",
            transition: "all var(--transition-fast)",
          }}
        >
          {p}
        </a>
      ))}
    </>
  );
}
