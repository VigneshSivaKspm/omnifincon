import { useParams, Link } from "react-router";
import { ArrowRight, CheckCircle2, Phone, MessageCircle, ChevronRight } from "lucide-react";
import { G, GOLD, NAVY, NAVY2, TEXT1, TEXT2, FONT_SANS, FONT_SERIF, FONT_NUM, SURF_BORDER, CARD_SHADOW } from "../../../lib/tokens";
import { RevealWrapper, Pill, SectionHeader, GlowButton, GradientCard } from "../../components/shared/Atoms";
import { SERVICES_DATA } from "./data";
import NotFound from "../NotFound";

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const svc = slug ? SERVICES_DATA[slug] : null;
  if (!svc) return <NotFound />;

  const { color } = svc;

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-40 pb-20" style={{ background: NAVY }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 60% 50% at 50% 0%,${color}0e 0%,transparent 65%)` }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: `linear-gradient(rgba(11,26,46,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(11,26,46,0.022) 1px,transparent 1px)`, backgroundSize: "64px 64px", maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%,black 0%,transparent 100%)" }} />

        <div className="relative max-w-[1320px] mx-auto px-6 lg:px-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8" style={{ fontFamily: FONT_SANS, fontSize: "0.75rem", color: TEXT2 }}>
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link to="/services" className="hover:text-white transition-colors">Services</Link>
            <ChevronRight size={12} />
            <span style={{ color }}>{svc.title}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <RevealWrapper>
                <Pill color={color}>{svc.pill}</Pill>
              </RevealWrapper>
              <RevealWrapper delay={80}>
                <h1 style={{
                  fontFamily: FONT_SERIF,
                  fontSize: "clamp(2.4rem,4.5vw,3.8rem)",
                  fontWeight: 700,
                  color: TEXT1,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  marginTop: "20px",
                  marginBottom: "16px",
                }}>
                  {svc.title}
                </h1>
              </RevealWrapper>
              <RevealWrapper delay={140}>
                <p style={{ fontFamily: FONT_SERIF, fontSize: "1.15rem", fontWeight: 400, color: `${color}CC`, lineHeight: 1.4, fontStyle: "italic", marginBottom: "16px" }}>
                  {svc.tagline}
                </p>
              </RevealWrapper>
              <RevealWrapper delay={180}>
                <p style={{ fontFamily: FONT_SANS, fontSize: "0.95rem", color: TEXT2, lineHeight: 1.8 }}>
                  {svc.heroDesc}
                </p>
              </RevealWrapper>
              {svc.range && (
                <RevealWrapper delay={220}>
                  <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full"
                    style={{ background: `${color}12`, border: `1px solid ${color}30` }}>
                    <span style={{ fontFamily: FONT_SANS, fontSize: "0.78rem", color, fontWeight: 600 }}>
                      Ticket Size: {svc.range}
                    </span>
                  </div>
                </RevealWrapper>
              )}
              <RevealWrapper delay={280} className="flex flex-wrap gap-3 mt-8">
                <GlowButton color={color} href="/contact" size="md">
                  Get Consultation <ArrowRight size={14} />
                </GlowButton>
                <a
                  href="https://wa.me/919500063064"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full font-semibold text-sm transition-all hover:scale-105"
                  style={{ padding: "10px 22px", background: "#25D36614", border: "1px solid #25D36630", color: "#25D366", fontFamily: FONT_SANS, fontSize: "0.84rem" }}
                >
                  <MessageCircle size={14} /> WhatsApp Us
                </a>
              </RevealWrapper>
            </div>

            {/* Stats */}
            <RevealWrapper delay={100}>
              <div className="grid grid-cols-2 gap-4">
                {svc.stats.map((s, i) => (
                  <div key={i} className="rounded-2xl p-6 flex flex-col gap-2"
                    style={{ background: "#FFFFFF", border: `1px solid ${color}20`, boxShadow: CARD_SHADOW }}>
                    <p style={{ fontFamily: FONT_NUM, fontSize: "2rem", fontWeight: 800, color, lineHeight: 1, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.02em" }}>
                      {s.value}
                    </p>
                    <p style={{ fontFamily: FONT_SANS, fontSize: "0.72rem", color: TEXT2, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </RevealWrapper>
          </div>
        </div>
      </section>

      {/* ── Offerings ── */}
      <section className="py-20 lg:py-28" style={{ background: NAVY2 }}>
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <RevealWrapper>
            <SectionHeader
              pill="What We Offer"
              pillColor={color}
              title="Comprehensive"
              titleAccent="Advisory Services."
              accentColor={color}
              desc={`Everything you need under ${svc.title} — structured and delivered by OMNI Fincon's expert team.`}
            />
          </RevealWrapper>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
            {svc.offerings.map((o, i) => (
              <RevealWrapper key={i} delay={i * 60}>
                <GradientCard color={color} style={{ height: "100%" }}>
                  <div className="p-6 flex flex-col gap-3 h-full rounded-2xl">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${color}18`, border: `1px solid ${color}25` }}>
                      <CheckCircle2 size={16} color={color} />
                    </div>
                    <h3 style={{ fontFamily: FONT_SANS, fontSize: "0.9rem", fontWeight: 700, color: TEXT1, lineHeight: 1.3 }}>
                      {o.title}
                    </h3>
                    <p style={{ fontFamily: FONT_SANS, fontSize: "0.82rem", color: TEXT2, lineHeight: 1.7, flexGrow: 1 }}>
                      {o.desc}
                    </p>
                  </div>
                </GradientCard>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="py-20 lg:py-28" style={{ background: NAVY }}>
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <RevealWrapper>
            <SectionHeader
              pill="Our Process"
              pillColor={GOLD}
              title="How We"
              titleAccent="Deliver Results."
              accentColor={GOLD}
              desc="Our structured, transparent process ensures every mandate is executed with precision and speed."
            />
          </RevealWrapper>
          <div className="relative mt-14">
            {/* Line connector (desktop) */}
            <div className="hidden lg:block absolute top-8 left-0 right-0 h-px"
              style={{ background: `linear-gradient(to right,transparent,${color}30,${color}30,transparent)`, margin: "0 100px" }} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
              {svc.process.map((p, i) => (
                <RevealWrapper key={i} delay={i * 100}>
                  <div className="flex flex-col gap-4 text-center lg:text-left">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto lg:mx-0"
                      style={{ background: `${color}18`, border: `2px solid ${color}30`, position: "relative" }}>
                      <span style={{ fontFamily: FONT_NUM, fontSize: "1.3rem", fontWeight: 800, color, fontVariantNumeric: "tabular-nums" }}>{p.step}</span>
                    </div>
                    <h3 style={{ fontFamily: FONT_SANS, fontSize: "0.9rem", fontWeight: 700, color: TEXT1, lineHeight: 1.3 }}>
                      {p.title}
                    </h3>
                    <p style={{ fontFamily: FONT_SANS, fontSize: "0.8rem", color: TEXT2, lineHeight: 1.7 }}>
                      {p.desc}
                    </p>
                  </div>
                </RevealWrapper>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose OMNI ── */}
      <section className="py-20 lg:py-28" style={{ background: NAVY2 }}>
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <RevealWrapper>
            <SectionHeader
              pill="Why OMNI Fincon"
              pillColor={color}
              title="The OMNI"
              titleAccent="Advantage."
              accentColor={color}
            />
          </RevealWrapper>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-12">
            {svc.why.map((w, i) => (
              <RevealWrapper key={i} delay={i * 80}>
                <GradientCard color={color}>
                  <div className="flex gap-4 p-6 rounded-2xl">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: `${color}18`, border: `1px solid ${color}25` }}>
                      <CheckCircle2 size={18} color={color} />
                    </div>
                    <div>
                      <h3 style={{ fontFamily: FONT_SANS, fontSize: "0.92rem", fontWeight: 700, color: TEXT1, marginBottom: "6px" }}>
                        {w.title}
                      </h3>
                      <p style={{ fontFamily: FONT_SANS, fontSize: "0.83rem", color: TEXT2, lineHeight: 1.7 }}>
                        {w.desc}
                      </p>
                    </div>
                  </div>
                </GradientCard>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* ── Industries ── */}
      {svc.industries && (
        <section className="py-16" style={{ background: NAVY }}>
          <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
            <RevealWrapper>
              <p className="text-xs font-bold tracking-widest uppercase mb-6" style={{ color: TEXT2, fontFamily: FONT_SANS }}>
                Industries We Serve
              </p>
              <div className="flex flex-wrap gap-3">
                {svc.industries.map((ind) => (
                  <span key={ind} className="px-4 py-2 rounded-full text-sm"
                    style={{ background: `${color}0e`, border: `1px solid ${color}25`, color: TEXT2, fontFamily: FONT_SANS, fontSize: "0.8rem" }}>
                    {ind}
                  </span>
                ))}
              </div>
            </RevealWrapper>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="py-20 lg:py-24 relative overflow-hidden" style={{ background: NAVY2 }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 60% 80% at 50% 50%,${color}0b 0%,transparent 70%)` }} />
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center relative">
          <RevealWrapper>
            <h2 style={{ fontFamily: FONT_SERIF, fontSize: "clamp(1.8rem,3vw,2.8rem)", fontWeight: 700, color: TEXT1, lineHeight: 1.15, marginBottom: "20px" }}>
              Ready to Explore <span style={{ color, fontStyle: "italic" }}>{svc.title}?</span>
            </h2>
            <p className="mb-8 mx-auto" style={{ fontFamily: FONT_SANS, fontSize: "0.95rem", color: TEXT2, lineHeight: 1.75, maxWidth: "500px" }}>
              Talk to our expert advisors today. Free initial consultation with no commitment.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <GlowButton color={color} href="/contact" size="lg">
                Book Free Consultation <ArrowRight size={15} />
              </GlowButton>
              <a href="tel:+919500063064"
                className="inline-flex items-center gap-2 rounded-full font-semibold transition-all hover:scale-105"
                style={{ padding: "14px 26px", border: `1px solid ${SURF_BORDER}`, color: TEXT1, fontFamily: FONT_SANS, background: "#F4F7FD", fontSize: "0.84rem" }}>
                <Phone size={15} color={color} /> +91 95000 63064
              </a>
            </div>
          </RevealWrapper>
        </div>
      </section>
    </>
  );
}
