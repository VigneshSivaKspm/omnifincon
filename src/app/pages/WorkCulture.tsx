import { ArrowRight, Users, Zap, Heart, BookOpen, TrendingUp, Award, Coffee, Star } from "lucide-react";
import { G, GOLD, BLUE, PURPLE, NAVY, NAVY2, TEXT1, TEXT2, FONT_SANS, FONT_SERIF, FONT_NUM, SURF_BORDER, CARD_SHADOW } from "../../lib/tokens";
import { RevealWrapper, SectionHeader, GlowButton, GradientCard, PageHero } from "../components/shared/Atoms";

const PILLARS = [
  { icon: Users,     color: G,      title: "Flat Hierarchy",
    desc: "Ideas are judged on merit, not rank. Every team member has direct access to leadership and the freedom to challenge assumptions." },
  { icon: Zap,       color: GOLD,   title: "Ownership Culture",
    desc: "We don't assign tasks — we assign ownership. Every team member leads their mandate end-to-end with full accountability and recognition." },
  { icon: BookOpen,  color: BLUE,   title: "Continuous Learning",
    desc: "Monthly knowledge sessions, sponsored CFA/CFP certifications, deal post-mortems, and access to industry research are part of the standard experience." },
  { icon: Heart,     color: PURPLE, title: "Wellbeing First",
    desc: "Flexible leave policy, comprehensive health coverage for self and family, mental wellness support, and structured work hours — not a culture of burnout." },
  { icon: TrendingUp, color: G,     title: "Growth Tracks",
    desc: "Clear, documented career paths reviewed quarterly. Promotions based purely on merit and outcomes — no waiting for a vacancy to open above you." },
  { icon: Award,     color: GOLD,   title: "Recognition Driven",
    desc: "Deal bonuses, performance awards, public recognition in team meetings, and a peer-nomination culture that rewards both results and collaboration." },
];

const MOMENTS = [
  { label: "Deal Closures",       desc: "Every successful mandate is celebrated as a team — the entire firm understands the work that went into it." },
  { label: "Knowledge Fridays",   desc: "Every Friday afternoon is reserved for team learning — market updates, deal case studies, and guest speaker sessions." },
  { label: "Annual Offsites",     desc: "Annual team retreat to a destination of the team's choice — bonding, strategy, and celebration combined." },
  { label: "Town Halls",          desc: "Monthly all-hands with full P&L transparency, pipeline updates, and open-floor Q&A with founding leadership." },
  { label: "Mentor Pairings",     desc: "Every new joiner is paired with a senior mentor for 6 months — structured, meaningful, not just an org chart formality." },
  { label: "Celebration Culture", desc: "Birthdays, work anniversaries, deal anniversaries — every milestone matters and is acknowledged as a firm." },
];

const TESTIMONIALS = [
  { name: "Arjun Mehta",       title: "Associate – Investment Banking",  initials: "AM", color: G,
    quote: "I joined OMNI with 2 years of experience and within 18 months I was leading client calls independently. The exposure here is unlike anything at a bank — you're not just a cog." },
  { name: "Swati Iyer",        title: "Wealth Advisor",                  initials: "SI", color: GOLD,
    quote: "The learning environment is genuinely exceptional. The CFA sponsorship and weekly knowledge sessions have made me a better advisor than years at my previous firm did." },
  { name: "Rohan Krishnamurthy", title: "Real Estate Analyst",           initials: "RK", color: BLUE,
    quote: "What I love most is that my ideas actually get implemented. I suggested a new due-diligence checklist and it became team standard within a week. That doesn't happen everywhere." },
];

