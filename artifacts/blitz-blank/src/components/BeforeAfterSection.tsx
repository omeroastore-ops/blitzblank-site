import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import img1 from "@assets/IMG_5985_1775145254574.png";
import img2 from "@assets/IMG_5984_1775145254574.png";
import img3 from "@assets/IMG_5981_1775145254574.png";

interface SliderProps {
  beforeImage: string;
  afterImage: string;
  label: string;
}

function BeforeAfterSlider({ beforeImage, afterImage, label }: SliderProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  const handleMouseDown = () => { isDragging.current = true; };
  const handleMouseUp = () => { isDragging.current = false; };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) updatePosition(e.clientX);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    updatePosition(e.touches[0].clientX);
  };

  return (
    <div
      ref={containerRef}
      className="relative h-72 md:h-96 rounded-2xl overflow-hidden cursor-ew-resize select-none border border-border group"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      data-testid="before-after-slider"
    >
      {/* AFTER (base) */}
      <div className="absolute inset-0">
        <img src={afterImage} alt="Nach der Reinigung" className="w-full h-full object-cover brightness-110 contrast-105 saturate-110" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute bottom-4 right-4 bg-primary/90 text-primary-foreground text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full backdrop-blur-sm">
          Nachher
        </div>
      </div>

      {/* BEFORE (clipped) */}
      <div className="absolute inset-0" style={{ clipPath: `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)` }}>
        <img src={beforeImage} alt="Vor der Reinigung" className="w-full h-full object-cover grayscale-[40%] brightness-75 contrast-110" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/10" />
        <div className="absolute bottom-4 left-4 bg-black/70 text-white/80 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full backdrop-blur-sm">
          Vorher
        </div>
      </div>

      {/* Divider */}
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_12px_rgba(0,255,255,0.8)] z-10 transition-none"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white shadow-[0_0_20px_rgba(0,255,255,0.6)] flex items-center justify-center">
          <div className="flex gap-1">
            <span className="w-0.5 h-4 bg-gray-400 rounded" />
            <span className="w-0.5 h-4 bg-gray-400 rounded" />
          </div>
        </div>
      </div>

      {/* Label */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md text-white/70 text-xs tracking-widest px-3 py-1 rounded-full border border-white/10">
        {label}
      </div>
    </div>
  );
}

export function BeforeAfterSection() {
  const slides = [
    { before: img1, after: img1, label: "Terrassenreinigung" },
    { before: img2, after: img2, label: "Gebäudereinigung" },
    { before: img3, after: img3, label: "Glasreinigung" },
  ];

  return (
    <section className="py-32 bg-background relative overflow-hidden" data-testid="section-before-after">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_hsl(185_100%_45%/0.06)_0%,_transparent_70%)]" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-primary font-semibold tracking-widest text-sm uppercase mb-4">Ergebnisse</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">Das Ergebnis spricht für sich</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Ziehen Sie den Regler und sehen Sie die Transformation mit eigenen Augen</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {slides.map((slide, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
            >
              <BeforeAfterSlider beforeImage={slide.before} afterImage={slide.after} label={slide.label} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
