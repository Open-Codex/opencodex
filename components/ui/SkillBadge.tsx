import { Skill } from "@/lib/types";

const CATEGORY_COLORS: Record<Skill["category"], { bg: string; text: string }> = {
  language:  { bg: "rgba(99,102,241,0.12)",  text: "#818cf8" },
  framework: { bg: "rgba(139,92,246,0.12)",  text: "#a78bfa" },
  tool:      { bg: "rgba(6,182,212,0.12)",   text: "#22d3ee" },
  database:  { bg: "rgba(16,185,129,0.12)",  text: "#34d399" },
  cloud:     { bg: "rgba(245,158,11,0.12)",  text: "#fbbf24" },
};

interface SkillBadgeProps {
  skill: Skill;
  size?: "sm" | "md";
}

export function SkillBadge({ skill, size = "md" }: SkillBadgeProps) {
  const colors = CATEGORY_COLORS[skill.category];
  return (
    <span
      className="badge"
      style={{
        background: colors.bg,
        color: colors.text,
        fontSize: size === "sm" ? "11px" : "12px",
        padding: size === "sm" ? "2px 8px" : "3px 10px",
        border: `1px solid ${colors.text}22`,
      }}
    >
      {skill.name}
    </span>
  );
}

// Simple string badge (for tags, filters, etc.)
interface TagBadgeProps {
  label: string;
  variant?: "default" | "primary" | "success" | "warning" | "danger";
}

const TAG_VARIANTS = {
  default: { bg: "var(--bg-elevated)", text: "var(--text-secondary)", border: "var(--border-base)" },
  primary: { bg: "rgba(99,102,241,0.12)", text: "#818cf8", border: "rgba(99,102,241,0.2)" },
  success: { bg: "rgba(34,197,94,0.12)", text: "#22c55e", border: "rgba(34,197,94,0.2)" },
  warning: { bg: "rgba(245,158,11,0.12)", text: "#f59e0b", border: "rgba(245,158,11,0.2)" },
  danger:  { bg: "rgba(239,68,68,0.12)",  text: "#ef4444", border: "rgba(239,68,68,0.2)" },
};

export function TagBadge({ label, variant = "default" }: TagBadgeProps) {
  const v = TAG_VARIANTS[variant];
  return (
    <span
      className="badge"
      style={{ background: v.bg, color: v.text, border: `1px solid ${v.border}` }}
    >
      {label}
    </span>
  );
}
