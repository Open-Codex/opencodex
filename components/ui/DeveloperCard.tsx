import Link from "next/link";
import { Developer } from "@/lib/types";
import { AvatarDisplay } from "./AvatarDisplay";
import { SkillBadge } from "./SkillBadge";
import { MapPin, Clock, Globe } from "lucide-react";

const AVAILABILITY_LABELS = {
  available:   { label: "Available", className: "available" },
  busy:        { label: "Busy",      className: "busy" },
  unavailable: { label: "Unavailable", className: "unavailable" },
};

interface DeveloperCardProps {
  developer: Developer;
}

export function DeveloperCard({ developer: dev }: DeveloperCardProps) {
  const avail = AVAILABILITY_LABELS[dev.availability];
  const title = `${dev.seniority} ${dev.role}`;
  const topSkills = dev.skills.slice(0, 4);

  return (
    <Link
      href={`/p/${dev.username}`}
      className="card block p-5 group"
      style={{ textDecoration: "none" }}
    >
      {/* Header */}
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 14 }}>
        <AvatarDisplay
          style={dev.avatarStyle}
          seed={dev.avatarSeed}
          size={56}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
            <span className="status-dot" style={{
              width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
              background: dev.availability === "available"
                ? "var(--status-available)"
                : dev.availability === "busy"
                ? "var(--status-busy)"
                : "var(--status-unavailable)",
            }} />
            <span style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 500 }}>
              {avail.label}
            </span>
          </div>
          <h3 style={{
            fontSize: 15,
            fontWeight: 700,
            color: "var(--text-primary)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            lineHeight: 1.3,
          }}>
            {dev.name}
          </h3>
          <p style={{ fontSize: 12, color: "var(--brand-primary)", fontWeight: 600, marginTop: 1 }}>
            {title}
          </p>
        </div>
      </div>

      {/* Bio */}
      <p style={{
        fontSize: 13,
        color: "var(--text-secondary)",
        lineHeight: 1.55,
        marginBottom: 14,
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
      }}>
        {dev.bio}
      </p>

      {/* Meta */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 14, fontSize: 12, color: "var(--text-muted)" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <MapPin size={12} />
          {dev.location}
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Clock size={12} />
          {dev.yearsOfExperience}y exp
        </span>
        {dev.openToRemote && (
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Globe size={12} />
            Remote OK
          </span>
        )}
      </div>

      {/* Skills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {topSkills.map((skill) => (
          <SkillBadge key={skill.name} skill={skill} size="sm" />
        ))}
        {dev.skills.length > 4 && (
          <span style={{
            fontSize: 11,
            color: "var(--text-muted)",
            padding: "2px 8px",
            background: "var(--bg-elevated)",
            borderRadius: "var(--radius-full)",
          }}>
            +{dev.skills.length - 4}
          </span>
        )}
      </div>
    </Link>
  );
}
