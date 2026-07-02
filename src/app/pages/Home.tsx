import { useState, useEffect } from "react";
import { Link } from "react-router";
import {
  TrendingUp, Shield, Building2, CreditCard, Umbrella, CheckCircle2,
  ArrowRight, ChevronDown, Phone, Star, BarChart3, Globe,
  Users, Landmark, Clock, ArrowUpRight, Sparkles, DollarSign,
  Target, Award, Handshake, MessageCircle, Zap, Quote,
} from "lucide-react";
import {
  G, GOLD, BLUE, PURPLE, TEAL, NAVY, NAVY2, DARK, TEXT1, TEXT2,
  FONT_SANS, FONT_SERIF, FONT_NUM, OFFICES, PARTNERS,
  SURF_BORDER, CARD_SHADOW, CARD_SHADOW_LG, GREEN_GRAD,
} from "../../lib/tokens";
import { RevealWrapper, useScrollReveal, useCounter, Pill, SectionHeader, GlowButton, GradientCard, StarRating } from "../components/shared/Atoms";

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  { num: "01", icon: TrendingUp, title: "Investment Banking",          tag: "Capital Markets",   color: G,
    desc: "Fund Raising (Debt & Equity), HNI Funding, M&A Advisory, Corporate Finance Advisory, Project Finance, Structured Finance, Bridge Financing, and SME/MSME.",
    href: "/services/investment-banking" },
  { num: "02", icon: Shield,     title: "Wealth & Asset Management",   tag: "Wealth & Assets",   color: BLUE,
    desc: "Private Wealth Advisory for UHNIs & Family Offices, Alternative Investments (AIF), Legacy & Succession Planning, Pre-IPO, and Opportunistic Deals.",
    href: "/services/wealth-advisory" },
  { num: "03", icon: Umbrella,   title: "Insurance & Risk Management", tag: "Risk Protection",   color: TEAL,
    desc: "Business Continuity (Key-Man Insurance), Complex Insurance Structures, Estate & Legacy Protection, and Corporate Liability Solutions.",
    href: "/services/insurance-risk-management" },
  { num: "04", icon: Building2,  title: "Real Estate Advisory",        tag: "Real Estate",       color: GOLD,
    desc: "Real Estate Capital Markets, Land & Asset Transactions, Project Finance & JVs, Strategic Consulting, Lease Rental Discounting, and Asset Monetization.",
    href: "/services/real-estate-advisory" },
  { num: "05", icon: CreditCard, title: "Retail Banking",              tag: "Banking & Credit",  color: PURPLE,
    desc: "Home Loans, Business Loans, Loan Against Property, and Loan Against Securities — complete retail credit solutions.",
    href: "/services/retail-banking" },
];

const IB_ITEMS = [
  "Fund Raising — Debt & Equity", "HNI & Family Office Funding", "M&A Advisory",
  "Corporate Finance Advisory",   "Project Finance",             "Structured Finance",
  "Bridge Financing",             "SME / MSME Solutions",
];

const INDUSTRIES_ROW1 = [
  "Real Estate","Hospitality","Power Industry","Solar Energy","NBFC","Pharmaceutical",
  "Textile Industry","Polymer Industry","Garment Industry","Paper & Pulp","Healthcare",
  "Chemical Industry","Cold Storage","International Trading","Hotel & Resort Projects",
  "Multiplex & Mall Projects","Infrastructure Projects","Steel Industry",
];
const INDUSTRIES_ROW2 = [
  "Food Industry","Automobile","Entertainment & Media","Power Projects","Hospital & Health",
  "Engineering Contractors","Jewellery & Button","Packaging Industry","Logistics & Transport",
  "Telecommunications","IT & Software","Education","Retail","Agriculture",
  "Textile Machinery","Effluent Treatment","Residential & Commercial","High Reputed Showrooms",
];

const TESTIMONIALS = [
  {
    quote: "OMNI Fincon structured our ₹180 Cr debt syndication with remarkable speed and precision. Their PSU banking relationships are genuinely unmatched in the market.",
    name: "Rahul Mehta", title: "Managing Director", company: "Greenfield Developers",
    initials: "RM", color: G, rating: 5,
  },
  {
    quote: "Their wealth advisory team built a portfolio that outperformed benchmarks by 18% in FY2024. The cross-domain expertise they bring is truly institutional-grade.",
    name: "Priya Sharma", title: "Founder & CEO", company: "Techbridge Solutions",
    initials: "PS", color: GOLD, rating: 5,
  },
  {
    quote: "From mandate to closure in 45 days for a ₹250 Cr JV — the OMNI team executed flawlessly under complex conditions. Our go-to financial partner.",
    name: "Vikram Nair", title: "Director", company: "Prestige Realty Group",
    initials: "VN", color: BLUE, rating: 5,
  },
];

const INSIGHTS = [
  { category: "Market Analysis", date: "Oct 2024", time: "5 min read", color: G,
    title: "India's Renewable Energy Financing Landscape 2024",
    desc: "An in-depth look at evolving financing mechanisms for solar and wind projects, including green bonds and blended finance structures." },
  { category: "Sector Focus",    date: "Sep 2024", time: "7 min read", color: GOLD,
    title: "Real Estate JV Structures: Maximizing Value",
    desc: "Key considerations for structuring successful real estate joint ventures, from capital stacking to exit mechanisms." },
  { category: "Regulatory",     date: "Aug 2024", time: "6 min read", color: BLUE,
    title: "NBFC & AIF Launch: Navigating Regulatory Framework",
    desc: "A comprehensive guide to launching NBFCs and AIFs in the current regulatory environment, including compliance requirements." },
];

const BENEFITS = [
  { icon: DollarSign, title: "Transparent Payouts",   desc: "Competitive commission structure with timely, guaranteed settlements and real-time tracking." },
  { icon: Award,      title: "Training & Support",    desc: "Comprehensive onboarding, monthly product clinics, and continuous professional development." },
  { icon: Star,       title: "Exclusive Products",    desc: "Priority access to premium financial products and high-demand structured instruments." },
  { icon: Handshake,  title: "Backend Support",       desc: "Dedicated relationship manager handling all documentation, follow-ups, and operations." },
];

