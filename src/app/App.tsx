import { useState, useEffect, useRef, useCallback } from "react";
import {
  TrendingUp,
  Shield,
  Building2,
  CreditCard,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  MapPin,
  Phone,
  Mail,
  Star,
  BarChart3,
  Globe,
  Users,
  Landmark,
  Menu,
  X,
  Clock,
  Zap,
  ArrowUpRight,
  Sparkles,
  DollarSign,
  Target,
  Award,
  Handshake,
} from "lucide-react";

// ─── hooks ───────────────────────────────────────────────────────────────────

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function useCounter(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf: number;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return count;
}

// ─── helpers ─────────────────────────────────────────────────────────────────

function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}

// ─── design tokens ───────────────────────────────────────────────────────────

const G = "#00C97A"; // emerald green
const GOLD = "#C9943A"; // warm gold
const NAVY = "#050912"; // deepest bg
const NAVY2 = "#080E1C"; // card bg alt
const TEXT1 = "#EEF2FF"; // primary text
const TEXT2 = "#7B8DAA"; // secondary text

// ─── data ────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "About Us", href: "#about" },
  { label: "Case Studies", href: "#case-study" },
  { label: "Insights", href: "#insights" },
  { label: "Partner with Us", href: "#partner" },
];

const SERVICES = [
  {
    icon: TrendingUp,
    title: "Investment Banking",
    tag: "Capital Markets",
    desc: "Fundraising, Debt Syndication, M&A Advisory, and Structured Finance for all sectors.",
    color: G,
    gradient: `linear-gradient(135deg, rgba(0,201,122,0.1) 0%, rgba(0,201,122,0.02) 100%)`,
    border: `rgba(0,201,122,0.2)`,
  },
  {
    icon: Shield,
    title: "Wealth & Risk Advisory",
    tag: "Wealth",
    desc: "Comprehensive wealth management, insurance advisory, and risk-optimised portfolio solutions.",
    color: "#4F7EFF",
    gradient: `linear-gradient(135deg, rgba(79,126,255,0.08) 0%, rgba(79,126,255,0.01) 100%)`,
    border: `rgba(79,126,255,0.18)`,
  },
  {
    icon: Building2,
    title: "Land & Real Estate Advisory",
    tag: "Real Estate",
    desc: "Expert advisory in Land Acquisition, JV Structuring, Title Due Diligence, and Asset Monetization.",
    color: GOLD,
    gradient: `linear-gradient(135deg, rgba(201,148,58,0.08) 0%, rgba(201,148,58,0.01) 100%)`,
    border: `rgba(201,148,58,0.18)`,
  },
  {
    icon: CreditCard,
    title: "Retail Banking & Credit",
    tag: "Banking",
    desc: "Personal & Business Loans, Credit Structuring, and comprehensive Liability Mobilization.",
    color: "#B44FFF",
    gradient: `linear-gradient(135deg, rgba(180,79,255,0.08) 0%, rgba(180,79,255,0.01) 100%)`,
    border: `rgba(180,79,255,0.18)`,
  },
];

const IB_ITEMS = [
  "Fund Raising — Debt & Equity",
  "HNI & Family Office Funding",
  "M&A Advisory",
  "Corporate Finance Advisory",
  "Project Finance",
  "Structured Finance",
  "Bridge Financing",
  "SME / MSME Solutions",
];

const INDUSTRIES_ROW1 = [
  "Real Estate",
  "Hospitality",
  "Power Industry",
  "Solar Energy",
  "NBFC",
  "Pharmaceutical Industry",
  "Textile Industry",
  "Polymer Industry",
  "Garment Industry",
  "Paper & Pulp Industry",
  "Healthcare",
  "Chemical Industry",
  "Cold Storage",
  "International Trading",
  "Hotel & Resort Projects",
  "Multiplex & Mall Projects",
  "Infrastructure Projects",
  "Steel Industry",
];

const INDUSTRIES_ROW2 = [
  "Food Industry",
  "Automobile Industry",
  "Entertainment & Media",
  "Power Projects",
  "Hospital & Health Industry",
  "Engineering Contractors",
  "Jewellery & Button Industry",
  "Packaging Industry",
  "Logistics & Transportation",
  "Telecommunications",
  "IT & Software",
  "Education",
  "Retail",
  "Agriculture",
  "Textile Machinery",
  "Effluent Treatment",
  "Residential & Commercial Complex",
  "High Reputed Showrooms",
];

const PARTNERS = [
  "Aditya Birla Capital",
  "Bajaj Finance",
  "Bank of Baroda",
  "HDFC Bank",
  "ICICI Bank",
  "IIFL Finance",
  "Kotak Mahindra Bank",
  "Piramal Finance",
  "State Bank of India",
  "Tata Capital",
];

const INSIGHTS = [
  {
    category: "Market Analysis",
    date: "October 2024",
    time: "5 min read",
    title: "India's Renewable Energy Financing Landscape 2024",
    desc: "An in-depth look at the evolving financing mechanisms for solar and wind projects, including green bonds, sustainability-linked loans, and blended finance structures.",
    color: G,
  },
  {
    category: "Sector Focus",
    date: "September 2024",
    time: "7 min read",
    title: "Real Estate JV Structures: Maximizing Value",
    desc: "Key considerations for structuring successful real estate joint ventures, from capital stacking to exit mechanisms and risk allocation strategies.",
    color: GOLD,
  },
  {
    category: "Regulatory Update",
    date: "August 2024",
    time: "6 min read",
    title: "NBFC & AIF Launch: Navigating Regulatory Framework",
    desc: "A comprehensive guide to launching NBFCs and AIFs in the current regulatory environment, including compliance requirements and best practices.",
    color: "#4F7EFF",
  },
];

const OFFICES = [
  {
    city: "Hyderabad",
    address:
      "Building Number 9, Mindspace, HITEC City, Hyderabad, Telangana 500081",
    phone: "+91 95000 63064",
  },
  {
    city: "Mumbai",
    address: "508, Upper Ground Floor, World Trade Center, Ring Road, Surat",
    phone: "+91 95000 63064",
  },
  {
    city: "Vadodara",
    address:
      "606, KP Platina, Opp. Vanijya Bhavan, Race Course Circle, Vadodara",
    phone: "+91 95000 63064",
  },
  {
    city: "Ahmedabad",
    address:
      "301, Shaival Imperia, Opp. Nalanda Hotel, Mithakhali Six Roads, Ahmedabad",
    phone: "+91 95000 63064",
  },
];

const BENEFITS = [
  {
    icon: DollarSign,
    title: "Transparent Payouts",
    desc: "Competitive commission structure with timely, guaranteed settlements and real-time tracking.",
  },
  {
    icon: Award,
    title: "Training & Support",
    desc: "Comprehensive onboarding, monthly product clinics, and continuous professional development.",
  },
  {
    icon: Star,
    title: "Exclusive Products",
    desc: "Priority access to premium financial products and high-demand structured instruments.",
  },
  {
    icon: Handshake,
    title: "Backend Support",
    desc: "Dedicated relationship manager handling all documentation, follow-ups, and operations.",
  },
];

// ─── reusable atoms ──────────────────────────────────────────────────────────

