import { ArrowRight, Home } from "lucide-react";
import { G, NAVY, TEXT1, TEXT2, FONT_SANS, FONT_SERIF } from "../../lib/tokens";
import { GlowButton } from "../components/shared/Atoms";

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center" style={{ background: NAVY }}>
      <div className="relative mb-8">
        <p style={{ fontFamily: FONT_SERIF, fontSize: "clamp(6rem,15vw,12rem)", fontWeight: 900, color: `${G}12`, lineHeight: 1 }}>404</p>
        <p className="absolute inset-0 flex items-center justify-center"
          style={{ fontFamily: FONT_SERIF, fontSize: "clamp(1.2rem,3vw,2rem)", fontWeight: 700, color: TEXT1 }}>
          Page Not Found
        </p>
      </div>
      <p className="max-w-md mb-10" style={{ fontFamily: FONT_SANS, fontSize: "0.95rem", color: TEXT2, lineHeight: 1.75 }}>
        The page you're looking for doesn't exist or has been moved. Head back to our homepage or explore our services.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <GlowButton color={G} href="/" size="lg"><Home size={16} /> Go Home</GlowButton>
        <GlowButton color={G} href="/contact" outline size="lg">Contact Us <ArrowRight size={14} /></GlowButton>
      </div>
    </section>
  );
}
