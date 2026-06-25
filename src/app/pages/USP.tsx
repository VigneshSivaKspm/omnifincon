import { ArrowRight, CheckCircle2, Zap, Globe, Shield, Users, Award, TrendingUp, Target, Clock } from "lucide-react";
import { G, GOLD, BLUE, PURPLE, NAVY, NAVY2, TEXT1, TEXT2, FONT_SANS, FONT_SERIF, SURF_BORDER } from "../../lib/tokens";
import { RevealWrapper, SectionHeader, GlowButton, GradientCard, PageHero } from "../components/shared/Atoms";

const USPS = [
  { num: "01", icon: Globe,       color: G,      title: "Integrated Multi-Vertical Platform",
    short: "One firm for all your financial needs",
    desc: "Unlike single-vertical advisors, OMNI Fincon's expertise across Investment Banking, Wealth, Real Estate, and Retail Banking creates unique cross-domain synergies that deliver superior outcomes. A real estate client can simultaneously access construction finance, JV advisory, and wealth management — all from one trusted partner.",
    points: ["4 integrated verticals","Cross-domain mandate advantages","Single relationship for all financial needs","No referral to external advisors"] },
  { num: "02", icon: Users,       color: GOLD,   title: "200+ Years of Cumulative Expertise",
    short: "Former bankers, not just advisors",
    desc: "Our team consists of former senior bankers, investment professionals, and sector specialists — not generalist advisors. This means every mandate is led by someone who has sat on the other side of the table, with genuine inside knowledge of how banks and institutions make decisions.",
    points: ["Former PSU & private bankers on team","CFA Charterholders and CFP Professionals","IIM, ISB, and XLRI alumni","Sector-specific domain experts"] },
  { num: "03", icon: TrendingUp,  color: BLUE,   title: "50+ Institutional Lender Network",
    short: "Pre-qualified relationships at the decision level",
    desc: "Our 50+ pre-qualified banking and NBFC relationships extend to credit decision makers — not just relationship managers. This ensures your mandate gets genuine attention and faster credit decisions compared to self-approached transactions.",
    points: ["All major PSU banks","Top 10 private banks","Leading NBFCs and HFCs","Institutional debt funds and AIFs"] },
  { num: "04", icon: Clock,       color: PURPLE, title: "45-Day Average Mandate-to-Close",
    short: "Speed without compromising quality",
    desc: "Our streamlined processes, pre-prepared documentation frameworks, and parallel processing of lender requirements enable an average mandate-to-close timeline of 45 days — significantly faster than industry average of 90-180 days.",
    points: ["Standardised documentation templates","Parallel lender processing","Dedicated execution team per mandate","Real-time tracking and client communication"] },
  { num: "05", icon: Shield,      color: G,      title: "Conflict-Free Client Representation",
    short: "We always represent your interests",
    desc: "OMNI Fincon operates on a client-only representation model. We never accept lender-side mandates that could create conflicts of interest. Our success fees are structured to align completely with client objectives — we win only when you win.",
    points: ["Client-only mandate policy","No lender-side conflicts","Success-fee aligned model","Full disclosure of all terms and costs"] },
  { num: "06", icon: Award,       color: GOLD,   title: "Pan-India Coverage with Local Intelligence",
    short: "National network, local market depth",
    desc: "With offices in Hyderabad, Mumbai, Vadodara, and Ahmedabad, OMNI Fincon combines national institutional relationships with genuine local market intelligence. We understand the specific dynamics of each market — land values, lender preferences, and regulatory nuances.",
    points: ["4 offices across India","Local market research teams","City-specific lender relationships","On-ground due diligence capabilities"] },
];

