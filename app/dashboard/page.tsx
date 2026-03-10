"use client";

import { useState } from "react";
import { AvatarDisplay } from "@/components/ui/AvatarDisplay";
import { SkillBadge } from "@/components/ui/SkillBadge";
import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer";
import { AvatarStyle, Skill } from "@/lib/types";
import { Save, Plus, Trash2, Eye, Edit3, CheckCircle } from "lucide-react";

const MOCK_SESSION = {
  name: "Alex Castillo",
  username: "alex-castillo",
  seniority: "Senior" as const,
  role: "Full Stack Engineer",
  bio: "Passionate developer building modern web experiences.",
  avatarStyle: "geometric" as AvatarStyle,
  avatarSeed: "ACS1",
  readme: "# Welcome\n\nThis is my profile README. Tell the world what you're building!",
  skills: [
    { name: "TypeScript", category: "language" as const },
    { name: "React",      category: "framework" as const },
    { name: "Node.js",    category: "framework" as const },
  ] as Skill[],
};

const SENIORITIES = ["Junior", "Mid", "Senior", "Staff", "Lead", "Principal"];
const ROLES = ["Frontend Engineer","Backend Engineer","Full Stack Engineer","Mobile Engineer",
  "DevOps Engineer","Data Engineer","Machine Learning Engineer","Platform Engineer","Security Engineer"];