function Pill({
  children,
  color = G,
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <span
      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
      style={{
        background: `${color}18`,
        color,
        border: `1px solid ${color}30`,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {children}
    </span>
  );
}

function SectionDivider() {
  return (
    <div className="w-full flex items-center gap-4 max-w-7xl mx-auto px-6 lg:px-10 py-2">
      <div
        style={{
          flex: 1,
          height: "1px",
          background:
            "linear-gradient(to right, transparent, rgba(255,255,255,0.07), transparent)",
        }}
      />
    </div>
  );
}

function RevealWrapper({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── 1. ANNOUNCEMENT BAR ─────────────────────────────────────────────────────

function AnnouncementBar() {
  return (
    <div
      className="fixed top-0 inset-x-0 z-[60] flex items-center justify-center gap-8 py-2 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #050608, #08182e)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        className="flex items-center gap-8 text-xs font-medium whitespace-nowrap"
        style={{ fontFamily: "'Inter', sans-serif", color: TEXT2 }}
      >
        {[
          "India's Premier Integrated Financial Advisory Firm",
          "15+ Years of Financial Leadership",
          "₹4,800 Cr+ in Transactions Advised",
          "30+ Sectors Served Across India",
        ].map((item, i) => (
          <span key={i} className="flex items-center gap-3">
            <span style={{ color: G, fontWeight: 600 }}>{item}</span>
            {i < 3 && <span style={{ color: `${G}40` }}>•</span>}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── 2. NAV ──────────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className="fixed inset-x-0 z-50 transition-all duration-500"
      style={{
        top: "32px",
        background: scrolled ? "rgba(5,9,18,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.4)" : "none",
      }}
    >
      <div
        className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between"
        style={{ height: "68px" }}
      >
        {/* Logo */}
        <a href="#" className="flex flex-col leading-none select-none group">
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.4rem",
              fontWeight: 700,
              color: TEXT1,
              letterSpacing: "0.15em",
            }}
          >
            OMNI
          </span>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.55rem",
              fontWeight: 700,
              color: G,
              letterSpacing: "0.3em",
            }}
          >
            FINCON
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="relative text-sm font-medium transition-colors duration-200 hover:text-white group"
              style={{ color: TEXT2, fontFamily: "'Inter', sans-serif" }}
            >
              {l.label}
              <span
                className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                style={{ background: G }}
              />
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <a
            href="tel:+919500063064"
            className="hidden lg:flex items-center gap-2 text-sm font-medium transition-colors hover:text-white"
            style={{ color: TEXT2, fontFamily: "'Inter', sans-serif" }}
          >
            <Phone size={14} color={G} />
            +91 95000 63064
          </a>
          <button
            className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95"
            style={{
              background: G,
              color: NAVY,
              fontFamily: "'Inter', sans-serif",
              letterSpacing: "0.1em",
              boxShadow: `0 0 20px ${G}30`,
            }}
          >
            Get in Touch
          </button>
          <button
            className="lg:hidden transition-colors hover:text-white"
            style={{ color: TEXT2 }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="lg:hidden px-6 pb-8 flex flex-col gap-1"
          style={{
            background: "rgba(5,9,18,0.98)",
            backdropFilter: "blur(24px)",
          }}
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm font-medium py-3.5 border-b flex items-center justify-between"
              style={{
                color: TEXT2,
                borderColor: "rgba(255,255,255,0.06)",
                fontFamily: "'Inter', sans-serif",
              }}
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
              <ArrowRight size={14} />
            </a>
          ))}
          <button
            className="mt-5 px-5 py-3.5 rounded-full text-sm font-bold tracking-widest uppercase"
            style={{
              background: G,
              color: NAVY,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Get in Touch
          </button>
        </div>
      )}
    </header>
  );
}

// ─── 3. HERO ─────────────────────────────────────────────────────────────────

function HeroStats() {
  const { ref, visible } = useScrollReveal();
  const aum = useCounter(4800, 1800, visible);
  const deals = useCounter(340, 1600, visible);
  const rate = useCounter(94, 1400, visible);
  const years = useCounter(15, 1200, visible);

  const stats = [
    { val: `₹${aum}Cr+`, label: "AUM Advised" },
    { val: `${deals}+`, label: "Deals Closed" },
    { val: `${rate}.7%`, label: "Success Rate" },
    { val: `${years}+`, label: "Years of Leadership" },
  ];

  return (
    <div ref={ref} className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12">
      {stats.map((s, i) => (
        <div
          key={i}
          className="flex flex-col gap-1 py-4 px-5 rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.7rem",
              fontWeight: 700,
              color: G,
              lineHeight: 1,
            }}
          >
            {s.val}
          </span>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.72rem",
              color: TEXT2,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function HeroDashboard() {
  return (
    <div className="relative" style={{ height: "560px" }}>
      {/* Glow orbs */}
      <div
        className="absolute -top-12 -right-12 w-56 h-56 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${G}22 0%, transparent 70%)`,
          filter: "blur(32px)",
        }}
      />
      <div
        className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(79,126,255,0.2) 0%, transparent 70%)",
          filter: "blur(24px)",
        }}
      />
      <div
        className="absolute top-1/2 -right-4 w-32 h-32 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${GOLD}18 0%, transparent 70%)`,
          filter: "blur(20px)",
        }}
      />

      {/* Main card */}
      <div
        className="absolute inset-3 rounded-3xl overflow-hidden flex flex-col"
        style={{
          border: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(8,14,28,0.8)",
          backdropFilter: "blur(24px)",
          boxShadow:
            "0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        {/* Window chrome */}
        <div
          className="flex items-center gap-2 px-5 py-4 shrink-0"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div
            className="w-3 h-3 rounded-full"
            style={{ background: "#ff5f57" }}
          />
          <div
            className="w-3 h-3 rounded-full"
            style={{ background: "#febc2e" }}
          />
          <div
            className="w-3 h-3 rounded-full"
            style={{ background: "#28c840" }}
          />
          <span className="ml-3 text-xs font-mono" style={{ color: TEXT2 }}>
            portfolio_dashboard.fin
          </span>
          <span
            className="ml-auto flex items-center gap-1.5 text-xs"
            style={{ color: G, fontFamily: "'Inter', sans-serif" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse inline-block" />
            LIVE
          </span>
        </div>

        <div className="p-5 flex flex-col gap-4 overflow-hidden">
          {/* Metric cards */}
          <div className="grid grid-cols-3 gap-2.5">
            {[
              {
                label: "AUM Advised",
                value: "₹4,800 Cr",
                change: "+18.4%",
                icon: TrendingUp,
              },
              {
                label: "Transactions",
                value: "340+",
                change: "+22.1%",
                icon: BarChart3,
              },
              {
                label: "Success Rate",
                value: "94.7%",
                change: "+3.2%",
                icon: Target,
              },
            ].map((m) => {
              const Icon = m.icon;
              return (
                <div
                  key={m.label}
                  className="rounded-xl p-3.5 flex flex-col gap-2"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.6rem",
                        color: TEXT2,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}
                    >
                      {m.label}
                    </span>
                    <Icon size={11} color={G} />
                  </div>
                  <span
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      color: TEXT1,
                    }}
                  >
                    {m.value}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.65rem",
                      color: G,
                    }}
                  >
                    {m.change} YoY
                  </span>
                </div>
              );
            })}
          </div>

          {/* Chart */}
          <div
            className="rounded-xl p-4"
            style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <div className="flex justify-between items-center mb-3">
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.68rem",
                  color: TEXT2,
                }}
              >
                Fund Deployment Pipeline
              </span>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.68rem",
                  color: G,
                  fontWeight: 600,
                }}
              >
                FY 2024–25
              </span>
            </div>
            <svg
              viewBox="0 0 280 56"
              className="w-full"
              style={{ height: "56px" }}
            >
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={G} stopOpacity="0.35" />
                  <stop offset="100%" stopColor={G} stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0,48 C20,44 35,40 55,34 S90,26 110,20 S145,12 165,9 S200,5 220,4 S255,3 280,2 L280,56 L0,56 Z"
                fill="url(#chartGrad)"
              />
              <path
                d="M0,48 C20,44 35,40 55,34 S90,26 110,20 S145,12 165,9 S200,5 220,4 S255,3 280,2"
                fill="none"
                stroke={G}
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              {[55, 110, 165, 220].map((x, i) => (
                <circle
                  key={i}
                  cx={x}
                  cy={[34, 20, 9, 4][i]}
                  r="3"
                  fill={G}
                  opacity="0.8"
                />
              ))}
            </svg>
          </div>

          {/* Deal flow */}
          <div className="flex flex-col gap-2">
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.62rem",
                color: TEXT2,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "2px",
              }}
            >
              Active Deal Flow
            </p>
            {[
              {
                sector: "Real Estate JV",
                amount: "₹250 Cr",
                status: "Closed",
                color: G,
              },
              {
                sector: "Renewable Energy",
                amount: "₹180 Cr",
                status: "In Progress",
                color: "#4F7EFF",
              },
              {
                sector: "Healthcare Infra",
                amount: "₹95 Cr",
                status: "Term Sheet",
                color: GOLD,
              },
              {
                sector: "NBFC Fundraise",
                amount: "₹120 Cr",
                status: "Mandate",
                color: "#B44FFF",
              },
            ].map((d) => (
              <div
                key={d.sector}
                className="flex items-center justify-between px-3 py-2 rounded-lg"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.04)",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.7rem",
                    color: TEXT1,
                    minWidth: "110px",
                  }}
                >
                  {d.sector}
                </span>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.7rem",
                    color: TEXT1,
                    fontWeight: 600,
                  }}
                >
                  {d.amount}
                </span>
                <span
                  className="px-2 py-0.5 rounded-full text-xs"
                  style={{
                    background: `${d.color}18`,
                    color: d.color,
                    border: `1px solid ${d.color}35`,
                    fontSize: "0.62rem",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {d.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section
      className="relative flex items-center overflow-hidden"
      style={{ minHeight: "100vh", paddingTop: "100px", background: NAVY }}
    >
      {/* Multi-layer background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse 70% 55% at 75% 45%, ${G}0d 0%, transparent 65%), radial-gradient(ellipse 50% 70% at 15% 75%, rgba(79,126,255,0.07) 0%, transparent 55%), radial-gradient(ellipse 40% 40% at 50% 10%, ${GOLD}08 0%, transparent 55%)`,
          }}
        />
        {/* Subtle grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
            backgroundSize: "70px 70px",
            maskImage:
              "radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)",
          }}
        />
        {/* Top gradient fade */}
        <div
          style={{
            position: "absolute",
            top: 0,
            inset: "0 0 auto 0",
            height: "200px",
            background: `linear-gradient(to bottom, ${NAVY}, transparent)`,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 w-full py-20 lg:py-28 grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
        {/* Left */}
        <div className="flex flex-col gap-6">
          <RevealWrapper delay={0}>
            <Pill color={G}>
              <Sparkles size={10} /> Empowering Growth
            </Pill>
          </RevealWrapper>

          <RevealWrapper delay={100}>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.8rem, 5.5vw, 4.8rem)",
                fontWeight: 700,
                lineHeight: 1.08,
                color: TEXT1,
                letterSpacing: "-0.02em",
              }}
            >
              Financial Advisory in{" "}
              <span
                style={{
                  color: G,
                  fontStyle: "italic",
                  textShadow: `0 0 40px ${G}40`,
                }}
              >
                Fund Raising,
              </span>{" "}
              Wealth, Land & Retail Banking.
            </h1>
          </RevealWrapper>

          <RevealWrapper delay={180}>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "1rem",
                color: TEXT2,
                lineHeight: 1.75,
                maxWidth: "520px",
              }}
            >
              OMNI Fincon is India's integrated financial advisory firm —
              bridging clients with capital, structuring complex transactions,
              and building lasting wealth across four specialised verticals.
            </p>
          </RevealWrapper>

          <RevealWrapper delay={240}>
            <div
              className="flex items-center gap-2 flex-wrap"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.75rem",
                color: TEXT2,
                letterSpacing: "0.18em",
                fontWeight: 600,
                textTransform: "uppercase",
              }}
            >
              {["Fund", "Growth", "Wealth", "Invest"].map((w, i) => (
                <span key={w} className="flex items-center gap-2">
                  <span style={{ color: G }}>{w}</span>
                  {i < 3 && (
                    <span style={{ color: "rgba(255,255,255,0.15)" }}>|</span>
                  )}
                </span>
              ))}
            </div>
          </RevealWrapper>

          <RevealWrapper delay={300}>
            <div className="flex flex-wrap gap-4 mt-2">
              <button
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-sm transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  background: G,
                  color: NAVY,
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "0.08em",
                  boxShadow: `0 4px 32px ${G}35, 0 0 0 1px ${G}25`,
                }}
              >
                Get in Touch <ArrowRight size={15} />
              </button>
              <button
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-200"
                style={{
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: TEXT1,
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "0.06em",
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(8px)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(255,255,255,0.08)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "rgba(255,255,255,0.04)")
                }
              >
                Explore Services <ChevronDown size={15} />
              </button>
            </div>
          </RevealWrapper>

          {/* Stats row */}
          <RevealWrapper delay={400}>
            <HeroStats />
          </RevealWrapper>
        </div>

        {/* Right — financial dashboard */}
        <RevealWrapper delay={150} className="hidden lg:block">
          <HeroDashboard />
        </RevealWrapper>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 inset-x-0 h-32 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, transparent, ${NAVY})`,
        }}
      />
    </section>
  );
}

// ─── 4. SERVICES ─────────────────────────────────────────────────────────────

function Services() {
  return (
    <section
      id="services"
      className="py-24 lg:py-32"
      style={{ background: NAVY2 }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <RevealWrapper>
          <div className="flex flex-col gap-3 mb-14">
            <Pill color={G}>
              <BarChart3 size={10} /> Core Pillars
            </Pill>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 3.5vw, 3.2rem)",
                fontWeight: 700,
                color: TEXT1,
                lineHeight: 1.12,
              }}
            >
              Four Verticals.{" "}
              <span style={{ color: G, fontStyle: "italic" }}>
                One Integrated Advantage.
              </span>
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.95rem",
                color: TEXT2,
                lineHeight: 1.7,
                maxWidth: "550px",
              }}
            >
              Deeply specialised yet fully integrated — our four service
              verticals work in concert to deliver end-to-end financial
              solutions.
            </p>
          </div>
        </RevealWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <RevealWrapper key={s.title} delay={i * 80}>
                <div
                  className="group flex flex-col gap-5 p-7 rounded-2xl cursor-pointer h-full transition-all duration-350"
                  style={{
                    background: s.gradient,
                    border: `1px solid ${s.border}`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform =
                      "translateY(-6px)";
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      `0 24px 60px ${s.color}15`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform =
                      "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                    style={{
                      background: `${s.color}18`,
                      border: `1px solid ${s.color}30`,
                    }}
                  >
                    <Icon size={22} color={s.color} />
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <span
                      className="text-xs font-bold tracking-widest uppercase"
                      style={{
                        color: s.color,
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {s.tag}
                    </span>
                    <h3
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "1.15rem",
                        fontWeight: 700,
                        color: TEXT1,
                        lineHeight: 1.3,
                      }}
                    >
                      {s.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.83rem",
                        color: TEXT2,
                        lineHeight: 1.7,
                      }}
                    >
                      {s.desc}
                    </p>
                  </div>
                  <div
                    className="flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 group-hover:gap-3"
                    style={{
                      color: s.color,
                      fontFamily: "'Inter', sans-serif",
                      marginTop: "auto",
                    }}
                  >
                    Learn more <ArrowRight size={13} />
                  </div>
                </div>
              </RevealWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── 5. ABOUT ────────────────────────────────────────────────────────────────

function About() {
  const { ref, visible } = useScrollReveal();
  const years = useCounter(15, 1600, visible);
  const exp = useCounter(200, 1800, visible);
  const sectors = useCounter(30, 1400, visible);

  return (
    <section id="about" className="py-24 lg:py-32" style={{ background: NAVY }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left */}
          <div>
            <RevealWrapper>
              <Pill color={GOLD}>
                <Users size={10} /> The OMNI Advantage
              </Pill>
            </RevealWrapper>
            <RevealWrapper delay={80}>
              <h2
                className="mt-5 mb-5"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(2rem, 3.5vw, 3.2rem)",
                  fontWeight: 700,
                  color: TEXT1,
                  lineHeight: 1.12,
                }}
              >
                Led by experts with{" "}
                <span style={{ color: GOLD, fontStyle: "italic" }}>
                  200+ years
                </span>{" "}
                of cumulative experience.
              </h2>
            </RevealWrapper>
            <RevealWrapper delay={140}>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.95rem",
                  color: TEXT2,
                  lineHeight: 1.8,
                }}
              >
                OMNI Fincon brings together senior bankers, investment
                professionals, and sector specialists across India's most
                dynamic financial markets. Our integrated approach means every
                mandate benefits from cross-domain intelligence, delivering
                superior outcomes through deep expertise and genuine client
                partnership.
              </p>
            </RevealWrapper>

            {/* Animated counters */}
            <div ref={ref} className="grid grid-cols-3 gap-6 mt-10">
              {[
                {
                  val: `${years}+`,
                  label: "Years of Financial Leadership",
                  color: G,
                },
                {
                  val: `${exp}+`,
                  label: "Years Cumulative Team Experience",
                  color: GOLD,
                },
                {
                  val: `${sectors}+`,
                  label: "Sectors Served Across India",
                  color: "#4F7EFF",
                },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <p
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "2.2rem",
                      fontWeight: 700,
                      color: stat.color,
                      lineHeight: 1,
                    }}
                  >
                    {stat.val}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.72rem",
                      color: TEXT2,
                      lineHeight: 1.45,
                      marginTop: "4px",
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-4">
            {[
              {
                label: "Our Mission",
                icon: Target,
                color: G,
                body: "To deliver intelligent, customised financial solutions that empower individuals and businesses to build, protect, and multiply wealth while contributing to long-term economic progress.",
              },
              {
                label: "Our Vision",
                icon: Globe,
                color: "#4F7EFF",
                body: "To be India's most trusted and agile financial institution, enabling sustainable growth through innovation, insight, and integrity across all our service verticals.",
              },
              {
                label: "Our Team",
                icon: Users,
                color: GOLD,
                body: "Led by experts with 200+ years of cumulative experience in financial advisory and strategy — deeply networked across banks, NBFCs, family offices, and regulatory bodies.",
              },
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <RevealWrapper key={card.label} delay={i * 100}>
                  <div
                    className="rounded-2xl p-6 flex gap-5 transition-all duration-300"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.border =
                        `1px solid ${card.color}30`;
                      (e.currentTarget as HTMLElement).style.background =
                        `${card.color}06`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.border =
                        "1px solid rgba(255,255,255,0.07)";
                      (e.currentTarget as HTMLElement).style.background =
                        "rgba(255,255,255,0.03)";
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                      style={{
                        background: `${card.color}18`,
                        border: `1px solid ${card.color}25`,
                      }}
                    >
                      <Icon size={18} color={card.color} />
                    </div>
                    <div>
                      <p
                        className="text-xs font-bold tracking-widest uppercase mb-2"
                        style={{
                          color: card.color,
                          fontFamily: "'Inter', sans-serif",
                        }}
                      >
                        {card.label}
                      </p>
                      <p
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "0.87rem",
                          color: TEXT2,
                          lineHeight: 1.75,
                        }}
                      >
                        {card.body}
                      </p>
                    </div>
                  </div>
                </RevealWrapper>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 6. INVESTMENT BANKING ───────────────────────────────────────────────────

function InvestmentBanking() {
  return (
    <section
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: NAVY2 }}
    >
      {/* Decorative orb */}
      <div
        className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${G}08 0%, transparent 70%)`,
          filter: "blur(48px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <RevealWrapper>
            <Pill color={G}>
              <TrendingUp size={10} /> Investment Banking
            </Pill>
          </RevealWrapper>
          <RevealWrapper delay={80}>
            <h2
              className="mt-5 mb-5"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 3.5vw, 3.2rem)",
                fontWeight: 700,
                color: TEXT1,
                lineHeight: 1.12,
              }}
            >
              We offer Fund Raising,{" "}
              <span style={{ color: G, fontStyle: "italic" }}>M&A</span> &
              Structured Finance.
            </h2>
          </RevealWrapper>
          <RevealWrapper delay={140}>
            <p
              className="mb-8"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.95rem",
                color: TEXT2,
                lineHeight: 1.8,
              }}
            >
              Our Investment Banking vertical operates across the full capital
              structure — from senior secured debt to mezzanine and equity. We
              serve projects from ₹10 Cr to ₹2,000 Cr+ across 30+ sectors,
              leveraging deep relationships with PSU banks, private lenders,
              NBFCs, and institutional investors.
            </p>
          </RevealWrapper>
          <RevealWrapper delay={200}>
            <button
              className="inline-flex items-center gap-2 font-bold text-sm tracking-wide transition-all hover:gap-4"
              style={{
                color: G,
                fontFamily: "'Inter', sans-serif",
                letterSpacing: "0.08em",
              }}
            >
              Get Consultation <ArrowRight size={15} />
            </button>
          </RevealWrapper>

          {/* Accent divider */}
          <div className="mt-10 flex items-center gap-4">
            <div
              style={{
                width: "32px",
                height: "2px",
                background: G,
                borderRadius: "2px",
              }}
            />
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.8rem",
                color: TEXT2,
              }}
            >
              Trusted by 340+ clients across India
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {IB_ITEMS.map((item, i) => (
            <RevealWrapper key={item} delay={i * 60}>
              <div
                className="flex items-start gap-3 p-4 rounded-xl transition-all duration-200 cursor-default group"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = `${G}08`;
                  (e.currentTarget as HTMLElement).style.border =
                    `1px solid ${G}22`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(255,255,255,0.03)";
                  (e.currentTarget as HTMLElement).style.border =
                    "1px solid rgba(255,255,255,0.06)";
                }}
              >
                <CheckCircle2
                  size={15}
                  className="mt-0.5 shrink-0 transition-colors"
                  color={G}
                />
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.82rem",
                    color: TEXT2,
                    lineHeight: 1.5,
                  }}
                >
                  {item}
                </span>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 7. INDUSTRIES TICKER ────────────────────────────────────────────────────

