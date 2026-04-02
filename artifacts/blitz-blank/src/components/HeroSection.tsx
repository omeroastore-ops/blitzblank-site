import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wipeRef = useRef<HTMLDivElement>(null);
  const gunRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const dirtyOverlayRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        // Initial entrance: text cascades in on page load
        const entrance = gsap.timeline({ defaults: { ease: "power3.out" } });
        entrance
          .from(eyebrowRef.current, { opacity: 0, y: 18, duration: 0.7 }, 0.2)
          .from(h1Ref.current, { opacity: 0, y: 28, duration: 0.85 }, 0.45)
          .from(subRef.current, { opacity: 0, y: 18, duration: 0.7 }, 0.7)
          .from(ctaRef.current, { opacity: 0, y: 16, duration: 0.6 }, 0.9)
          .from(statsRef.current, { opacity: 0, y: 12, duration: 0.6 }, 1.05);

        // Scroll-driven cleaning scene — pinned for 250vh
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=250%",
            pin: true,
            scrub: 1.5,
            anticipatePin: 1,
          },
        });

        // Phase 1 (0→0.3): dirty overlay fades slightly, gun appears
        tl.to(dirtyOverlayRef.current, { opacity: 0.2, duration: 0.3 }, 0)
          .fromTo(
            gunRef.current,
            { x: "-12vw", opacity: 0, rotate: 8 },
            { x: "0vw", opacity: 1, rotate: 3, duration: 0.3, ease: "power2.out" },
            0
          );

        // Phase 2 (0.3→0.85): wipe sweeps left→right, gun tracks it, dirt clears
        tl.to(
          wipeRef.current,
          {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            duration: 0.55,
            ease: "none",
          },
          0.3
        )
          .to(
            gunRef.current,
            { x: "100vw", rotate: -3, duration: 0.55, ease: "none" },
            0.3
          )
          .to(dirtyOverlayRef.current, { opacity: 0, duration: 0.3 }, 0.55);

        // Phase 3 (0.85→1): shine sweep, gun exits
        tl.fromTo(
          shineRef.current,
          { x: "-120%" },
          { x: "200%", duration: 0.15, ease: "power1.inOut" },
          0.85
        ).to(gunRef.current, { opacity: 0, duration: 0.1 }, 0.9);
      }, containerRef);

      return () => ctx.revert();
    });

    // Reduced motion: just a simple fade
    mm.add("(prefers-reduced-motion: reduce)", () => {
      const ctx = gsap.context(() => {
        gsap.from([eyebrowRef.current, h1Ref.current, subRef.current, ctaRef.current, statsRef.current], {
          opacity: 0, duration: 1, stagger: 0.15, ease: "power2.out",
        });
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
      {/* ── DIRTY BACKGROUND ── */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2000&auto=format&fit=crop"
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        {/* Dark base overlay */}
        <div className="absolute inset-0 bg-[hsl(220_15%_8%/0.72)]" />
      </div>

      {/* ── DIRTY GRIME LAYER (fades out on scroll) ── */}
      <div
        ref={dirtyOverlayRef}
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 45% at 20% 30%, rgba(0,0,0,0.55) 0%, transparent 80%),
            radial-gradient(ellipse 50% 60% at 75% 70%, rgba(0,0,0,0.45) 0%, transparent 75%),
            radial-gradient(ellipse 40% 30% at 50% 50%, rgba(20,15,5,0.35) 0%, transparent 70%)
          `,
        }}
      />

      {/* ── CLEAN LAYER revealed by wipe ── */}
      <div
        ref={wipeRef}
        className="absolute inset-0 z-[2]"
        style={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
      >
        <img
          src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2000&auto=format&fit=crop"
          alt=""
          className="w-full h-full object-cover"
          style={{ filter: "brightness(1.35) contrast(1.08) saturate(1.18)" }}
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
      </div>

      {/* ── SHINE SWEEP (plays after wipe) ── */}
      <div
        ref={shineRef}
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{
          background: "linear-gradient(100deg, transparent 30%, rgba(255,255,255,0.13) 50%, transparent 70%)",
          transform: "translateX(-120%)",
        }}
      />

      {/* ── SQUEEGEE GUN ── */}
      <div
        ref={gunRef}
        className="absolute top-1/2 -translate-y-1/2 z-[4] pointer-events-none"
        style={{ opacity: 0, left: 0 }}
      >
        {/* Water droplets spraying to the right */}
        <div className="absolute right-full top-1/2 -translate-y-1/2 flex flex-col items-end gap-[5px] pr-2">
          {[
            { size: "w-2 h-2", xOff: 10, yOff: -14, opacity: 0.75, blur: 0 },
            { size: "w-3 h-3", xOff: 18, yOff: -6, opacity: 0.6, blur: 1 },
            { size: "w-1.5 h-1.5", xOff: 6, yOff: 3, opacity: 0.55, blur: 0 },
            { size: "w-2.5 h-2.5", xOff: 14, yOff: 10, opacity: 0.5, blur: 1 },
            { size: "w-1 h-1", xOff: 4, yOff: 18, opacity: 0.65, blur: 0 },
          ].map((d, i) => (
            <span
              key={i}
              className={`${d.size} rounded-full bg-primary`}
              style={{
                transform: `translate(${d.xOff}px, ${d.yOff}px)`,
                opacity: d.opacity,
                filter: d.blur ? `blur(${d.blur}px)` : undefined,
              }}
            />
          ))}
          {/* Water spray fan */}
          <div
            className="absolute top-1/2 right-0 -translate-y-1/2"
            style={{
              width: 52,
              height: 52,
              background: "radial-gradient(ellipse at left, hsl(185 100% 45% / 0.35) 0%, transparent 80%)",
              borderRadius: "50%",
              transform: "translate(52px, 0) scaleX(2)",
            }}
          />
        </div>
        {/* Vertical blade */}
        <div
          className="h-[68vh] w-[3px] rounded-full"
          style={{
            background: "linear-gradient(to bottom, transparent, hsl(185 100% 55%) 20%, hsl(185 100% 75%) 50%, hsl(185 100% 55%) 80%, transparent)",
            boxShadow: "0 0 14px 3px hsl(185 100% 50% / 0.8), 0 0 30px 6px hsl(185 100% 45% / 0.4)",
          }}
        />
      </div>

      {/* ── HERO CONTENT ── */}
      <div className="relative z-[5] flex flex-col items-center justify-center h-full px-5 sm:px-8 text-center pt-16 sm:pt-20 pb-24 sm:pb-28">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-5 md:gap-6 w-full">

          {/* Eyebrow pill */}
          <div ref={eyebrowRef} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/35 bg-primary/10 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse flex-shrink-0" />
            <span className="text-primary font-semibold tracking-[0.18em] text-[11px] sm:text-xs uppercase whitespace-nowrap">
              Professionelle Reinigung mit Präzision
            </span>
          </div>

          {/* Headline */}
          <h1
            ref={h1Ref}
            className="text-[2.1rem] xs:text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white leading-[1.06] tracking-tight px-2"
            data-testid="hero-headline"
          >
            Glas- &amp; Gebäudereinigung
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, hsl(185 100% 72%), hsl(185 100% 50%), hsl(185 100% 65%))",
              }}
            >
              auf einem neuen Niveau
            </span>
          </h1>

          {/* Sub */}
          <p
            ref={subRef}
            className="text-sm sm:text-lg md:text-xl text-white/55 font-light max-w-2xl leading-relaxed px-2"
          >
            Streifenfrei. Zuverlässig. Eindrucksvoll sauber –{" "}
            <span className="hidden sm:inline">für Privatkunden und Unternehmen.</span>
            <span className="sm:hidden">für Privat & Gewerbe.</span>
          </p>

          {/* CTA buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 mt-1 w-full sm:w-auto px-2">
            <a
              href="#kontakt"
              className="relative overflow-hidden inline-flex items-center justify-center px-7 h-13 sm:h-14 rounded-full bg-primary text-primary-foreground font-bold text-sm sm:text-base group transition-all duration-300 hover:shadow-[0_0_35px_hsl(185_100%_45%/0.55)] hover:scale-[1.02] active:scale-[0.98]"
              data-testid="hero-cta-primary"
            >
              <span className="relative z-10">Kostenloses Angebot anfordern</span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-600 ease-in-out" />
            </a>
            <a
              href="#leistungen"
              className="inline-flex items-center justify-center px-7 h-13 sm:h-14 rounded-full border border-white/20 text-white font-medium text-sm sm:text-base backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/40 hover:scale-[1.02] active:scale-[0.98]"
              data-testid="hero-cta-secondary"
            >
              Unsere Leistungen ansehen
            </a>
          </div>
        </div>

        {/* Stats bar */}
        <div ref={statsRef} className="absolute bottom-10 sm:bottom-14 left-0 w-full px-5">
          <div className="max-w-3xl mx-auto border-t border-white/10 pt-4 sm:pt-6">
            <div className="flex items-center justify-center gap-x-5 sm:gap-x-8 gap-y-2">
              {[
                { value: "4,9", accent: "★", label: "Google" },
                { value: "100+", label: "Kunden" },
                { value: "7+ J.", label: "Erfahrung" },
                { value: "Privat & Gewerbe", label: "Für alle" },
              ].map((s, i) => (
                <div key={i} className="flex flex-col items-center gap-0.5" data-testid={`hero-stat-${i}`}>
                  <span className="text-sm sm:text-xl font-black text-white">
                    {s.value}
                    {s.accent && <span className="text-primary">{s.accent}</span>}
                  </span>
                  <span className="text-[9px] sm:text-xs text-white/38 uppercase tracking-widest whitespace-nowrap">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/25 animate-bounce">
          <ChevronDown className="w-5 h-5" />
        </div>
      </div>
    </section>
  );
}
