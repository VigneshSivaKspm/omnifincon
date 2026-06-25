import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { G, GOLD, BLUE, PURPLE, NAVY, NAVY2, TEXT1, TEXT2, FONT_SANS, FONT_SERIF, FONT_NUM, SURF_BORDER } from "../../../lib/tokens";
import { RevealWrapper, Pill, SectionHeader, GlowButton, GradientCard, PageHero } from "../../components/shared/Atoms";
import { SERVICES_DATA } from "./data";

const CATEGORIES = [
  {
    title: "Investment & Capital Markets",
    color: G,
    desc: "End-to-end capital structuring and fund raising across debt, equity, and hybrid instruments.",
    slugs: ["investment-banking","fund-raising","debt-syndication","ma-advisory","project-finance","structured-finance"],
  },
  {
    title: "Advisory & Consulting",
    color: GOLD,
    desc: "Specialised advisory for real estate, wealth management, NBFC/AIF launch, and MSME financing.",
    slugs: ["real-estate-advisory","wealth-advisory","nbfc-aif-launch","msme-solutions"],
  },
  {
    title: "Retail Banking & Credit",
    color: BLUE,
    desc: "Individual and business credit products — from personal loans to working capital facilities.",
    slugs: ["personal-loan","business-loan","home-loan","loan-against-property","working-capital-loan","retail-banking"],
  },
];

export default function ServicesHub() {
  return (
    <>
      <PageHero
        pill="All Services"
        pillColor={G}
        title="16 Financial Services."
        titleAccent="One Integrated Firm."
        accentColor={G}
        desc="OMNI Fincon's comprehensive suite of financial services covers every stage of your growth journey — from capital raising and wealth management to retail credit and regulatory advisory."
      >
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <GlowButton color={G} href="/contact" size="md">
            Get Expert Advice <ArrowRight size={14} />
          </GlowButton>
          <GlowButton color={G} href="/calculators" outline size="md">
            Try Our Calculators
          </GlowButton>
        </div>
      </PageHero>

      {/* Quick stats */}
      <section className="py-10" style={{ background: NAVY2, borderBottom: `1px solid ${SURF_BORDER}` }}>
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { val: "16+",        label: "Financial Services"     },
              { val: "₹4,800 Cr+", label: "Total Mandates Advised" },
              { val: "340+",       label: "Successful Closures"    },
              { val: "30+",        label: "Sectors Covered"        },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p style={{ fontFamily: FONT_NUM, fontSize: "2rem", fontWeight: 800, color: G, lineHeight: 1, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.02em" }}>{s.val}</p>
                <p style={{ fontFamily: FONT_SANS, fontSize: "0.72rem", color: TEXT2, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "6px" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service categories */}
      {CATEGORIES.map((cat, ci) => (
        <section key={ci} className="py-20 lg:py-28" style={{ background: ci % 2 === 0 ? NAVY : NAVY2 }}>
          <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
            <RevealWrapper>
              <SectionHeader
                pill={cat.title}
                pillColor={cat.color}
                title={cat.title}
                accentColor={cat.color}
                desc={cat.desc}
              />
            </RevealWrapper>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
              {cat.slugs.map((slug, i) => {
                const svc = SERVICES_DATA[slug];
                if (!svc) return null;
                return (
                  <RevealWrapper key={slug} delay={i * 70}>
                    <GradientCard color={svc.color} style={{ height: "100%" }}>
                      <Link to={`/services/${slug}`} className="flex flex-col gap-4 p-7 h-full rounded-2xl">
                        <div>
                          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: svc.color, fontFamily: FONT_SANS }}>
                            {svc.pill}
                          </span>
                          {svc.range && (
                            <span className="ml-3 text-xs" style={{ color: `${svc.color}90`, fontFamily: FONT_SANS }}>
                              {svc.range}
                            </span>
                          )}
                        </div>
                        <h3 style={{ fontFamily: FONT_SERIF, fontSize: "1.2rem", fontWeight: 700, color: TEXT1, lineHeight: 1.3 }}>
                          {svc.title}
                        </h3>
                        <p style={{ fontFamily: FONT_SANS, fontSize: "0.83rem", color: TEXT2, lineHeight: 1.7, flexGrow: 1 }}>
                          {svc.tagline}
                        </p>
                        <div className="flex items-center gap-1.5 font-semibold text-sm mt-auto transition-all" style={{ color: svc.color, fontFamily: FONT_SANS }}>
                          Learn More <ArrowRight size={13} />
                        </div>
                      </Link>
                    </GradientCard>
                  </RevealWrapper>
                );
              })}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-20 relative overflow-hidden" style={{ background: NAVY }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 50% 70% at 50% 50%,${G}0b 0%,transparent 65%)` }} />
        <div className="max-w-3xl mx-auto px-6 text-center relative">
          <RevealWrapper>
            <Pill color={G}>Not Sure Where to Start?</Pill>
            <h2 className="mt-5 mb-4" style={{ fontFamily: FONT_SERIF, fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: 700, color: TEXT1, lineHeight: 1.15 }}>
              Let Our Experts Guide You to the <span style={{ color: G, fontStyle: "italic" }}>Right Solution.</span>
            </h2>
            <p className="mb-8" style={{ fontFamily: FONT_SANS, fontSize: "0.95rem", color: TEXT2, lineHeight: 1.75 }}>
              Book a free 30-minute consultation with our senior advisors. No obligations, just clarity.
            </p>
            <GlowButton color={G} href="/contact" size="lg">
              Book Free Consultation <ArrowRight size={15} />
            </GlowButton>
          </RevealWrapper>
        </div>
      </section>
    </>
  );
}
