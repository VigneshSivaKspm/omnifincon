import { ArrowRight, Building2, CheckCircle2, Shield, Zap } from "lucide-react";
import { G, GOLD, BLUE, PURPLE, NAVY, NAVY2, TEXT1, TEXT2, FONT_SANS, FONT_SERIF, FONT_NUM, PARTNERS, SURF_BORDER, CARD_SHADOW } from "../../lib/tokens";
import { RevealWrapper, SectionHeader, GlowButton, GradientCard, PageHero } from "../components/shared/Atoms";

const CATEGORIES = [
  {
    label: "Public Sector Banks", color: G,
    partners: ["State Bank of India","Bank of Baroda","Bank of India","Punjab National Bank","Canara Bank","Union Bank of India","Indian Bank","UCO Bank"],
    desc: "Our pre-qualified relationships with India's leading PSU banks ensure priority processing and competitive rates for institutional mandates.",
  },
  {
    label: "Private Sector Banks", color: GOLD,
    partners: ["HDFC Bank","ICICI Bank","Axis Bank","Kotak Mahindra Bank","IndusInd Bank","Yes Bank","RBL Bank","Federal Bank"],
    desc: "Deep relationships with credit decision-makers at India's top private banks — enabling faster approvals and bespoke structuring.",
  },
  {
    label: "NBFCs & HFCs", color: BLUE,
    partners: ["Bajaj Finance","Piramal Finance","L&T Finance","Edelweiss","Tata Capital","Cholamandalam","Shriram Finance","LIC Housing Finance","HDFC Ltd","PNB Housing"],
    desc: "A wide NBFC & HFC network that provides flexible credit solutions for borrowers who need speed and structuring innovation.",
  },
  {
    label: "Institutional Funds & AIFs", color: PURPLE,
    partners: ["IIFL Finance","360 ONE","Motilal Oswal","Mirae Asset","BlackSoil Capital","Varanium Capital","Northern Arc","Vivriti Capital"],
    desc: "Specialized debt fund and AIF relationships for structured products, mezzanine finance, and high-yield credit mandates.",
  },
];

const ADVANTAGES = [
  { icon: Building2, title: "50+ Institutions",    desc: "Relationships across PSU banks, private banks, NBFCs, HFCs, and AIFs — the broadest network among boutique advisors." },
  { icon: CheckCircle2, title: "Decision-Level Access", desc: "Our relationships extend to credit committees and senior decision-makers — not just relationship managers." },
  { icon: Zap,       title: "Parallel Processing", desc: "We run lender conversations in parallel across multiple institutions to compress timelines significantly." },
  { icon: Shield,    title: "Pre-Qualified Network", desc: "Every lender relationship is maintained and updated quarterly — we know exactly who's lending and on what terms." },
];

