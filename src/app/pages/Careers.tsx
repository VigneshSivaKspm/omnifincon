import { useState } from "react";
import { ArrowRight, CheckCircle2, Briefcase, MapPin, Clock } from "lucide-react";
import { G, GOLD, BLUE, PURPLE, NAVY, NAVY2, TEXT1, TEXT2, FONT_SANS, FONT_SERIF, SURF_BORDER, CARD_SHADOW_LG } from "../../lib/tokens";
import { RevealWrapper, SectionHeader, GlowButton, GradientCard, PageHero } from "../components/shared/Atoms";

const ROLES = [
  { title: "Senior Investment Banking Associate",   dept: "Investment Banking", location: "Hyderabad", type: "Full-Time", color: G,
    req: ["5+ years in investment banking / corporate finance","Experience in debt syndication or project finance","Strong financial modelling skills","CFA / MBA Finance preferred"] },
  { title: "Wealth Manager – HNI & Family Office",  dept: "Wealth Advisory",   location: "Mumbai",    type: "Full-Time", color: GOLD,
    req: ["6+ years in private wealth or HNI relationship management","CFP / CFA certification preferred","Strong product knowledge across MF, PMS, AIF, and insurance","Proven AUM track record of ₹50 Cr+"] },
  { title: "Real Estate Advisory Analyst",          dept: "Real Estate",       location: "Ahmedabad", type: "Full-Time", color: BLUE,
    req: ["2-4 years in real estate finance or advisory","Knowledge of land laws, RERA, and property valuation","Strong Excel and financial modelling skills","B.Arch / MBA / Law graduates preferred"] },
  { title: "Business Development Executive – Retail Banking", dept: "Retail Banking", location: "Vadodara", type: "Full-Time", color: PURPLE,
    req: ["2-5 years in DSA / loan distribution or bank sales","Strong knowledge of personal, home, and business loans","Self-motivated with an existing client network","Graduate with relevant banking certification"] },
  { title: "Compliance & Regulatory Analyst",      dept: "Compliance",        location: "Hyderabad", type: "Full-Time", color: G,
    req: ["3+ years in NBFC/bank compliance or regulatory advisory","Working knowledge of RBI Master Directions and SEBI regulations","CS / LLB / MBA preferred","Attention to detail and documentation skills"] },
];

const BENEFITS = [
  { title: "Competitive Compensation",    desc: "Market-competitive fixed + performance-based variable compensation aligned with deal outcomes." },
  { title: "Learning & Development",      desc: "Monthly knowledge sessions, sponsored certifications (CFA, CFP), and leadership development programs." },
  { title: "Collaborative Culture",       desc: "Flat hierarchy, open-door leadership, and a culture where ideas are valued regardless of seniority." },
  { title: "Deal Exposure",               desc: "Work on real mandates from Day 1 — no bench work, no silos. Genuine responsibility from the start." },
  { title: "Health & Wellness Benefits",  desc: "Comprehensive health insurance for self and family, mental wellness support, and flexible leave policy." },
  { title: "Career Progression",          desc: "Clear career paths with regular reviews, promotions based on merit, and cross-vertical mobility opportunities." },
];

