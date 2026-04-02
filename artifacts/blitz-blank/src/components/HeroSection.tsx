import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   CINEMATIC 5-SCENE SCROLL HERO
   Scene 1: Dirty glass on load
   Scene 2: Squeegee charges in from left
   Scene 3: Wipe sweeps — dirty→clean reveal
   Scene 4: Shine sweep + reflections
   Scene 5: Hero content cascades in
   ───────────────────────────────────────────── */

export function HeroSection() {
  const sectionRef   = useRef<HTMLElement>(null);
  const dirtyRef     = useRef<HTMLDivElement>(null);   // dirty full-screen layer
  const cleanRef     = useRef<HTMLDivElement>(null);   // clean revealed layer (clip-path)
  const squeegeeRef  = useRef<HTMLDivElement>(null);   // the cleaning tool
  const wetSheen     = useRef<HTMLDivElement>(null);   // wet gloss left of blade
  const shine1Ref    = useRef<HTMLDivElement>(null);   // post-wipe light sweep
  const shine2Ref    = useRef<HTMLDivElement>(null);   // secondary reflection
  const contentRef   = useRef<HTMLDivElement>(null);   // all hero text/CTAs
  const eyebrowRef   = useRef<HTMLDivElement>(null);
  const headlineRef  = useRef<HTMLHeadingElement>(null);
  const subRef       = useRef<HTMLParagraphElement>(null);
  const ctaRef       = useRef<HTMLDivElement>(null);
  const statsRef     = useRef<HTMLDivElement>(null);
  const scrollHint   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    /* ── FULL ANIMATION (desktop / prefers motion) ── */
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {

        // Set initial states
        gsap.set(cleanRef.current,    { clipPath: "polygon(0 0, 0% 0, 0% 100%, 0 100%)" });
        gsap.set(dirtyRef.current,    { clipPath: "polygon(0% 0, 100% 0, 100% 100%, 0% 100%)" });
        gsap.set(squeegeeRef.current, { xPercent: -200, opacity: 0 });
        gsap.set(wetSheen.current,    { scaleX: 0, transformOrigin: "left center" });
        gsap.set(shine1Ref.current,   { x: "-110%" });
        gsap.set(shine2Ref.current,   { x: "-110%" });
        gsap.set(contentRef.current,  { opacity: 0 });
        gsap.set([eyebrowRef.current, headlineRef.current, subRef.current, ctaRef.current, statsRef.current], {
          opacity: 0, y: 22,
        });

        // Scroll hint bounces then hides when scroll starts
        gsap.to(scrollHint.current, {
          opacity: 0,
          scrollTrigger: { trigger: sectionRef.current, start: "top+=1 top", end: "top+=80 top", scrub: true },
        });

        /* ── SCROLL TIMELINE (pinned for 320vh) ── */
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=320%",
            pin: true,
            scrub: 1.4,
            anticipatePin: 1,
          },
        });

        // Proxy for the wipe position (0→100)
        const wiper = { x: 0 };

        // ── PHASE 1: Squeegee charges in (0→0.06) ─────────────────
        tl.to(
          squeegeeRef.current,
          { xPercent: 0, opacity: 1, duration: 0.06, ease: "power3.out" },
          0
        );

        // ── PHASE 2: Main wipe (0.06→0.84) ────────────────────────
        tl.to(
          wiper,
          {
            x: 100,
            duration: 0.78,
            ease: "none",
            onUpdate() {
              const p = wiper.x;
              const pStr = p.toFixed(3);

              // Clean layer grows from left (what's been wiped)
              if (cleanRef.current) {
                cleanRef.current.style.clipPath =
                  `polygon(0 0, ${pStr}% 0, ${pStr}% 100%, 0 100%)`;
              }

              // Dirty layer shrinks from left
              if (dirtyRef.current) {
                dirtyRef.current.style.clipPath =
                  `polygon(${pStr}% 0, 100% 0, 100% 100%, ${pStr}% 100%)`;
              }

              // Squeegee travels right
              if (squeegeeRef.current) {
                squeegeeRef.current.style.left = `${pStr}%`;
              }

              // Wet sheen covers already-cleaned area
              if (wetSheen.current) {
                wetSheen.current.style.clipPath =
                  `polygon(0 0, ${pStr}% 0, ${pStr}% 100%, 0 100%)`;
                wetSheen.current.style.opacity = p > 3 ? "1" : "0";
              }
            },
          },
          0.06
        );

        // Squeegee exits off right edge
        tl.to(squeegeeRef.current, { opacity: 0, duration: 0.03 }, 0.84);

        // Wet sheen fades as cleaning finishes
        tl.to(wetSheen.current, { opacity: 0, duration: 0.05 }, 0.84);

        // ── PHASE 3: Shine sweeps (0.86→0.93) ─────────────────────
        tl.fromTo(shine1Ref.current,
          { x: "-110%" },
          { x: "220%", duration: 0.07, ease: "power2.inOut" },
          0.86
        );
        tl.fromTo(shine2Ref.current,
          { x: "-110%" },
          { x: "220%", duration: 0.06, ease: "power2.inOut" },
          0.88
        );

        // ── PHASE 4: Hero content cascades in (0.93→1.0) ──────────
        tl.to(contentRef.current, { opacity: 1, duration: 0.01 }, 0.93);
        tl.to(
          [eyebrowRef.current, headlineRef.current, subRef.current, ctaRef.current, statsRef.current],
          {
            opacity: 1, y: 0,
            duration: 0.08,
            stagger: 0.02,
            ease: "power3.out",
          },
          0.93
        );

      }, sectionRef);

      return () => ctx.revert();
    });

    /* ── REDUCED MOTION: instant clean reveal ── */
    mm.add("(prefers-reduced-motion: reduce)", () => {
      const ctx = gsap.context(() => {
        gsap.set(cleanRef.current,    { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" });
        gsap.set(dirtyRef.current,    { opacity: 0 });
        gsap.set(squeegeeRef.current, { display: "none" });
        gsap.set(contentRef.current,  { opacity: 1 });
        gsap.from(
          [eyebrowRef.current, headlineRef.current, subRef.current, ctaRef.current, statsRef.current],
          { opacity: 0, y: 16, duration: 0.8, stagger: 0.12, ease: "power2.out", delay: 0.2 }
        );
      }, sectionRef);
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden will-change-transform"
      data-testid="hero-section"
    >
      {/* ─────────────────────────────────────────────
          LAYER 0 — Dark base fallback
          ───────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0 bg-[hsl(220_15%_6%)]" />

      {/* ─────────────────────────────────────────────
          LAYER 1 — DIRTY SCENE (full screen initially)
          ───────────────────────────────────────────── */}
      <div
        ref={dirtyRef}
        className="absolute inset-0 z-[1] will-change-[clip-path]"
      >
        {/* Desaturated, dark background image */}
        <img
          src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2000&auto=format&fit=crop"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter: "grayscale(70%) brightness(0.42) contrast(1.3) sepia(25%)",
          }}
          loading="eager"
          fetchPriority="high"
          draggable={false}
        />

        {/* Dark base tint */}
        <div className="absolute inset-0 bg-[hsl(30_15%_5%/0.55)]" />

        {/* Grime smudge blobs */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 38% 32% at 12% 22%, rgba(0,0,0,0.75) 0%, transparent 100%),
              radial-gradient(ellipse 50% 44% at 70% 15%, rgba(0,0,0,0.6) 0%, transparent 100%),
              radial-gradient(ellipse 35% 50% at 88% 72%, rgba(0,0,0,0.7) 0%, transparent 100%),
              radial-gradient(ellipse 55% 35% at 40% 82%, rgba(0,0,0,0.65) 0%, transparent 100%),
              radial-gradient(ellipse 28% 28% at 55% 45%, rgba(15,10,5,0.4) 0%, transparent 100%)
            `,
          }}
        />

        {/* SVG noise grain texture — makes it feel physically dirty */}
        <div
          className="absolute inset-0 opacity-[0.22] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23g)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: "300px 300px",
          }}
        />

        {/* Warm dirty colour cast */}
        <div
          className="absolute inset-0 mix-blend-multiply"
          style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(80,55,10,0.35) 0%, transparent 75%)" }}
        />

        {/* Streaks / smear lines */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              linear-gradient(175deg, transparent 35%, rgba(0,0,0,0.18) 36%, transparent 37%),
              linear-gradient(172deg, transparent 55%, rgba(0,0,0,0.12) 56%, transparent 57%),
              linear-gradient(168deg, transparent 65%, rgba(0,0,0,0.10) 66%, transparent 67%)
            `,
          }}
        />
      </div>

      {/* ─────────────────────────────────────────────
          LAYER 2 — CLEAN SCENE (revealed by wipe)
          ───────────────────────────────────────────── */}
      <div
        ref={cleanRef}
        className="absolute inset-0 z-[2] will-change-[clip-path]"
        style={{ clipPath: "polygon(0 0, 0% 0, 0% 100%, 0 100%)" }}
      >
        <img
          src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2000&auto=format&fit=crop"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter: "brightness(1.18) contrast(1.07) saturate(1.2)",
          }}
          loading="eager"
          draggable={false}
        />
        {/* Slight dark top gradient so nav is readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220_15%_8%/0.65)] via-[hsl(220_15%_8%/0.35)] to-[hsl(220_15%_8%/0.55)]" />
        {/* Subtle cyan brand tint */}
        <div
          className="absolute inset-0 mix-blend-soft-light opacity-20"
          style={{ background: "radial-gradient(ellipse at 50% 30%, hsl(185 100% 55%) 0%, transparent 65%)" }}
        />
      </div>

      {/* ─────────────────────────────────────────────
          LAYER 3 — WET SHEEN (follows clean area)
          ───────────────────────────────────────────── */}
      <div
        ref={wetSheen}
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 50%, rgba(180,240,255,0.06) 70%, rgba(180,240,255,0.14) 85%, rgba(180,240,255,0.06) 95%, transparent 100%)",
        }}
      />

      {/* ─────────────────────────────────────────────
          LAYER 4 — POST-WIPE SHINE SWEEPS
          ───────────────────────────────────────────── */}
      <div
        ref={shine1Ref}
        className="absolute inset-0 z-[4] pointer-events-none"
        style={{
          background:
            "linear-gradient(100deg, transparent 15%, rgba(255,255,255,0.12) 42%, rgba(220,250,255,0.22) 50%, rgba(255,255,255,0.12) 58%, transparent 85%)",
          transform: "skewX(-8deg)",
        }}
      />
      <div
        ref={shine2Ref}
        className="absolute inset-0 z-[4] pointer-events-none"
        style={{
          background:
            "linear-gradient(100deg, transparent 25%, rgba(180,245,255,0.06) 45%, rgba(200,250,255,0.12) 50%, rgba(180,245,255,0.06) 55%, transparent 75%)",
          transform: "skewX(-8deg)",
        }}
      />

      {/* ─────────────────────────────────────────────
          LAYER 5 — SQUEEGEE CLEANING TOOL
          ───────────────────────────────────────────── */}
      <div
        ref={squeegeeRef}
        className="absolute top-0 bottom-0 z-[5] pointer-events-none"
        style={{ left: "0%", transform: "translateX(-50%)" }}
      >
        {/* ── Water spray on the dirty (right) side ── */}
        <div className="absolute top-1/2 -translate-y-1/2 left-[2px]">
          {[
            { size: 7, x: 18, y: -52, blur: 1.5, op: 0.80 },
            { size: 5, x: 28, y: -36, blur: 1,   op: 0.65 },
            { size: 9, x: 14, y: -20, blur: 2,   op: 0.70 },
            { size: 4, x: 32, y: -6,  blur: 0.8, op: 0.55 },
            { size: 6, x: 22, y:  8,  blur: 1.5, op: 0.72 },
            { size: 8, x: 12, y: 22,  blur: 2,   op: 0.68 },
            { size: 4, x: 30, y: 36,  blur: 1,   op: 0.58 },
            { size: 6, x: 18, y: 50,  blur: 1.5, op: 0.75 },
            { size: 3, x: 38, y: 14,  blur: 0.5, op: 0.45 },
            { size: 5, x: 24, y:-42,  blur: 1,   op: 0.60 },
          ].map((d, i) => (
            <span
              key={i}
              className="absolute rounded-full"
              style={{
                width: d.size,
                height: d.size,
                left: d.x,
                top: d.y,
                background: "hsl(185 100% 65%)",
                opacity: d.op,
                filter: `blur(${d.blur}px)`,
                boxShadow: `0 0 ${d.size * 2}px hsl(185 100% 55% / 0.6)`,
              }}
            />
          ))}
          {/* Fan spray arc */}
          <div
            style={{
              position: "absolute",
              left: 4,
              top: -60,
              width: 55,
              height: 120,
              background:
                "radial-gradient(ellipse at left, hsl(185 100% 55% / 0.28) 0%, hsl(185 100% 55% / 0.06) 60%, transparent 85%)",
              borderRadius: "0 60px 60px 0",
            }}
          />
        </div>

        {/* ── Squeegee blade (vertical, full height) ── */}
        <div
          className="absolute top-0 bottom-0"
          style={{
            left: "50%",
            width: 4,
            transform: "translateX(-50%)",
            background:
              "linear-gradient(to bottom, transparent 0%, hsl(185 100% 75%) 8%, hsl(185 100% 60%) 30%, hsl(185 100% 80%) 50%, hsl(185 100% 60%) 70%, hsl(185 100% 75%) 92%, transparent 100%)",
            boxShadow:
              "0 0 0 1px hsl(185 100% 85% / 0.5), 0 0 12px 4px hsl(185 100% 55% / 0.85), 0 0 30px 8px hsl(185 100% 45% / 0.5), 0 0 60px 16px hsl(185 100% 40% / 0.25)",
          }}
        />

        {/* ── Handle / arm (horizontal bar going RIGHT from blade) ── */}
        <div
          className="absolute top-1/2 -translate-y-1/2"
          style={{ left: "50%" }}
        >
          {/* Main arm */}
          <div
            style={{
              position: "absolute",
              top: -5,
              left: 0,
              width: 80,
              height: 10,
              borderRadius: 5,
              background:
                "linear-gradient(to right, hsl(185 100% 55%), hsl(185 80% 40%) 60%, hsl(220 15% 30%))",
              boxShadow: "0 2px 8px rgba(0,0,0,0.5), 0 0 12px hsl(185 100% 45% / 0.4)",
            }}
          />
          {/* Grip rings */}
          {[40, 56, 72].map((x) => (
            <div
              key={x}
              style={{
                position: "absolute",
                top: -7,
                left: x,
                width: 2,
                height: 14,
                borderRadius: 1,
                background: "hsl(185 100% 30%)",
                boxShadow: "0 0 4px hsl(185 100% 45% / 0.6)",
              }}
            />
          ))}
        </div>

        {/* ── Rubber edge (thick bottom edge of blade) ── */}
        <div
          className="absolute bottom-[15%] top-[15%]"
          style={{
            left: "50%",
            width: 3,
            transform: "translateX(-50%)",
            background:
              "linear-gradient(to bottom, transparent, hsl(220 15% 20%) 15%, hsl(220 15% 30%) 50%, hsl(220 15% 20%) 85%, transparent)",
          }}
        />
      </div>

      {/* ─────────────────────────────────────────────
          LAYER 6 — HERO CONTENT (fades in after wipe)
          ───────────────────────────────────────────── */}
      <div
        ref={contentRef}
        className="absolute inset-0 z-[6] flex flex-col items-center justify-center px-5 sm:px-8 text-center"
        style={{ paddingTop: 64, paddingBottom: 96, opacity: 0 }}
      >
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-4 md:gap-6 w-full">

          {/* Eyebrow */}
          <div ref={eyebrowRef} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/35 bg-primary/10 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse flex-shrink-0" />
            <span className="text-primary font-semibold tracking-[0.18em] text-[11px] sm:text-xs uppercase whitespace-nowrap">
              Professionelle Reinigung mit Präzision
            </span>
          </div>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="text-[2.1rem] sm:text-5xl md:text-6xl lg:text-8xl font-black text-white leading-[1.05] tracking-tight px-2"
            data-testid="hero-headline"
          >
            Glas- &amp; Gebäudereinigung
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, hsl(185 100% 78%), hsl(185 100% 52%), hsl(185 100% 68%))",
              }}
            >
              auf einem neuen Niveau
            </span>
          </h1>

          {/* Subtitle */}
          <p
            ref={subRef}
            className="text-sm sm:text-lg md:text-xl text-white/60 font-light max-w-xl leading-relaxed px-2"
          >
            Streifenfrei. Zuverlässig. Eindrucksvoll sauber —{" "}
            <span className="sm:hidden">für Privat &amp; Gewerbe.</span>
            <span className="hidden sm:inline">für Privatkunden und Unternehmen.</span>
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-1 w-full sm:w-auto px-2">
            <a
              href="#kontakt"
              className="group relative overflow-hidden inline-flex items-center justify-center px-7 py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-base transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
              style={{
                background: "linear-gradient(135deg, hsl(185 100% 48%), hsl(185 100% 38%))",
                color: "hsl(220 15% 8%)",
                boxShadow: "0 0 28px hsl(185 100% 45% / 0.45), 0 4px 16px rgba(0,0,0,0.3)",
              }}
              data-testid="hero-cta-primary"
            >
              <span className="relative z-10">Kostenloses Angebot anfordern</span>
              <span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
              />
            </a>
            <a
              href="#leistungen"
              className="inline-flex items-center justify-center px-7 py-3.5 sm:py-4 rounded-full border border-white/22 text-white font-medium text-sm sm:text-base backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/40 hover:scale-[1.03] active:scale-[0.98]"
              data-testid="hero-cta-secondary"
            >
              Unsere Leistungen ansehen
            </a>
          </div>
        </div>

        {/* Stats bar */}
        <div ref={statsRef} className="absolute bottom-10 sm:bottom-14 left-0 w-full px-5">
          <div className="max-w-3xl mx-auto border-t border-white/12 pt-4 sm:pt-6">
            <div className="flex items-center justify-center gap-x-5 sm:gap-x-10">
              {[
                { value: "4,9", suffix: "★", label: "Google" },
                { value: "100+", label: "Kunden" },
                { value: "7+ J.", label: "Erfahrung" },
                { value: "Privat & Gewerbe", label: "Für alle" },
              ].map((s, i) => (
                <div key={i} className="flex flex-col items-center gap-0.5">
                  <span className="text-sm sm:text-xl font-black text-white">
                    {s.value}
                    {s.suffix && <span className="text-primary">{s.suffix}</span>}
                  </span>
                  <span className="text-[9px] sm:text-xs text-white/38 uppercase tracking-widest whitespace-nowrap">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────
          LAYER 7 — SCROLL INDICATOR (fades on scroll)
          ───────────────────────────────────────────── */}
      <div
        ref={scrollHint}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-[8] flex flex-col items-center gap-1.5"
        data-testid="scroll-hint"
      >
        <span className="text-white/28 text-[10px] tracking-[0.2em] uppercase font-medium">
          Scrollen
        </span>
        <div className="text-white/25 animate-bounce">
          <ChevronDown className="w-5 h-5" />
        </div>
      </div>
    </section>
  );
}
