"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useState, useTransition } from "react";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import {
  ALL_ROLES,
  ALL_SENIORITIES,
  ALL_AVAILABILITIES,
  ALL_STACKS,
} from "@/lib/mock-actions";

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ borderBottom: "1px solid var(--border-base)", paddingBottom: 16 }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          padding: "12px 0 8px",
          color: "var(--text-primary)",
          fontWeight: 600,
          fontSize: 13,
        }}
      >
        {label}
        <ChevronDown
          size={14}
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform var(--transition-fast)",
            color: "var(--text-muted)",
          }}
        />
      </button>
      {open && children}
    </div>
  );
}

interface FilterSidebarProps {
  onClose?: () => void;
}

export function FilterSidebar({ onClose }: FilterSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const get = (key: string) => searchParams.get(key) ?? "";

  const setFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete("page");
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`);
      });
    },
    [router, pathname, searchParams]
  );

  const toggleFilter = useCallback(
    (key: string, value: string) => {
      const current = get(key);
      setFilter(key, current === value ? "" : value);
    },
    [get, setFilter]
  );

  const clearAll = () => {
    startTransition(() => {
      router.push(pathname);
    });
  };

  const hasFilters = [...searchParams.keys()].some((k) => k !== "page");

  const chipStyle = (active: boolean): React.CSSProperties => ({
    padding: "4px 10px",
    borderRadius: "var(--radius-full)",
    fontSize: 12,
    fontWeight: 500,
    border: `1px solid ${active ? "var(--brand-primary)" : "var(--border-base)"}`,
    background: active ? "var(--brand-glow)" : "transparent",
    color: active ? "var(--brand-primary)" : "var(--text-secondary)",
    cursor: "pointer",
    transition: "all var(--transition-fast)",
    whiteSpace: "nowrap" as const,
  });

  return (
    <aside
      style={{
        width: 240,
        flexShrink: 0,
        background: "var(--bg-surface)",
        border: "1px solid var(--border-base)",
        borderRadius: "var(--radius-lg)",
        padding: "0 16px 16px",
        height: "fit-content",
        position: "sticky",
        top: 80,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 0 12px",
          borderBottom: "1px solid var(--border-base)",
          marginBottom: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <SlidersHorizontal size={15} style={{ color: "var(--brand-primary)" }} />
          <span style={{ fontWeight: 700, fontSize: 14, color: "var(--text-primary)" }}>
            Filters
          </span>
        </div>
        {hasFilters && (
          <button
            onClick={clearAll}
            style={{
              fontSize: 12,
              color: "var(--brand-primary)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 3,
              fontWeight: 500,
            }}
          >
            <X size={12} /> Clear
          </button>
        )}
      </div>

      {/* Stack search */}
      <FilterGroup label="Technology">
        <input
          className="input"
          placeholder="Search tech... (e.g. React)"
          value={get("stack")}
          onChange={(e) => setFilter("stack", e.target.value)}
          style={{ fontSize: 13, padding: "8px 12px", marginBottom: 8 }}
        />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {["TypeScript", "Go", "Rust", "Python", "React"].map((t) => (
            <button
              key={t}
              onClick={() => toggleFilter("stack", t)}
              style={chipStyle(get("stack") === t)}
            >
              {t}
            </button>
          ))}
        </div>
      </FilterGroup>

      {/* Seniority */}
      <FilterGroup label="Seniority">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {ALL_SENIORITIES.map((s) => (
            <button
              key={s}
              onClick={() => toggleFilter("seniority", s)}
              style={chipStyle(get("seniority") === s)}
            >
              {s}
            </button>
          ))}
        </div>
      </FilterGroup>

      {/* Role */}
      <FilterGroup label="Role">
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          {ALL_ROLES.map((r) => (
            <button
              key={r}
              onClick={() => toggleFilter("role", r)}
              style={{
                ...chipStyle(get("role") === r),
                textAlign: "left",
                borderRadius: "var(--radius-md)",
                whiteSpace: "normal",
                fontSize: 12,
              }}
            >
              {r}
            </button>
          ))}
        </div>
      </FilterGroup>

      {/* Availability */}
      <FilterGroup label="Availability">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {ALL_AVAILABILITIES.map((a) => (
            <button
              key={a}
              onClick={() => toggleFilter("availability", a)}
              style={chipStyle(get("availability") === a)}
            >
              {a.charAt(0).toUpperCase() + a.slice(1)}
            </button>
          ))}
        </div>
      </FilterGroup>

      {/* Remote */}
      <FilterGroup label="Work Mode">
        <button
          onClick={() => toggleFilter("remote", "true")}
          style={chipStyle(get("remote") === "true")}
        >
          Remote OK
        </button>
      </FilterGroup>
    </aside>
  );
}
