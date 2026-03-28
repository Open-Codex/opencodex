import { notFound } from "next/navigation";
import { getDeveloperByUsername } from "@/lib/mock-actions";
import { AvatarDisplay } from "@/components/ui/AvatarDisplay";
import { SkillBadge } from "@/components/ui/SkillBadge";
import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer";
import {
	MapPin,
	Globe,
	Clock,
	Github,
	Linkedin,
	Twitter,
	ExternalLink,
	GitBranch,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

interface ProfilePageProps {
	params: Promise<{ username: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({
	params,
}: ProfilePageProps): Promise<Metadata> {
	const { username } = await params;
	const dev = await getDeveloperByUsername(username);
	if (!dev) return { title: "Developer Not Found" };

	const title = `${dev.name} — ${dev.seniority} ${dev.role}`;
	const description = dev.bio;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: "profile",
			url: `/p/${username}`,
		},
		twitter: { card: "summary", title, description },
	};
}

const AVAILABILITY_STYLES = {
	available: {
		bg: "rgba(34,197,94,0.12)",
		color: "#22c55e",
		label: "Available for work",
	},
	busy: {
		bg: "rgba(245,158,11,0.12)",
		color: "#f59e0b",
		label: "Currently busy",
	},
	unavailable: {
		bg: "rgba(239,68,68,0.12)",
		color: "#ef4444",
		label: "Not available",
	},
};

function ensureAbsoluteUrl(url: string | undefined): string | undefined {
	if (!url) return undefined;
	if (url.startsWith("http://") || url.startsWith("https://")) return url;
	return `https://${url}`;
}

function getRawGithubUrl(repoUrl: string | undefined): string | null {
	if (!repoUrl || !repoUrl.includes("github.com")) return null;
	try {
		const urlObj = new URL(ensureAbsoluteUrl(repoUrl)!);
		const path = urlObj.pathname; // e.g. "/facebook/react"
		// remove trailing slash if any
		const cleanPath = path.replace(/\/$/, "");
		return `https://raw.githubusercontent.com${cleanPath}/main/README.md`;
	} catch {
		return null;
	}
}

export default async function ProfilePage({ params, searchParams }: ProfilePageProps) {
	const { username } = await params;
	const sParams = await searchParams;
	const dev = await getDeveloperByUsername(username);
	if (!dev) notFound();

	const avail = AVAILABILITY_STYLES[dev.availability];

	const selectedProjectId = typeof sParams.project === "string" ? sParams.project : null;
	const selectedProject = selectedProjectId ? dev.projects.find(p => p.id === selectedProjectId) : null;

	let projectReadme = null;
	if (selectedProject?.repoUrl) {
		const rawUrl = getRawGithubUrl(selectedProject.repoUrl);
		if (rawUrl) {
			try {
				const r = await fetch(rawUrl, { next: { revalidate: 3600 } });
				if (r.ok) projectReadme = await r.text();
			} catch (e) {
				// ignore fetch error
			}
		}
	}

	return (
		<div style={{ padding: "40px 24px 80px" }}>
			<div className="container-section">
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "300px 1fr",
						gap: 32,
						alignItems: "flex-start",
					}}
				>
					{/* ── LEFT SIDEBAR ── */}
					<aside style={{ position: "sticky", top: 80 }}>
						<div className="card" style={{ padding: 28 }}>
							{/* Avatar */}
							<div
								style={{
									display: "flex",
									justifyContent: "center",
									marginBottom: 20,
								}}
							>
								<AvatarDisplay
									style={dev.avatarStyle}
									seed={dev.avatarSeed}
									size={100}
								/>
							</div>

							{/* Name & title */}
							<div style={{ textAlign: "center", marginBottom: 16 }}>
								<h1 style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>
									{dev.name}
								</h1>
								<p
									style={{
										fontSize: 13,
										color: "var(--brand-primary)",
										fontWeight: 600,
									}}
								>
									{dev.seniority} {dev.role}
								</p>
							</div>

							{/* Availability badge */}
							<div
								style={{
									display: "flex",
									justifyContent: "center",
									marginBottom: 20,
								}}
							>
								<span
									style={{
										background: avail.bg,
										color: avail.color,
										border: `1px solid ${avail.color}33`,
										padding: "4px 12px",
										borderRadius: "var(--radius-full)",
										fontSize: 12,
										fontWeight: 600,
										display: "flex",
										alignItems: "center",
										gap: 6,
									}}
								>
									<span
										style={{
											width: 6,
											height: 6,
											borderRadius: "50%",
											background: avail.color,
										}}
									/>
									{avail.label}
								</span>
							</div>

							<div className="divider" style={{ marginBottom: 20 }} />

							{/* Meta */}
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									gap: 10,
									marginBottom: 20,
									fontSize: 13,
									color: "var(--text-secondary)",
								}}
							>
								<span style={{ display: "flex", alignItems: "center", gap: 8 }}>
									<MapPin size={14} style={{ color: "var(--text-muted)" }} />
									{dev.location}
								</span>
								<span style={{ display: "flex", alignItems: "center", gap: 8 }}>
									<Clock size={14} style={{ color: "var(--text-muted)" }} />
									{dev.yearsOfExperience} years experience
								</span>
								{dev.openToRemote && (
									<span
										style={{ display: "flex", alignItems: "center", gap: 8 }}
									>
										<Globe size={14} style={{ color: "var(--text-muted)" }} />
										Open to remote
									</span>
								)}
							</div>

							{/* Languages */}
							{dev.languages && dev.languages.length > 0 && (
								<div style={{ marginBottom: 20 }}>
									<p
										style={{
											fontSize: 11,
											fontWeight: 700,
											color: "var(--text-muted)",
											textTransform: "uppercase",
											letterSpacing: "0.08em",
											marginBottom: 8,
										}}
									>
										Languages
									</p>
									<div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
										{dev.languages.map((l) => (
											<span
												key={l}
												style={{
													fontSize: 12,
													padding: "3px 10px",
													background: "var(--bg-elevated)",
													border: "1px solid var(--border-base)",
													borderRadius: "var(--radius-full)",
													color: "var(--text-secondary)",
												}}
											>
												{l}
											</span>
										))}
									</div>
								</div>
							)}

							{/* Skills */}
							<div style={{ marginBottom: 20 }}>
								<p
									style={{
										fontSize: 11,
										fontWeight: 700,
										color: "var(--text-muted)",
										textTransform: "uppercase",
										letterSpacing: "0.08em",
										marginBottom: 8,
									}}
								>
									Skills
								</p>
								<div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
									{dev.skills.map((skill) => (
										<SkillBadge key={skill.name} skill={skill} />
									))}
								</div>
							</div>

							{/* Social links */}
							<div className="divider" style={{ marginBottom: 16 }} />
							<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
								{dev.social.github && (
									<a
										href={ensureAbsoluteUrl(dev.social.github)}
										target="_blank"
										rel="noopener noreferrer"
										style={{
											display: "flex",
											alignItems: "center",
											gap: 8,
											fontSize: 13,
											color: "var(--text-secondary)",
											textDecoration: "none",
											padding: "6px 0",
										}}
									>
										<Github size={15} /> GitHub
									</a>
								)}
								{dev.social.linkedin && (
									<a
										href={ensureAbsoluteUrl(dev.social.linkedin)}
										target="_blank"
										rel="noopener noreferrer"
										style={{
											display: "flex",
											alignItems: "center",
											gap: 8,
											fontSize: 13,
											color: "var(--text-secondary)",
											textDecoration: "none",
											padding: "6px 0",
										}}
									>
										<Linkedin size={15} /> LinkedIn
									</a>
								)}
								{dev.social.twitter && (
									<a
										href={ensureAbsoluteUrl(dev.social.twitter)}
										target="_blank"
										rel="noopener noreferrer"
										style={{
											display: "flex",
											alignItems: "center",
											gap: 8,
											fontSize: 13,
											color: "var(--text-secondary)",
											textDecoration: "none",
											padding: "6px 0",
										}}
									>
										<Twitter size={15} /> Twitter / X
									</a>
								)}
								{dev.social.website && (
									<a
										href={ensureAbsoluteUrl(dev.social.website)}
										target="_blank"
										rel="noopener noreferrer"
										style={{
											display: "flex",
											alignItems: "center",
											gap: 8,
											fontSize: 13,
											color: "var(--text-secondary)",
											textDecoration: "none",
											padding: "6px 0",
										}}
									>
										<ExternalLink size={15} /> Website
									</a>
								)}
							</div>
						</div>
					</aside>

					{/* ── RIGHT: README + PROJECTS ── */}
					<div style={{ minWidth: 0 }}>
						{selectedProject ? (
							<div className="card" style={{ padding: 32, marginBottom: 24 }}>
								<div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
									<div>
										<h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>{selectedProject.title}</h2>
										<p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6 }}>{selectedProject.description}</p>
									</div>
									<Link href={`/p/${dev.username}`} scroll={false} className="btn btn-ghost btn-sm" style={{ flexShrink: 0 }}>
										✕ Close
									</Link>
								</div>
								
								<div style={{ display: "flex", gap: 12, marginBottom: 28 }}>
									{selectedProject.repoUrl && (
										<a
											href={ensureAbsoluteUrl(selectedProject.repoUrl)}
											target="_blank"
											rel="noopener noreferrer"
											className="btn btn-ghost btn-sm"
											style={{ gap: 6 }}
										>
											<Github size={15} /> Source Code
										</a>
									)}
									{selectedProject.productionUrl && (
										<a
											href={ensureAbsoluteUrl(selectedProject.productionUrl)}
											target="_blank"
											rel="noopener noreferrer"
											className="btn btn-primary btn-sm"
											style={{ gap: 6 }}
										>
											<Globe size={15} /> Live Project
										</a>
									)}
								</div>

								<div className="divider" style={{ marginBottom: 28 }} />

								<h3
									style={{
										fontSize: 12,
										fontWeight: 700,
										marginBottom: 20,
										display: "flex",
										alignItems: "center",
										gap: 8,
										textTransform: "uppercase",
										letterSpacing: "0.08em",
										color: "var(--text-muted)"
									}}
								>
									Project README
								</h3>
								
								{projectReadme ? (
									<MarkdownRenderer content={projectReadme} />
								) : (
									<div style={{ 
										padding: 40, 
										textAlign: "center", 
										background: "var(--bg-elevated)", 
										borderRadius: "var(--radius-md)", 
										border: "1px dashed var(--border-base)",
										color: "var(--text-muted)" 
									}}>
										<p style={{ fontSize: 14 }}>No README.md found in the `main` branch of this repository, or the repository is private.</p>
										{selectedProject.repoUrl && (
											<a href={ensureAbsoluteUrl(selectedProject.repoUrl)} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", marginTop: 12, fontSize: 13, color: "var(--brand-primary)", textDecoration: "underline" }}>
												View directly on GitHub
											</a>
										)}
									</div>
								)}
							</div>
						) : (
							<>
								{/* Developer README */}
								{dev.readme && (
									<div className="card" style={{ padding: 32, marginBottom: 24 }}>
										<h2
											style={{
												fontSize: 16,
												fontWeight: 700,
												marginBottom: 20,
												display: "flex",
												alignItems: "center",
												gap: 8,
											}}
										>
											<span style={{ fontSize: 18 }}>📄</span> README
										</h2>
										<MarkdownRenderer content={dev.readme} />
									</div>
								)}

								{/* Projects */}
								{dev.projects.length > 0 && (
									<div className="card" style={{ padding: 32 }}>
										<h2
											style={{
												fontSize: 16,
												fontWeight: 700,
												marginBottom: 20,
												display: "flex",
												alignItems: "center",
												gap: 8,
											}}
										>
											<GitBranch
												size={18}
												style={{ color: "var(--brand-primary)" }}
											/>{" "}
											Projects
										</h2>
										<div
											style={{ display: "flex", flexDirection: "column", gap: 16 }}
										>
											{dev.projects.map((project) => (
												<div
													key={project.id}
													style={{
														padding: 20,
														background: "var(--bg-elevated)",
														borderRadius: "var(--radius-md)",
														border: "1px solid var(--border-base)",
													}}
												>
													<div
														style={{
															display: "flex",
															justifyContent: "space-between",
															alignItems: "flex-start",
															marginBottom: 8,
															gap: 12,
														}}
													>
														<h3 style={{ fontSize: 15, fontWeight: 700 }}>
															{project.title}
														</h3>
														<div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
															<Link
																href={`/p/${dev.username}?project=${project.id}`}
																scroll={false}
																className="btn btn-ghost btn-sm"
																style={{ gap: 4, color: "var(--brand-primary)" }}
															>
																Read Details & README
															</Link>
															{project.repoUrl && (
																<a
																	href={ensureAbsoluteUrl(project.repoUrl)}
																	target="_blank"
																	rel="noopener noreferrer"
																	className="btn btn-ghost btn-sm"
																	style={{ gap: 4 }}
																>
																	<Github size={13} /> Repo
																</a>
															)}
															{project.productionUrl && (
																<a
																	href={ensureAbsoluteUrl(project.productionUrl)}
																	target="_blank"
																	rel="noopener noreferrer"
																	className="btn btn-primary btn-sm"
																	style={{ gap: 4 }}
																>
																	<ExternalLink size={13} /> Live
																</a>
															)}
														</div>
													</div>
													<p
														style={{
															fontSize: 13,
															color: "var(--text-secondary)",
															marginBottom: 12,
														}}
													>
														{project.description}
													</p>
													{project.tags && project.tags.length > 0 && (
														<div
															style={{ display: "flex", flexWrap: "wrap", gap: 6 }}
														>
															{project.tags.map((tag) => (
																<span
																	key={tag}
																	style={{
																		fontSize: 11,
																		padding: "2px 8px",
																		background: "var(--brand-glow)",
																		color: "var(--brand-primary)",
																		borderRadius: "var(--radius-full)",
																		fontWeight: 500,
																	}}
																>
																	{tag}
																</span>
															))}
														</div>
													)}
												</div>
											))}
										</div>
									</div>
								)}
							</>
						)}
					</div>
				</div>

				{/* Back link */}
				<div style={{ marginTop: 40, textAlign: "center" }}>
					<Link href="/explore" className="btn btn-ghost btn-sm">
						← Back to Explore
					</Link>
				</div>
			</div>
		</div>
	);
}
