"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Code2, Github, ArrowRight, AlertCircle } from "lucide-react";
import { AuthService } from "@/lib/api/auth.service";
import { useAuth } from "@/components/providers/AuthContext";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const { login } = useAuth();
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setLoading(true);
		try {
			const res = await AuthService.login(email, password);
			login(res.access_token);
			router.push("/dashboard");
		} catch (err: unknown) {
			setError(err instanceof Error ? err.message : "Invalid credentials");
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
					maxWidth: 420,
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
					Welcome back
				</h1>
				<p
					style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 32 }}
				>
					Sign in to your OpenCodex account
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
						gap: 16,
						textAlign: "left",
					}}
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
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: 6,
							}}
						>
							<label
								style={{
									fontSize: 13,
									fontWeight: 600,
									color: "var(--text-secondary)",
								}}
							>
								Password
							</label>
							<Link
								href="#"
								style={{
									fontSize: 12,
									color: "var(--brand-primary)",
									textDecoration: "none",
								}}
							>
								Forgot password?
							</Link>
						</div>
						<input
							type="password"
							required
							className="input"
							placeholder="••••••••"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
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
						{loading ? "Signing in…" : "Sign in"}
						{!loading && <ArrowRight size={16} />}
					</button>
				</form>

				<p style={{ fontSize: 14, color: "var(--text-muted)", marginTop: 32 }}>
					Don&apos;t have an account?{" "}
					<Link
						href="/register"
						style={{
							color: "var(--brand-primary)",
							fontWeight: 600,
							textDecoration: "none",
						}}
					>
						Sign up
					</Link>
				</p>
			</div>
		</div>
	);
}