export default function Careers() {
  const [applied, setApplied] = useState(false);

  return (
    <>
      <PageHero
        pill="Join Our Team"
        pillColor={G}
        title="Build a Career at"
        titleAccent="OMNI Fincon."
        accentColor={G}
        desc="We're looking for exceptional financial professionals who want to make a real difference — for clients, for India's economy, and for their own careers."
      />

      {/* Culture */}
      <section className="py-20" style={{ background: NAVY2 }}>
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <RevealWrapper>
            <SectionHeader pill="Why Join Us" pillColor={GOLD} title="Why OMNI Fincon is" titleAccent="Different." accentColor={GOLD} />
          </RevealWrapper>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
            {BENEFITS.map((b, i) => (
              <RevealWrapper key={b.title} delay={i * 70}>
                <GradientCard color={G}>
                  <div className="p-6 rounded-2xl flex flex-col gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${G}18`, border: `1px solid ${G}25` }}>
                      <CheckCircle2 size={16} color={G} />
                    </div>
                    <h3 style={{ fontFamily: FONT_SANS, fontSize: "0.92rem", fontWeight: 700, color: TEXT1 }}>{b.title}</h3>
                    <p style={{ fontFamily: FONT_SANS, fontSize: "0.83rem", color: TEXT2, lineHeight: 1.7 }}>{b.desc}</p>
                  </div>
                </GradientCard>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section className="py-20 lg:py-28" style={{ background: NAVY }}>
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <RevealWrapper>
            <SectionHeader pill="Open Positions" pillColor={G} title="Current" titleAccent="Openings." accentColor={G} />
          </RevealWrapper>
          <div className="flex flex-col gap-4 mt-12">
            {ROLES.map((r, i) => (
              <RevealWrapper key={r.title} delay={i * 70}>
                <GradientCard color={r.color}>
                  <div className="p-6 lg:p-8 rounded-2xl">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
                      <div>
                        <span className="text-xs font-bold tracking-widest uppercase mb-2 block" style={{ color: r.color, fontFamily: FONT_SANS }}>{r.dept}</span>
                        <h3 style={{ fontFamily: FONT_SERIF, fontSize: "1.2rem", fontWeight: 700, color: TEXT1 }}>{r.title}</h3>
                        <div className="flex flex-wrap gap-4 mt-2">
                          {[{ icon: MapPin, text: r.location }, { icon: Clock, text: r.type }].map(m => {
                            const Icon = m.icon;
                            return (
                              <div key={m.text} className="flex items-center gap-1.5" style={{ fontFamily: FONT_SANS, fontSize: "0.78rem", color: TEXT2 }}>
                                <Icon size={12} color={r.color} /> {m.text}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <GlowButton color={r.color} href="/contact" size="sm">Apply Now <ArrowRight size={12} /></GlowButton>
                    </div>
                    <div>
                      <p className="text-xs font-bold tracking-wide uppercase mb-3" style={{ color: TEXT2, fontFamily: FONT_SANS }}>Requirements</p>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {r.req.map(req => (
                          <div key={req} className="flex items-start gap-2">
                            <CheckCircle2 size={13} color={r.color} className="mt-0.5 shrink-0" />
                            <span style={{ fontFamily: FONT_SANS, fontSize: "0.8rem", color: TEXT2, lineHeight: 1.5 }}>{req}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </GradientCard>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Speculative application */}
      <section className="py-20" style={{ background: NAVY2 }}>
        <div className="max-w-3xl mx-auto px-6">
          <RevealWrapper>
            <div className="rounded-3xl p-8 lg:p-10" style={{ background: "#FFFFFF", border: `1px solid ${SURF_BORDER}`, boxShadow: CARD_SHADOW_LG }}>
              {applied ? (
                <div className="text-center py-8">
                  <CheckCircle2 size={48} color={G} className="mx-auto mb-4" />
                  <h3 style={{ fontFamily: FONT_SERIF, fontSize: "1.4rem", fontWeight: 700, color: TEXT1, marginBottom: "8px" }}>Application Received!</h3>
                  <p style={{ fontFamily: FONT_SANS, fontSize: "0.88rem", color: TEXT2 }}>Our HR team will review your profile and reach out within 5 business days.</p>
                </div>
              ) : (
                <>
                  <h2 style={{ fontFamily: FONT_SERIF, fontSize: "1.5rem", fontWeight: 700, color: TEXT1, marginBottom: "8px" }}>
                    Don't See a Fit?
                  </h2>
                  <p className="mb-7" style={{ fontFamily: FONT_SANS, fontSize: "0.88rem", color: TEXT2, lineHeight: 1.7 }}>
                    We're always open to exceptional talent. Send us your profile and we'll keep you in mind for future opportunities.
                  </p>
                  <form className="flex flex-col gap-4" onSubmit={e=>{e.preventDefault();setApplied(true);}}>
                    {["Full Name *","Email Address *","Phone Number *","Current Role *"].map(l => (
                      <div key={l}>
                        <label className="block text-xs mb-1.5 font-medium" style={{ fontFamily: FONT_SANS, color: TEXT2 }}>{l}</label>
                        <input required className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                          style={{ background: "#F4F7FD", border: `1px solid ${SURF_BORDER}`, color: TEXT1, fontFamily: FONT_SANS }}
                          onFocus={e=>(e.target.style.border=`1px solid ${G}40`)}
                          onBlur={e=>(e.target.style.border=`1px solid ${SURF_BORDER}`)} />
                      </div>
                    ))}
                    <div>
                      <label className="block text-xs mb-1.5 font-medium" style={{ fontFamily: FONT_SANS, color: TEXT2 }}>Tell us about yourself *</label>
                      <textarea required rows={4} className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                        style={{ background: "#F4F7FD", border: `1px solid ${SURF_BORDER}`, color: TEXT1, fontFamily: FONT_SANS }}
                        onFocus={e=>(e.target.style.border=`1px solid ${G}40`)}
                        onBlur={e=>(e.target.style.border=`1px solid ${SURF_BORDER}`)} />
                    </div>
                    <GlowButton color={G} type="submit" fullWidth size="md">Submit Profile <ArrowRight size={14} /></GlowButton>
                  </form>
                </>
              )}
            </div>
          </RevealWrapper>
        </div>
      </section>
    </>
  );
}
