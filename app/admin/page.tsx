"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthContext";
import { SkillService, type SkillCategory } from "@/lib/api/skill.service";
import type { ApiSkill } from "@/lib/api/types";
import { Plus, Shield, AlertCircle, CheckCircle, Trash2 } from "lucide-react";

const CATEGORIES: { value: SkillCategory; label: string; color: string }[] = [
  { value: "LANGUAGE",  label: "Language",  color: "#3b82f6" },
  { value: "FRAMEWORK", label: "Framework", color: "#8b5cf6" },
  { value: "TOOL",      label: "Tool",      color: "#f59e0b" },
  { value: "DATABASE",  label: "Database",  color: "#10b981" },
  { value: "CLOUD",     label: "Cloud",     color: "#06b6d4" },
];

export default function AdminPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [skills, setSkills] = useState<ApiSkill[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState<SkillCategory>("LANGUAGE");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Redirect non-admins
  useEffect(() => {
    if (!authLoading && (!user || user.systemRole !== "ADMIN")) {
      router.push("/");
    }
  }, [authLoading, user, router]);

  const loadSkills = useCallback(async () => {
    setLoading(true);
    try {
      const data = await SkillService.getAll();
      setSkills(data);
    } catch {
      setError("Failed to load skills");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user?.systemRole === "ADMIN") loadSkills();
  }, [user, loadSkills]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setError("");
    setSuccess("");
    setSaving(true);
    try {
      const created = await SkillService.create({ name: newName.trim(), category: newCategory });
      setSkills((prev) => [...prev, created]);
      setNewName("");
      setSuccess(`"${created.name}" created successfully`);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to create skill");
    } finally {
      setSaving(false);
    }
  };

  // Group skills by category
  const grouped = CATEGORIES.map((cat) => ({
    ...cat,
    skills: skills.filter((s) => s.category === cat.value),
  }));

  if (authLoading || !user || user.systemRole !== "ADMIN") {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
        <div className="skeleton" style={{ width: 200, height: 24 }} />
      </div>
    );
  }

  return (
    <div style={{ padding: "40px 24px 80px" }}>
      <div className="container-section" style={{ maxWidth: 880 }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
          <div style={{
            width: 40, height: 40, borderRadius: "var(--radius-md)",
            background: "linear-gradient(135deg, #ef4444, #f97316)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Shield size={20} color="white" />
          </div>
          <div>
            <h1 style={{ fontSize: "1.75rem", fontWeight: 800, letterSpacing: "-0.5px" }}>Admin Panel</h1>
            <p style={{ fontSize: 14, color: "var(--text-muted)", marginTop: 2 }}>Manage skill catalogue</p>
          </div>
        </div>

        {/* Alerts */}
        {error && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderRadius: "var(--radius-md)", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#ef4444", fontSize: 13, marginBottom: 20 }}>
            <AlertCircle size={15} /> {error}
          </div>
        )}
        {success && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderRadius: "var(--radius-md)", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", color: "#22c55e", fontSize: 13, marginBottom: 20 }}>
            <CheckCircle size={15} /> {success}
          </div>
        )}

        {/* Create skill form */}
        <div className="card" style={{ padding: 24, marginBottom: 28 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Add New Skill</h2>
          <form onSubmit={handleCreate} style={{ display: "flex", gap: 10, alignItems: "flex-end", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 180 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.07em", display: "block", marginBottom: 6 }}>
                Skill Name
              </label>
              <input
                className="input"
                placeholder="e.g. Rust, Docker, Next.js"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
              />
            </div>
            <div style={{ minWidth: 150 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.07em", display: "block", marginBottom: 6 }}>
                Category
              </label>
              <select
                className="input"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as SkillCategory)}
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              disabled={saving}
              className="btn btn-primary"
              style={{ display: "flex", alignItems: "center", gap: 6, height: 42 }}
            >
              <Plus size={16} />
              {saving ? "Creating…" : "Add Skill"}
            </button>
          </form>
        </div>

        {/* Skills catalogue grouped by category */}
        {loading ? (
          <div style={{ display: "grid", gap: 16 }}>
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton" style={{ height: 120, borderRadius: "var(--radius-lg)" }} />
            ))}
          </div>
        ) : (
          <div style={{ display: "grid", gap: 20 }}>
            {grouped.map((group) => (
              <div key={group.value} className="card" style={{ padding: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                  <span style={{
                    width: 10, height: 10, borderRadius: "50%",
                    background: group.color, flexShrink: 0,
                  }} />
                  <h3 style={{ fontSize: 14, fontWeight: 700 }}>
                    {group.label}
                  </h3>
                  <span style={{
                    fontSize: 11, color: "var(--text-muted)", fontWeight: 500,
                    background: "var(--bg-elevated)", padding: "2px 8px",
                    borderRadius: "var(--radius-full)",
                  }}>
                    {group.skills.length}
                  </span>
                </div>
                {group.skills.length === 0 ? (
                  <p style={{ fontSize: 13, color: "var(--text-muted)", fontStyle: "italic" }}>
                    No skills in this category yet.
                  </p>
                ) : (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {group.skills.map((skill) => (
                      <span
                        key={skill.id}
                        style={{
                          display: "inline-flex", alignItems: "center", gap: 6,
                          fontSize: 13, padding: "5px 12px",
                          background: `${group.color}15`,
                          color: group.color,
                          border: `1px solid ${group.color}30`,
                          borderRadius: "var(--radius-full)",
                          fontWeight: 500,
                        }}
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        <div style={{
          marginTop: 28, padding: "16px 24px",
          background: "var(--bg-elevated)", borderRadius: "var(--radius-lg)",
          border: "1px solid var(--border-base)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          fontSize: 13, color: "var(--text-muted)",
        }}>
          <span>Total skills: <strong style={{ color: "var(--text-primary)" }}>{skills.length}</strong></span>
          <span>Logged in as <strong style={{ color: "var(--brand-primary)" }}>{user.email}</strong></span>
        </div>
      </div>
    </div>
  );
}
