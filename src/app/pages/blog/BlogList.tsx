import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ArrowRight, Calendar, Clock, User, BookOpen, Search } from "lucide-react";
import { getPublishedPosts, BlogPost } from "../../../lib/blogService";
import { G, GOLD, BLUE, PURPLE, NAVY, NAVY2, TEXT1, TEXT2, TEXT3, FONT_SANS, FONT_SERIF, SURF_BORDER, CARD_SHADOW, CARD_SHADOW_LG } from "../../../lib/tokens";
import { RevealWrapper, SectionHeader, GlowButton, GradientCard, PageHero, Pill } from "../../components/shared/Atoms";

const CATEGORY_COLORS: Record<string, string> = {
  "Investment Banking": G,
  "Wealth Management": BLUE,
  "Real Estate": GOLD,
  "Retail Credit": PURPLE,
  "Regulatory": BLUE,
  "Market Outlook": GOLD,
  "MSME & SME": G,
  "General": TEXT2,
};

function getCategoryColor(cat: string) {
  return CATEGORY_COLORS[cat] ?? G;
}

function formatDate(ts: any): string {
  if (!ts) return "";
  const date = ts.toDate ? ts.toDate() : new Date(ts);
  return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function SkeletonCard() {
  return (
    <div style={{ background: "#fff", border: `1px solid ${SURF_BORDER}`, borderRadius: 16, padding: 24 }}>
      {[60, 90, 120, 60, 40].map((w, i) => (
        <div key={i} style={{ height: i === 0 ? 18 : i === 4 ? 14 : 12, width: `${w}%`, background: "#EBF0F8", borderRadius: 8, marginBottom: 12, animation: "pulse 1.5s ease-in-out infinite" }} />
      ))}
    </div>
  );
}

export default function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getPublishedPosts()
      .then(setPosts)
      .finally(() => setLoading(false));
  }, []);

  const categories = ["All", ...Array.from(new Set(posts.map(p => p.category))).filter(Boolean)];

  const filtered = posts.filter(p => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <>
      <PageHero
        pill="Blog & Insights"
        pillColor={G}
        title="Perspectives on"
        titleAccent="India's Financial Markets."
        accentColor={G}
        desc="Practical analysis from OMNI Fincon's senior advisors — on deal markets, credit trends, regulatory changes, and wealth strategies for Indian businesses and investors."
      />

      {/* Sticky filter + search bar */}
      <section
        className="py-5 sticky z-20"
        style={{
          top: "calc(64px + 36px)",
          background: "rgba(244,247,253,0.92)",
          borderBottom: `1px solid ${SURF_BORDER}`,
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-2 rounded-full text-xs font-semibold transition-all"
                style={{
                  background: activeCategory === cat ? G : "#F4F7FD",
                  border: activeCategory === cat ? `1px solid ${G}` : `1px solid ${SURF_BORDER}`,
                  color: activeCategory === cat ? "#fff" : TEXT2,
                  fontFamily: FONT_SANS,
                }}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative flex-shrink-0">
            <Search size={14} color={TEXT3} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search articles…"
              className="pl-9 pr-4 py-2 rounded-full text-sm outline-none"
              style={{
                background: "#fff",
                border: `1px solid ${SURF_BORDER}`,
                color: TEXT1,
                fontFamily: FONT_SANS,
                width: 220,
              }}
            />
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-20 lg:py-28" style={{ background: NAVY }}>
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <RevealWrapper>
              <div className="text-center py-24 flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: `${G}12`, border: `1px solid ${G}25` }}>
                  <BookOpen size={28} color={G} />
                </div>
                <h3 style={{ fontFamily: FONT_SERIF, fontSize: "1.4rem", color: TEXT1 }}>No articles found</h3>
                <p style={{ fontFamily: FONT_SANS, fontSize: "0.88rem", color: TEXT2 }}>
                  {search ? `No results for "${search}"` : "No articles in this category yet. Check back soon."}
                </p>
                {search && (
                  <button onClick={() => setSearch("")} style={{ fontFamily: FONT_SANS, fontSize: "0.84rem", color: G, cursor: "pointer", background: "none", border: "none" }}>
                    Clear search
                  </button>
                )}
              </div>
            </RevealWrapper>
          ) : (
            <>
              {/* Featured article */}
              {featured && activeCategory === "All" && !search && (
                <RevealWrapper className="mb-12">
                  <GradientCard
                    color={getCategoryColor(featured.category)}
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/blog/${featured.slug}`)}
                  >
                    <div className="p-8 lg:p-10 rounded-2xl grid lg:grid-cols-5 gap-8 items-start">
                      <div className="lg:col-span-3">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="px-3 py-1 rounded-full text-xs font-bold"
                            style={{ background: `${getCategoryColor(featured.category)}20`, color: getCategoryColor(featured.category), fontFamily: FONT_SANS }}>
                            Featured
                          </span>
                          <span className="text-xs font-semibold" style={{ color: getCategoryColor(featured.category), fontFamily: FONT_SANS }}>
                            {featured.category}
                          </span>
                        </div>
                        {featured.coverImageUrl && (
                          featured.coverMediaType === "video" ? (
                            <video
                              src={featured.coverImageUrl}
                              autoPlay muted loop playsInline
                              style={{ width: "100%", height: 200, objectFit: "cover", borderRadius: 12, marginBottom: 16, display: "block" }}
                            />
                          ) : (
                            <img
                              src={featured.coverImageUrl}
                              alt={featured.title}
                              style={{ width: "100%", height: 200, objectFit: "cover", borderRadius: 12, marginBottom: 16 }}
                            />
                          )
                        )}
                        <h2 style={{ fontFamily: FONT_SERIF, fontSize: "clamp(1.3rem,2.5vw,1.8rem)", fontWeight: 700, color: TEXT1, lineHeight: 1.3, marginBottom: 16 }}>
                          {featured.title}
                        </h2>
                        <p style={{ fontFamily: FONT_SANS, fontSize: "0.9rem", color: TEXT2, lineHeight: 1.8, marginBottom: 24 }}>
                          {featured.excerpt}
                        </p>
                        <GlowButton color={getCategoryColor(featured.category)} onClick={() => navigate(`/blog/${featured.slug}`)} size="sm">
                          Read Article <ArrowRight size={12} />
                        </GlowButton>
                      </div>
                      <div className="lg:col-span-2 flex flex-col gap-3">
                        {[
                          { icon: User,     val: featured.author },
                          { icon: Calendar, val: formatDate(featured.publishedAt) },
                          { icon: Clock,    val: `${featured.readTime} min read` },
                        ].map((m, i) => {
                          const Icon = m.icon;
                          return (
                            <div key={i} className="flex items-center gap-3 py-3"
                              style={{ borderBottom: i < 2 ? `1px solid ${SURF_BORDER}` : "none" }}>
                              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                                style={{ background: `${getCategoryColor(featured.category)}15`, border: `1px solid ${getCategoryColor(featured.category)}25` }}>
                                <Icon size={13} color={getCategoryColor(featured.category)} />
                              </div>
                              <p style={{ fontFamily: FONT_SANS, fontSize: "0.82rem", color: TEXT2 }}>{m.val}</p>
                            </div>
                          );
                        })}
                        {featured.tags?.length > 0 && (
                          <div className="flex flex-wrap gap-2 pt-2">
                            {featured.tags.map(tag => (
                              <span key={tag} className="px-2.5 py-1 rounded-full text-xs"
                                style={{ background: "#EBF0F8", color: TEXT2, fontFamily: FONT_SANS }}>
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </GradientCard>
                </RevealWrapper>
              )}

              {/* Articles grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(activeCategory !== "All" || search ? filtered : rest).map((post, i) => {
                  const color = getCategoryColor(post.category);
                  return (
                    <RevealWrapper key={post.id} delay={i * 60}>
                      <GradientCard
                        color={color}
                        style={{ cursor: "pointer", height: "100%" }}
                        onClick={() => navigate(`/blog/${post.slug}`)}
                      >
                        <div className="rounded-2xl flex flex-col h-full overflow-hidden">
                          {post.coverImageUrl && (
                            post.coverMediaType === "video" ? (
                              <video
                                src={post.coverImageUrl}
                                autoPlay muted loop playsInline
                                style={{ width: "100%", height: 180, objectFit: "cover", display: "block" }}
                              />
                            ) : (
                              <img
                                src={post.coverImageUrl}
                                alt={post.title}
                                style={{ width: "100%", height: 180, objectFit: "cover" }}
                              />
                            )
                          )}
                          <div className="p-6 flex flex-col gap-4 flex-1">
                            <div className="flex items-center justify-between">
                              <span className="px-2.5 py-1 rounded-full text-xs font-bold"
                                style={{ background: `${color}18`, color, fontFamily: FONT_SANS }}>
                                {post.category}
                              </span>
                              <span className="text-xs" style={{ color: TEXT3, fontFamily: FONT_SANS }}>
                                {post.readTime} min read
                              </span>
                            </div>
                            <h3 className="flex-1" style={{ fontFamily: FONT_SERIF, fontSize: "1.05rem", fontWeight: 700, color: TEXT1, lineHeight: 1.4 }}>
                              {post.title}
                            </h3>
                            <p style={{ fontFamily: FONT_SANS, fontSize: "0.82rem", color: TEXT2, lineHeight: 1.7 }}>
                              {post.excerpt.substring(0, 140)}{post.excerpt.length > 140 ? "…" : ""}
                            </p>
                            <div className="flex items-center justify-between pt-3 mt-auto"
                              style={{ borderTop: `1px solid ${SURF_BORDER}` }}>
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                                  style={{ background: `${color}20`, color, fontFamily: FONT_SERIF }}>
                                  {post.author?.split(" ").map(w => w[0]).join("").substring(0, 2)}
                                </div>
                                <span style={{ fontFamily: FONT_SANS, fontSize: "0.72rem", color: TEXT2 }}>{post.author}</span>
                              </div>
                              <span style={{ fontFamily: FONT_SANS, fontSize: "0.72rem", color: TEXT3 }}>
                                {formatDate(post.publishedAt)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </GradientCard>
                    </RevealWrapper>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20" style={{ background: NAVY2 }}>
        <div className="max-w-2xl mx-auto px-6 text-center">
          <RevealWrapper>
            <h2 style={{ fontFamily: FONT_SERIF, fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 700, color: TEXT1, marginBottom: 12 }}>
              Stay Ahead of <span style={{ color: G, fontStyle: "italic" }}>India's Credit Markets.</span>
            </h2>
            <p className="mb-8" style={{ fontFamily: FONT_SANS, fontSize: "0.88rem", color: TEXT2, lineHeight: 1.75 }}>
              Monthly digest of deal market insights, regulatory updates, and advisory perspectives — curated by OMNI Fincon's senior team.
            </p>
            <form className="flex gap-3 max-w-md mx-auto" onSubmit={e => e.preventDefault()}>
              <input
                type="email"
                required
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-xl text-sm outline-none"
                style={{ background: "#fff", border: `1px solid ${SURF_BORDER}`, color: TEXT1, fontFamily: FONT_SANS }}
              />
              <GlowButton color={G} type="submit" size="md">Subscribe</GlowButton>
            </form>
          </RevealWrapper>
        </div>
      </section>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </>
  );
}
