import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "OpenCodex Talent privacy policy and data practices.",
};

const SECTIONS = [
  {
    title: "1. Data We Collect",
    content:
      "We collect information you provide when creating your profile: name, username, bio, skills, project links, and social media URLs. We also collect standard server logs (IP addresses, browser type, pages visited) for security and performance purposes.",
  },
  {
    title: "2. How We Use Your Data",
    content:
      "Your profile data is used to display your public developer profile. We do not sell your personal information to third parties. Server logs are used solely for security monitoring and are deleted after 30 days.",
  },
  {
    title: "3. Public Profiles",
    content:
      "By creating a profile, you agree that the information you add (name, bio, skills, projects, social links, availability status) is publicly visible and indexed by search engines. You can make your profile private or delete it at any time from your dashboard.",
  },
  {
    title: "4. Cookies",
    content:
      "We use a single cookie to remember your dark/light mode preference. We do not use tracking cookies, analytics cookies, or third-party advertising cookies.",
  },
  {
    title: "5. Data Retention",
    content:
      "Your profile data is retained as long as your account is active. You can request deletion of your account and all associated data by contacting us at privacy@opencodex.dev.",
  },
  {
    title: "6. Third-Party Services",
    content:
      "We use Vercel for hosting (subject to Vercel's privacy policy). We do not integrate any third-party analytics, advertising, or tracking services.",
  },
  {
    title: "7. Your Rights",
    content:
      "Depending on your jurisdiction, you may have rights to access, correct, or delete your personal data. Contact us at privacy@opencodex.dev to exercise these rights.",
  },
  {
    title: "8. Changes to This Policy",
    content:
      "We may update this policy from time to time. Significant changes will be communicated via your registered email address. Continued use of the platform after changes constitutes acceptance.",
  },
];

export default function PrivacyPage() {
  return (
    <div style={{ padding: "60px 24px 80px" }}>
      <div className="container-section" style={{ maxWidth: 720 }}>
        <div style={{ marginBottom: 48 }}>
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: 900,
              letterSpacing: "-0.5px",
              marginBottom: 12,
            }}
          >
            Privacy Policy
          </h1>
          <p style={{ fontSize: 14, color: "var(--text-muted)" }}>
            Last updated: January 1, 2025
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {SECTIONS.map((section) => (
            <div key={section.title}>
              <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10 }}>
                {section.title}
              </h2>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--text-secondary)",
                  lineHeight: 1.75,
                }}
              >
                {section.content}
              </p>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 48,
            padding: 20,
            background: "var(--bg-elevated)",
            border: "1px solid var(--border-base)",
            borderRadius: "var(--radius-md)",
            fontSize: 14,
            color: "var(--text-secondary)",
          }}
        >
          Questions about this policy? Email us at{" "}
          <a
            href="mailto:contact@opencodex.app"
            style={{ color: "var(--brand-primary)" }}
          >
            contact@opencodex.app
          </a>
        </div>
      </div>
    </div>
  );
}