export default function DashboardPage() {
  const [form, setForm] = useState(MOCK_SESSION);
  const [avatarStyle, setAvatarStyle] = useState<AvatarStyle>(MOCK_SESSION.avatarStyle);
  const [saved, setSaved] = useState(false);
  const [readmeMode, setReadmeMode] = useState<"edit" | "preview">("edit");
  const [newSkill, setNewSkill] = useState("");
  const [projects, setProjects] = useState([
    { id: "1", title: "My Project", description: "A cool project I built.", repoUrl: "", productionUrl: "" },
  ]);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const addSkill = () => {
    if (!newSkill.trim()) return;
    setForm((f) => ({
      ...f,
      skills: [...f.skills, { name: newSkill.trim(), category: "tool" as const }],
    }));
    setNewSkill("");
  };

  const removeSkill = (name: string) =>
    setForm((f) => ({ ...f, skills: f.skills.filter((s) => s.name !== name) }));

  const addProject = () =>
    setProjects((p) => [...p, { id: Date.now().toString(), title: "", description: "", repoUrl: "", productionUrl: "" }]);

  const removeProject = (id: string) =>
    setProjects((p) => p.filter((pr) => pr.id !== id));

  const updateProject = (id: string, field: string, value: string) =>
    setProjects((p) => p.map((pr) => (pr.id === id ? { ...pr, [field]: value } : pr)));

  const fieldStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    marginBottom: 20,
  };
  const labelStyle: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 700,
    color: "var(--text-muted)",
    textTransform: "uppercase",
    letterSpacing: "0.07em",
  };

  return (
    <div style={{ padding: "40px 24px 80px" }}>
      <div className="container-section" style={{ maxWidth: 880 }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: "1.75rem", fontWeight: 800, letterSpacing: "-0.5px" }}>
              Your Profile
            </h1>
            <p style={{ fontSize: 14, color: "var(--text-muted)", marginTop: 4 }}>
              @{form.username} · Simulated session
            </p>
          </div>
          <button
            onClick={handleSave}
            className="btn btn-primary"
            style={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            {saved ? <CheckCircle size={16} /> : <Save size={16} />}
            {saved ? "Saved!" : "Save Changes"}
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 28 }}>
          {/* Avatar preview */}
          <div>
            <div className="card" style={{ padding: 20, textAlign: "center" }}>
              <AvatarDisplay style={avatarStyle} seed={form.avatarSeed} size={100} />
              <p style={{ fontSize: 12, color: "var(--text-muted)", margin: "12px 0 16px" }}>
                Avatar Style
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {(["geometric", "abstract"] as AvatarStyle[]).map((style) => (
                  <button
                    key={style}
                    onClick={() => setAvatarStyle(style)}
                    style={{
                      padding: "8px",
                      borderRadius: "var(--radius-md)",
                      border: `1px solid ${avatarStyle === style ? "var(--brand-primary)" : "var(--border-base)"}`,
                      background: avatarStyle === style ? "var(--brand-glow)" : "transparent",
                      color: avatarStyle === style ? "var(--brand-primary)" : "var(--text-secondary)",
                      cursor: "pointer",
                      fontSize: 13,
                      fontWeight: 500,
                      textTransform: "capitalize",
                      transition: "all var(--transition-fast)",
                    }}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            {/* Basic info */}
            <div className="card" style={{ padding: 24, marginBottom: 20 }}>
              <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 20 }}>Basic Info</h2>

              <div style={fieldStyle}>
                <label style={labelStyle}>Display Name</label>
                <input className="input" value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Seniority</label>
                  <select className="input" value={form.seniority}
                    onChange={(e) => setForm((f) => ({ ...f, seniority: e.target.value as typeof form.seniority }))}>
                    {SENIORITIES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Role</label>
                  <select className="input" value={form.role}
                    onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}>
                    {ROLES.map((r) => <option key={r}>{r}</option>)}
                  </select>
                </div>
              </div>

              <div style={fieldStyle}>
                <label style={labelStyle}>Short Bio</label>
                <textarea className="input" rows={3} value={form.bio}
                  onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
                  style={{ resize: "vertical", fontFamily: "inherit" }}
                />
              </div>
            </div>

            {/* Skills */}
            <div className="card" style={{ padding: 24, marginBottom: 20 }}>
              <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Skills</h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
                {form.skills.map((skill) => (
                  <div key={skill.name} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <SkillBadge skill={skill} />
                    <button onClick={() => removeSkill(skill.name)}
                      style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: 2, display: "flex" }}>
                      <Trash2 size={11} />
                    </button>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <input className="input" placeholder="Add skill (e.g. Rust)"
                  value={newSkill} onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addSkill()}
                  style={{ flex: 1 }} />
                <button onClick={addSkill} className="btn btn-ghost btn-sm">
                  <Plus size={14} /> Add
                </button>
              </div>
            </div>

            {/* README */}
            <div className="card" style={{ padding: 24, marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <h2 style={{ fontSize: 15, fontWeight: 700 }}>README</h2>
                <div style={{ display: "flex", gap: 6 }}>
                  <button onClick={() => setReadmeMode("edit")} className={`btn btn-sm ${readmeMode === "edit" ? "btn-primary" : "btn-ghost"}`}>
                    <Edit3 size={13} /> Edit
                  </button>
                  <button onClick={() => setReadmeMode("preview")} className={`btn btn-sm ${readmeMode === "preview" ? "btn-primary" : "btn-ghost"}`}>
                    <Eye size={13} /> Preview
                  </button>
                </div>
              </div>
              {readmeMode === "edit" ? (
                <textarea className="input font-mono" rows={12} value={form.readme}
                  onChange={(e) => setForm((f) => ({ ...f, readme: e.target.value }))}
                  style={{ resize: "vertical", fontSize: 13, lineHeight: 1.6 }}
                />
              ) : (
                <div style={{ padding: 16, background: "var(--bg-elevated)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-base)", minHeight: 200 }}>
                  <MarkdownRenderer content={form.readme} />
                </div>
              )}
            </div>

            {/* Projects */}
            <div className="card" style={{ padding: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <h2 style={{ fontSize: 15, fontWeight: 700 }}>Projects</h2>
                <button onClick={addProject} className="btn btn-ghost btn-sm">
                  <Plus size={14} /> Add Project
                </button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {projects.map((project) => (
                  <div key={project.id} style={{ padding: 16, background: "var(--bg-elevated)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-base)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                      <input className="input" placeholder="Project title" value={project.title}
                        onChange={(e) => updateProject(project.id, "title", e.target.value)}
                        style={{ fontWeight: 600, fontSize: 14 }} />
                      <button onClick={() => removeProject(project.id)}
                        style={{ marginLeft: 8, background: "none", border: "none", cursor: "pointer", color: "var(--status-unavailable)", padding: 6, display: "flex", flexShrink: 0 }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <textarea className="input" rows={2} placeholder="Description…" value={project.description}
                      onChange={(e) => updateProject(project.id, "description", e.target.value)}
                      style={{ marginBottom: 8, resize: "none", fontFamily: "inherit", fontSize: 13 }}
                    />
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                      <input className="input" placeholder="GitHub URL" value={project.repoUrl}
                        onChange={(e) => updateProject(project.id, "repoUrl", e.target.value)} style={{ fontSize: 13 }} />
                      <input className="input" placeholder="Production URL" value={project.productionUrl}
                        onChange={(e) => updateProject(project.id, "productionUrl", e.target.value)} style={{ fontSize: 13 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
