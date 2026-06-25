import { ArrowRight, Users, Target, Globe, Award, CheckCircle2, Shield, Zap, TrendingUp } from "lucide-react";
import { G, GOLD, BLUE, PURPLE, NAVY, NAVY2, TEXT1, TEXT2, FONT_SANS, FONT_SERIF, FONT_NUM } from "../../lib/tokens";
import { RevealWrapper, useScrollReveal, useCounter, Pill, SectionHeader, GlowButton, GradientCard, PageHero } from "../components/shared/Atoms";

const TIMELINE = [
  { year: "2009", title: "Founded", desc: "OMNI Fincon established with a vision to democratise access to institutional-grade financial advisory for Indian businesses." },
  { year: "2012", title: "First Major Mandate", desc: "Closed first ₹100 Cr+ debt syndication mandate, establishing our credibility in the investment banking space." },
  { year: "2015", title: "Expansion to 4 Cities", desc: "Opened offices in Mumbai, Vadodara, and Ahmedabad to serve Gujarat's thriving industrial ecosystem." },
  { year: "2018", title: "₹1,000 Cr Milestone", desc: "Crossed ₹1,000 Cr in cumulative mandates advised — a significant milestone in our growth journey." },
  { year: "2021", title: "Retail Banking Launch", desc: "Launched dedicated Retail Banking & Credit vertical to serve individual and MSME credit needs." },
  { year: "2024", title: "₹4,800 Cr+ Advised", desc: "Crossed ₹4,800 Cr in total mandates advised with 340+ successful closures across 30+ sectors." },
];

const VALUES = [
  { icon: Shield,      title: "Integrity First",        color: G,
    desc: "We represent our clients' interests exclusively, with zero conflicts of interest. Our advice is always objective, transparent, and aligned with client outcomes." },
  { icon: Target,      title: "Outcome Oriented",       color: GOLD,
    desc: "We measure our success by the results we deliver for clients — successful closures, optimal terms, and lasting relationships built on trust." },
  { icon: Zap,         title: "Execution Excellence",   color: BLUE,
    desc: "Speed, precision, and discipline define our execution approach. Average mandate-to-close timeline of 45 days reflects our operational excellence." },
  { icon: Globe,       title: "Pan-India Perspective",  color: PURPLE,
    desc: "Deep market intelligence across India's major financial centres — from Hyderabad to Ahmedabad — providing genuine on-ground insights." },
];