// ─── Hero Stats ───────────────────────────────────────────────────────────────

function HeroStats() {
  const { ref, visible } = useScrollReveal();
  const fin  = useCounter(20,   1800, visible);
  const proj = useCounter(1000, 1600, visible);
  const prof = useCounter(50,   1400, visible);
  const exp  = useCounter(200,  1200, visible);

  return (
    <div ref={ref} className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-0">
      {[
        { val: `₹${fin},000+`, label: "Cr. Structured Financing" },
        { val: `${proj}+`,     label: "Projects Executed" },
        { val: `${prof}+`,     label: "Dedicated Professionals" },
        { val: `${exp}+`,      label: "Years of Combined Exp." },
      ].map((s, i) => (
        <div key={i} className="flex flex-col gap-2 py-5 px-6 rounded-2xl"
          style={{ background: "#FFFFFF", border: `1px solid ${SURF_BORDER}`, boxShadow: CARD_SHADOW }}>
          <span style={{ fontFamily: FONT_NUM, fontSize: "clamp(1.5rem, 2.2vw, 2rem)", fontWeight: 800, color: G, lineHeight: 1, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>
            {s.val}
          </span>
          <span style={{ fontFamily: FONT_SANS, fontSize: "0.68rem", color: TEXT2, textTransform: "uppercase", letterSpacing: "0.12em" }}>
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Hero Dashboard Mockup (stays dark — premium contrast widget) ─────────────

function HeroDashboard() {
  return (
    <div className="relative" style={{ height: "580px" }}>
      <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle,${G}20 0%,transparent 70%)`, filter: "blur(40px)", animation: "float-orb 6s ease-in-out infinite" }} />
      <div className="absolute -bottom-8 -left-8 w-48 h-48 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(79,126,255,0.16) 0%,transparent 70%)", filter: "blur(28px)", animation: "float-orb 8s ease-in-out infinite reverse" }} />

      {/* Dark card widget */}
      <div className="absolute inset-3 rounded-3xl overflow-hidden flex flex-col"
        style={{
          border: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(8,14,28,0.93)",
          backdropFilter: "blur(24px)",
          boxShadow: "0 40px 100px rgba(11,26,46,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}>
        {/* Window chrome */}
        <div className="flex items-center gap-2 px-5 py-3.5 shrink-0"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
          <div className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
          <div className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
          <span className="ml-3 text-xs font-mono" style={{ color: "rgba(255,255,255,0.40)" }}>portfolio_dashboard.fin</span>
          <span className="ml-auto flex items-center gap-1.5 text-xs" style={{ color: G, fontFamily: FONT_SANS }}>
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse inline-block" /> LIVE
          </span>
        </div>
        <div className="p-5 flex flex-col gap-4 overflow-hidden">
          {/* Metric cards */}
          <div className="grid grid-cols-3 gap-2.5">
            {[
              { label: "Financing",   value: "₹20,000 Cr+", change: "+34.2% YoY",     icon: TrendingUp },
              { label: "Projects",    value: "1,000+",       change: "+18.6% YoY",     icon: BarChart3  },
              { label: "NPA Record",  value: "Zero",         change: "Since Inception", icon: Target     },
            ].map((m) => {
              const Icon = m.icon;
              return (
                <div key={m.label} className="rounded-xl p-3.5 flex flex-col gap-2"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="flex items-center justify-between">
                    <span style={{ fontFamily: FONT_SANS, fontSize: "0.58rem", color: "rgba(255,255,255,0.45)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                      {m.label}
                    </span>
                    <Icon size={11} color={G} />
                  </div>
                  <span style={{ fontFamily: FONT_SERIF, fontSize: "1.1rem", fontWeight: 700, color: "#FFFFFF" }}>{m.value}</span>
                  <span style={{ fontFamily: FONT_SANS, fontSize: "0.64rem", color: G }}>{m.change} YoY</span>
                </div>
              );
            })}
          </div>
          {/* Chart */}
          <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="flex justify-between items-center mb-3">
              <span style={{ fontFamily: FONT_SANS, fontSize: "0.68rem", color: "rgba(255,255,255,0.40)" }}>Fund Deployment Pipeline</span>
              <span style={{ fontFamily: FONT_SANS, fontSize: "0.68rem", color: G, fontWeight: 600 }}>FY 2024–25</span>
            </div>
            <svg viewBox="0 0 280 56" className="w-full" style={{ height: "56px" }}>
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={G} stopOpacity="0.35" />
                  <stop offset="100%" stopColor={G} stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,48 C20,44 35,40 55,34 S90,26 110,20 S145,12 165,9 S200,5 220,4 S255,3 280,2 L280,56 L0,56 Z" fill="url(#chartGrad)" />
              <path d="M0,48 C20,44 35,40 55,34 S90,26 110,20 S145,12 165,9 S200,5 220,4 S255,3 280,2"
                fill="none" stroke={G} strokeWidth="1.8" strokeLinecap="round" />
              {[55,110,165,220].map((x,i)=>(
                <circle key={i} cx={x} cy={[34,20,9,4][i]} r="3" fill={G} opacity="0.8"/>
              ))}
            </svg>
          </div>
          {/* Active deal flow */}
          <div className="flex flex-col gap-1.5">
            <p style={{ fontFamily: FONT_SANS, fontSize: "0.6rem", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "2px" }}>
              Active Deal Flow
            </p>
            {[
              { sector: "Real Estate JV",   amount: "₹250 Cr", status: "Closed",      color: G      },
              { sector: "Renewable Energy", amount: "₹180 Cr", status: "In Progress", color: BLUE   },
              { sector: "Healthcare Infra", amount: "₹95 Cr",  status: "Term Sheet",  color: GOLD   },
              { sector: "NBFC Fundraise",   amount: "₹120 Cr", status: "Mandate",     color: PURPLE },
            ].map((d) => (
              <div key={d.sector} className="flex items-center justify-between px-3 py-2 rounded-lg"
                style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.04)" }}>
                <span style={{ fontFamily: FONT_SANS, fontSize: "0.68rem", color: "rgba(255,255,255,0.75)", minWidth: "110px" }}>{d.sector}</span>
                <span style={{ fontFamily: FONT_SANS, fontSize: "0.68rem", color: "rgba(255,255,255,0.90)", fontWeight: 600 }}>{d.amount}</span>
                <span className="px-2 py-0.5 rounded-full"
                  style={{ background: `${d.color}20`, color: d.color, border: `1px solid ${d.color}35`, fontSize: "0.6rem", fontFamily: FONT_SANS }}>
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

// ─── 1. HERO ─────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative overflow-hidden" style={{ minHeight: "100vh", paddingTop: "104px", background: NAVY }}>
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(ellipse 70% 55% at 75% 45%,${G}0b 0%,transparent 65%),
                       radial-gradient(ellipse 50% 70% at 15% 75%,rgba(30,94,232,0.06) 0%,transparent 55%),
                       radial-gradient(ellipse 40% 40% at 50% 10%,${GOLD}07 0%,transparent 55%)`,
        }} />
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `linear-gradient(rgba(11,26,46,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(11,26,46,0.025) 1px,transparent 1px)`,
          backgroundSize: "70px 70px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%,black 0%,transparent 100%)",
        }} />
      </div>

      {/* Single flex-col container — stacks hero content then stats */}
      <div className="relative max-w-[1320px] mx-auto px-6 lg:px-10 w-full flex flex-col justify-center" style={{ minHeight: "calc(100vh - 104px)" }}>

        {/* Hero columns: text left, dashboard right */}
        <div className="grid lg:grid-cols-2 gap-16 items-center py-16 lg:py-20">
          {/* Left */}
          <div className="flex flex-col gap-6">
            <RevealWrapper delay={0}>
              <Pill color={G}><Sparkles size={10} /> Empowering Growth</Pill>
            </RevealWrapper>

            <RevealWrapper delay={100}>
              <h1 style={{ fontFamily: FONT_SERIF, fontSize: "clamp(2.8rem,5.5vw,4.8rem)", fontWeight: 700, lineHeight: 1.08, color: TEXT1, letterSpacing: "-0.02em" }}>
                Access Capital.{" "}
                <span style={{
                  background: `linear-gradient(135deg,${G} 0%,#4A80E0 50%,${G} 100%)`,
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>
                  Create Wealth.
                </span>{" "}
                Invest Confidently.
              </h1>
            </RevealWrapper>

            <RevealWrapper delay={180}>
              <p style={{ fontFamily: FONT_SANS, fontSize: "1rem", color: TEXT2, lineHeight: 1.8, maxWidth: "520px" }}>
                A boutique investment banking firm helping you access capital, accelerate growth, create wealth, and invest confidently for a secure and prosperous future.
              </p>
            </RevealWrapper>

            <RevealWrapper delay={240}>
              <div className="flex items-center gap-2 flex-wrap" style={{ fontFamily: FONT_SANS, fontSize: "0.72rem", color: TEXT2, letterSpacing: "0.2em", fontWeight: 700, textTransform: "uppercase" }}>
                {["Fund","Growth","Wealth","Invest"].map((w,i)=>(
                  <span key={w} className="flex items-center gap-2">
                    <span style={{ color: G }}>{w}</span>
                    {i<3 && <span style={{ color: "rgba(11,26,46,0.15)" }}>|</span>}
                  </span>
                ))}
              </div>
            </RevealWrapper>

            <RevealWrapper delay={300}>
              <div className="flex flex-wrap gap-4 mt-2">
                <GlowButton color={G} href="/contact" size="lg">
                  Get in Touch <ArrowRight size={16} />
                </GlowButton>
                <a href="#services"
                  className="inline-flex items-center gap-2.5 rounded-full font-semibold text-sm transition-all"
                  style={{ padding: "14px 26px", border: `1px solid ${SURF_BORDER}`, color: TEXT1, fontFamily: FONT_SANS, background: "#F4F7FD", fontSize: "0.84rem" }}
                  onMouseEnter={e=>(e.currentTarget as HTMLElement).style.background="#EBF0F8"}
                  onMouseLeave={e=>(e.currentTarget as HTMLElement).style.background="#F4F7FD"}>
                  Explore Services <ChevronDown size={15} />
                </a>
              </div>
            </RevealWrapper>

            <RevealWrapper delay={360}>
              <div className="flex items-center gap-4 flex-wrap mt-2">
                {[
                  { icon: CheckCircle2, text: "SEBI Registered" },
                  { icon: Award,        text: "Zero NPA Record" },
                  { icon: Users,        text: "1,000+ Projects" },
                ].map((b) => {
                  const Icon = b.icon;
                  return (
                    <div key={b.text} className="flex items-center gap-1.5" style={{ fontFamily: FONT_SANS, fontSize: "0.73rem", color: TEXT2 }}>
                      <Icon size={13} color={G} /> {b.text}
                    </div>
                  );
                })}
              </div>
            </RevealWrapper>
          </div>

          {/* Right — dark dashboard widget */}
          <RevealWrapper delay={150} className="hidden lg:block">
            <HeroDashboard />
          </RevealWrapper>
        </div>

        {/* Stats row — full container width, below hero columns */}
        <RevealWrapper delay={400} className="pb-16">
          <HeroStats />
        </RevealWrapper>

      </div>
    </section>
  );
}

// ─── 2. TRUST BAR ─────────────────────────────────────────────────────────────

function TrustBar() {
  return (
    <section className="py-10 overflow-hidden" style={{ background: NAVY2, borderTop: `1px solid ${SURF_BORDER}`, borderBottom: `1px solid ${SURF_BORDER}` }}>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 mb-5">
        <p className="text-center text-xs font-bold tracking-widest uppercase" style={{ color: TEXT2, fontFamily: FONT_SANS, opacity: 0.55 }}>
          Connected & Trusted By India's Leading Financial Institutions
        </p>
      </div>
      <div className="relative overflow-hidden">
        <div className="flex gap-6 whitespace-nowrap" style={{ animation: "marquee-left 35s linear infinite" }}>
          {[...PARTNERS, ...PARTNERS].map((p, i) => (
            <div key={i} className="flex items-center shrink-0 px-5 py-2.5 rounded-xl"
              style={{ background: "#FFFFFF", border: `1px solid ${SURF_BORDER}`, boxShadow: CARD_SHADOW }}>
              <span style={{ fontFamily: FONT_SANS, fontSize: "0.82rem", fontWeight: 600, color: TEXT2 }}>{p}</span>
            </div>
          ))}
        </div>
        <div className="absolute inset-y-0 left-0 w-24 pointer-events-none" style={{ background: `linear-gradient(to right,${NAVY2},transparent)` }} />
        <div className="absolute inset-y-0 right-0 w-24 pointer-events-none" style={{ background: `linear-gradient(to left,${NAVY2},transparent)` }} />
      </div>
    </section>
  );
}

// ─── 3. SERVICES ─────────────────────────────────────────────────────────────

function Services() {
  return (
    <section id="services" className="py-24 lg:py-32" style={{ background: NAVY }}>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <RevealWrapper>
          <div className="flex flex-col gap-3 mb-14">
            <SectionHeader
              pill={<><BarChart3 size={10} /> Core Pillars</>}
              pillColor={G}
              title="Four Verticals."
              titleAccent="One Integrated Advantage."
              accentColor={G}
              desc="Deeply specialised yet fully integrated — our four service verticals work in concert to deliver end-to-end financial solutions."
            />
          </div>
        </RevealWrapper>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <RevealWrapper key={s.title} delay={i * 80}>
                <GradientCard color={s.color} style={{ height: "100%" }}>
                  <Link to={s.href} className="flex flex-col gap-5 p-7 h-full" style={{ textDecoration: "none" }}>
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                        style={{ background: `${s.color}15`, border: `1px solid ${s.color}30` }}>
                        <Icon size={22} color={s.color} />
                      </div>
                      <span style={{ fontFamily: FONT_SERIF, fontSize: "1.8rem", fontWeight: 900, color: `${s.color}15`, lineHeight: 1 }}>
                        {s.num}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2 flex-1">
                      <span className="text-xs font-bold tracking-widest uppercase" style={{ color: s.color, fontFamily: FONT_SANS }}>
                        {s.tag}
                      </span>
                      <h3 style={{ fontFamily: FONT_SERIF, fontSize: "1.15rem", fontWeight: 700, color: TEXT1, lineHeight: 1.3 }}>
                        {s.title}
                      </h3>
                      <p style={{ fontFamily: FONT_SANS, fontSize: "0.83rem", color: TEXT2, lineHeight: 1.7 }}>
                        {s.desc}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm font-semibold mt-auto" style={{ color: s.color, fontFamily: FONT_SANS }}>
                      Learn more <ArrowRight size={13} />
                    </div>
                  </Link>
                </GradientCard>
              </RevealWrapper>
            );
          })}
        </div>
        <RevealWrapper delay={320} className="mt-10 flex justify-center">
          <GlowButton color={G} href="/services" outline size="md">
            View All 16 Services <ArrowRight size={14} />
          </GlowButton>
        </RevealWrapper>
      </div>
    </section>
  );
}

