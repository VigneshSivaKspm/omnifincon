import { ArrowRight, Linkedin } from "lucide-react";
import { G, GOLD, BLUE, PURPLE, NAVY, NAVY2, TEXT1, TEXT2, FONT_SANS, FONT_SERIF, FONT_NUM, SURF_BORDER, CARD_SHADOW } from "../../lib/tokens";
import { RevealWrapper, Pill, SectionHeader, GlowButton, GradientCard, PageHero, StarRating } from "../components/shared/Atoms";

const LEADERS = [
  { name: "Rajesh Sharma", title: "Founder & Managing Director", initials: "RS", color: G,
    exp: "25+ Years", expertise: "Investment Banking, Debt Syndication, PSU Banking",
    bio: "Former senior banker with State Bank of India and HDFC Bank. Rajesh has personally structured and closed over ₹2,000 Cr in debt and equity mandates across real estate, infrastructure, and manufacturing sectors.",
    credentials: ["Ex-SBI","Ex-HDFC Bank","MBA Finance – IIM Ahmedabad"] },
  { name: "Priya Menon", title: "Director – Wealth & Asset Management", initials: "PM", color: GOLD,
    exp: "20+ Years", expertise: "Wealth Management, Insurance, Estate Planning",
    bio: "A seasoned wealth advisor with prior experience at Kotak Private Banking and Aditya Birla Capital. Priya has managed over ₹1,200 Cr in HNI and family office portfolios.",
    credentials: ["CFP Certified","Ex-Kotak Private Banking","MBA – XLRI Jamshedpur"] },
  { name: "Vikram Desai", title: "Director – Real Estate Advisory", initials: "VD", color: BLUE,
    exp: "18+ Years", expertise: "Land Advisory, JV Structuring, Construction Finance",
    bio: "Real estate specialist with deep expertise in land acquisition, JV structuring, and construction finance across Gujarat, Maharashtra, and Telangana. Has advised on over 120 land and JV transactions.",
    credentials: ["Ex-Piramal Finance","Ex-IIFL","B.Arch + MBA"] },
  { name: "Ananya Rao", title: "Head – Investment Banking", initials: "AR", color: PURPLE,
    exp: "15+ Years", expertise: "M&A, Project Finance, Structured Finance",
    bio: "Corporate finance specialist with deep M&A and project finance expertise. Ananya has led over 40 M&A mandates and structured project finance transactions across renewable energy and infrastructure.",
    credentials: ["CFA Charterholder","Ex-Axis Capital","MBA – ISB Hyderabad"] },
  { name: "Sanjay Patel", title: "Head – Retail Banking & MSME", initials: "SP", color: G,
    exp: "16+ Years", expertise: "Retail Credit, MSME Finance, Banking Operations",
    bio: "Retail banking veteran with prior roles at Bajaj Finance and ICICI Bank. Sanjay has facilitated over ₹500 Cr in MSME and retail credit across Ahmedabad and Vadodara.",
    credentials: ["Ex-Bajaj Finance","Ex-ICICI Bank","MBA Finance"] },
  { name: "Kavitha Reddy", title: "Head – Regulatory & Compliance", initials: "KR", color: GOLD,
    exp: "14+ Years", expertise: "NBFC/AIF Registration, RBI Compliance, SEBI Advisory",
    bio: "Regulatory specialist with hands-on experience in RBI NBFC registrations and SEBI AIF launches. Kavitha has guided 25+ entities through complex regulatory processes.",
    credentials: ["CS (ICSI Qualified)","Ex-Reserve Bank of India","LLB + MBA"] },
];