function IndustriesTicker() {
  const rows = [
    {
      items: [...INDUSTRIES_ROW1, ...INDUSTRIES_ROW1],
      dir: "left",
      duration: "50s",
    },
    {
      items: [...INDUSTRIES_ROW2, ...INDUSTRIES_ROW2],
      dir: "right",
      duration: "45s",
    },
  ];

  return (
    <section className="py-20 overflow-hidden" style={{ background: NAVY }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-10">
        <RevealWrapper>
          <Pill color={GOLD}>
            <Globe size={10} /> Industries Served
          </Pill>
          <p
            className="mt-3"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.9rem",
              color: TEXT2,
            }}
          >
            Spanning 36+ sectors across India's growth economy
          </p>
        </RevealWrapper>
      </div>

      <div className="flex flex-col gap-3">
        {rows.map((row, ri) => (
          <div key={ri} className="relative overflow-hidden">
            <div
              className="flex gap-3 whitespace-nowrap"
              style={{
                animation: `marquee-${row.dir} ${row.duration} linear infinite`,
              }}
            >
              {row.items.map((ind, i) => (
                <span
                  key={i}
                  className="inline-flex items-center px-5 py-2.5 rounded-full text-sm shrink-0 transition-colors cursor-default"
                  style={{
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: TEXT2,
                    fontFamily: "'Inter', sans-serif",
                    background: "rgba(255,255,255,0.03)",
                    fontSize: "0.8rem",
                  }}
                >
                  {ind}
                </span>
              ))}
            </div>
            <div
              className="absolute inset-y-0 left-0 w-28 pointer-events-none"
              style={{
                background: `linear-gradient(to right, ${NAVY}, transparent)`,
              }}
            />
            <div
              className="absolute inset-y-0 right-0 w-28 pointer-events-none"
              style={{
                background: `linear-gradient(to left, ${NAVY}, transparent)`,
              }}
            />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee-left { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes marquee-right { from { transform: translateX(-50%); } to { transform: translateX(0); } }
      `}</style>
    </section>
  );
}

// ─── 8. SUCCESS STORIES ──────────────────────────────────────────────────────

function SuccessStories() {
  return (
    <section
      id="case-study"
      className="py-24 lg:py-32"
      style={{ background: NAVY2 }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <RevealWrapper>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <div>
              <Pill color={G}>Case Study</Pill>
              <h2
                className="mt-4"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(2rem, 3.5vw, 3.2rem)",
                  fontWeight: 700,
                  color: TEXT1,
                }}
              >
                Real Results for Real Businesses.
              </h2>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm font-semibold shrink-0"
              style={{ color: G, fontFamily: "'Inter', sans-serif" }}
            >
              View All Case Studies <ArrowUpRight size={15} />
            </a>
          </div>
        </RevealWrapper>

        <RevealWrapper delay={100}>
          <div
            className="rounded-3xl overflow-hidden"
            style={{
              border: `1px solid ${G}25`,
              background: "rgba(0,201,122,0.04)",
              boxShadow: `0 0 80px ${G}08, 0 32px 80px rgba(0,0,0,0.3)`,
            }}
          >
            {/* Header bar */}
            <div
              className="flex items-center gap-3 px-6 lg:px-10 py-4"
              style={{
                borderBottom: `1px solid ${G}15`,
                background: "rgba(0,201,122,0.04)",
              }}
            >
              <div className="flex gap-1.5">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: "#ff5f57" }}
                />
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: "#febc2e" }}
                />
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: "#28c840" }}
                />
              </div>
              <span className="text-xs font-mono ml-2" style={{ color: TEXT2 }}>
                success_story_001.fin — Real Estate Sector
              </span>
              <span
                className="ml-auto px-3 py-1 rounded-full text-xs font-bold"
                style={{
                  background: `${G}18`,
                  color: G,
                  border: `1px solid ${G}35`,
                }}
              >
                ● MANDATE CLOSED
              </span>
            </div>

            <div className="p-8 lg:p-12">
              <div className="grid lg:grid-cols-5 gap-10">
                {/* Left — 3 cols */}
                <div className="lg:col-span-3 flex flex-col gap-5">
                  <div className="flex items-center gap-3">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-bold"
                      style={{
                        background: `${G}18`,
                        color: G,
                        border: `1px solid ${G}30`,
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      Real Estate
                    </span>
                    <span
                      className="text-xs"
                      style={{
                        color: TEXT2,
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      Premium Real Estate Developer
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                      fontWeight: 700,
                      color: TEXT1,
                      lineHeight: 1.25,
                    }}
                  >
                    ₹250 Cr JV Structuring for Mixed-Use Township Development
                  </h3>

                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.9rem",
                      color: TEXT2,
                      lineHeight: 1.85,
                    }}
                  >
                    OMNI Fincon structured a joint venture for a premium real
                    estate developer's mixed-use township development,
                    optimizing the capital structure and creating value for all
                    stakeholders through innovative deal architecture. The
                    mandate involved complex land assembly, regulatory
                    clearances, and aligning multiple equity co-investors with
                    divergent return expectations.
                  </p>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.9rem",
                      color: TEXT2,
                      lineHeight: 1.85,
                    }}
                  >
                    Key achievements included negotiating a balanced
                    revenue-share model, securing infrastructure debt from two
                    PSU banks, and establishing a clear exit mechanism for all
                    JV parties — all executed within a 45-day mandate-to-close
                    timeline.
                  </p>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {[
                      "JV Structuring",
                      "Equity Advisory",
                      "Debt Syndication",
                      "Revenue Share Model",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          color: TEXT2,
                          border: "1px solid rgba(255,255,255,0.08)",
                          fontFamily: "'Inter', sans-serif",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    className="self-start inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-bold tracking-wide transition-all hover:scale-105 mt-2"
                    style={{
                      background: G,
                      color: NAVY,
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    Read Full Case Study <ArrowRight size={14} />
                  </button>
                </div>

                {/* Right — 2 cols */}
                <div className="lg:col-span-2 flex flex-col gap-4">
                  {[
                    {
                      label: "Project Value",
                      value: "₹250 Cr",
                      icon: Landmark,
                      color: G,
                    },
                    {
                      label: "Deal Closure",
                      value: "45 Days",
                      icon: Clock,
                      color: GOLD,
                    },
                    {
                      label: "Development Area",
                      value: "2.5M sq.ft",
                      icon: Building2,
                      color: "#4F7EFF",
                    },
                  ].map((m) => {
                    const Icon = m.icon;
                    return (
                      <div
                        key={m.label}
                        className="flex items-center gap-5 rounded-2xl p-5"
                        style={{
                          background: `${m.color}08`,
                          border: `1px solid ${m.color}20`,
                        }}
                      >
                        <div
                          className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                          style={{
                            background: `${m.color}18`,
                            border: `1px solid ${m.color}30`,
                          }}
                        >
                          <Icon size={22} color={m.color} />
                        </div>
                        <div>
                          <p
                            style={{
                              fontFamily: "'Playfair Display', serif",
                              fontSize: "1.6rem",
                              fontWeight: 700,
                              color: TEXT1,
                              lineHeight: 1,
                            }}
                          >
                            {m.value}
                          </p>
                          <p
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: "0.7rem",
                              color: TEXT2,
                              textTransform: "uppercase",
                              letterSpacing: "0.1em",
                              marginTop: "4px",
                            }}
                          >
                            {m.label}
                          </p>
                        </div>
                      </div>
                    );
                  })}

                  <div
                    className="rounded-2xl p-5 mt-2"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <p
                      className="text-xs uppercase tracking-widest mb-3"
                      style={{
                        color: TEXT2,
                        fontFamily: "'Inter', sans-serif",
                        letterSpacing: "0.12em",
                      }}
                    >
                      Partners Involved
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "HDFC Bank",
                        "Tata Capital",
                        "Piramal Finance",
                        "IIFL Finance",
                      ].map((b) => (
                        <span
                          key={b}
                          className="px-3 py-1 rounded-full text-xs"
                          style={{
                            background: "rgba(255,255,255,0.05)",
                            color: TEXT2,
                            fontFamily: "'Inter', sans-serif",
                          }}
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}

// ─── 9. CHANNEL PARTNER ──────────────────────────────────────────────────────

function ChannelPartner() {
  const [partnerType, setPartnerType] = useState("DSA");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section
      id="partner"
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: NAVY }}
    >
      {/* BG orbs */}
      <div
        className="absolute top-0 left-1/4 w-72 h-72 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${GOLD}08 0%, transparent 70%)`,
          filter: "blur(48px)",
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${G}07 0%, transparent 70%)`,
          filter: "blur(40px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-start">
        {/* Left */}
        <div>
          <RevealWrapper>
            <Pill color={GOLD}>
              <Handshake size={10} /> Channel Partner Program
            </Pill>
          </RevealWrapper>
          <RevealWrapper delay={80}>
            <h2
              className="mt-5 mb-4"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 3.5vw, 3.2rem)",
                fontWeight: 700,
                color: TEXT1,
                lineHeight: 1.12,
              }}
            >
              Partner with{" "}
              <span style={{ color: GOLD, fontStyle: "italic" }}>
                OMNI Fincon.
              </span>
            </h2>
          </RevealWrapper>
          <RevealWrapper delay={140}>
            <p
              className="mb-10"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.95rem",
                color: TEXT2,
                lineHeight: 1.8,
              }}
            >
              Join India's fastest-growing financial intermediary network.
              Unlock premium deal flow, competitive commissions, and
              institutional-grade support as a DSA, Wealth Advisor, or Financial
              Consultant.
            </p>
          </RevealWrapper>

          <div className="flex flex-col gap-5">
            {BENEFITS.map((b, i) => {
              const Icon = b.icon;
              return (
                <RevealWrapper key={b.title} delay={i * 80}>
                  <div className="flex items-start gap-5">
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
                      style={{
                        background: `${GOLD}15`,
                        border: `1px solid ${GOLD}25`,
                      }}
                    >
                      <Icon size={18} color={GOLD} />
                    </div>
                    <div>
                      <p
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "0.92rem",
                          fontWeight: 600,
                          color: TEXT1,
                        }}
                      >
                        {b.title}
                      </p>
                      <p
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "0.82rem",
                          color: TEXT2,
                          marginTop: "3px",
                          lineHeight: 1.65,
                        }}
                      >
                        {b.desc}
                      </p>
                    </div>
                  </div>
                </RevealWrapper>
              );
            })}
          </div>
        </div>

        {/* Right — Form */}
        <RevealWrapper delay={200}>
          <div
            className="rounded-3xl p-8 lg:p-10"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.09)",
              backdropFilter: "blur(20px)",
              boxShadow:
                "0 32px 80px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center gap-5 py-12 text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: `${G}18`, border: `1px solid ${G}35` }}
                >
                  <CheckCircle2 size={32} color={G} />
                </div>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: TEXT1,
                  }}
                >
                  Application Submitted!
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.9rem",
                    color: TEXT2,
                  }}
                >
                  Our partnership team will contact you within 48 business
                  hours.
                </p>
              </div>
            ) : (
              <>
                <h3
                  className="mb-1"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.45rem",
                    fontWeight: 700,
                    color: TEXT1,
                  }}
                >
                  Apply as Channel Partner
                </h3>
                <p
                  className="mb-7"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.82rem",
                    color: TEXT2,
                  }}
                >
                  Complete the form — we respond within 2 business days.
                </p>

                <form
                  className="flex flex-col gap-5"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                >
                  <div>
                    <label
                      className="block text-xs mb-1.5 tracking-wide font-medium"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        color: TEXT2,
                      }}
                    >
                      Full Name *
                    </label>
                    <input
                      required
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.09)",
                        color: TEXT1,
                        fontFamily: "'Inter', sans-serif",
                      }}
                      onFocus={(e) =>
                        (e.target.style.border = `1px solid ${G}40`)
                      }
                      onBlur={(e) =>
                        (e.target.style.border =
                          "1px solid rgba(255,255,255,0.09)")
                      }
                    />
                  </div>
                  {[
                    { label: "Email Address *", type: "email" },
                    { label: "Phone Number *", type: "tel" },
                  ].map((f) => (
                    <div key={f.label}>
                      <label
                        className="block text-xs mb-1.5 tracking-wide font-medium"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          color: TEXT2,
                        }}
                      >
                        {f.label}
                      </label>
                      <input
                        required
                        type={f.type}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.09)",
                          color: TEXT1,
                          fontFamily: "'Inter', sans-serif",
                        }}
                        onFocus={(e) =>
                          (e.target.style.border = `1px solid ${G}40`)
                        }
                        onBlur={(e) =>
                          (e.target.style.border =
                            "1px solid rgba(255,255,255,0.09)")
                        }
                      />
                    </div>
                  ))}

                  <div>
                    <label
                      className="block text-xs mb-2 tracking-wide font-medium"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        color: TEXT2,
                      }}
                    >
                      Partner Type *
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "DSA",
                        "Wealth Advisor",
                        "Financial Consultant",
                        "Other",
                      ].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setPartnerType(t)}
                          className="px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-all"
                          style={{
                            background:
                              partnerType === t
                                ? `${GOLD}15`
                                : "rgba(255,255,255,0.04)",
                            border:
                              partnerType === t
                                ? `1px solid ${GOLD}40`
                                : "1px solid rgba(255,255,255,0.08)",
                            color: partnerType === t ? GOLD : TEXT2,
                            fontFamily: "'Inter', sans-serif",
                          }}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-xs mb-1.5 tracking-wide font-medium"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        color: TEXT2,
                      }}
                    >
                      Tell us about your experience (optional)
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all resize-none"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.09)",
                        color: TEXT1,
                        fontFamily: "'Inter', sans-serif",
                      }}
                      onFocus={(e) =>
                        (e.target.style.border = `1px solid ${GOLD}40`)
                      }
                      onBlur={(e) =>
                        (e.target.style.border =
                          "1px solid rgba(255,255,255,0.09)")
                      }
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full font-bold text-sm tracking-widest uppercase transition-all hover:scale-[1.02] active:scale-95 mt-1"
                    style={{
                      background: GOLD,
                      color: NAVY,
                      fontFamily: "'Inter', sans-serif",
                      letterSpacing: "0.1em",
                      boxShadow: `0 4px 24px ${GOLD}30`,
                    }}
                  >
                    Submit Application
                  </button>
                </form>
              </>
            )}
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}

// ─── 10. PARTNERS ────────────────────────────────────────────────────────────

function Partners() {
  return (
    <section className="py-20" style={{ background: NAVY2 }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <RevealWrapper>
          <p
            className="text-center mb-2 text-xs font-bold tracking-widest uppercase"
            style={{ color: TEXT2, fontFamily: "'Inter', sans-serif" }}
          >
            Our Valued Partners
          </p>
          <p
            className="text-center mb-12 text-xs tracking-wider"
            style={{ color: `${TEXT2}80`, fontFamily: "'Inter', sans-serif" }}
          >
            Trusted by leading financial institutions across India
          </p>
        </RevealWrapper>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {PARTNERS.map((p, i) => (
            <RevealWrapper key={p} delay={i * 50}>
              <div
                className="flex items-center justify-center px-5 py-5 rounded-2xl transition-all duration-300 cursor-default"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = `${G}07`;
                  (e.currentTarget as HTMLElement).style.border =
                    `1px solid ${G}20`;
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(255,255,255,0.03)";
                  (e.currentTarget as HTMLElement).style.border =
                    "1px solid rgba(255,255,255,0.07)";
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(0)";
                }}
              >
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    color: TEXT2,
                    textAlign: "center",
                    lineHeight: 1.4,
                  }}
                >
                  {p}
                </span>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 11. INSIGHTS ────────────────────────────────────────────────────────────

function Insights() {
  return (
    <section
      id="insights"
      className="py-24 lg:py-32"
      style={{ background: NAVY }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <RevealWrapper>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <div>
              <Pill color={G}>Perspectives</Pill>
              <h2
                className="mt-4"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(2rem, 3.5vw, 3.2rem)",
                  fontWeight: 700,
                  color: TEXT1,
                }}
              >
                Insights & Perspectives.
              </h2>
              <p
                className="mt-3"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.9rem",
                  color: TEXT2,
                }}
              >
                Expert analysis on markets, sectors, and investment trends.
              </p>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm font-semibold shrink-0 transition-all hover:gap-3"
              style={{ color: G, fontFamily: "'Inter', sans-serif" }}
            >
              View All Insights <ArrowUpRight size={14} />
            </a>
          </div>
        </RevealWrapper>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INSIGHTS.map((article, i) => (
            <RevealWrapper key={i} delay={i * 80}>
              <article
                className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300 h-full cursor-pointer"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(-6px)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    `0 24px 60px rgba(0,0,0,0.3)`;
                  (e.currentTarget as HTMLElement).style.border =
                    `1px solid ${article.color}25`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  (e.currentTarget as HTMLElement).style.border =
                    "1px solid rgba(255,255,255,0.07)";
                }}
              >
                {/* Color accent bar */}
                <div
                  style={{
                    height: "3px",
                    background: `linear-gradient(to right, ${article.color}, ${article.color}40)`,
                  }}
                />

                {/* Card header gradient */}
                <div className="px-7 py-6 flex flex-col gap-5 flex-1">
                  <div className="flex items-center justify-between">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-bold"
                      style={{
                        background: `${article.color}18`,
                        color: article.color,
                        border: `1px solid ${article.color}30`,
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {article.category}
                    </span>
                    <div
                      className="flex items-center gap-3 text-xs"
                      style={{
                        color: TEXT2,
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      <span>{article.date}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock size={11} /> {article.time}
                      </span>
                    </div>
                  </div>

                  <div
                    style={{
                      height: "1px",
                      background: "rgba(255,255,255,0.05)",
                    }}
                  />

                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1.12rem",
                      fontWeight: 700,
                      color: TEXT1,
                      lineHeight: 1.38,
                    }}
                  >
                    {article.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.83rem",
                      color: TEXT2,
                      lineHeight: 1.75,
                      flexGrow: 1,
                    }}
                  >
                    {article.desc}
                  </p>

                  <a
                    href="#"
                    className="inline-flex items-center gap-1.5 text-xs font-bold transition-all group-hover:gap-2.5"
                    style={{
                      color: article.color,
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    Read More <ArrowRight size={12} />
                  </a>
                </div>
              </article>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 12. CTA BANNER ──────────────────────────────────────────────────────────

function CTABanner() {
  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{ background: NAVY2 }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 80% at 50% 50%, ${G}0b 0%, transparent 70%)`,
        }}
      />
      <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center relative">
        <RevealWrapper>
          <Pill color={G}>
            <Sparkles size={10} /> Ready to Grow?
          </Pill>
          <h2
            className="mt-5 mb-5"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
              fontWeight: 700,
              color: TEXT1,
              lineHeight: 1.15,
            }}
          >
            Let's Empower Your{" "}
            <span style={{ color: G, fontStyle: "italic" }}>
              Financial Growth
            </span>{" "}
            Together.
          </h2>
          <p
            className="mb-8 mx-auto"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.95rem",
              color: TEXT2,
              lineHeight: 1.75,
              maxWidth: "520px",
            }}
          >
            Whether you're raising capital, managing wealth, or entering a new
            venture — our team is ready to partner with you on every step of the
            journey.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-sm transition-all hover:scale-105 active:scale-95"
              style={{
                background: G,
                color: NAVY,
                fontFamily: "'Inter', sans-serif",
                letterSpacing: "0.08em",
                boxShadow: `0 4px 32px ${G}35`,
              }}
            >
              Get in Touch <ArrowRight size={15} />
            </a>
            <a
              href="tel:+919500063064"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-semibold text-sm transition-all"
              style={{
                border: "1px solid rgba(255,255,255,0.12)",
                color: TEXT1,
                fontFamily: "'Inter', sans-serif",
                background: "rgba(255,255,255,0.04)",
              }}
            >
              <Phone size={15} color={G} />
              +91 95000 63064
            </a>
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}