export default function USP() {
  return (
    <>
      <PageHero
        pill="Our USP"
        pillColor={G}
        title="Why Clients Choose"
        titleAccent="OMNI Fincon."
        accentColor={G}
        desc="Six distinct advantages that set OMNI Fincon apart from every other financial advisory firm in India. Not claims — provable differentiators built over 15 years."
      />

      {/* Quick comparison */}
      <section className="py-16" style={{ background: NAVY2 }}>
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <RevealWrapper>
            <div className="rounded-2xl overflow-hidden">
              <div className="grid grid-cols-3 gap-0">
                <div className="p-5" style={{ background: "#F4F7FD" }}>
                  <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: TEXT2, fontFamily: FONT_SANS }}>Criteria</p>
                  {["Advisory Model","Lender Network","Turnaround Time","Conflict of Interest","Domain Expertise","Geographic Reach"].map(c=>(
                    <div key={c} className="py-2.5 border-b text-sm" style={{ color: TEXT2, fontFamily: FONT_SANS, borderColor: SURF_BORDER, fontSize: "0.82rem" }}>{c}</div>
                  ))}
                </div>
                <div className="p-5" style={{ background: `${G}08`, borderLeft: `1px solid ${G}20`, borderRight: `1px solid ${SURF_BORDER}` }}>
                  <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: G, fontFamily: FONT_SANS }}>OMNI Fincon</p>
                  {["Multi-Vertical Integrated","50+ Institutions","45 Days Average","Zero Conflicts","200+ Yrs Team Exp.","4 Pan-India Offices"].map(c=>(
                    <div key={c} className="py-2.5 border-b flex items-center gap-2" style={{ borderColor: SURF_BORDER }}>
                      <CheckCircle2 size={13} color={G} />
                      <span style={{ color: TEXT1, fontFamily: FONT_SANS, fontSize: "0.82rem", fontWeight: 500 }}>{c}</span>
                    </div>
                  ))}
                </div>
                <div className="p-5" style={{ background: "#F4F7FD" }}>
                  <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: TEXT2, fontFamily: FONT_SANS }}>Typical Advisor</p>
                  {["Single-Vertical Only","5-10 Relationships","90-180 Days","Often Conflicted","Generalist Team","Single City Focus"].map(c=>(
                    <div key={c} className="py-2.5 border-b" style={{ color: TEXT2, fontFamily: FONT_SANS, fontSize: "0.82rem", borderColor: SURF_BORDER }}>{c}</div>
                  ))}
                </div>
              </div>
            </div>
          </RevealWrapper>
        </div>
      </section>

      {/* USP deep-dive */}
      {USPS.map((usp, i) => {
        const Icon = usp.icon;
        return (
          <section key={i} className="py-16 lg:py-20" style={{ background: i % 2 === 0 ? NAVY : NAVY2 }}>
            <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className={i % 2 !== 0 ? "lg:order-2" : ""}>
                  <RevealWrapper>
                    <div className="flex items-center gap-3 mb-5">
                      <span style={{ fontFamily: FONT_SERIF, fontSize: "3rem", fontWeight: 900, color: `${usp.color}20`, lineHeight: 1 }}>{usp.num}</span>
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                        style={{ background: `${usp.color}18`, border: `1px solid ${usp.color}30` }}>
                        <Icon size={22} color={usp.color} />
                      </div>
                    </div>
                    <h2 style={{ fontFamily: FONT_SERIF, fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 700, color: TEXT1, lineHeight: 1.2, marginBottom: "8px" }}>
                      {usp.title}
                    </h2>
                    <p style={{ fontFamily: FONT_SANS, fontSize: "0.85rem", color: usp.color, fontWeight: 600, marginBottom: "16px" }}>
                      {usp.short}
                    </p>
                    <p style={{ fontFamily: FONT_SANS, fontSize: "0.92rem", color: TEXT2, lineHeight: 1.85 }}>
                      {usp.desc}
                    </p>
                  </RevealWrapper>
                </div>
                <div className={i % 2 !== 0 ? "lg:order-1" : ""}>
                  <RevealWrapper delay={100}>
                    <div className="rounded-2xl p-8" style={{ background: `${usp.color}06`, border: `1px solid ${usp.color}20` }}>
                      <p className="text-xs font-bold tracking-widest uppercase mb-5" style={{ color: usp.color, fontFamily: FONT_SANS }}>Key Differentiators</p>
                      <div className="flex flex-col gap-3.5">
                        {usp.points.map(pt => (
                          <div key={pt} className="flex items-start gap-3">
                            <CheckCircle2 size={15} color={usp.color} className="mt-0.5 shrink-0" />
                            <span style={{ fontFamily: FONT_SANS, fontSize: "0.88rem", color: TEXT1, lineHeight: 1.5 }}>{pt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </RevealWrapper>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="py-20" style={{ background: NAVY }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <RevealWrapper>
            <h2 style={{ fontFamily: FONT_SERIF, fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: 700, color: TEXT1, marginBottom: "16px" }}>
              Experience the <span style={{ color: G, fontStyle: "italic" }}>OMNI Advantage</span> Firsthand.
            </h2>
            <p className="mb-8" style={{ fontFamily: FONT_SANS, fontSize: "0.95rem", color: TEXT2, lineHeight: 1.75 }}>
              Book a free consultation with our senior advisors and discover why 340+ clients have chosen OMNI Fincon.
            </p>
            <GlowButton color={G} href="/contact" size="lg">Book Free Consultation <ArrowRight size={15} /></GlowButton>
          </RevealWrapper>
        </div>
      </section>
    </>
  );
}
