import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Calendar, Clock, User, Tag, Eye, ArrowRight } from "lucide-react";
import { getPostBySlug, getPublishedPosts, incrementViews, BlogPost as BlogPostData } from "../../../lib/blogService";
import { G, GOLD, BLUE, PURPLE, NAVY, NAVY2, TEXT1, TEXT2, TEXT3, FONT_SANS, FONT_SERIF, SURF_BORDER, CARD_SHADOW } from "../../../lib/tokens";
import { RevealWrapper, GlowButton, GradientCard } from "../../components/shared/Atoms";

const CATEGORY_COLORS: Record<string, string> = {
  "Investment Banking": G,
  "Wealth Management": BLUE,
  "Real Estate": GOLD,
  "Retail Credit": PURPLE,
  "Regulatory": BLUE,
  "Market Outlook": GOLD,
  "MSME & SME": G,
};
function getCategoryColor(cat: string) { return CATEGORY_COLORS[cat] ?? G; }

function formatDate(ts: any): string {
  if (!ts) return "";
  const date = ts.toDate ? ts.toDate() : new Date(ts);
  return date.toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [related, setRelated] = useState<BlogPostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setNotFound(false);

    getPostBySlug(slug).then(async p => {
      if (!p || p.status !== "published") { setNotFound(true); setLoading(false); return; }
      setPost(p);
      if (p.id) incrementViews(p.id).catch(() => {});

      const all = await getPublishedPosts();
      setRelated(all.filter(r => r.id !== p.id && r.category === p.category).slice(0, 3));
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div style={{ paddingTop: "calc(100px + 36px)", minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", border: `3px solid ${G}30`, borderTopColor: G, animation: "spin 0.8s linear infinite" }} />
          <p style={{ fontFamily: FONT_SANS, color: TEXT3, fontSize: "0.88rem" }}>Loading article…</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div style={{ paddingTop: "calc(100px + 36px)", minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20 }}>
        <h2 style={{ fontFamily: FONT_SERIF, fontSize: "2rem", color: TEXT1 }}>Article Not Found</h2>
        <p style={{ fontFamily: FONT_SANS, color: TEXT2 }}>This article may have been removed or is no longer available.</p>
        <GlowButton color={G} onClick={() => navigate("/blog")} size="md">
          <ArrowLeft size={14} /> Back to Blog
        </GlowButton>
      </div>
    );
  }

  const color = getCategoryColor(post.category);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: NAVY2, paddingTop: "calc(100px + 36px)", paddingBottom: 0 }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 60% 60% at 50% 0%,${color}0a 0%,transparent 65%)` }} />
        <div className="absolute top-0 inset-x-0 h-0.5" style={{ background: `linear-gradient(to right,transparent,${color}50,transparent)` }} />

        <div className="relative max-w-4xl mx-auto px-6 lg:px-10 pb-0">
          {/* Back link */}
          <button
            onClick={() => navigate("/blog")}
            className="flex items-center gap-2 mb-8 transition-opacity hover:opacity-70"
            style={{ fontFamily: FONT_SANS, fontSize: "0.82rem", color: TEXT2, background: "none", border: "none", cursor: "pointer" }}
          >
            <ArrowLeft size={14} /> All Articles
          </button>

          {/* Category + tags */}
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: `${color}18`, color, fontFamily: FONT_SANS }}>
              {post.category}
            </span>
            {post.tags?.map(tag => (
              <span key={tag} className="px-2.5 py-1 rounded-full text-xs flex items-center gap-1"
                style={{ background: "#EBF0F8", color: TEXT2, fontFamily: FONT_SANS }}>
                <Tag size={10} /> {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 style={{ fontFamily: FONT_SERIF, fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 700, color: TEXT1, lineHeight: 1.2, letterSpacing: "-0.02em", marginBottom: 20 }}>
            {post.title}
          </h1>

          {/* Excerpt */}
          <p style={{ fontFamily: FONT_SANS, fontSize: "1.05rem", color: TEXT2, lineHeight: 1.8, marginBottom: 28 }}>
            {post.excerpt}
          </p>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-5 pb-8" style={{ borderBottom: `1px solid ${SURF_BORDER}` }}>
            {[
              { icon: User,     val: post.author },
              { icon: Calendar, val: formatDate(post.publishedAt) },
              { icon: Clock,    val: `${post.readTime} min read` },
              { icon: Eye,      val: `${post.views ?? 0} views` },
            ].map((m, i) => {
              const Icon = m.icon;
              return (
                <div key={i} className="flex items-center gap-2">
                  <Icon size={13} color={color} />
                  <span style={{ fontFamily: FONT_SANS, fontSize: "0.8rem", color: TEXT2 }}>{m.val}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cover image */}
      {post.coverImageUrl && (
        <div className="max-w-4xl mx-auto px-6 lg:px-10 -mt-1">
          {post.coverMediaType === "video" ? (
            <video
              src={post.coverImageUrl}
              controls
              playsInline
              style={{ width: "100%", maxHeight: 480, borderRadius: "0 0 20px 20px", boxShadow: "0 20px 60px rgba(11,26,46,0.12)", display: "block", background: "#000" }}
            />
          ) : (
            <img
              src={post.coverImageUrl}
              alt={post.title}
              style={{ width: "100%", maxHeight: 480, objectFit: "cover", borderRadius: "0 0 20px 20px", boxShadow: "0 20px 60px rgba(11,26,46,0.12)" }}
            />
          )}
        </div>
      )}

      {/* Content */}
      <section className="py-16" style={{ background: NAVY }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-10 grid lg:grid-cols-[1fr_280px] gap-16">
          {/* Article body */}
          <article>
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          {/* Sidebar */}
          <aside>
            <div className="sticky top-[140px] flex flex-col gap-6">
              {/* Author card */}
              <div style={{ background: "#fff", border: `1px solid ${SURF_BORDER}`, borderRadius: 16, padding: 20, boxShadow: CARD_SHADOW }}>
                <p style={{ fontFamily: FONT_SANS, fontSize: "0.7rem", color: TEXT3, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 12 }}>Written by</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                    style={{ background: `${color}18`, color, fontFamily: FONT_SERIF }}>
                    {post.author?.split(" ").map(w => w[0]).join("").substring(0, 2)}
                  </div>
                  <div>
                    <p style={{ fontFamily: FONT_SANS, fontSize: "0.88rem", fontWeight: 600, color: TEXT1 }}>{post.author}</p>
                    <p style={{ fontFamily: FONT_SANS, fontSize: "0.72rem", color: TEXT3 }}>OMNI Fincon</p>
                  </div>
                </div>
              </div>

              {/* Share / CTA */}
              <div style={{ background: `${color}08`, border: `1px solid ${color}20`, borderRadius: 16, padding: 20 }}>
                <p style={{ fontFamily: FONT_SERIF, fontSize: "1rem", fontWeight: 700, color: TEXT1, marginBottom: 8 }}>
                  Need Expert Advice?
                </p>
                <p style={{ fontFamily: FONT_SANS, fontSize: "0.8rem", color: TEXT2, lineHeight: 1.6, marginBottom: 16 }}>
                  Our advisors are ready to help with your specific financial goals.
                </p>
                <GlowButton color={color} href="/contact" size="sm" fullWidth>
                  Talk to an Advisor <ArrowRight size={12} />
                </GlowButton>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="py-20" style={{ background: NAVY2 }}>
          <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
            <RevealWrapper>
              <h2 style={{ fontFamily: FONT_SERIF, fontSize: "clamp(1.4rem,2.5vw,2rem)", fontWeight: 700, color: TEXT1, marginBottom: 32 }}>
                More in <span style={{ color, fontStyle: "italic" }}>{post.category}</span>
              </h2>
            </RevealWrapper>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((r, i) => {
                const rc = getCategoryColor(r.category);
                return (
                  <RevealWrapper key={r.id} delay={i * 70}>
                    <GradientCard color={rc} style={{ cursor: "pointer" }} onClick={() => navigate(`/blog/${r.slug}`)}>
                      <div className="p-6 rounded-2xl flex flex-col gap-3">
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full w-fit"
                          style={{ background: `${rc}18`, color: rc, fontFamily: FONT_SANS }}>
                          {r.category}
                        </span>
                        <h3 style={{ fontFamily: FONT_SERIF, fontSize: "1rem", fontWeight: 700, color: TEXT1, lineHeight: 1.4 }}>
                          {r.title}
                        </h3>
                        <div className="flex items-center justify-between mt-auto pt-3" style={{ borderTop: `1px solid ${SURF_BORDER}` }}>
                          <span style={{ fontFamily: FONT_SANS, fontSize: "0.72rem", color: TEXT2 }}>{r.author}</span>
                          <span style={{ fontFamily: FONT_SANS, fontSize: "0.72rem", color: TEXT3 }}>{r.readTime} min</span>
                        </div>
                      </div>
                    </GradientCard>
                  </RevealWrapper>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Global blog content styles */}
      <style>{`
        .blog-content { font-family: 'Poppins', sans-serif; color: #536280; line-height: 1.85; font-size: 1rem; }
        .blog-content h1, .blog-content h2, .blog-content h3, .blog-content h4 {
          font-family: 'Poppins', sans-serif; color: #0B1A2E; font-weight: 700; margin: 2rem 0 1rem;
        }
        .blog-content h1 { font-size: clamp(1.6rem, 3vw, 2.2rem); }
        .blog-content h2 { font-size: clamp(1.3rem, 2.5vw, 1.75rem); }
        .blog-content h3 { font-size: clamp(1.1rem, 2vw, 1.4rem); }
        .blog-content p { margin-bottom: 1.4rem; }
        .blog-content ul, .blog-content ol { padding-left: 1.6rem; margin-bottom: 1.4rem; }
        .blog-content li { margin-bottom: 0.5rem; }
        .blog-content blockquote {
          border-left: 3px solid ${G}; padding: 16px 24px; margin: 2rem 0;
          background: ${G}08; border-radius: 0 12px 12px 0;
          font-style: italic; color: #0B1A2E;
        }
        .blog-content strong { font-weight: 700; color: #0B1A2E; }
        .blog-content a { color: ${G}; text-decoration: underline; text-underline-offset: 3px; }
        .blog-content img { max-width: 100%; border-radius: 12px; margin: 1.5rem 0; }
        .blog-content hr { border: none; border-top: 1px solid rgba(11,26,46,0.09); margin: 2rem 0; }
        .blog-content code { background: #EBF0F8; padding: 2px 6px; border-radius: 4px; font-size: 0.88em; }
        .blog-content pre { background: #0B1A2E; color: #e2e8f0; padding: 20px; border-radius: 12px; overflow-x: auto; margin: 1.5rem 0; }
        .blog-content table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; }
        .blog-content th, .blog-content td { padding: 10px 14px; text-align: left; border-bottom: 1px solid rgba(11,26,46,0.09); }
        .blog-content th { font-weight: 700; color: #0B1A2E; font-family: 'Poppins', sans-serif; }
      `}</style>
    </>
  );
}
