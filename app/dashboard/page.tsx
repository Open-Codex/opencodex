"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { AvatarDisplay } from "@/components/ui/AvatarDisplay";
import { SkillBadge } from "@/components/ui/SkillBadge";
import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer";
import { AvatarStyle, Skill } from "@/lib/types";
import {
	Save,
	Plus,
	Trash2,
	Eye,
	Edit3,
	CheckCircle,
	LogOut,
	AlertCircle,
} from "lucide-react";
import { useAuth } from "@/components/providers/AuthContext";
import { DeveloperService } from "@/lib/api/developer.service";
import { ProjectService } from "@/lib/api/project.service";
import { SkillService } from "@/lib/api/skill.service";
import { fetchApi } from "@/lib/api/client";

const SENIORITIES = ["Junior", "Mid", "Senior", "Staff", "Lead", "Principal"];
const ROLES = [
	"Frontend Engineer",
	"Backend Engineer",
	"Full Stack Engineer",
	"Mobile Engineer",
	"DevOps Engineer",
	"Data Engineer",
	"Machine Learning Engineer",
	"Platform Engineer",
	"Security Engineer",
];

interface ProjectForm {
	id: string;
	title: string;
	description: string;
	repoUrl: string;
	productionUrl: string;
	isNew?: boolean;
}