export default function About() {
  const { ref, visible } = useScrollReveal();
  const years   = useCounter(15,  1600, visible);
  const deals   = useCounter(340, 1800, visible);
  const sectors = useCounter(30,  1400, visible);
  const exp     = useCounter(200, 2000, visible);

  return (
    <>
      <PageHero
        pill="About OMNI Fincon"
        pillColor={GOLD}
        title="Empowering Growth Through"
        titleAccent="Financial Excellence."
        accentColor={GOLD}
        desc="OMNI Fincon is India's premier integrated financial advisory firm — built over 15 years of deep expertise, lasting relationships, and a relentless commitment to client outcomes."
      />

      {/* ── Counter Stats ── */}
      <section className="py-16" style={{ background: NAVY2 }}>
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { val: `${years}+`,   label: "Years of Leadership",      color: G      },
              { val: `${deals}+`,   label: "Deals Closed",             color: GOLD   },
              { val: `${sectors}+`, label: "Sectors Served",           color: BLUE   },
              { val: `${exp}+`,     label: "Years Team Experience",    color: PURPLE },
            ].map((s) => (
              <div key={s.label} className="text-center flex flex-col gap-2">
                <p style={{ fontFamily: FONT_NUM, fontSize: "2.8rem", fontWeight: 800, color: s.color, lineHeight: 1, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.02em" }}>
                  {s.val}
                </p>
                <p style={{ fontFamily: FONT_SANS, fontSize: "0.72rem", color: TEXT2, textTransform: "uppercase", letterSpacing: "0.12em" }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Story ── */}
      <section className="py-20 lg:py-28" style={{ background: NAVY }}>
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <RevealWrapper>
              <SectionHeader
                pill="Our Story"
                pillColor={G}
                title="15 Years of"
                titleAccent="Financial Leadership."
                accentColor={G}
                desc="Founded in 2009 by senior banking professionals with combined experience spanning PSU banks, private equity, and advisory firms, OMNI Fincon was built on a simple but powerful belief: every business deserves access to institutional-grade financial advisory."
              />
            </RevealWrapper>
            <RevealWrapper delay={100}>
              <p className="mt-5" style={{ fontFamily: FONT_SANS, fontSize: "0.93rem", color: TEXT2, lineHeight: 1.85 }}>
                What began as a boutique investment banking practice in Hyderabad has grown into a pan-India integrated financial advisory firm with offices across four major cities, serving 340+ clients across 30+ sectors. Our journey has been defined by deep client relationships, innovative deal structures, and an unwavering commitment to outcomes over optics.
              </p>
            </RevealWrapper>
            <RevealWrapper delay={160}>
              <p className="mt-4" style={{ fontFamily: FONT_SANS, fontSize: "0.93rem", color: TEXT2, lineHeight: 1.85 }}>
                Today, OMNI Fincon advises across four verticals — Investment Banking, Wealth & Risk Advisory, Land & Real Estate Advisory, and Retail Banking & Credit — delivering cross-domain value that no single-vertical firm can match.
              </p>
            </RevealWrapper>
            <RevealWrapper delay={220} className="mt-8">
              <GlowButton color={G} href="/team" size="md">
                Meet Our Team <ArrowRight size={14} />
              </GlowButton>
            </RevealWrapper>
          </div>
          {/* Timeline */}
          <div className="relative flex flex-col gap-0">
            <div className="absolute left-4 top-3 bottom-3 w-px" style={{ background: `linear-gradient(to bottom,${G}40,${G}20,transparent)` }} />
            {TIMELINE.map((t, i) => (
              <RevealWrapper key={i} delay={i * 80}>
                <div className="flex gap-6 pb-8 relative">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 relative z-10"
                    style={{ background: `${G}20`, border: `2px solid ${G}40` }}>
                    <div className="w-2 h-2 rounded-full" style={{ background: G }} />
                  </div>
                  <div>
                    <span className="text-xs font-bold tracking-widest" style={{ color: G, fontFamily: FONT_SANS }}>{t.year}</span>
                    <h3 className="mt-1" style={{ fontFamily: FONT_SANS, fontSize: "0.92rem", fontWeight: 700, color: TEXT1 }}>{t.title}</h3>
                    <p className="mt-1" style={{ fontFamily: FONT_SANS, fontSize: "0.82rem", color: TEXT2, lineHeight: 1.65 }}>{t.desc}</p>
                  </div>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="py-20 lg:py-28" style={{ background: NAVY2 }}>
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <RevealWrapper>
            <SectionHeader
              pill="Mission & Vision"
              pillColor={GOLD}
              title="What Drives"
              titleAccent="Everything We Do."
              accentColor={GOLD}
              center
            />
          </RevealWrapper>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-4xl mx-auto">
            {[
              { label: "Our Mission", color: G,
                text: "To deliver intelligent, customised financial solutions that empower individuals and businesses to build, protect, and multiply wealth while contributing to India's long-term economic progress." },
              { label: "Our Vision", color: BLUE,
                text: "To be India's most trusted and agile financial institution, enabling sustainable growth through innovation, insight, and integrity across all our service verticals." },
            ].map((mv) => (
              <RevealWrapper key={mv.label}>
                <div className="rounded-2xl p-8" style={{ background: `${mv.color}08`, border: `1px solid ${mv.color}25` }}>
                  <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: mv.color, fontFamily: FONT_SANS }}>{mv.label}</p>
                  <p style={{ fontFamily: FONT_SERIF, fontSize: "1.1rem", fontWeight: 400, color: TEXT1, lineHeight: 1.7, fontStyle: "italic" }}>
                    "{mv.text}"
                  </p>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="py-20 lg:py-28" style={{ background: NAVY }}>
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <RevealWrapper>
            <SectionHeader
              pill="Core Values"
              pillColor={G}
              title="The Principles That"
              titleAccent="Guide Our Work."
              accentColor={G}
            />
          </RevealWrapper>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-12">
            {VALUES.map((v, i) => {
              const Icon = v.icon;
              return (
                <RevealWrapper key={v.title} delay={i * 80}>
                  <GradientCard color={v.color}>
                    <div className="flex gap-5 p-7 rounded-2xl">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                        style={{ background: `${v.color}18`, border: `1px solid ${v.color}30` }}>
                        <Icon size={22} color={v.color} />
                      </div>
                      <div>
                        <h3 style={{ fontFamily: FONT_SANS, fontSize: "0.95rem", fontWeight: 700, color: TEXT1, marginBottom: "8px" }}>{v.title}</h3>
                        <p style={{ fontFamily: FONT_SANS, fontSize: "0.85rem", color: TEXT2, lineHeight: 1.75 }}>{v.desc}</p>
                      </div>
                    </div>
                  </GradientCard>
                </RevealWrapper>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 relative overflow-hidden" style={{ background: NAVY2 }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 50% 70% at 50% 50%,${G}0a 0%,transparent 65%)` }} />
        <div className="max-w-3xl mx-auto px-6 text-center relative">
          <RevealWrapper>
            <h2 style={{ fontFamily: FONT_SERIF, fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: 700, color: TEXT1, lineHeight: 1.15, marginBottom: "16px" }}>
              Ready to Partner with <span style={{ color: G, fontStyle: "italic" }}>OMNI Fincon?</span>
            </h2>
            <p className="mb-8" style={{ fontFamily: FONT_SANS, fontSize: "0.95rem", color: TEXT2, lineHeight: 1.75 }}>
              Experience the OMNI advantage — deep expertise, genuine relationships, and an unwavering commitment to your financial success.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <GlowButton color={G} href="/contact" size="lg">Get in Touch <ArrowRight size={15} /></GlowButton>
              <GlowButton color={G} href="/our-usp" outline size="lg">Our USP <ArrowRight size={14} /></GlowButton>
            </div>
          </RevealWrapper>
        </div>
      </section>
    </>
  );
}
