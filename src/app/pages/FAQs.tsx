import { useState } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { G, GOLD, BLUE, PURPLE, NAVY, NAVY2, TEXT1, TEXT2, FONT_SANS, FONT_SERIF, SURF_BORDER, CARD_SHADOW } from "../../lib/tokens";
import { RevealWrapper, SectionHeader, GlowButton, PageHero } from "../components/shared/Atoms";

const FAQ_CATEGORIES = [
  {
    label: "General", color: G,
    items: [
      { q: "What is OMNI Fincon?",
        a: "OMNI Fincon is a full-service integrated financial advisory firm operating across Investment Banking, Wealth & Risk Advisory, Land & Real Estate Advisory, and Retail Banking & Credit. Founded in 2009, we have advised on over ₹4,800 Cr in mandates across 340+ client engagements." },
      { q: "Where are your offices located?",
        a: "We have offices in Hyderabad (HQ), Mumbai, Vadodara, and Ahmedabad — enabling us to serve clients across India's major financial and industrial centres with genuine local market intelligence." },
      { q: "Who are your typical clients?",
        a: "Our clients span individual HNIs, business families, MSMEs, mid-market corporates, real estate developers, infrastructure companies, and financial institutions. We serve mandates from ₹25 Lakh to ₹500 Cr+ in size." },
      { q: "Do you charge upfront fees?",
        a: "For most mandates, our primary fee structure is success-based — we earn when you close. For complex advisory engagements requiring significant research or preparation, we charge a nominal retainer that is adjusted against success fees upon closure." },
    ],
  },
  {
    label: "Investment Banking", color: GOLD,
    items: [
      { q: "What types of debt mandates do you handle?",
        a: "We handle term loans, working capital facilities, construction finance, project finance, structured debt, mezzanine financing, NCD placement, ECB, and AIF/debt fund placements — across ticket sizes from ₹2 Cr to ₹500 Cr+." },
      { q: "How long does a typical debt syndication mandate take?",
        a: "Our average mandate-to-disbursement timeline is 45 days for straightforward debt mandates. Complex structured deals or project finance mandates may take 60-90 days due to detailed due diligence requirements." },
      { q: "Which lenders do you work with?",
        a: "We maintain pre-qualified relationships with 50+ institutions — including all major PSU banks (SBI, BOB, PNB, etc.), private banks (HDFC, ICICI, Axis, Kotak), leading NBFCs (Bajaj Finance, Piramal, L&T), and specialty AIFs." },
      { q: "Can you help with project finance for greenfield projects?",
        a: "Yes. Project finance for greenfield and brownfield infrastructure, manufacturing, and real estate projects is a core competency. We structure debt with appropriate DSCR, moratorium, and security coverage to match project cashflows." },
      { q: "Do you handle M&A advisory?",
        a: "Yes. We advise on both buy-side and sell-side M&A transactions for MSME and mid-market companies. Our M&A team has completed 40+ transactions across manufacturing, financial services, and real estate." },
    ],
  },
  {
    label: "Wealth Management", color: BLUE,
    items: [
      { q: "What is the minimum portfolio size for Wealth Advisory?",
        a: "We work with clients from ₹50 Lakh in investable assets. For our premium Family Office service, the minimum portfolio is ₹5 Cr." },
      { q: "What investment products do you advise on?",
        a: "We advise on Mutual Funds, PMS (Portfolio Management Services), AIF (Alternative Investment Funds), Direct Equity, Bonds & NCDs, Real Estate Investments (REITs), Insurance, NPS, and international investments — delivering an integrated, holistic portfolio view." },
      { q: "How are you compensated for wealth advice?",
        a: "We operate on both trail-commission and advisory-fee models. For clients seeking truly independent advice, we offer a fee-only advisory model where we earn zero commission and charge a transparent annual advisory fee." },
      { q: "Can you help with estate and succession planning?",
        a: "Yes. Estate planning including Will drafting, Trust structuring, HUF advisory, and cross-generational wealth transfer planning is a key offering, particularly for business families." },
    ],
  },
  {
    label: "Real Estate Advisory", color: PURPLE,
    items: [
      { q: "What real estate advisory services do you offer?",
        a: "We offer Land & Asset Advisory (buying/selling land), JV Structuring (landowner-developer joint ventures), Real Estate Finance (construction finance, LAP, project loan syndication), and Due Diligence & Valuation services." },
      { q: "Do you help developers find land or JV partners?",
        a: "Yes. We maintain an active land and JV opportunity database across Gujarat, Maharashtra, and Telangana. We facilitate both direct land transactions and structured JV agreements between landowners and developers." },
      { q: "Can you arrange construction finance for my project?",
        a: "Yes — this is a core service. We syndicate construction finance from banks, NBFCs, and alternative lenders for residential, commercial, warehousing, and hospitality projects. Typical ticket sizes range from ₹20 Cr to ₹300 Cr." },
    ],
  },
  {
    label: "Retail Credit", color: G,
    items: [
      { q: "What retail loan products can you help me access?",
        a: "We facilitate Home Loans, Personal Loans, Business Loans (unsecured), Loan Against Property, MSME Working Capital, Machinery & Equipment Finance, Vehicle Loans, and Education Loans through our extensive banking and NBFC network." },
      { q: "What is the minimum loan amount you handle?",
        a: "We facilitate retail loans starting from ₹5 Lakh. However, our core expertise is in loans above ₹50 Lakh where genuine advisory value can be added through lender selection, negotiation, and structuring." },
      { q: "I have a low CIBIL score. Can you still help?",
        a: "Yes — in many cases. We have relationships with lenders who consider alternate data points beyond CIBIL: banking behaviour, business vintage, collateral quality, and sectoral expertise. We assess each case individually." },
      { q: "How long does a home loan take through OMNI Fincon?",
        a: "Salaried home loans typically close in 15-21 days. Self-employed and business loans may take 21-35 days depending on documentation completeness. Our team prepares a structured documentation package that minimises back-and-forth with lenders." },
    ],
  },
  {
    label: "Compliance & Regulatory", color: GOLD,
    items: [
      { q: "Can you help us register an NBFC or AIF?",
        a: "Yes. Our Regulatory Advisory team specialises in NBFC registration (all categories), AIF Category I/II/III registration, SEBI registration for investment advisers, and related compliance setups. We have guided 25+ entities through these processes." },
      { q: "Do you provide ongoing compliance support?",
        a: "Yes. Beyond initial registration, we offer retainer-based ongoing compliance support — including half-yearly RBI returns, SEBI quarterly filings, board compliance calendars, and KYC/AML policy development." },
    ],
  },
];

