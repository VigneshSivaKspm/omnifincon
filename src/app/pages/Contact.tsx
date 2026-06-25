import { useState } from "react";
import { Phone, Mail, MapPin, CheckCircle2, MessageCircle, ArrowRight } from "lucide-react";
import { G, GOLD, NAVY, NAVY2, TEXT1, TEXT2, FONT_SANS, FONT_SERIF, OFFICES, SURF_BORDER, CARD_SHADOW, CARD_SHADOW_LG } from "../../lib/tokens";
import { RevealWrapper, SectionHeader, GlowButton, PageHero } from "../components/shared/Atoms";

const INTEREST_OPTIONS = [
  "Investment Banking","Wealth Management","Real Estate Advisory",
  "Retail Banking","Channel Partnership","Other",
];

export default function Contact() {
  const [interest, setInterest] = useState("Investment Banking");
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <PageHero
        pill="Contact Us"
        pillColor={G}
        title="Let's Start a"
        titleAccent="Conversation."
        accentColor={G}
        desc="Reach out for a free consultation. Our senior advisors respond to all enquiries within one business day."
      />

      {/* Quick contact strip */}
      <section className="py-10" style={{ background: NAVY2, borderBottom: `1px solid ${SURF_BORDER}` }}>
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: Phone,    label: "Call Us",        val: "+91 95000 63064",      href: "tel:+919500063064",        color: G    },
              { icon: Mail,     label: "Email Us",       val: "contact@omnifincon.com", href: "mailto:contact@omnifincon.com", color: GOLD },
              { icon: MessageCircle, label: "WhatsApp", val: "Chat with Us",          href: "https://wa.me/919500063064", color: "#25D366" },
            ].map((c) => {
              const Icon = c.icon;
              return (
                <a key={c.label} href={c.href} target={c.icon === MessageCircle ? "_blank" : undefined} rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 rounded-2xl transition-all hover:scale-[1.02]"
                  style={{ background: `${c.color}08`, border: `1px solid ${c.color}20` }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${c.color}18`, border: `1px solid ${c.color}30` }}>
                    <Icon size={20} color={c.color} />
                  </div>
                  <div>
                    <p style={{ fontFamily: FONT_SANS, fontSize: "0.7rem", color: c.color, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>{c.label}</p>
                    <p style={{ fontFamily: FONT_SANS, fontSize: "0.88rem", color: TEXT1, fontWeight: 600, marginTop: "2px" }}>{c.val}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main contact section */}
      <section id="contact" style={{ background: NAVY }}>
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-20 lg:py-28 grid lg:grid-cols-2 gap-16">

          {/* Offices */}
          <div>
            <RevealWrapper>
              <SectionHeader pill={<><MapPin size={10}/> Our Offices</>} pillColor={G} title="Present Across" titleAccent="India's Growth Centres." accentColor={G} />
            </RevealWrapper>
            <div className="grid sm:grid-cols-2 gap-4 mt-10">
              {OFFICES.map((o, i) => (
                <RevealWrapper key={o.city} delay={i * 70}>
                  <div className="rounded-2xl p-5 transition-all duration-300 group cursor-default"
                    style={{ background: "#FFFFFF", border: `1px solid ${SURF_BORDER}`, boxShadow: CARD_SHADOW }}
                    onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.border=`1px solid ${G}28`;(e.currentTarget as HTMLElement).style.background=`${G}05`;}}
                    onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.border=`1px solid ${SURF_BORDER}`;(e.currentTarget as HTMLElement).style.background="#FFFFFF";}}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded-full" style={{ background: G }} />
                      <p style={{ fontFamily: FONT_SERIF, fontSize: "0.95rem", fontWeight: 700, color: TEXT1 }}>{o.city}</p>
                    </div>
                    <p style={{ fontFamily: FONT_SANS, fontSize: "0.78rem", color: TEXT2, lineHeight: 1.65, marginBottom: "12px" }}>{o.address}</p>
                    <a href={`tel:${o.phone}`} className="flex items-center gap-1.5 text-xs font-medium" style={{ color: G, fontFamily: FONT_SANS }}>
                      <Phone size={11} /> {o.phone}
                    </a>
                  </div>
                </RevealWrapper>
              ))}
            </div>

            {/* WhatsApp card */}
            <RevealWrapper delay={280} className="mt-6">
              <a href="https://wa.me/919500063064?text=Hello%20OMNI%20Fincon%2C%20I%20would%20like%20a%20consultation."
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 rounded-2xl transition-all hover:scale-[1.02]"
                style={{ background: "rgba(37,211,102,0.07)", border: "1px solid rgba(37,211,102,0.2)" }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(37,211,102,0.15)", border: "1px solid rgba(37,211,102,0.3)" }}>
                  <MessageCircle size={20} color="#25D366" />
                </div>
                <div>
                  <p style={{ fontFamily: FONT_SANS, fontSize: "0.7rem", color: "#25D366", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>Quick WhatsApp</p>
                  <p style={{ fontFamily: FONT_SANS, fontSize: "0.85rem", color: TEXT1, marginTop: "2px" }}>Message us for instant response</p>
                </div>
                <ArrowRight size={16} color="#25D366" className="ml-auto shrink-0" />
              </a>
            </RevealWrapper>
          </div>

          {/* Contact form */}
          <RevealWrapper delay={150}>
            <div className="rounded-3xl p-8 lg:p-10" style={{
              background: "#FFFFFF",
              border: `1px solid ${SURF_BORDER}`,
              boxShadow: CARD_SHADOW_LG,
            }}>
              <h3 className="mb-1" style={{ fontFamily: FONT_SERIF, fontSize: "1.5rem", fontWeight: 700, color: TEXT1 }}>Send us a message</h3>
              <p className="mb-7" style={{ fontFamily: FONT_SANS, fontSize: "0.82rem", color: TEXT2 }}>We respond to all enquiries within one business day.</p>

              {submitted ? (
                <div className="flex flex-col items-center gap-4 py-12 text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: `${G}15`, border: `1px solid ${G}30` }}>
                    <CheckCircle2 size={32} color={G} />
                  </div>
                  <p style={{ fontFamily: FONT_SERIF, fontSize: "1.3rem", fontWeight: 700, color: TEXT1 }}>Message Received. Thank You.</p>
                  <p style={{ fontFamily: FONT_SANS, fontSize: "0.87rem", color: TEXT2 }}>Our team will be in touch within one business day.</p>
                </div>
              ) : (
                <form className="flex flex-col gap-5" onSubmit={e=>{e.preventDefault();setSubmitted(true);}}>
                  <div>
                    <label className="text-xs mb-2 block font-medium" style={{ fontFamily: FONT_SANS, color: TEXT2 }}>I'm interested in</label>
                    <div className="flex flex-wrap gap-2">
                      {INTEREST_OPTIONS.map(opt => (
                        <button key={opt} type="button" onClick={()=>setInterest(opt)}
                          className="px-4 py-2 rounded-full text-xs font-semibold transition-all"
                          style={{
                            background: interest===opt ? `${G}12` : "#F4F7FD",
                            border: interest===opt ? `1px solid ${G}42` : `1px solid ${SURF_BORDER}`,
                            color: interest===opt ? G : TEXT2, fontFamily: FONT_SANS,
                          }}>
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {["Your Name *","Phone Number *"].map(lbl => (
                      <div key={lbl}>
                        <label className="text-xs mb-1.5 block font-medium" style={{ fontFamily: FONT_SANS, color: TEXT2 }}>{lbl}</label>
                        <input required className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                          style={{ background: "#F4F7FD", border: `1px solid ${SURF_BORDER}`, color: TEXT1, fontFamily: FONT_SANS }}
                          onFocus={e=>(e.target.style.border=`1px solid ${G}45`)}
                          onBlur={e=>(e.target.style.border=`1px solid ${SURF_BORDER}`)} />
                      </div>
                    ))}
                  </div>
                  {["Your Email *"].map(lbl => (
                    <div key={lbl}>
                      <label className="text-xs mb-1.5 block font-medium" style={{ fontFamily: FONT_SANS, color: TEXT2 }}>{lbl}</label>
                      <input required type="email" className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                        style={{ background: "#F4F7FD", border: `1px solid ${SURF_BORDER}`, color: TEXT1, fontFamily: FONT_SANS }}
                        onFocus={e=>(e.target.style.border=`1px solid ${G}40`)}
                        onBlur={e=>(e.target.style.border=`1px solid ${SURF_BORDER}`)} />
                    </div>
                  ))}
                  <div>
                    <label className="text-xs mb-1.5 block font-medium" style={{ fontFamily: FONT_SANS, color: TEXT2 }}>Your Message *</label>
                    <textarea required rows={4} className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all"
                      style={{ background: "#F4F7FD", border: `1px solid ${SURF_BORDER}`, color: TEXT1, fontFamily: FONT_SANS }}
                      onFocus={e=>(e.target.style.border=`1px solid ${G}45`)}
                      onBlur={e=>(e.target.style.border=`1px solid ${SURF_BORDER}`)} />
                  </div>
                  <GlowButton color={G} type="submit" fullWidth size="md">Send Message <ArrowRight size={14} /></GlowButton>
                </form>
              )}
            </div>
          </RevealWrapper>
        </div>
      </section>
    </>
  );
}
