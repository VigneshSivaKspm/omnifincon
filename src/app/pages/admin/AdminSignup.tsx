import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Eye, EyeOff, Lock, Mail, User, AlertCircle, CheckCircle, Shield } from "lucide-react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../../lib/firebase";
import { G, TEXT1, TEXT2, TEXT3, FONT_SANS, FONT_SERIF, SURF_BORDER } from "../../../lib/tokens";

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: "8+ characters",     ok: password.length >= 8 },
    { label: "Uppercase letter",  ok: /[A-Z]/.test(password) },
    { label: "Lowercase letter",  ok: /[a-z]/.test(password) },
    { label: "Number or symbol",  ok: /[\d!@#$%^&*]/.test(password) },
  ];
  const score = checks.filter(c => c.ok).length;
  const barColor = score <= 1 ? "#EF4444" : score <= 2 ? "#F59E0B" : score === 3 ? "#3B82F6" : G;

  return (
    <div style={{ marginTop: 10 }}>
      <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} style={{ flex: 1, height: 4, borderRadius: 99, background: i <= score ? barColor : "#EBF0F8", transition: "background 0.3s ease" }} />
        ))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 16px" }}>
        {checks.map(c => (
          <div key={c.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <CheckCircle size={11} color={c.ok ? G : TEXT3} />
            <span style={{ fontFamily: FONT_SANS, fontSize: "0.68rem", color: c.ok ? G : TEXT3 }}>{c.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminSignup() {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail]             = useState("");
  const [password, setPassword]       = useState("");
  const [confirm, setConfirm]         = useState("");
  const [showPw, setShowPw]           = useState(false);
  const [showCf, setShowCf]           = useState(false);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState("");
  const [success, setSuccess]         = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!displayName.trim()) { setError("Full name is required."); return; }
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    if (password !== confirm) { setError("Passwords do not match."); return; }

    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
      await updateProfile(cred.user, { displayName: displayName.trim() });
      setSuccess(true);
      setTimeout(() => navigate("/admin", { replace: true }), 1800);
    } catch (err: any) {
      const code = err?.code ?? "";
      if (code === "auth/email-already-in-use") {
        setError("An account with this email already exists.");
      } else if (code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (code === "auth/weak-password") {
        setError("Password is too weak. Use at least 8 characters.");
      } else {
        setError("Account creation failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = {
    width: "100%", paddingTop: 12, paddingBottom: 12, paddingRight: 14,
    border: `1px solid ${SURF_BORDER}`, borderRadius: 10, fontFamily: FONT_SANS,
    fontSize: "0.9rem", color: TEXT1, background: "#F4F7FD", outline: "none",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F4F7FD", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      {/* Background orbs */}
      <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "-10%", left: "-5%", width: 500, height: 500, borderRadius: "50%", background: `${G}07`, filter: "blur(80px)" }} />
        <div style={{ position: "absolute", bottom: "-10%", right: "-5%", width: 400, height: 400, borderRadius: "50%", background: `${G}05`, filter: "blur(60px)" }} />
      </div>

      <div style={{ position: "relative", width: "100%", maxWidth: 440 }}>
        {/* Logo & title */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16, background: G,
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 16px", boxShadow: `0 8px 24px ${G}40`,
          }}>
            <Shield size={24} color="#fff" />
          </div>
          <h1 style={{ fontFamily: FONT_SERIF, fontSize: "1.75rem", fontWeight: 700, color: TEXT1, marginBottom: 6 }}>
            Create Admin Account
          </h1>
          <p style={{ fontFamily: FONT_SANS, fontSize: "0.88rem", color: TEXT2 }}>
            OMNI Fincon — Content Management
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: "#fff", border: `1px solid ${SURF_BORDER}`, borderRadius: 20,
          padding: "36px 32px",
          boxShadow: "0 8px 40px rgba(11,26,46,0.1), 0 2px 8px rgba(11,26,46,0.06)",
        }}>
          {success ? (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: `${G}15`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                <CheckCircle size={28} color={G} />
              </div>
              <h2 style={{ fontFamily: FONT_SERIF, fontSize: "1.3rem", fontWeight: 700, color: TEXT1, marginBottom: 8 }}>
                Account Created!
              </h2>
              <p style={{ fontFamily: FONT_SANS, fontSize: "0.88rem", color: TEXT2 }}>
                Redirecting to dashboard…
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {/* Full name */}
              <div>
                <label style={{ display: "block", fontFamily: FONT_SANS, fontSize: "0.78rem", fontWeight: 600, color: TEXT2, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Full Name
                </label>
                <div style={{ position: "relative" }}>
                  <User size={15} color={TEXT3} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
                  <input
                    type="text"
                    required
                    value={displayName}
                    onChange={e => setDisplayName(e.target.value)}
                    placeholder="e.g. Rajesh Sharma"
                    style={{ ...inputStyle, paddingLeft: 42 }}
                    onFocus={e => (e.target.style.border = `1px solid ${G}60`)}
                    onBlur={e => (e.target.style.border = `1px solid ${SURF_BORDER}`)}
                  />
                </div>
              </div>

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
                    style={{ ...inputStyle, paddingLeft: 42 }}
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
                    placeholder="Min 8 characters"
                    style={{ ...inputStyle, paddingLeft: 42, paddingRight: 44 }}
                    onFocus={e => (e.target.style.border = `1px solid ${G}60`)}
                    onBlur={e => (e.target.style.border = `1px solid ${SURF_BORDER}`)}
                  />
                  <button type="button" onClick={() => setShowPw(p => !p)}
                    style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 4 }}>
                    {showPw ? <EyeOff size={15} color={TEXT3} /> : <Eye size={15} color={TEXT3} />}
                  </button>
                </div>
                {password && <PasswordStrength password={password} />}
              </div>

              {/* Confirm password */}
              <div>
                <label style={{ display: "block", fontFamily: FONT_SANS, fontSize: "0.78rem", fontWeight: 600, color: TEXT2, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Confirm Password
                </label>
                <div style={{ position: "relative" }}>
                  <Lock size={15} color={TEXT3} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
                  <input
                    type={showCf ? "text" : "password"}
                    required
                    value={confirm}
                    onChange={e => setConfirm(e.target.value)}
                    placeholder="Re-enter your password"
                    style={{
                      ...inputStyle, paddingLeft: 42, paddingRight: 44,
                      borderColor: confirm && confirm !== password ? "#FECACA" : undefined,
                    }}
                    onFocus={e => (e.target.style.border = `1px solid ${G}60`)}
                    onBlur={e => (e.target.style.border = confirm && confirm !== password ? "1px solid #FECACA" : `1px solid ${SURF_BORDER}`)}
                  />
                  <button type="button" onClick={() => setShowCf(p => !p)}
                    style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 4 }}>
                    {showCf ? <EyeOff size={15} color={TEXT3} /> : <Eye size={15} color={TEXT3} />}
                  </button>
                </div>
                {confirm && confirm !== password && (
                  <p style={{ fontFamily: FONT_SANS, fontSize: "0.72rem", color: "#EF4444", marginTop: 6 }}>Passwords do not match.</p>
                )}
              </div>

              {/* Error */}
              {error && (
                <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 10, padding: "10px 14px" }}>
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
                  letterSpacing: "0.06em", boxShadow: loading ? "none" : `0 4px 16px ${G}40`,
                  transition: "all 0.2s ease",
                }}
              >
                {loading ? "Creating account…" : "Create Admin Account"}
              </button>
            </form>
          )}
        </div>

        {/* Back to login */}
        <p style={{ textAlign: "center", marginTop: 20, fontFamily: FONT_SANS, fontSize: "0.84rem", color: TEXT2 }}>
          Already have an account?{" "}
          <Link to="/admin/login" style={{ color: G, fontWeight: 600, textDecoration: "none" }}>
            Sign in
          </Link>
        </p>
      </div>

      <style>{`input::placeholder { color: #8BA2BA; }`}</style>
    </div>
  );
}
