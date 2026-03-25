"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Menu, X, Code2, LogIn, User, Shield } from "lucide-react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/providers/AuthContext";

const NAV_LINKS = [
	{ href: "/", label: "Home" },
	{ href: "/explore", label: "Explore" },
	{ href: "/about", label: "About" },
];

function ThemeToggle() {
	const { theme, setTheme, resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);

	if (!mounted) return <div style={{ width: 36, height: 36 }} />;

	const isDark = resolvedTheme === "dark";
	return (
		<button
			onClick={() => setTheme(isDark ? "light" : "dark")}
			aria-label="Toggle theme"
			style={{
				width: 36,
				height: 36,
				borderRadius: "var(--radius-md)",
				background: "var(--bg-elevated)",
				border: "1px solid var(--border-base)",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				cursor: "pointer",
				color: "var(--text-secondary)",
				transition: "all var(--transition-fast)",
				flexShrink: 0,
			}}
		>
			{isDark ? <Sun size={16} /> : <Moon size={16} />}
		</button>
	);
}

export function Navbar() {
	const [menuOpen, setMenuOpen] = useState(false);
	const pathname = usePathname();
	const { user, isLoading: authLoading } = useAuth();

	return (
		<header
			className="glass"
			style={{
				position: "sticky",
				top: 0,
				zIndex: 50,
				borderBottom: "1px solid var(--border-base)",
				borderRadius: 0,
				backdropFilter: "blur(20px)",
			}}
		>
			<div
				className="container-section"
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					height: 60,
					flexWrap: "nowrap",
				}}
			>
				{/* Logo */}
				<Link
					href="/"
					style={{
						display: "flex",
						alignItems: "center",
						gap: 8,
						textDecoration: "none",
					}}
				>
					<div
						style={{
							width: 32,
							height: 32,
							borderRadius: "var(--radius-md)",
							background: "var(--gradient-brand)",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Code2 size={18} color="white" />
					</div>
					<span
						style={{
							fontSize: 16,
							fontWeight: 800,
							letterSpacing: "-0.3px",
							color: "var(--text-primary)",
						}}
					>
						Open
						<span className="gradient-text">Codex</span>
					</span>
				</Link>

				{/* Desktop nav */}
				<nav
					style={{ display: "flex", alignItems: "center", gap: 4 }}
					className="hidden-mobile"
				>
					{NAV_LINKS.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							style={{
								padding: "6px 14px",
								borderRadius: "var(--radius-md)",
								fontSize: 14,
								fontWeight: 500,
								textDecoration: "none",
								color:
									pathname === link.href
										? "var(--brand-primary)"
										: "var(--text-secondary)",
								background:
									pathname === link.href ? "var(--brand-glow)" : "transparent",
								transition: "all var(--transition-fast)",
							}}
						>
							{link.label}
						</Link>
					))}
				</nav>

				{/* Actions */}
				<div style={{ display: "flex", alignItems: "center", gap: 10 }}>
					<ThemeToggle />
					{!authLoading &&
						(user ? (
							<>
								{user.systemRole === "ADMIN" && (
									<Link
										href="/admin"
										className="btn btn-ghost btn-sm hidden-mobile"
										style={{ gap: 4 }}
									>
										<Shield size={14} /> Admin
									</Link>
								)}
								<Link
									href="/dashboard"
									className="btn btn-primary btn-sm hidden-mobile"
								>
									<User size={14} /> Dashboard
								</Link>
							</>
						) : (
							<Link
								href="/login"
								className="btn btn-ghost btn-sm hidden-mobile"
							>
								<LogIn size={14} /> Sign In
							</Link>
						))}
					{/* Hamburger */}
					<button
						onClick={() => setMenuOpen(!menuOpen)}
						aria-label="Toggle menu"
						className="show-mobile"
						style={{
							background: "transparent",
							border: "none",
							cursor: "pointer",
							color: "var(--text-primary)",
							display: "flex",
							alignItems: "center",
							padding: 4,
						}}
					>
						{menuOpen ? <X size={22} /> : <Menu size={22} />}
					</button>
				</div>
			</div>

			{/* Mobile menu */}
			{menuOpen && (
				<div
					style={{
						position: "absolute",
						top: "100%",
						left: 0,
						right: 0,
						background: "var(--bg-surface)",
						borderTop: "1px solid var(--border-base)",
						borderBottom: "1px solid var(--border-base)",
						padding: "12px 24px 20px",
						boxShadow: "var(--shadow-md)",
					}}
				>
					{NAV_LINKS.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							onClick={() => setMenuOpen(false)}
							style={{
								display: "block",
								padding: "10px 0",
								fontSize: 15,
								fontWeight: 500,
								color:
									pathname === link.href
										? "var(--brand-primary)"
										: "var(--text-primary)",
								textDecoration: "none",
								borderBottom: "1px solid var(--border-base)",
							}}
						>
							{link.label}
						</Link>
					))}
					<Link
						href={user ? "/dashboard" : "/login"}
						onClick={() => setMenuOpen(false)}
						className="btn btn-primary"
						style={{
							marginTop: 16,
							width: "100%",
							display: "flex",
							justifyContent: "center",
						}}
					>
						{user ? "Dashboard" : "Sign In"}
					</Link>
				</div>
			)}
		</header>
	);
}
