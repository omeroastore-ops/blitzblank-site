import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wipeRef = useRef<HTMLDivElement>(null);
  const gunRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        // Pin hero for scrolling experience
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=200%",
            pin: true,
            scrub: 1.2,
          }
        });

        // Wipe reveal (cleaning effect) - clip path animates from left to right
        tl.fromTo(wipeRef.current, {
          clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
        }, {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          ease: "none",
          duration: 3
        }, 0.5);

        // Spray gun moves with wipe
        tl.fromTo(gunRef.current, {
          x: "-8vw",
          opacity: 0,
        }, {
          x: "98vw",
          opacity: 1,
          ease: "none",
          duration: 3
        }, 0.5);

      }, containerRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
      data-testid="hero-section"
    >
      {/* DIRTY BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2000&auto=format&fit=crop"
          alt=""
          className="w-full h-full object-cover scale-110"
          loading="eager"
        />
        {/* Dark dirty overlay */}
        <div className="absolute inset-0 bg-background/70" />
        {/* Grime texture - subtle radial dark spots */}
        <div className="absolute inset-0 opacity-50 bg-[radial-gradient(ellipse_at_20%_20%,_transparent_0%,_rgba(0,0,0,0.5)_100%)]" />
        <div className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 60%, rgba(0,0,0,0.6) 0%, transparent 50%),
                              radial-gradient(circle at 70% 30%, rgba(0,0,0,0.4) 0%, transparent 40%),
                              radial-gradient(circle at 80% 80%, rgba(0,0,0,0.5) 0%, transparent 50%)`
          }}
        />
      </div>

      {/* CLEAN BACKGROUND LAYER (revealed by wipe) */}
      <div
        ref={wipeRef}
        className="absolute inset-0 z-10"
        style={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
      >
        <img
          src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2000&auto=format&fit=crop"
          alt=""
          className="w-full h-full object-cover scale-110"
          style={{ filter: "brightness(1.3) contrast(1.1) saturate(1.2)" }}
          loading="eager"
        />
        {/* Subtle cyan tint on clean surface */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-transparent" />
        {/* Shine effect on the clean surface */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.07) 50%, transparent 65%)"
          }}
        />
      </div>

      {/* SPRAY GUN ELEMENT */}
      <div
        ref={gunRef}
        className="absolute top-1/2 -translate-y-1/2 z-20 pointer-events-none"
        style={{ opacity: 0 }}
      >
        {/* Squeegee/pressure line */}
        <div className="relative flex items-center">
          {/* Water particles (spray droplets) */}
          <div className="absolute right-full mr-0 top-1/2 -translate-y-1/2 flex flex-col gap-1 items-end pr-1">
            <div className="w-1.5 h-1.5 rounded-full bg-primary/70 blur-[1px]" style={{ transform: "translate(6px, -8px)" }} />
            <div className="w-2.5 h-2.5 rounded-full bg-white/60 blur-[1px]" style={{ transform: "translate(12px, -4px)" }} />
            <div className="w-1 h-1 rounded-full bg-primary/50 blur-[1px]" style={{ transform: "translate(4px, 4px)" }} />
            <div className="w-2 h-2 rounded-full bg-white/40 blur-[2px]" style={{ transform: "translate(10px, 8px)" }} />
            <div className="w-1.5 h-1.5 rounded-full bg-primary/60 blur-[1px]" style={{ transform: "translate(8px, 12px)" }} />
          </div>

          {/* Vertical squeegee line */}
          <div className="h-[70vh] w-[3px] bg-gradient-to-b from-transparent via-primary to-transparent shadow-[0_0_15px_rgba(0,255,255,0.9),0_0_30px_rgba(0,255,255,0.5)]" />
        </div>
      </div>

      {/* HERO CONTENT */}
      <div className="relative z-30 flex flex-col items-center justify-center h-full px-6 text-center pt-20">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-6">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-primary font-semibold tracking-[0.2em] text-xs uppercase">
              Professionelle Reinigung mit Präzision
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.05]" data-testid="hero-headline">
            Glas- & Gebäudereinigung<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[hsl(185_100%_60%)] to-primary">
              auf einem neuen Niveau
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-white/60 font-light max-w-2xl mt-2 leading-relaxed">
            Streifenfrei. Zuverlässig. Eindrucksvoll sauber – für Privatkunden und Unternehmen.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Button
              size="lg"
              className="relative overflow-hidden bg-primary text-primary-foreground hover:bg-primary/90 text-base font-bold px-8 h-14 rounded-full shadow-[0_0_30px_hsl(185_100%_45%/0.4)] group"
              asChild
              data-testid="hero-cta-primary"
            >
              <a href="#kontakt">
                <span className="relative z-10">Kostenloses Angebot anfordern</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 hover:border-white/40 text-base font-medium px-8 h-14 rounded-full backdrop-blur-sm"
              asChild
              data-testid="hero-cta-secondary"
            >
              <a href="#leistungen">Unsere Leistungen ansehen</a>
            </Button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="absolute bottom-16 left-0 w-full px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 border-t border-white/10 pt-8">
              {[
                { value: "4,9", unit: "★", label: "Google Bewertung" },
                { value: "100+", label: "Zufriedene Kunden" },
                { value: "7+", unit: "J.", label: "Erfahrung" },
                { value: "Privat", unit: " & Gewerbe", label: "Für alle" },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center gap-0.5" data-testid={`hero-stat-${i}`}>
                  <span className="text-xl md:text-2xl font-black text-white">
                    {stat.value}
                    {stat.unit && <span className="text-primary">{stat.unit}</span>}
                  </span>
                  <span className="text-xs text-white/40 uppercase tracking-widest">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/30 animate-bounce">
          <ChevronDown className="w-5 h-5" />
        </div>
      </div>
    </section>
  );
}
