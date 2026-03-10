"use client";

import { useState } from "react";
import { Send, CheckCircle, Mail, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const fieldStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    marginBottom: 20,
  };
  const labelStyle: React.CSSProperties = {
    fontSize: 13,
    fontWeight: 600,
    color: "var(--text-secondary)",
  };

  return (
    <div style={{ padding: "60px 24px 80px" }}>
      <div className="container-section" style={{ maxWidth: 900 }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h1
            style={{
              fontSize: "2.25rem",
              fontWeight: 900,
              letterSpacing: "-0.5px",
              marginBottom: 12,
            }}
          >
            Get in Touch
          </h1>
          <p style={{ fontSize: 16, color: "var(--text-muted)" }}>
            Questions, feedback, or partnership inquiries? We&apos;d love to
            hear from you.
          </p>
        </div>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 48 }}
        >
          {/* Info */}
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 24 }}>
              Contact Info
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                {
                  icon: <Mail size={18} />,
                  label: "Email",
                  value: "contact@opencodex.app",
                },
                {
                  icon: <MapPin size={18} />,
                  label: "Location",
                  value: "Remote-first, worldwide",
                },
                {
                  icon: <Clock size={18} />,
                  label: "Response time",
                  value: "Within 24 hours",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{ display: "flex", gap: 14, alignItems: "flex-start" }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "var(--radius-md)",
                      background: "var(--brand-glow)",
                      border: "1px solid rgba(99,102,241,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--brand-primary)",
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: 12,
                        color: "var(--text-muted)",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {item.label}
                    </p>
                    <p
                      style={{
                        fontSize: 14,
                        color: "var(--text-primary)",
                        marginTop: 2,
                      }}
                    >
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="card" style={{ padding: 32 }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <CheckCircle
                  size={48}
                  style={{
                    color: "var(--status-available)",
                    margin: "0 auto 16px",
                    display: "block",
                  }}
                />
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
                  Message Sent!
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: 14 }}>
                  We&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Your Name</label>
                  <input
                    required
                    className="input"
                    value={form.name}
                    placeholder="Alice Chen"
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                  />
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Email Address</label>
                  <input
                    required
                    type="email"
                    className="input"
                    value={form.email}
                    placeholder="alice@example.com"
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                  />
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Message</label>
                  <textarea
                    required
                    className="input"
                    rows={5}
                    value={form.message}
                    placeholder="Tell us what's on your mind…"
                    onChange={(e) =>
                      setForm((f) => ({ ...f, message: e.target.value }))
                    }
                    style={{ resize: "vertical", fontFamily: "inherit" }}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  <Send size={16} /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