export default function FAQs() {
  const [activeCat, setActiveCat] = useState("General");
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const activeFaqs = FAQ_CATEGORIES.find(c => c.label === activeCat)?.items || [];
  const activeColor = FAQ_CATEGORIES.find(c => c.label === activeCat)?.color || G;

  return (
    <>
      <PageHero
        pill="FAQs"
        pillColor={G}
        title="Answers to Your"
        titleAccent="Key Questions."
        accentColor={G}
        desc="Comprehensive answers to the most common questions about OMNI Fincon's services, processes, and fees. Can't find your answer? Reach out directly."
      />

      <section className="py-20 lg:py-28" style={{ background: NAVY }}>
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-[280px_1fr] gap-10">

            {/* Category sidebar */}
            <div>
              <RevealWrapper>
                <div className="rounded-2xl p-5 sticky top-28"
                  style={{ background: "#FFFFFF", border: `1px solid ${SURF_BORDER}`, boxShadow: CARD_SHADOW }}>
                  <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: TEXT2, fontFamily: FONT_SANS }}>Categories</p>
                  <div className="flex flex-col gap-1.5">
                    {FAQ_CATEGORIES.map(cat => (
                      <button key={cat.label}
                        onClick={()=>{ setActiveCat(cat.label); setOpenIdx(0); }}
                        className="flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all text-sm font-medium"
                        style={{
                          background: activeCat===cat.label ? `${cat.color}15` : "transparent",
                          border: activeCat===cat.label ? `1px solid ${cat.color}30` : "1px solid transparent",
                          color: activeCat===cat.label ? cat.color : TEXT2, fontFamily: FONT_SANS,
                        }}>
                        {cat.label}
                        <span className="text-xs opacity-60">{cat.items.length}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </RevealWrapper>
            </div>

            {/* FAQs */}
            <div>
              <RevealWrapper>
                <p className="text-xs font-bold tracking-widest uppercase mb-6" style={{ color: activeColor, fontFamily: FONT_SANS }}>
                  {activeCat} — {activeFaqs.length} Questions
                </p>
              </RevealWrapper>
              <div className="flex flex-col gap-3">
                {activeFaqs.map((faq, i) => (
                  <RevealWrapper key={i} delay={i * 50}>
                    <div className="rounded-2xl overflow-hidden transition-all"
                      style={{
                        background: openIdx===i ? `${activeColor}07` : "#F4F7FD",
                        border: openIdx===i ? `1px solid ${activeColor}28` : `1px solid ${SURF_BORDER}`,
                      }}>
                      <button className="w-full flex items-start justify-between gap-4 p-5 text-left"
                        onClick={()=>setOpenIdx(openIdx===i ? null : i)}>
                        <span style={{ fontFamily: FONT_SANS, fontSize: "0.92rem", fontWeight: 600, color: TEXT1, lineHeight: 1.5 }}>
                          {faq.q}
                        </span>
                        <ChevronDown size={18} color={openIdx===i ? activeColor : TEXT2}
                          style={{ transform: openIdx===i ? "rotate(180deg)" : "none", transition: "transform 0.3s ease", shrink: 0 }}
                          className="shrink-0 mt-0.5" />
                      </button>
                      {openIdx === i && (
                        <div className="px-5 pb-5">
                          <p style={{ fontFamily: FONT_SANS, fontSize: "0.87rem", color: TEXT2, lineHeight: 1.85 }}>
                            {faq.a}
                          </p>
                        </div>
                      )}
                    </div>
                  </RevealWrapper>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Still have questions CTA */}
      <section className="py-20" style={{ background: NAVY2 }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <RevealWrapper>
            <h2 style={{ fontFamily: FONT_SERIF, fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 700, color: TEXT1, marginBottom: "12px" }}>
              Still Have <span style={{ color: G, fontStyle: "italic" }}>Questions?</span>
            </h2>
            <p className="mb-8" style={{ fontFamily: FONT_SANS, fontSize: "0.9rem", color: TEXT2, lineHeight: 1.75 }}>
              Our senior advisors are happy to answer any specific questions about your mandate or financial situation — no obligation, no sales pressure.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <GlowButton color={G} href="/contact" size="lg">Book a Free Call <ArrowRight size={15} /></GlowButton>
              <GlowButton color={G} href="https://wa.me/919500063064" outline size="lg">WhatsApp Us</GlowButton>
            </div>
          </RevealWrapper>
        </div>
      </section>
    </>
  );
}
