import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { ChevronDown, Menu, X, Phone, ArrowRight } from "lucide-react";
import { G, DARK, TEXT1, TEXT2, FONT_SANS, FONT_SERIF, SERVICES_NAV, ABOUT_NAV, SURF_BORDER } from "../../../lib/tokens";
import logoImg from "../../../assets/Omni-Fincon-logo.png";

const NAV_LINKS = [
  { label: "Services",    href: "/services",         hasDropdown: true  },
  { label: "About",       href: "/about",            hasDropdown: true  },
  { label: "Calculators", href: "/calculators",      hasDropdown: false },
  { label: "Blog",        href: "/blog",             hasDropdown: false },
  { label: "Insights",    href: "/insights",         hasDropdown: false },
  { label: "Partners",    href: "/lending-partners", hasDropdown: false },
];

const TICKER_ITEMS = [
  "India's Premier Integrated Financial Advisory",
  "₹4,800 Cr+ in Mandates Advised",
  "50+ Institutional Lending Partners",
  "15+ Years of Financial Leadership",
  "340+ Successful Mandates Closed",
  "Pan-India Presence — 4 Major Cities",
];

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExp, setMobileExp]   = useState<string | null>(null);
  const { pathname }                = useLocation();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  useEffect(() => { setMobileOpen(false); setMobileExp(null); }, [pathname]);

  const tickers = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <>
      {/* ── Announcement bar — dark contrast strip ── */}
      <div className="fixed top-0 inset-x-0 z-[60] flex items-center overflow-hidden"
        style={{ height: "36px", background: DARK, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-10 text-xs font-medium whitespace-nowrap"
          style={{ animation: "ticker 50s linear infinite", fontFamily: FONT_SANS, color: "rgba(255,255,255,0.65)" }}>
          {tickers.map((t, i) => (
            <span key={i} className="flex items-center gap-2.5 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: G }} />
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ── Main navbar ── */}
      <header className="fixed inset-x-0 z-50 transition-all duration-300"
        style={{
          top: "36px",
          background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.93)",
          backdropFilter: "blur(24px) saturate(200%)",
          borderBottom: scrolled ? `1px solid ${SURF_BORDER}` : "1px solid rgba(11,26,46,0.04)",
          boxShadow: scrolled ? "0 4px 28px rgba(11,26,46,0.07)" : "none",
        }}>
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 flex items-center justify-between" style={{ height: "68px" }}>

          {/* Logo */}
          <Link to="/" style={{ textDecoration: "none" }} className="flex items-center gap-3 select-none shrink-0">
            <img src={logoImg} alt="OMNI Fincon" style={{ height: "42px", width: "42px", display: "block", objectFit: "contain" }} />
            <div className="flex flex-col leading-none">
              <span style={{ fontFamily: FONT_SERIF, fontSize: "1.22rem", fontWeight: 700, color: DARK, letterSpacing: "0.12em" }}>OMNI</span>
              <span style={{ fontFamily: FONT_SANS, fontSize: "0.48rem", fontWeight: 800, color: G, letterSpacing: "0.36em", marginTop: "2px" }}>FINCON</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => {
              const isServices = link.label === "Services";
              const isAbout    = link.label === "About";
              return (
                <div key={link.label} className="relative group">
                  <Link to={link.href}
                    className="flex items-center gap-1 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-150"
                    style={{ color: TEXT2, fontFamily: FONT_SANS, textDecoration: "none" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = TEXT1; (e.currentTarget as HTMLElement).style.background = "rgba(11,26,46,0.05)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = TEXT2; (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                    {link.label}
                    {link.hasDropdown && (
                      <ChevronDown size={13} className="transition-transform duration-200 group-hover:rotate-180" />
                    )}
                  </Link>

                  {/* Services mega-menu */}
                  {isServices && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 translate-y-1 group-hover:translate-y-0"
                      style={{ width: "700px" }}>
                      <div className="rounded-2xl overflow-hidden" style={{
                        background: "#FFFFFF",
                        border: `1px solid ${SURF_BORDER}`,
                        boxShadow: "0 24px 64px rgba(11,26,46,0.13), 0 4px 12px rgba(11,26,46,0.06)",
                      }}>
                        <div className="px-6 pt-5 pb-3 flex items-center justify-between"
                          style={{ borderBottom: "1px solid rgba(11,26,46,0.07)" }}>
                          <p style={{ fontFamily: FONT_SANS, fontSize: "0.62rem", fontWeight: 800, color: TEXT2, textTransform: "uppercase", letterSpacing: "0.22em" }}>
                            All Services
                          </p>
                          <Link to="/services" className="flex items-center gap-1 text-xs font-bold"
                            style={{ color: G, fontFamily: FONT_SANS, textDecoration: "none" }}>
                            View All <ArrowRight size={11} />
                          </Link>
                        </div>
                        <div className="grid grid-cols-2 gap-0 p-3">
                          {SERVICES_NAV.map((s) => (
                            <Link key={s.href} to={s.href}
                              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all duration-150"
                              style={{ color: TEXT2, fontFamily: FONT_SANS, textDecoration: "none", fontSize: "0.82rem" }}
                              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = `${s.color}09`; (e.currentTarget as HTMLElement).style.color = s.color; }}
                              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = TEXT2; }}>
                              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: s.color }} />
                              {s.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* About dropdown */}
                  {isAbout && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 translate-y-1 group-hover:translate-y-0"
                      style={{ width: "230px" }}>
                      <div className="rounded-2xl overflow-hidden" style={{
                        background: "#FFFFFF",
                        border: `1px solid ${SURF_BORDER}`,
                        boxShadow: "0 24px 64px rgba(11,26,46,0.13), 0 4px 12px rgba(11,26,46,0.06)",
                      }}>
                        <div className="p-3 flex flex-col gap-0.5">
                          {ABOUT_NAV.map((item) => (
                            <Link key={item.href} to={item.href}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150"
                              style={{ color: TEXT2, fontFamily: FONT_SANS, textDecoration: "none", fontSize: "0.84rem" }}
                              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = `${G}09`; (e.currentTarget as HTMLElement).style.color = G; }}
                              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = TEXT2; }}>
                              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: G }} />
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right CTA area */}
          <div className="flex items-center gap-3">
            <a href="tel:+919500063064"
              className="hidden lg:flex items-center gap-1.5 text-sm font-medium transition-colors"
              style={{ color: TEXT2, fontFamily: FONT_SANS, textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = TEXT1}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = TEXT2}>
              <Phone size={14} color={G} /> +91 95000 63064
            </a>
            <Link to="/contact"
              className="hidden lg:inline-flex items-center gap-2 font-bold text-xs tracking-widest uppercase transition-all"
              style={{
                background: G, color: "#FFF", fontFamily: FONT_SANS, textDecoration: "none",
                padding: "10px 22px", borderRadius: "100px", letterSpacing: "0.1em",
                boxShadow: `0 4px 18px ${G}30`,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 28px ${G}45`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 18px ${G}30`; }}>
              Get in Touch
            </Link>
            <button
              className="lg:hidden p-2 rounded-xl transition-all"
              style={{ color: TEXT1 }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(11,26,46,0.06)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
              onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* ── Mobile menu ── */}
        {mobileOpen && (
          <div className="lg:hidden" style={{ background: "#FFFFFF", borderTop: `1px solid ${SURF_BORDER}`, maxHeight: "82vh", overflowY: "auto" }}>
            <div className="px-5 py-5 flex flex-col gap-0">
              {NAV_LINKS.map((link) => {
                const hasDD = link.hasDropdown;
                const sub   = link.label === "Services" ? SERVICES_NAV : link.label === "About" ? ABOUT_NAV : [];
                const open  = mobileExp === link.label;
                return (
                  <div key={link.label}>
                    <div className="flex items-center justify-between py-3"
                      style={{ borderBottom: "1px solid rgba(11,26,46,0.06)" }}>
                      <Link to={link.href}
                        className="flex-1 text-sm font-semibold"
                        style={{ color: TEXT1, fontFamily: FONT_SANS, textDecoration: "none" }}
                        onClick={() => !hasDD && setMobileOpen(false)}>
                        {link.label}
                      </Link>
                      {hasDD && (
                        <button className="p-1" style={{ color: TEXT2 }}
                          onClick={() => setMobileExp(open ? null : link.label)}>
                          <ChevronDown size={16} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.25s" }} />
                        </button>
                      )}
                    </div>
                    {hasDD && open && (
                      <div className="flex flex-col ml-3 mb-2 pl-3 py-1" style={{ borderLeft: `2px solid ${G}22` }}>
                        {(sub as any[]).map((s) => (
                          <Link key={s.href} to={s.href}
                            className="py-2 text-sm"
                            style={{ color: TEXT2, fontFamily: FONT_SANS, textDecoration: "none", fontSize: "0.83rem" }}
                            onClick={() => setMobileOpen(false)}>
                            {s.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              <div className="pt-5 flex flex-col gap-3">
                <a href="tel:+919500063064"
                  className="flex items-center gap-2 text-sm font-semibold"
                  style={{ color: TEXT1, fontFamily: FONT_SANS, textDecoration: "none" }}>
                  <Phone size={15} color={G} /> +91 95000 63064
                </a>
                <Link to="/contact"
                  className="flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-bold tracking-widest uppercase"
                  style={{ background: G, color: "#FFF", fontFamily: FONT_SANS, textDecoration: "none" }}
                  onClick={() => setMobileOpen(false)}>
                  Get in Touch <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
