import { useState } from "react";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import { G, GOLD, BLUE, PURPLE, NAVY, NAVY2, TEXT1, TEXT2, FONT_SANS, FONT_SERIF, SURF_BORDER } from "../../lib/tokens";
import { RevealWrapper, SectionHeader, GlowButton, GradientCard, PageHero } from "../components/shared/Atoms";

const CATEGORIES = ["All","Investment Banking","Wealth Management","Real Estate","Retail Credit","Regulatory","Market Outlook"];

const ARTICLES = [
  { id: 1, cat: "Investment Banking", color: G, date: "20 Jun 2025", read: "7 min",
    title: "Debt Syndication in 2025: Why the Window for Sub-12% Funding Is Closing",
    excerpt: "With the RBI signaling a pause on rate cuts and liquidity conditions tightening, the favourable debt environment of early 2025 is shifting. Here's what borrowers must do to lock in optimal terms before year-end.",
    author: "Rajesh Sharma" },
  { id: 2, cat: "Real Estate", color: GOLD, date: "14 Jun 2025", read: "9 min",
    title: "The JV Structuring Checklist Every Developer Should Know Before Signing",
    excerpt: "Poorly structured JVs account for the majority of real estate disputes in India. We break down the 12 non-negotiables that every land-owner and developer must address before ink touches paper.",
    author: "Vikram Desai" },
  { id: 3, cat: "Wealth Management", color: BLUE, date: "08 Jun 2025", read: "6 min",
    title: "PMS vs AIF vs Direct Equity: A Framework for HNI Portfolio Allocation in 2025",
    excerpt: "As AIF registrations cross 1,400 and PMS products proliferate, HNI investors face a genuine choice overload. We present a clear allocation framework based on risk tolerance, tax efficiency, and liquidity needs.",
    author: "Priya Menon" },
  { id: 4, cat: "Regulatory", color: PURPLE, date: "01 Jun 2025", read: "10 min",
    title: "SEBI's New AIF Regulations: What Fund Managers Must Do Before October 2025",
    excerpt: "The SEBI circular of March 2025 significantly changes AIF compliance requirements. We detail the specific changes, their implications for fund managers, and a step-by-step compliance roadmap.",
    author: "Kavitha Reddy" },
  { id: 5, cat: "Retail Credit", color: G, date: "25 May 2025", read: "5 min",
    title: "Home Loan Eligibility in 2025: 8 Factors Lenders Actually Weight",
    excerpt: "Credit scoring models have evolved significantly. CIBIL score is just one factor. We explain the 8 variables that banks and HFCs are now heavily weighing in home loan decisioning.",
    author: "Sanjay Patel" },
  { id: 6, cat: "Market Outlook", color: GOLD, date: "18 May 2025", read: "8 min",
    title: "India's Infrastructure Finance Opportunity: ₹10 Lakh Crore of Mandates and Where the Money Is Coming From",
    excerpt: "The NIP pipeline, Smart Cities, and renewable energy targets represent the largest credit opportunity in Indian history. We map the financing ecosystem and identify where advisory mandates are concentrated.",
    author: "Ananya Rao" },
  { id: 7, cat: "Investment Banking", color: BLUE, date: "10 May 2025", read: "7 min",
    title: "M&A in India's MSME Sector: Why the Next Wave of Consolidation Is Already Starting",
    excerpt: "With PE interest in MSME platforms at an all-time high and succession challenges mounting for first-generation promoters, the conditions for a significant M&A cycle in Indian MSMEs are aligning.",
    author: "Ananya Rao" },
  { id: 8, cat: "Real Estate", color: PURPLE, date: "02 May 2025", read: "6 min",
    title: "Construction Finance 2025: Which Lenders Are Actively Deploying and on What Terms",
    excerpt: "The construction finance landscape has shifted dramatically post-2022. Some lenders have exited entirely; others have become more aggressive. We map the current active lender matrix across residential, commercial, and warehousing.",
    author: "Vikram Desai" },
  { id: 9, cat: "Wealth Management", color: G, date: "24 Apr 2025", read: "5 min",
    title: "Estate Planning for Business Families: Why a Will Alone Is Not Enough",
    excerpt: "Business-owning families with complex promoter structures, trusts, and shareholding patterns face risks that a simple will cannot address. Here's the complete estate planning framework we recommend.",
    author: "Priya Menon" },
];