export default function Team() {
  return (
    <>
      <PageHero
        pill="Our Team"
        pillColor={G}
        title="Expert Advisors."
        titleAccent="Genuine Partners."
        accentColor={G}
        desc="OMNI Fincon's leadership team brings 200+ years of cumulative experience from India's top banks, NBFCs, and advisory firms — deeply networked and results-driven."
      />

      {/* Leadership team */}
      <section className="py-20 lg:py-28" style={{ background: NAVY2 }}>
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <RevealWrapper>
            <SectionHeader
              pill="Leadership"
              pillColor={G}
              title="Meet Our"
              titleAccent="Leadership Team."
              accentColor={G}
              desc="Senior professionals with an average of 18+ years each in India's financial sector."
            />
          </RevealWrapper>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
            {LEADERS.map((l, i) => (
              <RevealWrapper key={l.name} delay={i * 80}>
                <GradientCard color={l.color} style={{ height: "100%" }}>
                  <div className="flex flex-col gap-5 p-7 h-full rounded-2xl">
                    {/* Avatar */}
                    <div className="flex items-start justify-between">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold"
                        style={{ background: `${l.color}20`, border: `2px solid ${l.color}35`, color: l.color, fontFamily: FONT_SERIF }}>
                        {l.initials}
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-bold"
                        style={{ background: `${l.color}18`, color: l.color, border: `1px solid ${l.color}30`, fontFamily: FONT_SANS }}>
                        {l.exp}
                      </span>
                    </div>
                    {/* Info */}
                    <div>
                      <h3 style={{ fontFamily: FONT_SERIF, fontSize: "1.1rem", fontWeight: 700, color: TEXT1, lineHeight: 1.25 }}>{l.name}</h3>
                      <p className="mt-1" style={{ fontFamily: FONT_SANS, fontSize: "0.78rem", color: l.color, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>{l.title}</p>
                    </div>
                    {/* Expertise */}
                    <div className="px-3 py-2 rounded-lg" style={{ background: "#F4F7FD", border: `1px solid ${SURF_BORDER}` }}>
                      <p style={{ fontFamily: FONT_SANS, fontSize: "0.72rem", color: TEXT2 }}>
                        <span style={{ color: TEXT1, fontWeight: 600 }}>Expertise:</span> {l.expertise}
                      </p>
                    </div>
                    {/* Bio */}
                    <p style={{ fontFamily: FONT_SANS, fontSize: "0.83rem", color: TEXT2, lineHeight: 1.7, flexGrow: 1 }}>{l.bio}</p>
                    {/* Credentials */}
                    <div className="flex flex-wrap gap-1.5">
                      {l.credentials.map(c => (
                        <span key={c} className="text-xs px-2.5 py-1 rounded-full"
                          style={{ background: "#F4F7FD", color: TEXT2, border: `1px solid ${SURF_BORDER}`, fontFamily: FONT_SANS }}>
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </GradientCard>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Team expertise */}
      <section className="py-20" style={{ background: NAVY }}>
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <RevealWrapper>
            <SectionHeader
              pill="Collective Expertise"
              pillColor={GOLD}
              title="Combined Expertise Across"
              titleAccent="India's Financial Ecosystem."
              accentColor={GOLD}
              center
            />
          </RevealWrapper>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-12 max-w-4xl mx-auto">
            {[
              { val: "200+", label: "Years Combined Experience", color: G      },
              { val: "50+",  label: "Lender Relationships",      color: GOLD   },
              { val: "15+",  label: "Former Bankers on Team",    color: BLUE   },
              { val: "4",    label: "Cities of Operation",       color: PURPLE },
            ].map((s) => (
              <RevealWrapper key={s.label}>
                <div className="text-center p-6 rounded-2xl" style={{ background: "#FFFFFF", border: `1px solid ${SURF_BORDER}`, boxShadow: CARD_SHADOW }}>
                  <p style={{ fontFamily: FONT_NUM, fontSize: "2.2rem", fontWeight: 800, color: s.color, lineHeight: 1, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.02em" }}>{s.val}</p>
                  <p className="mt-2" style={{ fontFamily: FONT_SANS, fontSize: "0.72rem", color: TEXT2, textTransform: "uppercase", letterSpacing: "0.1em", lineHeight: 1.5 }}>{s.label}</p>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Join us */}
      <section className="py-20" style={{ background: NAVY2 }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <RevealWrapper>
            <Pill color={G}>Join Our Team</Pill>
            <h2 className="mt-5 mb-4" style={{ fontFamily: FONT_SERIF, fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: 700, color: TEXT1 }}>
              Build Your Career at <span style={{ color: G, fontStyle: "italic" }}>OMNI Fincon.</span>
            </h2>
            <p className="mb-8" style={{ fontFamily: FONT_SANS, fontSize: "0.95rem", color: TEXT2, lineHeight: 1.75 }}>
              We're always looking for talented financial professionals who share our passion for client outcomes and financial excellence.
            </p>
            <GlowButton color={G} href="/careers" size="lg">View Open Positions <ArrowRight size={15} /></GlowButton>
          </RevealWrapper>
        </div>
      </section>
    </>
  );
}