export default function WorkCulture() {
  return (
    <>
      <PageHero
        pill="Work Culture"
        pillColor={G}
        title="Where Talent"
        titleAccent="Becomes Legacy."
        accentColor={G}
        desc="At OMNI Fincon, we've built a culture where exceptional financial professionals can do the best work of their lives — with meaningful mandates, real ownership, and genuine recognition."
      />

      {/* Culture pillars */}
      <section className="py-20 lg:py-28" style={{ background: NAVY2 }}>
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <RevealWrapper>
            <SectionHeader
              pill="Our Culture"
              pillColor={G}
              title="Six Pillars of the"
              titleAccent="OMNI Culture."
              accentColor={G}
              desc="Not aspirational values on a wall — observable, daily realities that shape how we work together."
            />
          </RevealWrapper>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
            {PILLARS.map((p, i) => {
              const Icon = p.icon;
              return (
                <RevealWrapper key={p.title} delay={i * 70}>
                  <GradientCard color={p.color}>
                    <div className="p-7 rounded-2xl flex flex-col gap-4">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                        style={{ background: `${p.color}18`, border: `1px solid ${p.color}30` }}>
                        <Icon size={22} color={p.color} />
                      </div>
                      <h3 style={{ fontFamily: FONT_SANS, fontSize: "0.97rem", fontWeight: 700, color: TEXT1 }}>{p.title}</h3>
                      <p style={{ fontFamily: FONT_SANS, fontSize: "0.85rem", color: TEXT2, lineHeight: 1.75 }}>{p.desc}</p>
                    </div>
                  </GradientCard>
                </RevealWrapper>
              );
            })}
          </div>
        </div>
      </section>

      {/* A day in life / Moments */}
      <section className="py-20 lg:py-28" style={{ background: NAVY }}>
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <RevealWrapper>
                <SectionHeader
                  pill="Life at OMNI"
                  pillColor={GOLD}
                  title="What Life Looks Like"
                  titleAccent="Day to Day."
                  accentColor={GOLD}
                  desc="Culture isn't a statement — it's the texture of daily experience. Here's what makes OMNI Fincon different to work at."
                />
              </RevealWrapper>
              <div className="flex flex-col gap-4 mt-10">
                {MOMENTS.map((m, i) => (
                  <RevealWrapper key={m.label} delay={i * 60}>
                    <div className="flex gap-4 p-5 rounded-2xl transition-all"
                      style={{ background: "#FFFFFF", border: `1px solid ${SURF_BORDER}`, boxShadow: CARD_SHADOW }}
                      onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.border=`1px solid ${GOLD}25`;}}
                      onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.border=`1px solid ${SURF_BORDER}`;}}>
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: `${GOLD}18`, border: `1px solid ${GOLD}25` }}>
                        <Coffee size={14} color={GOLD} />
                      </div>
                      <div>
                        <p style={{ fontFamily: FONT_SANS, fontSize: "0.88rem", fontWeight: 700, color: TEXT1, marginBottom: "4px" }}>{m.label}</p>
                        <p style={{ fontFamily: FONT_SANS, fontSize: "0.82rem", color: TEXT2, lineHeight: 1.65 }}>{m.desc}</p>
                      </div>
                    </div>
                  </RevealWrapper>
                ))}
              </div>
            </div>

            {/* Stats block */}
            <RevealWrapper delay={150}>
              <div className="rounded-3xl p-8 lg:p-10 sticky top-24"
                style={{ background: `${G}08`, border: `1px solid ${G}20`, backdropFilter: "blur(20px)" }}>
                <p style={{ fontFamily: FONT_SANS, fontSize: "0.7rem", color: G, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "24px" }}>OMNI In Numbers</p>
                {[
                  { val: "4.9/5",  label: "Average Employee Satisfaction Score",   color: G      },
                  { val: "91%",    label: "Employees Promoted Within 3 Years",      color: GOLD   },
                  { val: "18 Mo",  label: "Average Time to First Promotion",        color: BLUE   },
                  { val: "94%",    label: "Team Retention Rate (Last 5 Years)",     color: PURPLE },
                  { val: "100%",   label: "Health Insurance Coverage",              color: G      },
                  { val: "12",     label: "CFA Charterholders on Team",             color: GOLD   },
                ].map((s, i) => (
                  <div key={i} className="flex items-center justify-between py-3.5"
                    style={{ borderBottom: i < 5 ? `1px solid ${SURF_BORDER}` : "none" }}>
                    <p style={{ fontFamily: FONT_SANS, fontSize: "0.82rem", color: TEXT2 }}>{s.label}</p>
                    <p style={{ fontFamily: FONT_NUM, fontSize: "1.3rem", fontWeight: 800, color: s.color, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.01em" }}>{s.val}</p>
                  </div>
                ))}
              </div>
            </RevealWrapper>
          </div>
        </div>
      </section>

      {/* Employee voices */}
      <section className="py-20 lg:py-28" style={{ background: NAVY2 }}>
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <RevealWrapper>
            <SectionHeader
              pill="Team Voices"
              pillColor={G}
              title="Heard From Our"
              titleAccent="Own Team."
              accentColor={G}
              center
            />
          </RevealWrapper>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {TESTIMONIALS.map((t, i) => (
              <RevealWrapper key={t.name} delay={i * 90}>
                <GradientCard color={t.color}>
                  <div className="p-7 rounded-2xl flex flex-col gap-5">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, s) => <Star key={s} size={13} color={GOLD} fill={GOLD} />)}
                    </div>
                    <p style={{ fontFamily: FONT_SANS, fontSize: "0.88rem", color: TEXT2, lineHeight: 1.75, fontStyle: "italic" }}>
                      "{t.quote}"
                    </p>
                    <div className="flex items-center gap-3 mt-auto pt-3" style={{ borderTop: `1px solid ${SURF_BORDER}` }}>
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                        style={{ background: `${t.color}20`, border: `1px solid ${t.color}30`, color: t.color, fontFamily: FONT_SERIF }}>
                        {t.initials}
                      </div>
                      <div>
                        <p style={{ fontFamily: FONT_SANS, fontSize: "0.82rem", fontWeight: 700, color: TEXT1 }}>{t.name}</p>
                        <p style={{ fontFamily: FONT_SANS, fontSize: "0.72rem", color: TEXT2 }}>{t.title}</p>
                      </div>
                    </div>
                  </div>
                </GradientCard>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: NAVY }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <RevealWrapper>
            <h2 style={{ fontFamily: FONT_SERIF, fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: 700, color: TEXT1, marginBottom: "16px" }}>
              Ready to Join a Team <span style={{ color: G, fontStyle: "italic" }}>That Gets It?</span>
            </h2>
            <p className="mb-8" style={{ fontFamily: FONT_SANS, fontSize: "0.95rem", color: TEXT2, lineHeight: 1.75 }}>
              Explore our open positions and take the first step toward the most meaningful work of your financial career.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <GlowButton color={G} href="/careers" size="lg">View Open Roles <ArrowRight size={15} /></GlowButton>
              <GlowButton color={G} href="/contact" outline size="lg">Contact HR <ArrowRight size={14} /></GlowButton>
            </div>
          </RevealWrapper>
        </div>
      </section>
    </>
  );
}