export default function DashboardPage() {
	const { user, isLoading: authLoading, logout } = useAuth();
	const router = useRouter();

	const [form, setForm] = useState({
		name: "",
		username: "",
		seniority: "Junior",
		role: "Full Stack Engineer",
		bio: "",
		readme: "",
		avatarStyle: "geometric" as AvatarStyle,
		avatarSeed: "",
		location: "",
		experienceYears: 0,
		remoteOk: false,
		githubUrl: "",
		linkedinUrl: "",
		twitterUrl: "",
		portfolioUrl: "",
	});
	const [skills, setSkills] = useState<Skill[]>([]);
	const [projects, setProjects] = useState<ProjectForm[]>([]);
	const [newSkill, setNewSkill] = useState("");
	const [readmeMode, setReadmeMode] = useState<"edit" | "preview">("edit");
	const [saving, setSaving] = useState(false);
	const [saved, setSaved] = useState(false);
	const [error, setError] = useState("");
	const [loadingProfile, setLoadingProfile] = useState(true);

	// Redirect if unauthenticated
	useEffect(() => {
		if (!authLoading && !user) router.push("/login");
	}, [authLoading, user, router]);

	// Load profile data
	const loadProfile = useCallback(async () => {
		if (!user) return;
		setLoadingProfile(true);
		try {
			// Decode username from JWT payload
			const tokenRaw = localStorage.getItem("oct_token");
			if (!tokenRaw) return;
			const payload = JSON.parse(atob(tokenRaw.split(".")[1]));

			const json = await fetchApi<any>("/developer?limit=50");
			const summaryDev = json.data?.find(
				(d: { id: string }) => d.id === payload.sub,
			);

			if (summaryDev?.username) {
				// Fetch full profile because the list endpoint might omit social URLs and README
				const myDev = await fetchApi<any>(`/developer/${summaryDev.username}`);

				setForm({
					name: myDev.name ?? "",
					username: myDev.username ?? "",
					seniority:
						{
							JUNIOR: "Junior",
							MID: "Mid",
							SENIOR: "Senior",
							STAFF: "Staff",
							LEAD: "Lead",
							PRINCIPAL: "Principal",
						}[myDev.seniority as string] ?? "Junior",
					role: myDev.role ?? "",
					bio: myDev.bio ?? "",
					readme: myDev.readme ?? "",
					avatarStyle: (myDev.avatarStyle?.toLowerCase() ??
						"geometric") as AvatarStyle,
					avatarSeed: myDev.avatarSeed ?? myDev.username ?? "",
					location: myDev.location ?? "",
					experienceYears: myDev.experienceYears ?? 0,
					remoteOk: myDev.remoteOk ?? false,
					githubUrl: myDev.githubUrl ?? "",
					linkedinUrl: myDev.linkedinUrl ?? "",
					twitterUrl: myDev.twitterUrl ?? "",
					portfolioUrl: myDev.portfolioUrl ?? "",
				});
				setSkills(
					(myDev.skills ?? []).map(
						(s: { skill: { name: string; category?: string } }) => ({
							name: s.skill.name,
							category: (s.skill.category?.toLowerCase() ??
								"tool") as Skill["category"],
						}),
					),
				);
			}

			// Load projects
			const projectsData = await ProjectService.getMine();
			setProjects(
				projectsData.map((p) => ({
					id: p.id,
					title: p.title,
					description: p.description,
					repoUrl: p.repoUrl ?? "",
					productionUrl: p.productionUrl ?? "",
				})),
			);
		} catch (e) {
			console.error("Failed to load profile:", e);
		} finally {
			setLoadingProfile(false);
		}
	}, [user]);

	useEffect(() => {
		if (user) loadProfile();
	}, [user, loadProfile]);

	const handleSave = async () => {
		setError("");
		setSaving(true);
		try {
			const seniorityMap: Record<string, string> = {
				Junior: "JUNIOR",
				Mid: "MID",
				Senior: "SENIOR",
				Staff: "STAFF",
				Lead: "LEAD",
				Principal: "PRINCIPAL",
			};
			await DeveloperService.updateProfile({
				name: form.name,
				seniority: seniorityMap[form.seniority] ?? form.seniority,
				role: form.role,
				bio: form.bio,
				readme: form.readme,
				location: form.location,
				experienceYears: Number(form.experienceYears),
				remoteOk: form.remoteOk,
				githubUrl: form.githubUrl || null,
				linkedinUrl: form.linkedinUrl || null,
				twitterUrl: form.twitterUrl || null,
				portfolioUrl: form.portfolioUrl || null,
			});

			// Save skills
			if (skills.length > 0) {
				await SkillService.assignToMe(skills.map((s) => s.name));
			}

			setSaved(true);
			setTimeout(() => setSaved(false), 2500);
		} catch (e) {
			setError(e instanceof Error ? e.message : "Failed to save");
		} finally {
			setSaving(false);
		}
	};

	const addSkill = () => {
		if (!newSkill.trim()) return;
		setSkills((s) => [
			...s,
			{ name: newSkill.trim(), category: "tool" as const },
		]);
		setNewSkill("");
	};

	const removeSkill = (name: string) =>
		setSkills((s) => s.filter((sk) => sk.name !== name));

	const addProject = async () => {
		try {
			const created = await ProjectService.create({
				title: "New Project",
				description: "Description...",
			});
			setProjects((p) => [
				...p,
				{
					id: created.id,
					title: created.title,
					description: created.description,
					repoUrl: created.repoUrl ?? "",
					productionUrl: created.productionUrl ?? "",
				},
			]);
		} catch (e) {
			setError(e instanceof Error ? e.message : "Failed to create project");
		}
	};

	const removeProject = async (id: string) => {
		try {
			await ProjectService.remove(id);
			setProjects((p) => p.filter((pr) => pr.id !== id));
		} catch (e) {
			setError(e instanceof Error ? e.message : "Failed to delete project");
		}
	};

	const saveProject = async (id: string) => {
		const proj = projects.find((p) => p.id === id);
		if (!proj) return;
		try {
			await ProjectService.update(id, {
				title: proj.title,
				description: proj.description,
				repoUrl: proj.repoUrl || undefined,
				productionUrl: proj.productionUrl || undefined,
			});
		} catch (e) {
			setError(e instanceof Error ? e.message : "Failed to update project");
		}
	};

	const updateProject = (id: string, field: string, value: string) =>
		setProjects((p) =>
			p.map((pr) => (pr.id === id ? { ...pr, [field]: value } : pr)),
		);

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

	if (authLoading || loadingProfile) {
		return (
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					minHeight: "50vh",
				}}
			>
				<div className="skeleton" style={{ width: 200, height: 24 }} />
			</div>
		);
	}

	if (!user) return null;

	return (
		<div style={{ padding: "40px 24px 80px" }}>
			<div className="container-section" style={{ maxWidth: 880 }}>
				{/* Header */}
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						marginBottom: 32,
						flexWrap: "wrap",
						gap: 12,
					}}
				>
					<div>
						<h1
							style={{
								fontSize: "1.75rem",
								fontWeight: 800,
								letterSpacing: "-0.5px",
							}}
						>
							Your Profile
						</h1>
						<p
							style={{ fontSize: 14, color: "var(--text-muted)", marginTop: 4 }}
						>
							@{form.username}
						</p>
					</div>
					<div style={{ display: "flex", gap: 8 }}>
						<button
							onClick={() => {
								logout();
								router.push("/");
							}}
							className="btn btn-ghost btn-sm"
						>
							<LogOut size={14} /> Logout
						</button>
						<button
							onClick={handleSave}
							disabled={saving}
							className="btn btn-primary"
							style={{ display: "flex", alignItems: "center", gap: 8 }}
						>
							{saved ? <CheckCircle size={16} /> : <Save size={16} />}
							{saved ? "Saved!" : saving ? "Saving…" : "Save Changes"}
						</button>
					</div>
				</div>

				{/* Error bar */}
				{error && (
					<div
						style={{
							display: "flex",
							alignItems: "center",
							gap: 8,
							padding: "10px 14px",
							borderRadius: "var(--radius-md)",
							background: "rgba(239,68,68,0.1)",
							border: "1px solid rgba(239,68,68,0.3)",
							color: "#ef4444",
							fontSize: 13,
							marginBottom: 20,
						}}
					>
						<AlertCircle size={15} /> {error}
					</div>
				)}

				<div
					style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 28 }}
				>
					{/* Avatar preview */}
					<div>
						<div className="card" style={{ padding: 20, textAlign: "center" }}>
							<AvatarDisplay
								style={form.avatarStyle}
								seed={form.avatarSeed}
								size={100}
							/>
							<p
								style={{
									fontSize: 12,
									color: "var(--text-muted)",
									margin: "12px 0 16px",
								}}
							>
								Avatar Style
							</p>
							<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
								{(["geometric", "abstract"] as AvatarStyle[]).map((style) => (
									<button
										key={style}
										onClick={() =>
											setForm((f) => ({ ...f, avatarStyle: style }))
										}
										style={{
											padding: "8px",
											borderRadius: "var(--radius-md)",
											border: `1px solid ${form.avatarStyle === style ? "var(--brand-primary)" : "var(--border-base)"}`,
											background:
												form.avatarStyle === style
													? "var(--brand-glow)"
													: "transparent",
											color:
												form.avatarStyle === style
													? "var(--brand-primary)"
													: "var(--text-secondary)",
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
							<h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 20 }}>
								Basic Info
							</h2>
							<div style={fieldStyle}>
								<label style={labelStyle}>Display Name</label>
								<input
									className="input"
									value={form.name}
									onChange={(e) =>
										setForm((f) => ({ ...f, name: e.target.value }))
									}
								/>
							</div>
							<div
								style={{
									display: "grid",
									gridTemplateColumns: "1fr 1fr",
									gap: 16,
								}}
							>
								<div style={fieldStyle}>
									<label style={labelStyle}>Seniority</label>
									<select
										className="input"
										value={form.seniority}
										onChange={(e) =>
											setForm((f) => ({ ...f, seniority: e.target.value }))
										}
									>
										{SENIORITIES.map((s) => (
											<option key={s}>{s}</option>
										))}
									</select>
								</div>
								<div style={fieldStyle}>
									<label style={labelStyle}>Role</label>
									<select
										className="input"
										value={form.role}
										onChange={(e) =>
											setForm((f) => ({ ...f, role: e.target.value }))
										}
									>
										{ROLES.map((r) => (
											<option key={r}>{r}</option>
										))}
									</select>
								</div>
							</div>
							<div style={fieldStyle}>
								<label style={labelStyle}>Short Bio</label>
								<textarea
									className="input"
									rows={3}
									value={form.bio}
									onChange={(e) =>
										setForm((f) => ({ ...f, bio: e.target.value }))
									}
									style={{ resize: "vertical", fontFamily: "inherit" }}
								/>
							</div>
							<div
								style={{
									display: "grid",
									gridTemplateColumns: "1fr 1fr 1fr",
									gap: 16,
								}}
							>
								<div style={fieldStyle}>
									<label style={labelStyle}>Location</label>
									<input
										className="input"
										placeholder="e.g. London, UK"
										value={form.location}
										onChange={(e) =>
											setForm((f) => ({ ...f, location: e.target.value }))
										}
									/>
								</div>
								<div style={fieldStyle}>
									<label style={labelStyle}>Years of Experience</label>
									<input
										type="number"
										min="0"
										className="input"
										value={form.experienceYears}
										onChange={(e) =>
											setForm((f) => ({ ...f, experienceYears: parseInt(e.target.value) || 0 }))
										}
									/>
								</div>
								<div style={fieldStyle}>
									<label style={labelStyle} />
									<label style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12, cursor: "pointer", fontSize: 14 }}>
										<input
											type="checkbox"
											checked={form.remoteOk}
											onChange={(e) =>
												setForm((f) => ({ ...f, remoteOk: e.target.checked }))
											}
											style={{ width: 18, height: 18, accentColor: "var(--brand-primary)" }}
										/>
										Open to Remote Work
									</label>
								</div>
							</div>
						</div>

						{/* Links */}
						<div className="card" style={{ padding: 24, marginBottom: 20 }}>
							<h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 20 }}>
								Social & Links
							</h2>
							<div
								style={{
									display: "grid",
									gridTemplateColumns: "1fr 1fr",
									gap: 16,
								}}
							>
								<div style={fieldStyle}>
									<label style={labelStyle}>GitHub URL</label>
									<input
										className="input"
										placeholder="https://github.com/..."
										value={form.githubUrl}
										onChange={(e) =>
											setForm((f) => ({ ...f, githubUrl: e.target.value }))
										}
									/>
								</div>
								<div style={fieldStyle}>
									<label style={labelStyle}>LinkedIn URL</label>
									<input
										className="input"
										placeholder="https://linkedin.com/in/..."
										value={form.linkedinUrl}
										onChange={(e) =>
											setForm((f) => ({ ...f, linkedinUrl: e.target.value }))
										}
									/>
								</div>
								<div style={fieldStyle}>
									<label style={labelStyle}>Twitter / X URL</label>
									<input
										className="input"
										placeholder="https://twitter.com/..."
										value={form.twitterUrl}
										onChange={(e) =>
											setForm((f) => ({ ...f, twitterUrl: e.target.value }))
										}
									/>
								</div>
								<div style={fieldStyle}>
									<label style={labelStyle}>Personal Portfolio</label>
									<input
										className="input"
										placeholder="https://..."
										value={form.portfolioUrl}
										onChange={(e) =>
											setForm((f) => ({ ...f, portfolioUrl: e.target.value }))
										}
									/>
								</div>
							</div>
						</div>

						{/* Skills */}
						<div className="card" style={{ padding: 24, marginBottom: 20 }}>
							<h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>
								Skills
							</h2>
							<div
								style={{
									display: "flex",
									flexWrap: "wrap",
									gap: 8,
									marginBottom: 16,
								}}
							>
								{skills.map((skill) => (
									<div
										key={skill.name}
										style={{ display: "flex", alignItems: "center", gap: 4 }}
									>
										<SkillBadge skill={skill} />
										<button
											onClick={() => removeSkill(skill.name)}
											style={{
												background: "none",
												border: "none",
												cursor: "pointer",
												color: "var(--text-muted)",
												padding: 2,
												display: "flex",
											}}
										>
											<Trash2 size={11} />
										</button>
									</div>
								))}
							</div>
							<div style={{ display: "flex", gap: 8 }}>
								<input
									className="input"
									placeholder="Add skill (e.g. Rust)"
									value={newSkill}
									onChange={(e) => setNewSkill(e.target.value)}
									onKeyDown={(e) => e.key === "Enter" && addSkill()}
									style={{ flex: 1 }}
								/>
								<button onClick={addSkill} className="btn btn-ghost btn-sm">
									<Plus size={14} /> Add
								</button>
							</div>
						</div>

						{/* README */}
						<div className="card" style={{ padding: 24, marginBottom: 20 }}>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									marginBottom: 16,
								}}
							>
								<h2 style={{ fontSize: 15, fontWeight: 700 }}>README</h2>
								<div style={{ display: "flex", gap: 6 }}>
									<button
										onClick={() => setReadmeMode("edit")}
										className={`btn btn-sm ${readmeMode === "edit" ? "btn-primary" : "btn-ghost"}`}
									>
										<Edit3 size={13} /> Edit
									</button>
									<button
										onClick={() => setReadmeMode("preview")}
										className={`btn btn-sm ${readmeMode === "preview" ? "btn-primary" : "btn-ghost"}`}
									>
										<Eye size={13} /> Preview
									</button>
								</div>
							</div>
							{readmeMode === "edit" ? (
								<textarea
									className="input font-mono"
									rows={12}
									value={form.readme}
									onChange={(e) =>
										setForm((f) => ({ ...f, readme: e.target.value }))
									}
									style={{ resize: "vertical", fontSize: 13, lineHeight: 1.6 }}
								/>
							) : (
								<div
									style={{
										padding: 16,
										background: "var(--bg-elevated)",
										borderRadius: "var(--radius-md)",
										border: "1px solid var(--border-base)",
										minHeight: 200,
									}}
								>
									<MarkdownRenderer content={form.readme} />
								</div>
							)}
						</div>

						{/* Projects */}
						<div className="card" style={{ padding: 24 }}>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									marginBottom: 16,
								}}
							>
								<h2 style={{ fontSize: 15, fontWeight: 700 }}>Projects</h2>
								<button onClick={addProject} className="btn btn-ghost btn-sm">
									<Plus size={14} /> Add Project
								</button>
							</div>
							<div
								style={{ display: "flex", flexDirection: "column", gap: 16 }}
							>
								{projects.map((project) => (
									<div
										key={project.id}
										style={{
											padding: 16,
											background: "var(--bg-elevated)",
											borderRadius: "var(--radius-md)",
											border: "1px solid var(--border-base)",
										}}
									>
										<div
											style={{
												display: "flex",
												justifyContent: "space-between",
												marginBottom: 12,
											}}
										>
											<input
												className="input"
												placeholder="Project title"
												value={project.title}
												onChange={(e) =>
													updateProject(project.id, "title", e.target.value)
												}
												onBlur={() => saveProject(project.id)}
												style={{ fontWeight: 600, fontSize: 14 }}
											/>
											<button
												onClick={() => removeProject(project.id)}
												style={{
													marginLeft: 8,
													background: "none",
													border: "none",
													cursor: "pointer",
													color: "var(--status-unavailable)",
													padding: 6,
													display: "flex",
													flexShrink: 0,
												}}
											>
												<Trash2 size={16} />
											</button>
										</div>
										<textarea
											className="input"
											rows={2}
											placeholder="Description…"
											value={project.description}
											onChange={(e) =>
												updateProject(project.id, "description", e.target.value)
											}
											onBlur={() => saveProject(project.id)}
											style={{
												marginBottom: 8,
												resize: "none",
												fontFamily: "inherit",
												fontSize: 13,
											}}
										/>
										<div
											style={{
												display: "grid",
												gridTemplateColumns: "1fr 1fr",
												gap: 8,
											}}
										>
											<input
												className="input"
												placeholder="GitHub URL"
												value={project.repoUrl}
												onChange={(e) =>
													updateProject(project.id, "repoUrl", e.target.value)
												}
												onBlur={() => saveProject(project.id)}
												style={{ fontSize: 13 }}
											/>
											<input
												className="input"
												placeholder="Production URL"
												value={project.productionUrl}
												onChange={(e) =>
													updateProject(
														project.id,
														"productionUrl",
														e.target.value,
													)
												}
												onBlur={() => saveProject(project.id)}
												style={{ fontSize: 13 }}
											/>
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
