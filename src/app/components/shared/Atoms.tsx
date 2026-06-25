import { useEffect, useRef, useState } from "react";
import { G, GOLD, DARK, TEXT1, TEXT2, FONT_SANS, FONT_SERIF, SURF_BORDER, CARD_SHADOW, CARD_SHADOW_LG } from "../../../lib/tokens";

// ─── useScrollReveal ─────────────────────────────────────────────────────────
export function useScrollReveal(threshold = 0.1) {
  const ref  = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ─── useCounter ──────────────────────────────────────────────────────────────
export function useCounter(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf: number;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return count;
}

// ─── RevealWrapper ───────────────────────────────────────────────────────────
export function RevealWrapper({
  children, delay = 0, className = "", y = 24,
}: {
  children: React.ReactNode; delay?: number; className?: string; y?: number;
}) {
  const { ref, visible } = useScrollReveal();
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : `translateY(${y}px)`,
      transition: `opacity 0.65s cubic-bezier(.22,1,.36,1) ${delay}ms, transform 0.65s cubic-bezier(.22,1,.36,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

// ─── Pill / Tag ──────────────────────────────────────────────────────────────
export function Pill({
  children, color = G, size = "sm",
}: {
  children: React.ReactNode; color?: string; size?: "sm" | "md";
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full font-semibold tracking-widest uppercase" style={{
      padding: size === "md" ? "6px 16px" : "5px 13px",
      fontSize: size === "md" ? "0.72rem" : "0.65rem",
      background: `${color}12`,
      color,
      border: `1px solid ${color}28`,
      fontFamily: FONT_SANS,
      letterSpacing: "0.18em",
    }}>
      {children}
    </span>
  );
}

// ─── SectionHeader ───────────────────────────────────────────────────────────
export function SectionHeader({
  pill, pillColor = G, title, titleAccent, accentColor = G, desc, center = false, titleSize = "default",
}: {
  pill?: React.ReactNode; pillColor?: string; title: string; titleAccent?: string;
  accentColor?: string; desc?: string; center?: boolean; titleSize?: "default" | "lg";
}) {
  const fs = titleSize === "lg" ? "clamp(2.6rem,4.5vw,4rem)" : "clamp(2rem,3.5vw,3.2rem)";
  return (
    <div className={`flex flex-col gap-3 ${center ? "items-center text-center" : ""}`}>
      {pill && <Pill color={pillColor}>{pill}</Pill>}
      <h2 style={{ fontFamily: FONT_SERIF, fontSize: fs, fontWeight: 700, color: TEXT1, lineHeight: 1.1, letterSpacing: "-0.015em" }}>
        {title}{" "}
        {titleAccent && <span style={{ color: accentColor, fontStyle: "italic" }}>{titleAccent}</span>}
      </h2>
      {desc && (
        <p style={{ fontFamily: FONT_SANS, fontSize: "0.95rem", color: TEXT2, lineHeight: 1.75, maxWidth: "560px" }}>
          {desc}
        </p>
      )}
    </div>
  );
}

// ─── GlowButton ──────────────────────────────────────────────────────────────
export function GlowButton({
  children, color = G, bg, onClick, href, outline = false, size = "md", fullWidth = false, type = "button",
}: {
  children: React.ReactNode; color?: string; bg?: string; onClick?: () => void;
  href?: string; outline?: boolean; size?: "sm" | "md" | "lg"; fullWidth?: boolean; type?: "button" | "submit";
}) {
  const padding = size === "lg" ? "14px 32px" : size === "sm" ? "8px 20px" : "11px 26px";
  const fontSize = size === "lg" ? "0.92rem" : size === "sm" ? "0.78rem" : "0.84rem";

  const base: React.CSSProperties = {
    display: "inline-flex", alignItems: "center", gap: "8px", padding,
    borderRadius: "100px", fontFamily: FONT_SANS, fontSize, fontWeight: 700,
    letterSpacing: "0.06em", cursor: "pointer", position: "relative",
    overflow: "hidden", transition: "transform 0.2s ease, box-shadow 0.2s ease",
    width: fullWidth ? "100%" : undefined,
    justifyContent: fullWidth ? "center" : undefined,
    textDecoration: "none",
  };

  const primaryStyle: React.CSSProperties = {
    ...base, border: "none",
    background: bg ?? color,
    color: "#FFFFFF",
    boxShadow: `0 4px 20px ${color}35, 0 1px 3px ${color}20`,
  };

  const outlineStyle: React.CSSProperties = {
    ...base,
    background: "transparent",
    color: color,
    border: `1.5px solid ${color}`,
  };

  const style = outline ? outlineStyle : primaryStyle;

  const inner = (
    <>
      <span style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: "8px" }}>
        {children}
      </span>
      {!outline && (
        <span style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.22) 50%,transparent 100%)",
          animation: "btn-shimmer 2.8s infinite", zIndex: 0,
        }} />
      )}
    </>
  );

  const hoverProps = {
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
      (e.currentTarget as HTMLElement).style.transform = "translateY(-2px) scale(1.02)";
      if (!outline) (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px ${color}45, 0 2px 6px ${color}25`;
    },
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
      (e.currentTarget as HTMLElement).style.transform = "translateY(0) scale(1)";
      if (!outline) (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px ${color}35, 0 1px 3px ${color}20`;
    },
  };

  if (href) return <a href={href} style={style} {...hoverProps}>{inner}</a>;
  return <button type={type} style={style} onClick={onClick} {...hoverProps}>{inner}</button>;
}

// ─── GradientCard — Light Theme ───────────────────────────────────────────────
export function GradientCard({
  children, color, className = "", style: extraStyle = {}, onClick,
}: {
  children: React.ReactNode; color?: string; className?: string;
  style?: React.CSSProperties; onClick?: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={className} onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered && color ? `${color}06` : "#FFFFFF",
        border: hovered && color ? `1px solid ${color}35` : `1px solid ${SURF_BORDER}`,
        borderRadius: "16px",
        boxShadow: hovered ? CARD_SHADOW_LG : CARD_SHADOW,
        transition: "all 0.3s cubic-bezier(.22,1,.36,1)",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        ...extraStyle,
      }}
    >
      {children}
    </div>
  );
}

// ─── SectionDivider ──────────────────────────────────────────────────────────
export function SectionDivider() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 lg:px-10 py-1">
      <div style={{ height: "1px", background: "linear-gradient(to right,transparent,rgba(11,26,46,0.08),transparent)" }} />
    </div>
  );
}

// ─── StarRating ──────────────────────────────────────────────────────────────
export function StarRating({ count = 5, color = GOLD }: { count?: number; color?: string }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={color}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

// ─── GlobalStyles ─────────────────────────────────────────────────────────────
export function GlobalStyles() {
  return (
    <style>{`
      @keyframes btn-shimmer {
        0%   { transform: translateX(-200%); }
        100% { transform: translateX(200%);  }
      }
      @keyframes marquee-left  { from { transform:translateX(0);    } to { transform:translateX(-50%); } }
      @keyframes marquee-right { from { transform:translateX(-50%); } to { transform:translateX(0);    } }
      @keyframes float-orb     { 0%,100%{transform:translateY(0) scale(1);} 50%{transform:translateY(-14px) scale(1.04);} }
      @keyframes pulse-ring    { 0%{transform:scale(.95);opacity:.7} 70%{transform:scale(1.1);opacity:0} 100%{transform:scale(1.1);opacity:0} }
      @keyframes spin-slow     { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      @keyframes fade-slide-up { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
      @keyframes ticker        { from{transform:translateX(0)} to{transform:translateX(-50%)} }

      html { scroll-behavior: smooth; }

      ::-webkit-scrollbar { width: 5px; }
      ::-webkit-scrollbar-track { background: #F4F7FD; }
      ::-webkit-scrollbar-thumb { background: #CBD5DF; border-radius: 3px; }
      ::-webkit-scrollbar-thumb:hover { background: #00915A50; }

      ::selection { background: #00915A20; color: #0B1A2E; }

      input::placeholder, textarea::placeholder {
        color: #8BA2BA;
        font-family: 'Inter', sans-serif;
      }

      * { box-sizing: border-box; }
    `}</style>
  );
}

// ─── PageHero — Light Theme ────────────────────────────────────────────────────
export function PageHero({
  pill, pillColor = G, title, titleAccent, accentColor = G, desc, children,
}: {
  pill?: string; pillColor?: string; title: string; titleAccent?: string;
  accentColor?: string; desc?: string; children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden" style={{ background: "#F4F7FD", paddingTop: "calc(100px + 36px)", paddingBottom: "80px" }}>
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `radial-gradient(ellipse 55% 55% at 50% 0%,${accentColor}0c 0%,transparent 65%)`,
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(11,26,46,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(11,26,46,0.022) 1px,transparent 1px)`,
        backgroundSize: "64px 64px",
        maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%,black 0%,transparent 100%)",
      }} />
      {/* Accent line at top */}
      <div className="absolute top-0 inset-x-0 h-0.5" style={{ background: `linear-gradient(to right,transparent,${accentColor}50,transparent)` }} />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-10 text-center">
        {pill && <div className="mb-5"><Pill color={pillColor}>{pill}</Pill></div>}
        <h1 style={{
          fontFamily: FONT_SERIF,
          fontSize: "clamp(2.4rem,5vw,4rem)",
          fontWeight: 700, color: TEXT1, lineHeight: 1.1, letterSpacing: "-0.02em",
        }}>
          {title}{" "}
          {titleAccent && <span style={{ color: accentColor, fontStyle: "italic" }}>{titleAccent}</span>}
        </h1>
        {desc && (
          <p className="mt-5 mx-auto" style={{
            fontFamily: FONT_SANS, fontSize: "1.05rem", color: TEXT2, lineHeight: 1.8, maxWidth: "620px",
          }}>
            {desc}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
