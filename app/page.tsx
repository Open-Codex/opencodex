import Link from "next/link";
import { getFeaturedDevelopers } from "@/lib/mock-actions";
import { DeveloperCard } from "@/components/ui/DeveloperCard";
import { ArrowRight, Search, Users, Globe, Star } from "lucide-react";

const STATS = [
  { value: "1,200+", label: "Developers" },
  { value: "40+",    label: "Countries" },
  { value: "80+",    label: "Specialties" },
  { value: "94%",    label: "Hire rate" },
];

export default async function HomePage() {
  const featured = await getFeaturedDevelopers();

  return (
    <div>
      {/* ── HERO ── */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "100px 24px 80px",
          textAlign: "center",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            top: "-30%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 700,
            height: 700,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(139,92,246,0.08) 50%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div className="container-section" style={{ position: "relative" }}>
          {/* Badge */}
          <div
            className="animate-fade-in"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "5px 14px",
              borderRadius: "var(--radius-full)",
              background: "var(--brand-glow)",
              border: "1px solid rgba(99,102,241,0.25)",
              fontSize: 13,
              fontWeight: 600,
              color: "var(--brand-primary)",
              marginBottom: 24,
            }}
          >
            <Star size={13} fill="currentColor" />
            The Professional Developer Hub
          </div>

          {/* Headline */}
          <h1
            className="animate-fade-in-up"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-1.5px",
              color: "var(--text-primary)",
              marginBottom: 20,
              animationDelay: "0.1s",
              opacity: 0,
              animationFillMode: "forwards",
            }}
          >
            Discover the world&apos;s best
            <br />
            <span className="gradient-text">developer talent</span>
          </h1>

          {/* Subheading */}
          <p
            className="animate-fade-in-up"
            style={{
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              color: "var(--text-secondary)",
              maxWidth: 540,
              margin: "0 auto 40px",
              lineHeight: 1.65,
              animationDelay: "0.2s",
              opacity: 0,
              animationFillMode: "forwards",
            }}
          >
            Browse developer profiles, explore open-source projects, and connect with
            engineers from 40+ countries.
          </p>

          {/* CTAs */}
          <div
            className="animate-fade-in-up"
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: 48,
              animationDelay: "0.3s",
              opacity: 0,
              animationFillMode: "forwards",
            }}
          >
            <Link href="/explore" className="btn btn-primary btn-lg">
              <Search size={18} />
              Explore Talent
              <ArrowRight size={16} />
            </Link>
            <Link href="/dashboard" className="btn btn-ghost btn-lg">
              <Users size={18} />
              Create Your Profile
            </Link>
          </div>

          {/* Quick search */}
          <div
            className="animate-fade-in-up"
            style={{
              maxWidth: 480,
              margin: "0 auto",
              animationDelay: "0.4s",
              opacity: 0,
              animationFillMode: "forwards",
            }}
          >
            <form action="/explore" method="get">
              <div style={{ position: "relative" }}>
                <Search
                  size={16}
                  style={{
                    position: "absolute",
                    left: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--text-muted)",
                  }}
                />
                <input
                  name="stack"
                  placeholder="Search by tech… React, Go, Rust, Python"
                  className="input"
                  style={{ paddingLeft: 40, paddingRight: 120, fontSize: 14, height: 48 }}
                />
                <button
                  type="submit"
                  className="btn btn-primary btn-sm"
                  style={{
                    position: "absolute",
                    right: 6,
                    top: "50%",
                    transform: "translateY(-50%)",
                    height: 36,
                  }}
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ padding: "0 24px 72px" }}>
        <div className="container-section">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 1,
              background: "var(--border-base)",
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
              border: "1px solid var(--border-base)",
            }}
          >
            {STATS.map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: "var(--bg-surface)",
                  padding: "28px 24px",
                  textAlign: "center",
                }}
              >
                <div
                  className="gradient-text"
                  style={{ fontSize: "2rem", fontWeight: 900, lineHeight: 1 }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "var(--text-muted)",
                    fontWeight: 500,
                    marginTop: 6,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED DEVELOPERS ── */}
      <section style={{ padding: "0 24px 80px" }}>
        <div className="container-section">
          {/* Section header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 32,
            }}
          >
            <div>
              <h2 style={{ fontSize: "1.75rem", fontWeight: 800, letterSpacing: "-0.5px" }}>
                Featured Developers
              </h2>
              <p style={{ fontSize: 14, color: "var(--text-muted)", marginTop: 4 }}>
                Hand-picked talent from across the globe
              </p>
            </div>
            <Link
              href="/explore"
              className="btn btn-ghost btn-sm"
              style={{ display: "flex", alignItems: "center", gap: 6 }}
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>

          {/* Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 16,
            }}
          >
            {featured.map((dev) => (
              <DeveloperCard key={dev.id} developer={dev} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section style={{ padding: "0 24px 80px" }}>
        <div className="container-section">
          <div
            style={{
              borderRadius: "var(--radius-xl)",
              background: "var(--gradient-brand)",
              padding: "60px 48px",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Decorative circles */}
            <div
              style={{
                position: "absolute",
                top: -60,
                right: -60,
                width: 200,
                height: 200,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.08)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: -40,
                left: -40,
                width: 160,
                height: 160,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.06)",
              }}
            />
            <Globe
              size={40}
              style={{ color: "rgba(255,255,255,0.7)", marginBottom: 20, display: "block", margin: "0 auto 20px" }}
            />
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: 900,
                color: "white",
                marginBottom: 12,
              }}
            >
              Ready to showcase your skills?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 16, marginBottom: 32 }}>
              Create your developer profile and get discovered by companies worldwide.
            </p>
            <Link
              href="/dashboard"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 32px",
                borderRadius: "var(--radius-lg)",
                background: "white",
                color: "#6366f1",
                fontWeight: 700,
                fontSize: 15,
                textDecoration: "none",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                transition: "all var(--transition-fast)",
              }}
            >
              Create Free Profile <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
