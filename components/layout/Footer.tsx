import Link from "next/link";
import { Code2, Github, Twitter, Linkedin } from "lucide-react";

const FOOTER_LINKS = {
  Product: [
    { label: "Explore Talent", href: "/explore" },
    { label: "Developer Profiles", href: "/explore" },
    { label: "Join the Hub", href: "/dashboard" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/faq" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/privacy" },
  ],
};

export function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border-base)",
        background: "var(--bg-surface)",
        marginTop: "auto",
      }}
    >
      <div className="container-section" style={{ padding: "48px 24px 32px" }}>
        {/* Top: logo + links */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: 40,
            marginBottom: 40,
          }}
        >
          {/* Brand */}
          <div>
            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                textDecoration: "none",
                marginBottom: 16,
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
                  fontWeight: 800,
                  fontSize: 15,
                  color: "var(--text-primary)",
                }}
              >
                OpenCodex{" "}
                <span
                  style={{
                    background: "var(--gradient-brand)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Talent
                </span>
              </span>
            </Link>
            <p
              style={{
                fontSize: 13,
                color: "var(--text-muted)",
                lineHeight: 1.65,
                maxWidth: 220,
              }}
            >
              A professional hub for discovering and showcasing developer talent
              worldwide.
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              {[
                { icon: <Github size={16} />, href: "https://github.com" },
                { icon: <Twitter size={16} />, href: "https://twitter.com" },
                { icon: <Linkedin size={16} />, href: "https://linkedin.com" },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: "var(--radius-md)",
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border-base)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--text-muted)",
                    transition: "all var(--transition-fast)",
                    textDecoration: "none",
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: 16,
                }}
              >
                {title}
              </h4>
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      style={{
                        fontSize: 14,
                        color: "var(--text-secondary)",
                        textDecoration: "none",
                        transition: "color var(--transition-fast)",
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="divider" />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 24,
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
            © 2026 OpenCodex Talent. All rights reserved.
          </p>
          <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
            Built for developers, by developers.
          </p>
        </div>
      </div>
    </footer>
  );
}