export default function Insights() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? ARTICLES : ARTICLES.filter(a => a.cat === active);

  return (
    <>
      <PageHero
        pill="Insights Hub"
        pillColor={G}
        title="Perspectives on"
        titleAccent="India's Financial Markets."
        accentColor={G}
        desc="Practical analysis from OMNI Fincon's senior advisors — on deal markets, credit trends, regulatory changes, and wealth strategies for Indian businesses and investors."
      />

      {/* Category filter */}
      <section className="py-8 sticky top-[calc(64px+36px)] z-20" style={{ background: NAVY2, borderBottom: `1px solid ${SURF_BORDER}`, backdropFilter: "blur(20px)" }}>
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={()=>setActive(cat)}
                className="px-4 py-2 rounded-full text-xs font-semibold transition-all"
                style={{
                  background: active===cat ? G : "#F4F7FD",
                  border: active===cat ? `1px solid ${G}` : `1px solid ${SURF_BORDER}`,
                  color: active===cat ? "#050912" : TEXT2, fontFamily: FONT_SANS,
                }}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles grid */}
      <section className="py-20 lg:py-28" style={{ background: NAVY }}>
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          {/* Featured article */}
          {active === "All" && (
            <RevealWrapper className="mb-10">
              <GradientCard color={G}>
                <div className="p-8 lg:p-10 rounded-2xl grid lg:grid-cols-5 gap-8 items-start">
                  <div className="lg:col-span-3">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: `${G}20`, color: G, fontFamily: FONT_SANS }}>Featured</span>
                      <span className="text-xs font-semibold" style={{ color: G, fontFamily: FONT_SANS }}>{ARTICLES[0].cat}</span>
                    </div>
                    <h2 style={{ fontFamily: FONT_SERIF, fontSize: "clamp(1.3rem,2.5vw,1.8rem)", fontWeight: 700, color: TEXT1, lineHeight: 1.3, marginBottom: "16px" }}>
                      {ARTICLES[0].title}
                    </h2>
                    <p style={{ fontFamily: FONT_SANS, fontSize: "0.9rem", color: TEXT2, lineHeight: 1.8, marginBottom: "24px" }}>
                      {ARTICLES[0].excerpt}
                    </p>
                    <GlowButton color={G} href={`/insights/${ARTICLES[0].id}`} size="sm">Read Article <ArrowRight size={12} /></GlowButton>
                  </div>
                  <div className="lg:col-span-2 flex flex-col gap-3">
                    {[
                      { icon: User,     val: ARTICLES[0].author },
                      { icon: Calendar, val: ARTICLES[0].date   },
                      { icon: Clock,    val: `${ARTICLES[0].read} read` },
                    ].map((m, i) => {
                      const Icon = m.icon;
                      return (
                        <div key={i} className="flex items-center gap-3 py-3"
                          style={{ borderBottom: i < 2 ? `1px solid ${SURF_BORDER}` : "none" }}>
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{ background: `${G}15`, border: `1px solid ${G}25` }}>
                            <Icon size={13} color={G} />
                          </div>
                          <p style={{ fontFamily: FONT_SANS, fontSize: "0.82rem", color: TEXT2 }}>{m.val}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </GradientCard>
            </RevealWrapper>
          )}

          {/* Articles grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(active === "All" ? filtered.slice(1) : filtered).map((a, i) => (
              <RevealWrapper key={a.id} delay={i * 70}>
                <GradientCard color={a.color}>
                  <div className="p-6 rounded-2xl flex flex-col gap-4 h-full">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold"
                        style={{ background: `${a.color}18`, color: a.color, fontFamily: FONT_SANS }}>
                        {a.cat}
                      </span>
                      <span className="text-xs" style={{ color: TEXT2, fontFamily: FONT_SANS }}>{a.read} read</span>
                    </div>
                    <h3 className="flex-1" style={{ fontFamily: FONT_SERIF, fontSize: "1.05rem", fontWeight: 700, color: TEXT1, lineHeight: 1.4 }}>
                      {a.title}
                    </h3>
                    <p style={{ fontFamily: FONT_SANS, fontSize: "0.82rem", color: TEXT2, lineHeight: 1.7 }}>
                      {a.excerpt.substring(0, 140)}...
                    </p>
                    <div className="flex items-center justify-between pt-3 mt-auto"
                      style={{ borderTop: `1px solid ${SURF_BORDER}` }}>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                          style={{ background: `${a.color}20`, color: a.color, fontFamily: FONT_SERIF }}>
                          {a.author.split(" ").map(w=>w[0]).join("").substring(0,2)}
                        </div>
                        <span style={{ fontFamily: FONT_SANS, fontSize: "0.72rem", color: TEXT2 }}>{a.author}</span>
                      </div>
                      <span style={{ fontFamily: FONT_SANS, fontSize: "0.72rem", color: TEXT2 }}>{a.date}</span>
                    </div>
                  </div>
                </GradientCard>
              </RevealWrapper>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p style={{ fontFamily: FONT_SANS, color: TEXT2 }}>No articles in this category yet. Check back soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20" style={{ background: NAVY2 }}>
        <div className="max-w-2xl mx-auto px-6 text-center">
          <RevealWrapper>
            <h2 style={{ fontFamily: FONT_SERIF, fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 700, color: TEXT1, marginBottom: "12px" }}>
              Stay Ahead of <span style={{ color: G, fontStyle: "italic" }}>India's Credit Markets.</span>
            </h2>
            <p className="mb-8" style={{ fontFamily: FONT_SANS, fontSize: "0.88rem", color: TEXT2, lineHeight: 1.75 }}>
              Monthly digest of deal market insights, regulatory updates, and advisory perspectives — curated by OMNI Fincon's senior team.
            </p>
            <form className="flex gap-3 max-w-md mx-auto" onSubmit={e=>e.preventDefault()}>
              <input type="email" required placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-xl text-sm outline-none"
                style={{ background: "#F4F7FD", border: `1px solid ${SURF_BORDER}`, color: TEXT1, fontFamily: FONT_SANS }}
                onFocus={e=>(e.target.style.border=`1px solid ${G}40`)}
                onBlur={e=>(e.target.style.border=`1px solid ${SURF_BORDER}`)} />
              <GlowButton color={G} type="submit" size="md">Subscribe</GlowButton>
            </form>
          </RevealWrapper>
        </div>
      </section>
    </>
  );
}
