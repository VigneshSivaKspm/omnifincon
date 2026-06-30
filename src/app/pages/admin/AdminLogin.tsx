import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Eye, EyeOff, Lock, Mail, AlertCircle } from "lucide-react";
import { useAuth } from "../../../lib/authContext";
import { G, TEXT1, TEXT2, TEXT3, FONT_SANS, FONT_SERIF, SURF_BORDER } from "../../../lib/tokens";

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/admin", { replace: true });
    } catch (err: any) {
      const code = err?.code ?? "";
      if (code === "auth/user-not-found" || code === "auth/wrong-password" || code === "auth/invalid-credential") {
        setError("Invalid email or password.");
      } else if (code === "auth/too-many-requests") {
        setError("Too many failed attempts. Please try again later.");
      } else {
        setError("Login failed. Check your credentials and try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#F4F7FD", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      {/* Background orbs */}
      <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "-10%", right: "-5%", width: 500, height: 500, borderRadius: "50%", background: `${G}08`, filter: "blur(80px)" }} />
        <div style={{ position: "absolute", bottom: "-10%", left: "-5%", width: 400, height: 400, borderRadius: "50%", background: `${G}06`, filter: "blur(60px)" }} />
      </div>

      <div style={{ position: "relative", width: "100%", maxWidth: 420 }}>
        {/* Logo & title */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16, background: G,
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 16px", boxShadow: `0 8px 24px ${G}40`,
          }}>
            <Lock size={24} color="#fff" />
          </div>
          <h1 style={{ fontFamily: FONT_SERIF, fontSize: "1.75rem", fontWeight: 700, color: TEXT1, marginBottom: 6 }}>
            Admin Portal
          </h1>
          <p style={{ fontFamily: FONT_SANS, fontSize: "0.88rem", color: TEXT2 }}>
            OMNI Fincon — Content Management
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: "#fff",
          border: `1px solid ${SURF_BORDER}`,
          borderRadius: 20,
          padding: "36px 32px",
          boxShadow: "0 8px 40px rgba(11,26,46,0.1), 0 2px 8px rgba(11,26,46,0.06)",
        }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Email */}
            <div>
              <label style={{ display: "block", fontFamily: FONT_SANS, fontSize: "0.78rem", fontWeight: 600, color: TEXT2, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Email Address
              </label>
              <div style={{ position: "relative" }}>
                <Mail size={15} color={TEXT3} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@omnifincon.com"
                  style={{
                    width: "100%", paddingLeft: 42, paddingRight: 14, paddingTop: 12, paddingBottom: 12,
                    border: `1px solid ${SURF_BORDER}`, borderRadius: 10, fontFamily: FONT_SANS,
                    fontSize: "0.9rem", color: TEXT1, background: "#F4F7FD", outline: "none",
                  }}
                  onFocus={e => (e.target.style.border = `1px solid ${G}60`)}
                  onBlur={e => (e.target.style.border = `1px solid ${SURF_BORDER}`)}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label style={{ display: "block", fontFamily: FONT_SANS, fontSize: "0.78rem", fontWeight: 600, color: TEXT2, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <Lock size={15} color={TEXT3} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
                <input
                  type={showPw ? "text" : "password"}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{
                    width: "100%", paddingLeft: 42, paddingRight: 44, paddingTop: 12, paddingBottom: 12,
                    border: `1px solid ${SURF_BORDER}`, borderRadius: 10, fontFamily: FONT_SANS,
                    fontSize: "0.9rem", color: TEXT1, background: "#F4F7FD", outline: "none",
                  }}
                  onFocus={e => (e.target.style.border = `1px solid ${G}60`)}
                  onBlur={e => (e.target.style.border = `1px solid ${SURF_BORDER}`)}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(p => !p)}
                  style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 4 }}
                >
                  {showPw ? <EyeOff size={15} color={TEXT3} /> : <Eye size={15} color={TEXT3} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div style={{
                display: "flex", alignItems: "center", gap: 10,
                background: "#FEF2F2", border: "1px solid #FECACA",
                borderRadius: 10, padding: "10px 14px",
              }}>
                <AlertCircle size={15} color="#DC2626" />
                <p style={{ fontFamily: FONT_SANS, fontSize: "0.82rem", color: "#DC2626" }}>{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%", padding: "13px 0", borderRadius: 10, border: "none",
                background: loading ? `${G}80` : G, color: "#fff", fontFamily: FONT_SANS,
                fontSize: "0.9rem", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
                letterSpacing: "0.06em", transition: "all 0.2s ease",
                boxShadow: loading ? "none" : `0 4px 16px ${G}40`,
              }}
            >
              {loading ? "Signing in…" : "Sign In to Admin"}
            </button>
          </form>
        </div>

        <p style={{ textAlign: "center", marginTop: 20, fontFamily: FONT_SANS, fontSize: "0.84rem", color: TEXT2 }}>
          Don't have an account?{" "}
          <Link to="/admin/signup" style={{ color: G, fontWeight: 600, textDecoration: "none" }}>
            Create one
          </Link>
        </p>
      </div>

      <style>{`input::placeholder { color: #8BA2BA; }`}</style>
    </div>
  );
}