// ─── 13. CONTACT ─────────────────────────────────────────────────────────────

function Contact() {
  const [interest, setInterest] = useState("Investment Banking");
  const [submitted, setSubmitted] = useState(false);

  const INTEREST_OPTIONS = [
    "Investment Banking",
    "Wealth Management",
    "Real Estate Advisory",
    "Retail Banking",
    "Channel Partnership",
  ];

  return (
    <section id="contact" style={{ background: NAVY }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-32 grid lg:grid-cols-2 gap-16">
        {/* Offices */}
        <div>
          <RevealWrapper>
            <Pill color={G}>
              <MapPin size={10} /> Our Offices
            </Pill>
            <h2
              className="mt-5 mb-10"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                fontWeight: 700,
                color: TEXT1,
                lineHeight: 1.15,
              }}
            >
              Present Across
              <br />
              India's Growth Centres.
            </h2>
          </RevealWrapper>

          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {OFFICES.map((o, i) => (
              <RevealWrapper key={o.city} delay={i * 70}>
                <div
                  className="rounded-2xl p-5 transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.border =
                      `1px solid ${G}25`;
                    (e.currentTarget as HTMLElement).style.background =
                      `${G}05`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.border =
                      "1px solid rgba(255,255,255,0.07)";
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(255,255,255,0.03)";
                  }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: G }}
                    />
                    <p
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "0.95rem",
                        fontWeight: 700,
                        color: TEXT1,
                      }}
                    >
                      {o.city}
                    </p>
                  </div>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.78rem",
                      color: TEXT2,
                      lineHeight: 1.65,
                      marginBottom: "12px",
                    }}
                  >
                    {o.address}
                  </p>
                  <a
                    href={`tel:${o.phone}`}
                    className="flex items-center gap-1.5 text-xs font-medium"
                    style={{ color: G, fontFamily: "'Inter', sans-serif" }}
                  >
                    <Phone size={11} /> {o.phone}
                  </a>
                </div>
              </RevealWrapper>
            ))}
          </div>

          <RevealWrapper delay={280}>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:contact@omnifincon.com"
                className="flex items-center gap-3 text-sm group"
                style={{ color: TEXT2, fontFamily: "'Inter', sans-serif" }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: `${G}15`, border: `1px solid ${G}25` }}
                >
                  <Mail size={15} color={G} />
                </div>
                <span className="group-hover:text-white transition-colors">
                  contact@omnifincon.com
                </span>
              </a>
              <a
                href="tel:+919500063064"
                className="flex items-center gap-3 text-sm group"
                style={{ color: TEXT2, fontFamily: "'Inter', sans-serif" }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: `${G}15`, border: `1px solid ${G}25` }}
                >
                  <Phone size={15} color={G} />
                </div>
                <span className="group-hover:text-white transition-colors">
                  +91 95000 63064
                </span>
              </a>
            </div>
          </RevealWrapper>
        </div>

        {/* Message form */}
        <RevealWrapper delay={150}>
          <div
            className="rounded-3xl p-8 lg:p-10"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(20px)",
              boxShadow:
                "0 32px 80px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            <h3
              className="mb-1"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.45rem",
                fontWeight: 700,
                color: TEXT1,
              }}
            >
              Send us a message
            </h3>
            <p
              className="mb-7"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.82rem",
                color: TEXT2,
              }}
            >
              We respond to all enquiries within one business day.
            </p>

            {submitted ? (
              <div className="flex flex-col items-center gap-4 py-12 text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: `${G}15`, border: `1px solid ${G}30` }}
                >
                  <CheckCircle2 size={32} color={G} />
                </div>
                <p
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.3rem",
                    fontWeight: 700,
                    color: TEXT1,
                  }}
                >
                  Message Received. Thank You.
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.87rem",
                    color: TEXT2,
                  }}
                >
                  Our team will be in touch within one business day.
                </p>
              </div>
            ) : (
              <form
                className="flex flex-col gap-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
              >
                <div>
                  <label
                    className="text-xs mb-2 block tracking-wide font-medium"
                    style={{ fontFamily: "'Inter', sans-serif", color: TEXT2 }}
                  >
                    I'm interested in
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {INTEREST_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setInterest(opt)}
                        className="px-4 py-2 rounded-full text-xs font-semibold transition-all"
                        style={{
                          background:
                            interest === opt
                              ? `${G}15`
                              : "rgba(255,255,255,0.04)",
                          border:
                            interest === opt
                              ? `1px solid ${G}40`
                              : "1px solid rgba(255,255,255,0.08)",
                          color: interest === opt ? G : TEXT2,
                          fontFamily: "'Inter', sans-serif",
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {["Your Name *", "Phone Number *"].map((lbl) => (
                    <div key={lbl}>
                      <label
                        className="text-xs mb-1.5 block font-medium"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          color: TEXT2,
                        }}
                      >
                        {lbl}
                      </label>
                      <input
                        required
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.09)",
                          color: TEXT1,
                          fontFamily: "'Inter', sans-serif",
                        }}
                        onFocus={(e) =>
                          (e.target.style.border = `1px solid ${G}40`)
                        }
                        onBlur={(e) =>
                          (e.target.style.border =
                            "1px solid rgba(255,255,255,0.09)")
                        }
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label
                    className="text-xs mb-1.5 block font-medium"
                    style={{ fontFamily: "'Inter', sans-serif", color: TEXT2 }}
                  >
                    Your Email *
                  </label>
                  <input
                    required
                    type="email"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.09)",
                      color: TEXT1,
                      fontFamily: "'Inter', sans-serif",
                    }}
                    onFocus={(e) =>
                      (e.target.style.border = `1px solid ${G}40`)
                    }
                    onBlur={(e) =>
                      (e.target.style.border =
                        "1px solid rgba(255,255,255,0.09)")
                    }
                  />
                </div>

                <div>
                  <label
                    className="text-xs mb-1.5 block font-medium"
                    style={{ fontFamily: "'Inter', sans-serif", color: TEXT2 }}
                  >
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.09)",
                      color: TEXT1,
                      fontFamily: "'Inter', sans-serif",
                    }}
                    onFocus={(e) =>
                      (e.target.style.border = `1px solid ${G}40`)
                    }
                    onBlur={(e) =>
                      (e.target.style.border =
                        "1px solid rgba(255,255,255,0.09)")
                    }
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full font-bold text-sm tracking-widest uppercase transition-all hover:scale-[1.02] active:scale-95"
                  style={{
                    background: G,
                    color: NAVY,
                    fontFamily: "'Inter', sans-serif",
                    letterSpacing: "0.1em",
                    boxShadow: `0 4px 24px ${G}30`,
                  }}
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </RevealWrapper>
      </div>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          background: NAVY2,
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-10">
          <div className="grid grid-cols-2 md:grid-cols-12 gap-10 mb-12">
            {/* Brand col */}
            <div className="col-span-2 md:col-span-4">
              <div className="flex flex-col leading-none mb-4">
                <span
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: TEXT1,
                    letterSpacing: "0.15em",
                  }}
                >
                  OMNI
                </span>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.55rem",
                    fontWeight: 700,
                    color: G,
                    letterSpacing: "0.3em",
                  }}
                >
                  FINCON
                </span>
              </div>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.8rem",
                  color: TEXT2,
                  lineHeight: 1.75,
                  maxWidth: "280px",
                }}
              >
                Empowering Growth Through Financial Excellence. India's
                integrated financial advisory firm specialising in capital
                markets, wealth, real estate, and retail banking.
              </p>
              <p
                className="mt-4 text-xs"
                style={{ color: TEXT2, fontFamily: "'Inter', sans-serif" }}
              >
                📞{" "}
                <a href="tel:+919500063064" style={{ color: G }}>
                  +91 95000 63064
                </a>
              </p>
              <p
                className="mt-1 text-xs"
                style={{ color: TEXT2, fontFamily: "'Inter', sans-serif" }}
              >
                ✉️{" "}
                <a href="mailto:contact@omnifincon.com" style={{ color: G }}>
                  contact@omnifincon.com
                </a>
              </p>
            </div>

            {/* Services */}
            <div className="col-span-1 md:col-span-2">
              <p
                className="text-xs font-bold tracking-widest uppercase mb-5"
                style={{ color: TEXT1, fontFamily: "'Inter', sans-serif" }}
              >
                Services
              </p>
              {[
                "Investment Banking",
                "Wealth & Risk Advisory",
                "Land & Real Estate",
                "Retail Banking",
              ].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="block text-sm mb-3 transition-colors hover:text-white"
                  style={{
                    color: TEXT2,
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.82rem",
                  }}
                >
                  {s}
                </a>
              ))}
            </div>

            {/* Company */}
            <div className="col-span-1 md:col-span-2">
              <p
                className="text-xs font-bold tracking-widest uppercase mb-5"
                style={{ color: TEXT1, fontFamily: "'Inter', sans-serif" }}
              >
                Company
              </p>
              {["About Us", "Case Studies", "Insights", "Partner with Us"].map(
                (s) => (
                  <a
                    key={s}
                    href="#"
                    className="block text-sm mb-3 transition-colors hover:text-white"
                    style={{
                      color: TEXT2,
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.82rem",
                    }}
                  >
                    {s}
                  </a>
                ),
              )}
            </div>

            {/* Connect */}
            <div className="col-span-1 md:col-span-2">
              <p
                className="text-xs font-bold tracking-widest uppercase mb-5"
                style={{ color: TEXT1, fontFamily: "'Inter', sans-serif" }}
              >
                Connect
              </p>
              {[
                "Contact Us",
                "Careers",
                "Privacy Policy",
                "Terms of Service",
              ].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="block text-sm mb-3 transition-colors hover:text-white"
                  style={{
                    color: TEXT2,
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.82rem",
                  }}
                >
                  {s}
                </a>
              ))}
            </div>

            {/* Offices */}
            <div className="col-span-2 md:col-span-2">
              <p
                className="text-xs font-bold tracking-widest uppercase mb-5"
                style={{ color: TEXT1, fontFamily: "'Inter', sans-serif" }}
              >
                Offices
              </p>
              {OFFICES.map((o) => (
                <p
                  key={o.city}
                  className="text-sm mb-3"
                  style={{
                    color: TEXT2,
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.82rem",
                  }}
                >
                  <span style={{ color: G, fontWeight: 600 }}>{o.city}</span>
                </p>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
            style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
          >
            <p
              className="text-xs"
              style={{ color: TEXT2, fontFamily: "'Inter', sans-serif" }}
            >
              © 2024 OMNI Fincon. All rights reserved.
            </p>
            <div className="flex gap-6">
              {["Privacy Policy", "Terms of Service", "Disclaimer"].map((l) => (
                <a
                  key={l}
                  href="#"
                  className="text-xs transition-colors hover:text-white"
                  style={{ color: TEXT2, fontFamily: "'Inter', sans-serif" }}
                >
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}

// ─── FLOATING CONTACT BUTTON ─────────────────────────────────────────────────

function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return (
    <a
      href="tel:+919500063064"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3 rounded-full font-semibold text-sm transition-all duration-300"
      style={{
        background: G,
        color: NAVY,
        fontFamily: "'Inter', sans-serif",
        boxShadow: `0 4px 24px ${G}40`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <Phone size={16} />
      Call Us Now
    </a>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div style={{ background: NAVY, minHeight: "100vh", overflowX: "hidden" }}>
      <AnnouncementBar />
      <Nav />
      <Hero />
      <SectionDivider />
      <Services />
      <SectionDivider />
      <About />
      <SectionDivider />
      <InvestmentBanking />
      <IndustriesTicker />
      <SectionDivider />
      <SuccessStories />
      <SectionDivider />
      <ChannelPartner />
      <SectionDivider />
      <Partners />
      <SectionDivider />
      <Insights />
      <CTABanner />
      <Contact />
      <FloatingCTA />
    </div>
  );
}