// ─── 4. ABOUT ────────────────────────────────────────────────────────────────

function AboutSection() {
  const { ref, visible } = useScrollReveal();
  const exp     = useCounter(200,  1800, visible);
  const proj    = useCounter(1000, 1600, visible);
  const prof    = useCounter(50,   1400, visible);

  return (
    <section id="about" className="py-24 lg:py-32" style={{ background: NAVY2 }}>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <RevealWrapper>
              <SectionHeader
                pill={<><Users size={10} /> The OMNI Advantage</>}
                pillColor={GOLD}
                title="Led by experts with"
                titleAccent="200+ years"
                accentColor={GOLD}
                desc="OMNI Fincon brings together senior bankers, investment professionals, and sector specialists — backed by deep relationships across PSU banks, private banks, NBFCs, and family offices."
              />
            </RevealWrapper>
            <div ref={ref} className="grid grid-cols-3 gap-6 mt-10">
              {[
                { val: `${exp}+`,  label: "Years Cumulative Leadership", color: G    },
                { val: `${proj}+`, label: "Projects Executed",           color: GOLD },
                { val: `${prof}+`, label: "Dedicated Professionals",     color: BLUE },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <p style={{ fontFamily: FONT_NUM, fontSize: "2.4rem", fontWeight: 800, color: stat.color, lineHeight: 1, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.02em" }}>
                    {stat.val}
                  </p>
                  <p style={{ fontFamily: FONT_SANS, fontSize: "0.7rem", color: TEXT2, lineHeight: 1.5, marginTop: "4px" }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
            <RevealWrapper delay={200} className="mt-8">
              <GlowButton color={GOLD} href="/about" size="md">
                Our Story <ArrowRight size={14} />
              </GlowButton>
            </RevealWrapper>
          </div>
          <div className="flex flex-col gap-4">
            {[
              { label: "Our Mission", icon: Target,  color: G,
                body: "To deliver intelligent, customized financial solutions that empower individuals and businesses to build, protect, and multiply wealth while contributing to long-term economic progress." },
              { label: "Our Vision",  icon: Globe,   color: BLUE,
                body: "To be India's most trusted and agile financial institution, enabling sustainable growth through innovation, insight, and integrity." },
              { label: "Our Team",    icon: Users,   color: GOLD,
                body: "200+ years of cumulative leadership experience across PSU banks, private equity, advisory, and regulatory bodies — with a flawless zero NPA track record." },
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <RevealWrapper key={card.label} delay={i * 100}>
                  <GradientCard color={card.color}>
                    <div className="rounded-2xl p-6 flex gap-5">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: `${card.color}15`, border: `1px solid ${card.color}25` }}>
                        <Icon size={18} color={card.color} />
                      </div>
                      <div>
                        <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: card.color, fontFamily: FONT_SANS }}>
                          {card.label}
                        </p>
                        <p style={{ fontFamily: FONT_SANS, fontSize: "0.87rem", color: TEXT2, lineHeight: 1.75 }}>
                          {card.body}
                        </p>
                      </div>
                    </div>
                  </GradientCard>
                </RevealWrapper>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 5. INVESTMENT BANKING ───────────────────────────────────────────────────

function InvestmentBanking() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden" style={{ background: NAVY }}>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle,${G}07 0%,transparent 70%)`, filter: "blur(56px)" }} />
      <div className="relative max-w-[1320px] mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <RevealWrapper>
            <SectionHeader
              pill={<><TrendingUp size={10} /> Investment Banking</>}
              pillColor={G}
              title="Fund Raising, M&A &"
              titleAccent="Structured Finance."
              accentColor={G}
              desc="Our Investment Banking vertical operates across the full capital structure — senior secured debt, mezzanine, and equity. Transactions from ₹10 Cr to ₹2,000 Cr+ executed across 30+ sectors."
            />
          </RevealWrapper>
          <RevealWrapper delay={200} className="mt-8 flex flex-wrap gap-3">
            <GlowButton color={G} href="/services/investment-banking" size="md">
              Explore IB Services <ArrowRight size={14} />
            </GlowButton>
            <GlowButton color={G} href="/contact" outline size="md">
              Get Consultation
            </GlowButton>
          </RevealWrapper>
          <RevealWrapper delay={260} className="mt-10 flex items-center gap-4">
            <div style={{ width: "32px", height: "2px", background: G, borderRadius: "2px" }} />
            <p style={{ fontFamily: FONT_SANS, fontSize: "0.8rem", color: TEXT2 }}>
              Trusted by 1,000+ projects across India's growth sectors
            </p>
          </RevealWrapper>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {IB_ITEMS.map((item, i) => (
            <RevealWrapper key={item} delay={i * 50}>
              <GradientCard color={G}>
                <div className="flex items-start gap-3 p-4 rounded-xl">
                  <CheckCircle2 size={15} className="mt-0.5 shrink-0" color={G} />
                  <span style={{ fontFamily: FONT_SANS, fontSize: "0.82rem", color: TEXT2, lineHeight: 1.5 }}>
                    {item}
                  </span>
                </div>
              </GradientCard>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 6. INDUSTRIES TICKER — Dark Contrast Section ────────────────────────────

function IndustriesTicker() {
  const rows = [
    { items: [...INDUSTRIES_ROW1, ...INDUSTRIES_ROW1], dir: "left",  dur: "52s" },
    { items: [...INDUSTRIES_ROW2, ...INDUSTRIES_ROW2], dir: "right", dur: "46s" },
  ];
  return (
    <section className="py-20 overflow-hidden" style={{ background: DARK }}>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 mb-10">
        <RevealWrapper>
          <Pill color={GOLD}><Globe size={10} /> 36+ Industries Served</Pill>
          <p className="mt-3" style={{ fontFamily: FONT_SANS, fontSize: "0.88rem", color: "rgba(255,255,255,0.55)" }}>
            Spanning 36+ sectors across India's growth economy — from Real Estate to Renewable Energy.
          </p>
        </RevealWrapper>
      </div>
      <div className="flex flex-col gap-3">
        {rows.map((row, ri) => (
          <div key={ri} className="relative overflow-hidden">
            <div className="flex gap-3 whitespace-nowrap"
              style={{ animation: `marquee-${row.dir} ${row.dur} linear infinite` }}>
              {row.items.map((ind, i) => (
                <span key={i} className="inline-flex items-center px-5 py-2.5 rounded-full text-sm shrink-0"
                  style={{ border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.60)", fontFamily: FONT_SANS, background: "rgba(255,255,255,0.04)", fontSize: "0.78rem" }}>
                  {ind}
                </span>
              ))}
            </div>
            <div className="absolute inset-y-0 left-0 w-28 pointer-events-none" style={{ background: `linear-gradient(to right,${DARK},transparent)` }} />
            <div className="absolute inset-y-0 right-0 w-28 pointer-events-none" style={{ background: `linear-gradient(to left,${DARK},transparent)` }} />
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── 7. SUCCESS STORY ────────────────────────────────────────────────────────

function SuccessStory() {
  return (
    <section id="case-study" className="py-24 lg:py-32" style={{ background: NAVY }}>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <RevealWrapper>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <SectionHeader pill="Case Study" pillColor={G} title="Real Results for" titleAccent="Real Businesses." accentColor={G} />
            <Link to="/insights" className="inline-flex items-center gap-2 text-sm font-semibold shrink-0" style={{ color: G, fontFamily: FONT_SANS, textDecoration: "none" }}>
              View All Case Studies <ArrowUpRight size={15} />
            </Link>
          </div>
        </RevealWrapper>
        <RevealWrapper delay={100}>
          <div className="rounded-3xl overflow-hidden" style={{
            border: `1px solid ${G}22`,
            background: `${G}04`,
            boxShadow: `0 4px 32px ${G}10, ${CARD_SHADOW_LG}`,
          }}>
            <div className="flex items-center gap-3 px-6 lg:px-10 py-4" style={{ borderBottom: `1px solid ${G}12`, background: `${G}05` }}>
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
              </div>
              <span className="text-xs font-mono ml-2" style={{ color: TEXT2 }}>success_story_001.fin — Real Estate Sector</span>
              <span className="ml-auto px-3 py-1 rounded-full text-xs font-bold"
                style={{ background: `${G}15`, color: G, border: `1px solid ${G}30`, fontFamily: FONT_SANS }}>
                ● MANDATE CLOSED
              </span>
            </div>
            <div className="p-8 lg:p-12">
              <div className="grid lg:grid-cols-5 gap-10">
                <div className="lg:col-span-3 flex flex-col gap-5">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: `${G}15`, color: G, border: `1px solid ${G}28`, fontFamily: FONT_SANS }}>Real Estate</span>
                    <span className="text-xs" style={{ color: TEXT2, fontFamily: FONT_SANS }}>Premium Real Estate Developer</span>
                  </div>
                  <h3 style={{ fontFamily: FONT_SERIF, fontSize: "clamp(1.4rem,2.5vw,2rem)", fontWeight: 700, color: TEXT1, lineHeight: 1.25 }}>
                    ₹250 Cr JV Structuring for Mixed-Use Township Development
                  </h3>
                  <p style={{ fontFamily: FONT_SANS, fontSize: "0.9rem", color: TEXT2, lineHeight: 1.85 }}>
                    OMNI Fincon structured a joint venture for a premium real estate developer's mixed-use township development, optimizing the capital structure and creating value for all stakeholders.
                  </p>
                  <p style={{ fontFamily: FONT_SANS, fontSize: "0.9rem", color: TEXT2, lineHeight: 1.85 }}>
                    Key achievements included negotiating a balanced revenue-share model, securing infrastructure debt from two PSU banks, and establishing a clear exit mechanism — all within a 45-day timeline.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {["JV Structuring","Equity Advisory","Debt Syndication","Revenue Share Model"].map(tag=>(
                      <span key={tag} className="px-3 py-1 rounded-full text-xs"
                        style={{ background: `rgba(11,26,46,0.05)`, color: TEXT2, border: `1px solid ${SURF_BORDER}`, fontFamily: FONT_SANS }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <GlowButton color={G} href="/insights" size="md">
                    Read Full Case Study <ArrowRight size={14} />
                  </GlowButton>
                </div>
                <div className="lg:col-span-2 flex flex-col gap-4">
                  {[
                    { label: "Project Value",   value: "₹250 Cr",    icon: Landmark,  color: G    },
                    { label: "Deal Closure",     value: "45 Days",    icon: Clock,     color: GOLD },
                    { label: "Development Area", value: "2.5M sq.ft", icon: Building2, color: BLUE },
                  ].map((m) => {
                    const Icon = m.icon;
                    return (
                      <div key={m.label} className="flex items-center gap-5 rounded-2xl p-5"
                        style={{ background: `${m.color}07`, border: `1px solid ${m.color}18`, boxShadow: CARD_SHADOW }}>
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                          style={{ background: `${m.color}15`, border: `1px solid ${m.color}28` }}>
                          <Icon size={22} color={m.color} />
                        </div>
                        <div>
                          <p style={{ fontFamily: FONT_NUM, fontSize: "1.6rem", fontWeight: 800, color: TEXT1, lineHeight: 1, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.02em" }}>{m.value}</p>
                          <p style={{ fontFamily: FONT_SANS, fontSize: "0.68rem", color: TEXT2, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "4px" }}>{m.label}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}

// ─── 8. TESTIMONIALS ─────────────────────────────────────────────────────────

function Testimonials() {
  return (
    <section className="py-24 lg:py-32" style={{ background: NAVY2 }}>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <RevealWrapper>
          <SectionHeader
            pill={<><Quote size={10} /> Client Stories</>}
            pillColor={G}
            title="What Our Clients"
            titleAccent="Say About Us."
            accentColor={G}
            desc="Don't take our word for it — hear directly from the promoters, business owners, and HNIs who partnered with OMNI Fincon."
          />
        </RevealWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
          {TESTIMONIALS.map((t, i) => (
            <RevealWrapper key={i} delay={i * 100}>
              <GradientCard color={t.color} style={{ height: "100%" }}>
                <div className="flex flex-col gap-5 p-7 h-full rounded-2xl">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${t.color}15`, border: `1px solid ${t.color}25` }}>
                    <Quote size={18} color={t.color} />
                  </div>
                  <StarRating count={t.rating} color={GOLD} />
                  <p style={{ fontFamily: FONT_SANS, fontSize: "0.9rem", color: TEXT2, lineHeight: 1.8, flexGrow: 1, fontStyle: "italic" }}>
                    "{t.quote}"
                  </p>
                  <div className="flex items-center gap-3 pt-4 mt-auto" style={{ borderTop: `1px solid ${SURF_BORDER}` }}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                      style={{ background: `${t.color}18`, border: `1px solid ${t.color}28`, color: t.color, fontFamily: FONT_SANS }}>
                      {t.initials}
                    </div>
                    <div>
                      <p style={{ fontFamily: FONT_SANS, fontSize: "0.85rem", fontWeight: 700, color: TEXT1 }}>{t.name}</p>
                      <p style={{ fontFamily: FONT_SANS, fontSize: "0.72rem", color: TEXT2 }}>{t.title}, {t.company}</p>
                    </div>
                  </div>
                </div>
              </GradientCard>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 9. CHANNEL PARTNER ──────────────────────────────────────────────────────

function ChannelPartner() {
  const [partnerType, setPartnerType] = useState("DSA");
  const [submitted, setSubmitted]     = useState(false);

  return (
    <section id="partner" className="py-24 lg:py-32 relative overflow-hidden" style={{ background: NAVY }}>
      <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle,${GOLD}07 0%,transparent 70%)`, filter: "blur(48px)" }} />
      <div className="relative max-w-[1320px] mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-start">
        <div>
          <RevealWrapper>
            <SectionHeader
              pill={<><Handshake size={10} /> Channel Partner Program</>}
              pillColor={GOLD}
              title="Partner with"
              titleAccent="OMNI Fincon."
              accentColor={GOLD}
              desc="Join India's fastest-growing financial intermediary network. Unlock premium deal flow, competitive commissions, and institutional-grade support as a DSA, Wealth Advisor, or Financial Consultant."
            />
          </RevealWrapper>
          <div className="flex flex-col gap-5 mt-10">
            {BENEFITS.map((b, i) => {
              const Icon = b.icon;
              return (
                <RevealWrapper key={b.title} delay={i * 80}>
                  <div className="flex items-start gap-5">
                    <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
                      style={{ background: `${GOLD}12`, border: `1px solid ${GOLD}22` }}>
                      <Icon size={18} color={GOLD} />
                    </div>
                    <div>
                      <p style={{ fontFamily: FONT_SANS, fontSize: "0.92rem", fontWeight: 600, color: TEXT1 }}>{b.title}</p>
                      <p style={{ fontFamily: FONT_SANS, fontSize: "0.82rem", color: TEXT2, marginTop: "3px", lineHeight: 1.65 }}>{b.desc}</p>
                    </div>
                  </div>
                </RevealWrapper>
              );
            })}
          </div>
        </div>
        <RevealWrapper delay={200}>
          <div className="rounded-3xl p-8 lg:p-10"
            style={{ background: "#FFFFFF", border: `1px solid ${SURF_BORDER}`, boxShadow: CARD_SHADOW_LG }}>
            {submitted ? (
              <div className="flex flex-col items-center justify-center gap-5 py-12 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: `${G}15`, border: `1px solid ${G}30` }}>
                  <CheckCircle2 size={32} color={G} />
                </div>
                <h3 style={{ fontFamily: FONT_SERIF, fontSize: "1.5rem", fontWeight: 700, color: TEXT1 }}>Application Submitted!</h3>
                <p style={{ fontFamily: FONT_SANS, fontSize: "0.9rem", color: TEXT2 }}>Our partnership team will contact you within 48 business hours.</p>
              </div>
            ) : (
              <>
                <h3 className="mb-1" style={{ fontFamily: FONT_SERIF, fontSize: "1.45rem", fontWeight: 700, color: TEXT1 }}>Apply as Channel Partner</h3>
                <p className="mb-7" style={{ fontFamily: FONT_SANS, fontSize: "0.82rem", color: TEXT2 }}>Complete the form — we respond within 2 business days.</p>
                <form className="flex flex-col gap-5" onSubmit={e => { e.preventDefault(); setSubmitted(true); }}>
                  {[
                    { label: "Full Name *",     type: "text",  id: "cp-name"  },
                    { label: "Email Address *", type: "email", id: "cp-email" },
                    { label: "Phone Number *",  type: "tel",   id: "cp-phone" },
                  ].map(f => (
                    <div key={f.label}>
                      <label htmlFor={f.id} className="block text-xs mb-1.5 font-medium" style={{ fontFamily: FONT_SANS, color: TEXT2 }}>{f.label}</label>
                      <input id={f.id} required type={f.type} className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                        style={{ background: "#F4F7FD", border: `1px solid ${SURF_BORDER}`, color: TEXT1, fontFamily: FONT_SANS }}
                        onFocus={e=>(e.target.style.border=`1px solid ${GOLD}50`)}
                        onBlur={e=>(e.target.style.border=`1px solid ${SURF_BORDER}`)} />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs mb-2 font-medium" style={{ fontFamily: FONT_SANS, color: TEXT2 }}>Partner Type *</label>
                    <div className="grid grid-cols-2 gap-2">
                      {["DSA","Wealth Advisor","Financial Consultant","Other"].map(t=>(
                        <button key={t} type="button" onClick={()=>setPartnerType(t)}
                          className="px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-all"
                          style={{
                            background: partnerType===t ? `${GOLD}12` : "#F4F7FD",
                            border: partnerType===t ? `1px solid ${GOLD}45` : `1px solid ${SURF_BORDER}`,
                            color: partnerType===t ? GOLD : TEXT2, fontFamily: FONT_SANS,
                          }}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="cp-experience" className="block text-xs mb-1.5 font-medium" style={{ fontFamily: FONT_SANS, color: TEXT2 }}>Your Experience (optional)</label>
                    <textarea id="cp-experience" rows={3} className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all resize-none"
                      style={{ background: "#F4F7FD", border: `1px solid ${SURF_BORDER}`, color: TEXT1, fontFamily: FONT_SANS }}
                      onFocus={e=>(e.target.style.border=`1px solid ${GOLD}50`)}
                      onBlur={e=>(e.target.style.border=`1px solid ${SURF_BORDER}`)} />
                  </div>
                  <GlowButton color={GOLD} bg={GOLD} type="submit" fullWidth size="md">
                    Submit Application <ArrowRight size={14} />
                  </GlowButton>
                </form>
              </>
            )}
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}

// ─── 10. PARTNERS ─────────────────────────────────────────────────────────────

function PartnersSection() {
  return (
    <section className="py-20" style={{ background: NAVY2 }}>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <RevealWrapper>
          <p className="text-center mb-2 text-xs font-bold tracking-widest uppercase" style={{ color: TEXT2, fontFamily: FONT_SANS }}>Our Valued Lending Partners</p>
          <p className="text-center mb-12 text-xs tracking-wider" style={{ color: TEXT2, fontFamily: FONT_SANS, opacity: 0.55 }}>Trusted by India's leading financial institutions</p>
        </RevealWrapper>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {PARTNERS.map((p, i) => (
            <RevealWrapper key={p} delay={i * 40}>
              <GradientCard color={G}>
                <div className="flex items-center justify-center px-4 py-5 rounded-2xl text-center">
                  <span style={{ fontFamily: FONT_SANS, fontSize: "0.78rem", fontWeight: 600, color: TEXT2 }}>{p}</span>
                </div>
              </GradientCard>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 11. INSIGHTS ─────────────────────────────────────────────────────────────

function InsightsSection() {
  return (
    <section id="insights" className="py-24 lg:py-32" style={{ background: NAVY }}>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <RevealWrapper>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <SectionHeader
              pill="Perspectives"
              pillColor={G}
              title="Insights &"
              titleAccent="Perspectives."
              accentColor={G}
              desc="Expert analysis on markets, sectors, and investment trends from OMNI's advisory team."
            />
            <Link to="/insights" className="inline-flex items-center gap-2 text-sm font-semibold shrink-0 transition-all hover:gap-3"
              style={{ color: G, fontFamily: FONT_SANS, textDecoration: "none" }}>
              View All Insights <ArrowUpRight size={14} />
            </Link>
          </div>
        </RevealWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INSIGHTS.map((article, i) => (
            <RevealWrapper key={i} delay={i * 80}>
              <GradientCard color={article.color} style={{ height: "100%" }}>
                <article className="flex flex-col rounded-2xl overflow-hidden h-full cursor-pointer">
                  <div style={{ height: "3px", background: `linear-gradient(to right,${article.color},${article.color}40)` }} />
                  <div className="px-7 py-6 flex flex-col gap-5 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full text-xs font-bold"
                        style={{ background: `${article.color}15`, color: article.color, border: `1px solid ${article.color}28`, fontFamily: FONT_SANS }}>
                        {article.category}
                      </span>
                      <div className="flex items-center gap-3 text-xs" style={{ color: TEXT2, fontFamily: FONT_SANS }}>
                        <span>{article.date}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1"><Clock size={11} /> {article.time}</span>
                      </div>
                    </div>
                    <div style={{ height: "1px", background: SURF_BORDER }} />
                    <h3 style={{ fontFamily: FONT_SERIF, fontSize: "1.1rem", fontWeight: 700, color: TEXT1, lineHeight: 1.38 }}>
                      {article.title}
                    </h3>
                    <p style={{ fontFamily: FONT_SANS, fontSize: "0.83rem", color: TEXT2, lineHeight: 1.75, flexGrow: 1 }}>
                      {article.desc}
                    </p>
                    <Link to="/insights" className="inline-flex items-center gap-1.5 text-xs font-bold transition-all hover:gap-3"
                      style={{ color: article.color, fontFamily: FONT_SANS, textDecoration: "none" }}>
                      Read More <ArrowRight size={12} />
                    </Link>
                  </div>
                </article>
              </GradientCard>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 12. CTA BANNER ── Green gradient section ─────────────────────────────────

function CTABanner() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: GREEN_GRAD }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />
      <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(255,255,255,0.12) 0%,transparent 70%)", filter: "blur(64px)" }} />
      <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center relative">
        <RevealWrapper>
          <div className="mb-4">
            <span className="inline-flex items-center gap-2 rounded-full font-semibold tracking-widest uppercase text-xs"
              style={{ padding: "5px 13px", background: "rgba(255,255,255,0.18)", color: "#FFFFFF", border: "1px solid rgba(255,255,255,0.30)", fontFamily: FONT_SANS, letterSpacing: "0.18em" }}>
              <Sparkles size={10} /> Ready to Grow?
            </span>
          </div>
          <h2 className="mt-4 mb-5" style={{ fontFamily: FONT_SERIF, fontSize: "clamp(1.8rem,3.5vw,3rem)", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.12 }}>
            Let's Empower Your <span style={{ fontStyle: "italic", color: "rgba(255,255,255,0.88)" }}>Financial Growth</span> Together.
          </h2>
          <p className="mb-8 mx-auto" style={{ fontFamily: FONT_SANS, fontSize: "0.95rem", color: "rgba(255,255,255,0.80)", lineHeight: 1.75, maxWidth: "520px" }}>
            Whether you're raising capital, managing wealth, or entering a new venture — our team is ready to partner with you on every step of the journey.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/contact"
              className="inline-flex items-center gap-2 font-bold text-sm rounded-full transition-all"
              style={{ padding: "14px 32px", background: "#FFFFFF", color: G, fontFamily: FONT_SANS, textDecoration: "none", boxShadow: "0 4px 24px rgba(0,0,0,0.15)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(0,0,0,0.20)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.15)"; }}>
              Get in Touch <ArrowRight size={15} />
            </Link>
            <a href="tel:+919500063064"
              className="inline-flex items-center gap-2.5 rounded-full font-semibold text-sm transition-all"
              style={{ padding: "14px 28px", border: "1.5px solid rgba(255,255,255,0.45)", color: "#FFFFFF", fontFamily: FONT_SANS, background: "rgba(255,255,255,0.12)", fontSize: "0.84rem" }}
              onMouseEnter={e=>(e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.22)"}
              onMouseLeave={e=>(e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.12)"}>
              <Phone size={15} /> +91 95000 63064
            </a>
          </div>
          <div className="flex items-center justify-center gap-6 mt-10 flex-wrap">
            {["₹20,000+ Cr Financed","1,000+ Projects Executed","30+ Sectors","Zero NPA Record"].map(t=>(
              <div key={t} className="flex items-center gap-2" style={{ fontFamily: FONT_SANS, fontSize: "0.78rem", color: "rgba(255,255,255,0.75)" }}>
                <Zap size={12} color="rgba(255,255,255,0.9)" /> {t}
              </div>
            ))}
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}

// ─── 13. FLOATING BUTTONS ─────────────────────────────────────────────────────

function FloatingButtons() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const h = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end"
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.3s ease", pointerEvents: visible ? "auto" : "none" }}>
      <a
        href="https://wa.me/919500063064?text=Hello%20OMNI%20Fincon%2C%20I%20would%20like%20to%20enquire%20about%20your%20financial%20advisory%20services."
        target="_blank" rel="noopener noreferrer"
        aria-label="Chat with OMNI Fincon on WhatsApp"
        className="flex items-center gap-2 px-4 py-3 rounded-full font-semibold text-sm transition-all hover:scale-105 active:scale-95"
        style={{ background: "#25D366", color: "#FFF", fontFamily: FONT_SANS, boxShadow: "0 4px 20px rgba(37,211,102,0.4)" }}>
        <MessageCircle size={16} aria-hidden="true" />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
      <a href="tel:+919500063064"
        aria-label="Call OMNI Fincon at +91 95000 63064"
        className="flex items-center gap-2 px-4 py-3 rounded-full font-semibold text-sm transition-all hover:scale-105 active:scale-95"
        style={{ background: G, color: "#FFF", fontFamily: FONT_SANS, boxShadow: `0 4px 20px ${G}40` }}>
        <Phone size={16} aria-hidden="true" />
        <span className="hidden sm:inline">Call Us</span>
      </a>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Services />
      <AboutSection />
      <InvestmentBanking />
      <IndustriesTicker />
      <SuccessStory />
      <Testimonials />
      <ChannelPartner />
      <PartnersSection />
      <InsightsSection />
      <CTABanner />
      <FloatingButtons />
    </>
  );
}
