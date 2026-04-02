import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import img1 from "@assets/IMG_5985_1775145254574.png";
import img2 from "@assets/IMG_5984_1775145254574.png";
import img3 from "@assets/IMG_5981_1775145254574.png";

interface SliderProps {
  beforeImage: string;
  afterImage: string;
  label: string;
  initialPosition?: number;
}

function BeforeAfterSlider({ beforeImage, afterImage, label, initialPosition = 50 }: SliderProps) {
  const [position, setPosition] = useState(initialPosition);
  const [isInteracting, setIsInteracting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const rafRef = useRef<number | null>(null);
  const pendingX = useRef<number | null>(null);

  const applyPosition = useCallback(() => {
    if (pendingX.current === null || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.max(4, Math.min(96, ((pendingX.current - rect.left) / rect.width) * 100));
    setPosition(pct);
    pendingX.current = null;
    rafRef.current = null;
  }, []);

  const scheduleUpdate = useCallback((clientX: number) => {
    pendingX.current = clientX;
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(applyPosition);
    }
  }, [applyPosition]);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    setIsInteracting(true);
    scheduleUpdate(e.clientX);
  };
  const handleMouseUp = () => { isDragging.current = false; setIsInteracting(false); };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) scheduleUpdate(e.clientX);
  };
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsInteracting(true);
    scheduleUpdate(e.touches[0].clientX);
  };
  const handleTouchEnd = () => setIsInteracting(false);
  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    scheduleUpdate(e.touches[0].clientX);
  };

  useEffect(() => {
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden select-none border border-border group"
      style={{ cursor: isInteracting ? "grabbing" : "ew-resize", touchAction: "none" }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      data-testid="before-after-slider"
    >
      {/* ── AFTER layer (base) ── */}
      <div className="absolute inset-0">
        <img
          src={afterImage}
          alt="Nach der Reinigung"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(1.15) contrast(1.06) saturate(1.12)" }}
          loading="lazy"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-primary text-primary-foreground text-[10px] sm:text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full backdrop-blur-sm shadow-[0_0_14px_hsl(185_100%_45%/0.5)]">
          Nachher
        </div>
      </div>

      {/* ── BEFORE layer (clipped) ── */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)` }}
      >
        <img
          src={beforeImage}
          alt="Vor der Reinigung"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.78) contrast(1.1) saturate(0.65)" }}
          loading="lazy"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        {/* Grime tint */}
        <div className="absolute inset-0 bg-[rgba(30,20,5,0.18)] mix-blend-multiply pointer-events-none" />
        <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-black/65 backdrop-blur-sm text-white/75 text-[10px] sm:text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
          Vorher
        </div>
      </div>

      {/* ── Divider ── */}
      <div
        className="absolute top-0 bottom-0 z-10"
        style={{ left: `${position}%`, transform: "translateX(-50%)", width: 2 }}
      >
        {/* Line */}
        <div
          className="w-full h-full"
          style={{
            background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.95) 15%, rgba(255,255,255,0.95) 85%, transparent)",
            boxShadow: "0 0 10px 2px hsl(185 100% 55% / 0.7)",
          }}
        />
        {/* Handle knob */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
          style={{ left: 1 }}
        >
          <div
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-transform duration-150"
            style={{
              background: "white",
              boxShadow: `
                0 0 0 2px hsl(185 100% 45% / 0.4),
                0 0 18px 4px hsl(185 100% 45% / 0.45),
                0 2px 8px rgba(0,0,0,0.3)
              `,
              transform: isInteracting ? "scale(1.12)" : "scale(1)",
            }}
          >
            {/* Arrow chevrons */}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M5 4L2 8L5 12" stroke="hsl(185 100% 35%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11 4L14 8L11 12" stroke="hsl(185 100% 35%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* ── Top label ── */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-black/55 backdrop-blur-md text-white/65 text-[10px] tracking-widest px-3 py-1 rounded-full border border-white/10 pointer-events-none whitespace-nowrap z-10">
        {label}
      </div>

      {/* Hint text on first load */}
      <div className="absolute inset-0 flex items-end justify-center pb-10 pointer-events-none z-10 opacity-60 group-[&:hover]:opacity-0 transition-opacity duration-300">
        <span className="text-white/40 text-[10px] tracking-widest uppercase">← Ziehen →</span>
      </div>
    </div>
  );
}

export function BeforeAfterSection() {
  const slides = [
    { before: img1, after: img1, label: "Terrassenreinigung", pos: 60 },
    { before: img2, after: img2, label: "Gebäudereinigung", pos: 45 },
    { before: img3, after: img3, label: "Glasreinigung", pos: 55 },
  ];

  return (
    <section className="py-28 md:py-36 bg-background relative overflow-hidden" data-testid="section-before-after">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_hsl(185_100%_45%/0.06)_0%,_transparent_65%)] pointer-events-none" />
      <div className="container mx-auto px-5 sm:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14 md:mb-18"
        >
          <span className="inline-block text-primary font-semibold tracking-[0.2em] text-xs uppercase mb-4">
            Ergebnisse
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-1">
            Das Ergebnis spricht für sich
          </h2>
          <p className="mt-4 text-muted-foreground max-w-md mx-auto text-sm sm:text-base">
            Ziehen Sie den Regler und erleben Sie die Transformation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {slides.map((slide, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <BeforeAfterSlider
                beforeImage={slide.before}
                afterImage={slide.after}
                label={slide.label}
                initialPosition={slide.pos}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
