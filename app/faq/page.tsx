const FAQS = [
  {
    q: "Is OpenCodex Talent free for developers?",
    a: "Yes! Creating and maintaining your developer profile is completely free. We believe in reducing barriers for developers worldwide.",
  },
  {
    q: "How do I get my profile highlighted as 'Featured'?",
    a: "Featured profiles are curated manually by our team. Keep your profile complete, your README detailed, and your projects up to date. We review profiles monthly.",
  },
  {
    q: "Do companies pay to access developer profiles?",
    a: "Companies can browse all public profiles for free. Premium features for companies (like direct contact and saved searches) are on our roadmap.",
  },
  {
    q: "Can I import my profile from LinkedIn or GitHub?",
    a: "GitHub import is on our roadmap. For now, you can manually fill in your profile, which gives you more control over how you present yourself.",
  },
  {
    q: "How does the availability status work?",
    a: "You can set your status to 'Available', 'Busy', or 'Not Available' from your dashboard at any time. It shows up as a colored indicator on your profile card.",
  },
  {
    q: "Are developer profiles indexed by search engines?",
    a: "Yes. Profile pages are server-rendered with dynamic SEO titles, descriptions, and Open Graph metadata to help you get discovered.",
  },
  {
    q: "What is the dynamic title system?",
    a: "Instead of a plain job title, your profile displays a combined 'Seniority + Role' title — like 'Senior Frontend Engineer' or 'Lead Backend Engineer' — which is more informative at a glance.",
  },
  {
    q: "What Markdown is supported in READMEs?",
    a: "We support GitHub Flavored Markdown (GFM) — including tables, task lists, code blocks with syntax highlighting, images, and links.",
  },
];

export default function FAQPage() {
  return (
    <div style={{ padding: "60px 24px 80px" }}>
      <div className="container-section" style={{ maxWidth: 720 }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h1 style={{ fontSize: "2.25rem", fontWeight: 900, letterSpacing: "-0.5px", marginBottom: 12 }}>
            Frequently Asked Questions
          </h1>
          <p style={{ fontSize: 16, color: "var(--text-muted)" }}>
            Everything you need to know about OpenCodex Talent.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {FAQS.map((faq, i) => (
            <details
              key={i}
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border-base)",
                borderRadius: "var(--radius-md)",
                overflow: "hidden",
              }}
            >
              <summary
                style={{
                  padding: "18px 20px",
                  cursor: "pointer",
                  fontSize: 15,
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  listStyle: "none",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  userSelect: "none",
                }}
              >
                {faq.q}
                <span style={{ color: "var(--brand-primary)", fontSize: 20, fontWeight: 300, flexShrink: 0 }}>+</span>
              </summary>
              <div style={{ padding: "0 20px 18px", fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: "FAQ",
  description: "Frequently asked questions about OpenCodex Talent.",
};
