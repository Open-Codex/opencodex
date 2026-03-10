import Link from "next/link";
import { Code2, Github, ArrowRight } from "lucide-react";

export default function LoginPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "calc(100vh - 130px)", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
      <div className="card" style={{ width: "100%", maxWidth: 420, padding: "40px 32px", textAlign: "center" }}>
        
        {/* Logo */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <div style={{ width: 48, height: 48, borderRadius: "var(--radius-md)", background: "var(--gradient-brand)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Code2 size={24} color="white" />
          </div>
        </div>

        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: 8 }}>Welcome back</h1>
        <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 32 }}>
          Sign in to your OpenCodex Talent account
        </p>

        {/* OAuth Buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
          <button className="btn btn-ghost" style={{ width: "100%", padding: "12px 16px", justifyContent: "center" }}>
            <Github size={18} />
            Continue with GitHub
          </button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
          <div className="divider" style={{ flex: 1 }}></div>
          <span style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 500, textTransform: "uppercase" }}>or</span>
          <div className="divider" style={{ flex: 1 }}></div>
        </div>

        {/* Form */}
        <form style={{ display: "flex", flexDirection: "column", gap: 16, textAlign: "left" }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>Email address</label>
            <input type="email" required className="input" placeholder="alice@example.com" />
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: "var(--text-secondary)" }}>Password</label>
              <Link href="#" style={{ fontSize: 12, color: "var(--brand-primary)", textDecoration: "none" }}>Forgot password?</Link>
            </div>
            <input type="password" required className="input" placeholder="••••••••" />
          </div>
          
          <Link href="/dashboard" className="btn btn-primary" style={{ width: "100%", marginTop: 8, padding: "12px 16px", justifyContent: "center" }}>
            Sign in
            <ArrowRight size={16} />
          </Link>
        </form>

        <p style={{ fontSize: 14, color: "var(--text-muted)", marginTop: 32 }}>
          Don&apos;t have an account?{" "}
          <Link href="/register" style={{ color: "var(--brand-primary)", fontWeight: 600, textDecoration: "none" }}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