export default function LendingPartners() {
  return (
    <>
      <PageHero
        pill="Lending Partners"
        pillColor={G}
        title="50+ Institutional"
        titleAccent="Lending Partners."
        accentColor={G}
        desc="OMNI Fincon's pre-qualified lender network spans India's entire institutional lending ecosystem — from PSU banks to specialty AIFs. Every relationship is cultivated at the decision-maker level."
      />

      {/* Advantages */}
      <section className="py-16" style={{ background: NAVY2, borderBottom: `1px solid ${SURF_BORDER}` }}>
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ADVANTAGES.map((a, i) => {
              const Icon = a.icon;
              return (
                <RevealWrapper key={a.title} delay={i * 60}>
                  <div className="p-5 rounded-2xl" style={{ background: `${G}07`, border: `1px solid ${G}18` }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: `${G}18`, border: `1px solid ${G}30` }}>
                      <Icon size={18} color={G} />
                    </div>
                    <p style={{ fontFamily: FONT_SANS, fontSize: "0.9rem", fontWeight: 700, color: TEXT1, marginBottom: "6px" }}>{a.title}</p>
                    <p style={{ fontFamily: FONT_SANS, fontSize: "0.8rem", color: TEXT2, lineHeight: 1.65 }}>{a.desc}</p>
                  </div>
                </RevealWrapper>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partner categories */}
      <section className="py-20 lg:py-28" style={{ background: NAVY }}>
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <RevealWrapper>
            <SectionHeader
              pill="Our Network"
              pillColor={G}
              title="Partners Across Every"
              titleAccent="Lending Category."
              accentColor={G}
              desc="Comprehensive lender coverage means we can always find the right capital source for your specific mandate — regardless of size, structure, or sector."
            />
          </RevealWrapper>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {CATEGORIES.map((cat, i) => (
              <RevealWrapper key={cat.label} delay={i * 80}>
                <GradientCard color={cat.color}>
                  <div className="p-7 rounded-2xl flex flex-col gap-5">
                    <div>
                      <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: cat.color, fontFamily: FONT_SANS }}>{cat.label}</p>
                      <p style={{ fontFamily: FONT_SANS, fontSize: "0.83rem", color: TEXT2, lineHeight: 1.65 }}>{cat.desc}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {cat.partners.map(p => (
                        <span key={p} className="px-3 py-1.5 rounded-lg text-xs font-medium"
                          style={{ background: `${cat.color}10`, border: `1px solid ${cat.color}22`, color: TEXT1, fontFamily: FONT_SANS }}>
                          {p}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-2 h-2 rounded-full" style={{ background: cat.color }} />
                      <span style={{ fontFamily: FONT_SANS, fontSize: "0.72rem", color: cat.color, fontWeight: 600 }}>
                        {cat.partners.length}+ Institutions in Network
                      </span>
                    </div>
                  </div>
                </GradientCard>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* All partners strip */}
      <section className="py-16" style={{ background: NAVY2 }}>
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <RevealWrapper>
            <p className="text-center text-xs font-bold tracking-widest uppercase mb-10" style={{ color: TEXT2, fontFamily: FONT_SANS }}>
              OMNI Fincon Lender Partners (Indicative List)
            </p>
          </RevealWrapper>
          <RevealWrapper delay={80}>
            <div className="flex flex-wrap gap-3 justify-center">
              {PARTNERS.map((p) => (
                <div key={p} className="px-4 py-2 rounded-xl text-sm"
                  style={{ background: "#FFFFFF", border: `1px solid ${SURF_BORDER}`, boxShadow: CARD_SHADOW, color: TEXT2, fontFamily: FONT_SANS }}>
                  {p}
                </div>
              ))}
            </div>
          </RevealWrapper>
        </div>
      </section>

      {/* How we work with lenders */}
      <section className="py-20 lg:py-28" style={{ background: NAVY }}>
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
          <RevealWrapper>
            <SectionHeader
              pill="Our Process"
              pillColor={GOLD}
              title="How We Use Our"
              titleAccent="Lender Network."
              accentColor={GOLD}
              desc="Our lender relationships are carefully managed — not just a contact list. Here's how we leverage them to deliver better outcomes for every client mandate."
            />
            <div className="flex flex-col gap-4 mt-10">
              {[
                { step: "01", title: "Mandate Analysis",     desc: "Deep understanding of the client's business, financials, and credit requirements before approaching any lender." },
                { step: "02", title: "Lender Shortlisting",  desc: "We match the mandate to 3-5 optimal lenders based on their current risk appetite, sector exposure, and rate competitiveness." },
                { step: "03", title: "Parallel Approach",    desc: "We run all lender conversations simultaneously, creating genuine competitive tension and faster timelines." },
                { step: "04", title: "Term Sheet Comparison",desc: "We present clients with a structured comparison of all term sheets — ensuring the best combination of rate, tenor, and covenants." },
                { step: "05", title: "Close & Disburse",     desc: "We manage documentation, legal review coordination, and disbursement follow-up to ensure a clean close." },
              ].map((s, i) => (
                <RevealWrapper key={i} delay={i * 60}>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: `${GOLD}18`, border: `1px solid ${GOLD}30` }}>
                      <span style={{ fontFamily: FONT_SANS, fontSize: "0.65rem", fontWeight: 700, color: GOLD }}>{s.step}</span>
                    </div>
                    <div className="pb-6" style={{ borderBottom: i < 4 ? `1px solid ${SURF_BORDER}` : "none", flex: 1 }}>
                      <p style={{ fontFamily: FONT_SANS, fontSize: "0.9rem", fontWeight: 700, color: TEXT1, marginBottom: "4px" }}>{s.title}</p>
                      <p style={{ fontFamily: FONT_SANS, fontSize: "0.82rem", color: TEXT2, lineHeight: 1.65 }}>{s.desc}</p>
                    </div>
                  </div>
                </RevealWrapper>
              ))}
            </div>
          </RevealWrapper>
          <RevealWrapper delay={120}>
            <div className="rounded-3xl p-8 lg:p-10"
              style={{ background: `${G}07`, border: `1px solid ${G}20`, backdropFilter: "blur(20px)" }}>
              <p className="text-xs font-bold tracking-widest uppercase mb-6" style={{ color: G, fontFamily: FONT_SANS }}>Network at a Glance</p>
              {[
                { label: "Total Lender Relationships",    val: "50+",    color: G      },
                { label: "PSU Bank Relationships",        val: "08",     color: GOLD   },
                { label: "Private Bank Relationships",    val: "08",     color: BLUE   },
                { label: "NBFC & HFC Relationships",      val: "10+",    color: PURPLE },
                { label: "AIF & Debt Fund Relationships", val: "08+",    color: G      },
                { label: "Average Ticket Size Handled",   val: "₹2 Cr+", color: GOLD   },
                { label: "Largest Mandate Closed",        val: "₹320 Cr", color: BLUE  },
                { label: "Average Turnaround Time",       val: "45 Days", color: PURPLE },
              ].map((r, i) => (
                <div key={i} className="flex items-center justify-between py-3"
                  style={{ borderBottom: i < 7 ? `1px solid ${SURF_BORDER}` : "none" }}>
                  <p style={{ fontFamily: FONT_SANS, fontSize: "0.82rem", color: TEXT2 }}>{r.label}</p>
                  <p style={{ fontFamily: FONT_NUM, fontSize: "1.1rem", fontWeight: 800, color: r.color, fontVariantNumeric: "tabular-nums" }}>{r.val}</p>
                </div>
              ))}
              <div className="mt-7">
                <GlowButton color={G} href="/contact" fullWidth size="md">Discuss Your Mandate <ArrowRight size={14} /></GlowButton>
              </div>
            </div>
          </RevealWrapper>
        </div>
      </section>
    </>
  );
}
