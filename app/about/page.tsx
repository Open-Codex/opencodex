import Link from "next/link";
import { ArrowRight, Zap, Shield, Globe, Code2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about OpenCodex Talent's mission to connect developers with opportunities worldwide.",
};

const VALUES = [
  {
    icon: <Code2 size={24} />,
    title: "Developer-first",
    desc: "Every design decision prioritizes the developer experience — from profile detail to filter ergonomics.",
  },
  {
    icon: <Globe size={24} />,
    title: "Global by default",
    desc: "Talent knows no borders. We support developers from 40+ countries and every technical background.",
  },
  {
    icon: <Zap size={24} />,
    title: "Signal over noise",
    desc: "Skills, READMEs, and projects tell more than a resume. We surface real work, not keywords.",
  },
  {
    icon: <Shield size={24} />,
    title: "Privacy-respecting",
    desc: "Your data is yours. We don't sell it, we don't track you, and we never will.",
  },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Create your profile", desc: "Set your seniority, role, skills, and availability. Write a README to tell your story." },
  { step: "02", title: "Show your work", desc: "Add your open-source projects, production apps, and GitHub repos." },
  { step: "03", title: "Get discovered", desc: "Companies and teams browse by stack, location, and availability. SEO-optimized profiles help you rank." },
];

export default function AboutPage() {
  return (
    <div style={{ padding: "60px 24px 80px" }}>
      <div className="container-section" style={{ maxWidth: 800 }}>
        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: 900, letterSpacing: "-1px", marginBottom: 16 }}>
            Built for developers,
            <br />
            <span className="gradient-text">by developers</span>
          </h1>
          <p style={{ fontSize: 17, color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: 560, margin: "0 auto 32px" }}>
            OpenCodex Talent is a professional hub where developers showcase their skills, projects,
            and READMEs — and get found by companies that actually understand technical work.
          </p>
          <Link href="/explore" className="btn btn-primary btn-lg">
            Explore Talent <ArrowRight size={16} />
          </Link>
        </div>

        {/* Values */}
        <div style={{ marginBottom: 72 }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: 32, textAlign: "center" }}>
            Our Values
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {VALUES.map((v) => (
              <div key={v.title} className="card" style={{ padding: 24 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: "var(--radius-md)",
                  background: "var(--brand-glow)", border: "1px solid rgba(99,102,241,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--brand-primary)", marginBottom: 16,
                }}>
                  {v.icon}
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>{v.title}</h3>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.65 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: 32, textAlign: "center" }}>
            How It Works
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {HOW_IT_WORKS.map((item, i) => (
              <div key={item.step} style={{
                display: "flex", gap: 24, alignItems: "flex-start",
                paddingBottom: i < HOW_IT_WORKS.length - 1 ? 32 : 0,
                borderLeft: i < HOW_IT_WORKS.length - 1 ? "2px solid var(--border-base)" : "2px solid transparent",
                marginLeft: 20, paddingLeft: 28, position: "relative",
              }}>
                <div style={{
                  position: "absolute", left: -18, top: 0,
                  width: 34, height: 34, borderRadius: "50%",
                  background: "var(--gradient-brand)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontWeight: 800, color: "white", flexShrink: 0,
                }}>
                  {item.step}
                </div>
                <div style={{ paddingTop: 4 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{item.title}</h3>
                  <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.65 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
