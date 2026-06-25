import { G, NAVY, NAVY2, TEXT1, TEXT2, FONT_SANS, FONT_SERIF } from "../../../lib/tokens";
import { GlowButton } from "../../components/shared/Atoms";
import { ArrowLeft } from "lucide-react";

export interface LegalSection {
  heading: string;
  body: string | string[];
}

interface Props {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
}

export default function LegalPage({ title, lastUpdated, intro, sections }: Props) {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-12 relative overflow-hidden" style={{ background: NAVY2 }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 50% 60% at 50% 0%,${G}09 0%,transparent 70%)` }} />
        <div className="max-w-4xl mx-auto px-6 relative">
          <a href="/" className="inline-flex items-center gap-2 mb-6 text-xs font-medium transition-all hover:opacity-80"
            style={{ color: G, fontFamily: FONT_SANS }}>
            <ArrowLeft size={13} /> Back to OMNI Fincon
          </a>
          <h1 style={{ fontFamily: FONT_SERIF, fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, color: TEXT1, lineHeight: 1.1, marginBottom: "12px" }}>
            {title}
          </h1>
          <p style={{ fontFamily: FONT_SANS, fontSize: "0.82rem", color: TEXT2 }}>
            Last updated: {lastUpdated}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16" style={{ background: NAVY }}>
        <div className="max-w-4xl mx-auto px-6">
          {/* Intro */}
          <p className="mb-10 text-base leading-loose" style={{ fontFamily: FONT_SANS, color: TEXT2, lineHeight: 1.9, borderLeft: `3px solid ${G}`, paddingLeft: "20px" }}>
            {intro}
          </p>

          {sections.map((sec, i) => (
            <div key={i} className="mb-10">
              <h2 className="mb-4" style={{ fontFamily: FONT_SERIF, fontSize: "1.25rem", fontWeight: 700, color: TEXT1 }}>
                <span style={{ color: G, marginRight: "10px" }}>{String(i+1).padStart(2,"0")}.</span>
                {sec.heading}
              </h2>
              {Array.isArray(sec.body)
                ? (
                  <ul className="flex flex-col gap-2.5">
                    {(sec.body as string[]).map((item, j) => (
                      <li key={j} className="flex items-start gap-3"
                        style={{ fontFamily: FONT_SANS, fontSize: "0.88rem", color: TEXT2, lineHeight: 1.8 }}>
                        <span style={{ color: G, marginTop: "8px", flexShrink: 0, fontSize: "6px" }}>●</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )
                : <p style={{ fontFamily: FONT_SANS, fontSize: "0.88rem", color: TEXT2, lineHeight: 1.9 }}>{sec.body as string}</p>
              }
              {i < sections.length - 1 && (
                <div className="mt-10" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }} />
              )}
            </div>
          ))}

          {/* Footer CTA */}
          <div className="mt-14 pt-10" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            <p style={{ fontFamily: FONT_SANS, fontSize: "0.85rem", color: TEXT2, marginBottom: "16px" }}>
              Questions about this policy? Contact our compliance team.
            </p>
            <GlowButton color={G} href="/contact" size="md">
              Contact Compliance Team <ArrowLeft size={13} style={{ transform: "rotate(180deg)" }} />
            </GlowButton>
          </div>
        </div>
      </section>
    </>
  );
}
