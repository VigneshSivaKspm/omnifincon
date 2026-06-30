import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { PlusCircle, Edit2, Trash2, Eye, Globe, FileText, Search, Filter } from "lucide-react";
import { getAllPosts, updatePost, deletePost, BlogPost } from "../../../lib/blogService";
import { G, GOLD, BLUE, TEXT1, TEXT2, TEXT3, FONT_SANS, FONT_SERIF, SURF_BORDER } from "../../../lib/tokens";
import { Timestamp } from "firebase/firestore";

function formatDate(ts: any): string {
  if (!ts) return "—";
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export default function PostList() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [deleting, setDeleting] = useState<string | null>(null);
  const [toggling, setToggling] = useState<string | null>(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    const data = await getAllPosts();
    setPosts(data);
    setLoading(false);
  }

  async function handleToggleStatus(post: BlogPost) {
    if (!post.id) return;
    setToggling(post.id);
    const newStatus = post.status === "published" ? "draft" : "published";
    await updatePost(post.id, {
      status: newStatus,
      publishedAt: newStatus === "published" ? Timestamp.now() : null,
    });
    setPosts(prev => prev.map(p => p.id === post.id ? { ...p, status: newStatus } : p));
    setToggling(null);
  }

  async function handleDelete(post: BlogPost) {
    if (!post.id) return;
    if (!window.confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    setDeleting(post.id);
    await deletePost(post.id);
    setPosts(prev => prev.filter(p => p.id !== post.id));
    setDeleting(null);
  }

  const filtered = posts.filter(p => {
    const matchStatus = statusFilter === "all" || p.status === statusFilter;
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.author?.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const published = posts.filter(p => p.status === "published").length;
  const drafts = posts.filter(p => p.status === "draft").length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontFamily: FONT_SERIF, fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)", fontWeight: 700, color: TEXT1 }}>Blog Posts</h1>
          <p style={{ fontFamily: FONT_SANS, fontSize: "0.82rem", color: TEXT2, marginTop: 4 }}>
            {posts.length} total — {published} published, {drafts} drafts
          </p>
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

      {/* Filter bar */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 8 }}>
          {(["all", "published", "draft"] as const).map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              style={{
                padding: "7px 16px", borderRadius: 100, border: `1px solid ${statusFilter === s ? G : SURF_BORDER}`,
                background: statusFilter === s ? `${G}12` : "#fff",
                color: statusFilter === s ? G : TEXT2,
                fontFamily: FONT_SANS, fontSize: "0.78rem", fontWeight: statusFilter === s ? 600 : 400,
                cursor: "pointer", textTransform: "capitalize",
              }}
            >
              {s === "all" ? `All (${posts.length})` : s === "published" ? `Published (${published})` : `Drafts (${drafts})`}
            </button>
          ))}
        </div>
        <div style={{ position: "relative" }}>
          <Search size={14} color={TEXT3} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search posts…"
            style={{
              paddingLeft: 36, paddingRight: 14, paddingTop: 8, paddingBottom: 8,
              border: `1px solid ${SURF_BORDER}`, borderRadius: 8,
              fontFamily: FONT_SANS, fontSize: "0.84rem", color: TEXT1,
              background: "#fff", outline: "none", width: 220,
            }}
          />
        </div>
      </div>

      {/* Table */}
      <div style={{ background: "#fff", border: `1px solid ${SURF_BORDER}`, borderRadius: 16, overflow: "hidden" }}>
        {loading ? (
          <div style={{ padding: 32, display: "flex", flexDirection: "column", gap: 10 }}>
            {[...Array(5)].map((_, i) => (
              <div key={i} style={{ height: 56, background: "#F4F7FD", borderRadius: 8, animation: "pulse 1.5s ease-in-out infinite" }} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: "64px 24px", textAlign: "center" }}>
            <FileText size={36} color={TEXT3} style={{ margin: "0 auto 12px" }} />
            <p style={{ fontFamily: FONT_SANS, fontSize: "0.88rem", color: TEXT2, marginBottom: 16 }}>
              {search ? `No posts matching "${search}"` : "No posts yet."}
            </p>
            {!search && (
              <button
                onClick={() => navigate("/admin/posts/new")}
                style={{ padding: "10px 20px", background: G, border: "none", borderRadius: 8, cursor: "pointer", fontFamily: FONT_SANS, fontSize: "0.84rem", fontWeight: 700, color: "#fff" }}
              >
                Create First Post
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block">
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${SURF_BORDER}` }}>
                    {["Title", "Category", "Author", "Status", "Views", "Date", "Actions"].map(h => (
                      <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontFamily: FONT_SANS, fontSize: "0.68rem", fontWeight: 600, color: TEXT3, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(post => (
                    <tr
                      key={post.id}
                      style={{ borderBottom: `1px solid ${SURF_BORDER}`, transition: "background 0.15s ease" }}
                      onMouseEnter={e => (e.currentTarget.style.background = "#F4F7FD")}
                      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                    >
                      <td style={{ padding: "14px 16px", maxWidth: 280 }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                          <p style={{ fontFamily: FONT_SANS, fontSize: "0.84rem", fontWeight: 500, color: TEXT1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {post.title}
                          </p>
                          <p style={{ fontFamily: FONT_SANS, fontSize: "0.72rem", color: TEXT3 }}>/{post.slug}</p>
                        </div>
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <span style={{ fontFamily: FONT_SANS, fontSize: "0.78rem", color: TEXT2 }}>{post.category}</span>
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <span style={{ fontFamily: FONT_SANS, fontSize: "0.78rem", color: TEXT2 }}>{post.author}</span>
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <button
                          onClick={() => handleToggleStatus(post)}
                          disabled={toggling === post.id}
                          style={{
                            display: "inline-flex", alignItems: "center", gap: 5,
                            padding: "4px 10px", borderRadius: 100, cursor: "pointer",
                            fontFamily: FONT_SANS, fontSize: "0.72rem", fontWeight: 600, border: "none",
                            background: post.status === "published" ? `${G}15` : `${GOLD}15`,
                            color: post.status === "published" ? G : GOLD,
                            opacity: toggling === post.id ? 0.5 : 1,
                          }}
                        >
                          {post.status === "published" ? <Globe size={10} /> : <FileText size={10} />}
                          {toggling === post.id ? "…" : post.status === "published" ? "Published" : "Draft"}
                        </button>
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <Eye size={12} color={TEXT3} />
                          <span style={{ fontFamily: FONT_SANS, fontSize: "0.8rem", color: TEXT2 }}>{post.views ?? 0}</span>
                        </div>
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <span style={{ fontFamily: FONT_SANS, fontSize: "0.78rem", color: TEXT3 }}>{formatDate(post.createdAt)}</span>
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <div style={{ display: "flex", gap: 6 }}>
                          <button
                            onClick={() => navigate(`/admin/posts/${post.id}/edit`)}
                            style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${SURF_BORDER}`, background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                            title="Edit"
                          >
                            <Edit2 size={13} color={BLUE} />
                          </button>
                          {post.status === "published" && (
                            <a
                              href={`/blog/${post.slug}`}
                              target="_blank"
                              style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${SURF_BORDER}`, background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}
                              title="View"
                            >
                              <Eye size={13} color={G} />
                            </a>
                          )}
                          <button
                            onClick={() => handleDelete(post)}
                            disabled={deleting === post.id}
                            style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid #FECACA", background: "#FEF2F2", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", opacity: deleting === post.id ? 0.5 : 1 }}
                            title="Delete"
                          >
                            <Trash2 size={13} color="#DC2626" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden" style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
              {filtered.map(post => (
                <div key={post.id} style={{ border: `1px solid ${SURF_BORDER}`, borderRadius: 12, padding: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                    <p style={{ fontFamily: FONT_SANS, fontSize: "0.88rem", fontWeight: 600, color: TEXT1, flex: 1, marginRight: 12 }}>
                      {post.title}
                    </p>
                    <span style={{
                      flexShrink: 0, padding: "3px 8px", borderRadius: 100, border: "none",
                      fontFamily: FONT_SANS, fontSize: "0.68rem", fontWeight: 600,
                      background: post.status === "published" ? `${G}15` : `${GOLD}15`,
                      color: post.status === "published" ? G : GOLD,
                    }}>
                      {post.status}
                    </span>
                  </div>
                  <p style={{ fontFamily: FONT_SANS, fontSize: "0.75rem", color: TEXT3, marginBottom: 12 }}>{post.category} • {post.author}</p>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => navigate(`/admin/posts/${post.id}/edit`)}
                      style={{ flex: 1, padding: "8px", borderRadius: 8, border: `1px solid ${SURF_BORDER}`, background: "#fff", cursor: "pointer", fontFamily: FONT_SANS, fontSize: "0.78rem", color: BLUE, display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
                      <Edit2 size={12} /> Edit
                    </button>
                    <button onClick={() => handleToggleStatus(post)}
                      style={{ flex: 1, padding: "8px", borderRadius: 8, border: `1px solid ${post.status === "published" ? `${GOLD}30` : `${G}30`}`, background: "transparent", cursor: "pointer", fontFamily: FONT_SANS, fontSize: "0.78rem", color: post.status === "published" ? GOLD : G, display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
                      {post.status === "published" ? "Unpublish" : "Publish"}
                    </button>
                    <button onClick={() => handleDelete(post)}
                      style={{ padding: "8px 14px", borderRadius: 8, border: "1px solid #FECACA", background: "#FEF2F2", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Trash2 size={13} color="#DC2626" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  );
}
