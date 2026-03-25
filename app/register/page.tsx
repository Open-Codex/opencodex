"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Code2, Github, ArrowRight, AlertCircle } from "lucide-react";
import { AuthService } from "@/lib/api/auth.service";
import { useAuth } from "@/components/providers/AuthContext";

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

export default function RegisterPage() {
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [seniority, setSeniority] = useState("Junior");
	const [role, setRole] = useState("Full Stack Engineer");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const { login } = useAuth();
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setLoading(true);
		try {
			const res = await AuthService.register({
				email,
				password,
				name,
				username,
				seniority,
				role,
			});
			login(res.access_token);
			router.push("/dashboard");
		} catch (err: unknown) {
			setError(err instanceof Error ? err.message : "Registration failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				minHeight: "calc(100vh - 130px)",
				alignItems: "center",
				justifyContent: "center",
				padding: "40px 24px",
			}}
		>
			<div
				className="card"
				style={{
					width: "100%",
					maxWidth: 440,
					padding: "40px 32px",
					textAlign: "center",
				}}
			>
				{/* Logo */}
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						marginBottom: 24,
					}}
				>
					<div
						style={{
							width: 48,
							height: 48,
							borderRadius: "var(--radius-md)",
							background: "var(--gradient-brand)",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Code2 size={24} color="white" />
					</div>
				</div>

				<h1 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: 8 }}>
					Create an account
				</h1>
				<p
					style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 32 }}
				>
					Join the developer talent hub today
				</p>

				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: 16,
						marginBottom: 24,
					}}
				>
					<div className="divider" style={{ flex: 1 }}></div>
					<span
						style={{
							fontSize: 13,
							color: "var(--text-muted)",
							fontWeight: 500,
							textTransform: "uppercase",
						}}
					></span>
					<div className="divider" style={{ flex: 1 }}></div>
				</div>

				{/* Error */}
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
							marginBottom: 16,
							textAlign: "left",
						}}
					>
						<AlertCircle size={15} style={{ flexShrink: 0 }} /> {error}
					</div>
				)}

				{/* Form */}
				<form
					onSubmit={handleSubmit}
					style={{
						display: "flex",
						flexDirection: "column",
						gap: 14,
						textAlign: "left",
					}}
				>
					<div
						style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
					>
						<div>
							<label
								style={{
									fontSize: 13,
									fontWeight: 600,
									color: "var(--text-secondary)",
									display: "block",
									marginBottom: 6,
								}}
							>
								Full name
							</label>
							<input
								type="text"
								required
								className="input"
								placeholder="Alice Chen"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
						<div>
							<label
								style={{
									fontSize: 13,
									fontWeight: 600,
									color: "var(--text-secondary)",
									display: "block",
									marginBottom: 6,
								}}
							>
								Username
							</label>
							<input
								type="text"
								required
								className="input"
								placeholder="alice-chen"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</div>
					</div>
					<div>
						<label
							style={{
								fontSize: 13,
								fontWeight: 600,
								color: "var(--text-secondary)",
								display: "block",
								marginBottom: 6,
							}}
						>
							Email address
						</label>
						<input
							type="email"
							required
							className="input"
							placeholder="alice@example.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div>
						<label
							style={{
								fontSize: 13,
								fontWeight: 600,
								color: "var(--text-secondary)",
								display: "block",
								marginBottom: 6,
							}}
						>
							Password
						</label>
						<input
							type="password"
							required
							className="input"
							placeholder="••••••••"
							minLength={6}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<p
							style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 6 }}
						>
							At least 6 characters.
						</p>
					</div>
					<div
						style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
					>
						<div>
							<label
								style={{
									fontSize: 13,
									fontWeight: 600,
									color: "var(--text-secondary)",
									display: "block",
									marginBottom: 6,
								}}
							>
								Seniority
							</label>
							<select
								className="input"
								value={seniority}
								onChange={(e) => setSeniority(e.target.value)}
							>
								{SENIORITIES.map((s) => (
									<option key={s}>{s}</option>
								))}
							</select>
						</div>
						<div>
							<label
								style={{
									fontSize: 13,
									fontWeight: 600,
									color: "var(--text-secondary)",
									display: "block",
									marginBottom: 6,
								}}
							>
								Role
							</label>
							<select
								className="input"
								value={role}
								onChange={(e) => setRole(e.target.value)}
							>
								{ROLES.map((r) => (
									<option key={r}>{r}</option>
								))}
							</select>
						</div>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="btn btn-primary"
						style={{
							width: "100%",
							marginTop: 8,
							padding: "12px 16px",
							justifyContent: "center",
						}}
					>
						{loading ? "Creating account…" : "Create Account"}
						{!loading && <ArrowRight size={16} />}
					</button>
				</form>

				<p style={{ fontSize: 14, color: "var(--text-muted)", marginTop: 32 }}>
					Already have an account?{" "}
					<Link
						href="/login"
						style={{
							color: "var(--brand-primary)",
							fontWeight: 600,
							textDecoration: "none",
						}}
					>
						Sign in
					</Link>
				</p>
			</div>
		</div>
	);
}
