import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FileText, Eye, BarChart2, PlusCircle, ArrowRight, TrendingUp, Clock } from "lucide-react";
import { getAllPosts, BlogPost } from "../../../lib/blogService";
import { G, BLUE, GOLD, PURPLE, TEXT1, TEXT2, TEXT3, FONT_SANS, FONT_SERIF, SURF_BORDER } from "../../../lib/tokens";
import { useAuth } from "../../../lib/authContext";

function StatCard({ label, value, icon: Icon, color, sub }: { label: string; value: string | number; icon: any; color: string; sub?: string }) {
  return (
    <div style={{
      background: "#fff", border: `1px solid ${SURF_BORDER}`, borderRadius: 16, padding: "20px 24px",
      display: "flex", alignItems: "center", gap: 16,
    }}>
      <div style={{ width: 48, height: 48, borderRadius: 12, background: `${color}12`, border: `1px solid ${color}20`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon size={20} color={color} />
      </div>
      <div>
        <p style={{ fontFamily: FONT_SANS, fontSize: "0.72rem", color: TEXT3, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 4 }}>{label}</p>
        <p style={{ fontFamily: FONT_SERIF, fontSize: "1.75rem", fontWeight: 700, color: TEXT1, lineHeight: 1 }}>{value}</p>
        {sub && <p style={{ fontFamily: FONT_SANS, fontSize: "0.72rem", color: TEXT2, marginTop: 4 }}>{sub}</p>}
      </div>
    </div>
  );
}

function formatDate(ts: any): string {
  if (!ts) return "—";
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllPosts().then(setPosts).finally(() => setLoading(false));
  }, []);

  const published = posts.filter(p => p.status === "published");
  const drafts = posts.filter(p => p.status === "draft");
  const totalViews = posts.reduce((acc, p) => acc + (p.views ?? 0), 0);
  const recent = posts.slice(0, 5);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <p style={{ fontFamily: FONT_SANS, fontSize: "0.8rem", color: TEXT3, marginBottom: 4 }}>
            {greeting}, {user?.email?.split("@")[0] ?? "Admin"}
          </p>
          <h1 style={{ fontFamily: FONT_SERIF, fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: 700, color: TEXT1 }}>
            Dashboard Overview
          </h1>
        </div>
        <button
          onClick={() => navigate("/admin/posts/new")}
          style={{
            display: "flex", alignItems: "center", gap: 8, padding: "11px 22px",
            background: G, border: "none", borderRadius: 10, cursor: "pointer",
            fontFamily: FONT_SANS, fontSize: "0.84rem", fontWeight: 700, color: "#fff",
            boxShadow: `0 4px 16px ${G}40`,
          }}
        >
          <PlusCircle size={15} /> New Post
        </button>
      </div>

      {/* Stats */}
      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} style={{ background: "#fff", border: `1px solid ${SURF_BORDER}`, borderRadius: 16, padding: 24, height: 100, animation: "pulse 1.5s ease-in-out infinite" }} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Posts"   value={posts.length}      icon={FileText}   color={G}      sub="All time" />
          <StatCard label="Published"     value={published.length}  icon={TrendingUp} color={BLUE}   sub="Live on blog" />
          <StatCard label="Drafts"        value={drafts.length}     icon={Clock}      color={GOLD}   sub="Unpublished" />
          <StatCard label="Total Views"   value={totalViews.toLocaleString()} icon={Eye} color={PURPLE} sub="Across all posts" />
        </div>
      )}

      {/* Recent posts */}
      <div style={{ background: "#fff", border: `1px solid ${SURF_BORDER}`, borderRadius: 16, overflow: "hidden" }}>
        <div style={{ padding: "20px 24px", borderBottom: `1px solid ${SURF_BORDER}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h2 style={{ fontFamily: FONT_SERIF, fontSize: "1.05rem", fontWeight: 700, color: TEXT1 }}>Recent Posts</h2>
          <button
            onClick={() => navigate("/admin/posts")}
            style={{ display: "flex", alignItems: "center", gap: 5, background: "none", border: "none", cursor: "pointer", fontFamily: FONT_SANS, fontSize: "0.78rem", color: G }}
          >
            View all <ArrowRight size={12} />
          </button>
        </div>

        {loading ? (
          <div style={{ padding: 24 }}>
            {[...Array(5)].map((_, i) => (
              <div key={i} style={{ height: 52, background: "#F4F7FD", borderRadius: 8, marginBottom: 8, animation: "pulse 1.5s ease-in-out infinite" }} />
            ))}
          </div>
        ) : recent.length === 0 ? (
          <div style={{ padding: "48px 24px", textAlign: "center" }}>
            <BarChart2 size={32} color={TEXT3} style={{ margin: "0 auto 12px" }} />
            <p style={{ fontFamily: FONT_SANS, fontSize: "0.88rem", color: TEXT2, marginBottom: 16 }}>No posts yet. Create your first article!</p>
            <button
              onClick={() => navigate("/admin/posts/new")}
              style={{ padding: "10px 20px", background: G, border: "none", borderRadius: 8, cursor: "pointer", fontFamily: FONT_SANS, fontSize: "0.84rem", fontWeight: 700, color: "#fff" }}
            >
              Create First Post
            </button>
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${SURF_BORDER}` }}>
                {["Title", "Category", "Status", "Views", "Date"].map(h => (
                  <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontFamily: FONT_SANS, fontSize: "0.7rem", fontWeight: 600, color: TEXT3, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recent.map(post => (
                <tr
                  key={post.id}
                  onClick={() => navigate(`/admin/posts/${post.id}/edit`)}
                  style={{ borderBottom: `1px solid ${SURF_BORDER}`, cursor: "pointer", transition: "background 0.15s ease" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#F4F7FD")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                >
                  <td style={{ padding: "12px 16px" }}>
                    <p style={{ fontFamily: FONT_SANS, fontSize: "0.84rem", fontWeight: 500, color: TEXT1, maxWidth: 300, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {post.title}
                    </p>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ fontFamily: FONT_SANS, fontSize: "0.75rem", color: TEXT2 }}>{post.category}</span>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{
                      display: "inline-block", padding: "3px 10px", borderRadius: 100,
                      fontFamily: FONT_SANS, fontSize: "0.72rem", fontWeight: 600,
                      background: post.status === "published" ? `${G}15` : `${GOLD}15`,
                      color: post.status === "published" ? G : GOLD,
                      border: `1px solid ${post.status === "published" ? `${G}30` : `${GOLD}30`}`,
                    }}>
                      {post.status === "published" ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <Eye size={12} color={TEXT3} />
                      <span style={{ fontFamily: FONT_SANS, fontSize: "0.8rem", color: TEXT2 }}>{post.views ?? 0}</span>
                    </div>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ fontFamily: FONT_SANS, fontSize: "0.78rem", color: TEXT3 }}>{formatDate(post.createdAt)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  );
}
