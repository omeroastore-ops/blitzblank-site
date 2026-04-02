import { motion } from "framer-motion";
import {
  Clock, Star, Calendar, Building2,
  Wrench, User, BadgeDollarSign, MapPin,
} from "lucide-react";

const reasons = [
  { icon: Clock, title: "Zuverlässig & termintreu", desc: "Pünktlichkeit ist unsere Garantie — kein Termin wird verpasst." },
  { icon: Star, title: "Gründlich & professionell", desc: "Kein Detail wird übersehen. Perfektion ist unser Standard." },
  { icon: Calendar, title: "Flexible Termine", desc: "Auch kurzfristig verfügbar — wir passen uns Ihnen an." },
  { icon: Building2, title: "Privat & Gewerbe", desc: "Erfahrung in allen Bereichen — von privat bis gewerblich." },
  { icon: Wrench, title: "Moderne Methoden", desc: "Neueste Reinigungstechnik für beste und schonende Ergebnisse." },
  { icon: User, title: "Persönlicher Service", desc: "Direkter Ansprechpartner — immer für Sie erreichbar." },
  { icon: BadgeDollarSign, title: "Faire Preise", desc: "Transparent und ohne versteckte Kosten — Ihr Vertrauen zählt." },
  { icon: MapPin, title: "Regionale Nähe", desc: "Ihr verlässlicher Partner direkt aus der Region Wittmund." },
];

const cardVariants = {
  hidden: { opacity: 0, scale: 0.94, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function TrustSection() {
  return (
    <section id="vorteile" className="py-28 md:py-36 relative overflow-hidden" data-testid="section-vorteile">
      {/* Background */}
      <div className="absolute inset-0 bg-[hsl(220_15%_9%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,_hsl(185_100%_45%/0.055)_0%,_transparent_100%)] pointer-events-none" />
      {/* Top/bottom lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-5 sm:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14 md:mb-18"
        >
          <span className="inline-block text-primary font-semibold tracking-[0.2em] text-xs uppercase mb-4">
            Warum BlitzBlank?
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-1">
            Warum Kunden uns vertrauen
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <motion.div
                key={i}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className="group"
              >
                <div
                  className="relative h-full p-6 md:p-7 rounded-2xl border transition-all duration-400 ease-out
                    bg-card/50 backdrop-blur-sm border-border
                    hover:border-primary/35 hover:bg-card/75
                    hover:-translate-y-1
                    hover:shadow-[0_10px_35px_hsl(185_100%_45%/0.1)]"
                >
                  {/* Hover gradient */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/6 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />

                  {/* Icon */}
                  <div
                    className="relative w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-all duration-400
                      bg-secondary border border-border
                      group-hover:bg-primary/18 group-hover:border-primary/30 group-hover:scale-105"
                  >
                    <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                  </div>

                  <h3 className="relative z-10 font-bold text-foreground text-sm sm:text-base mb-2 leading-snug">
                    {r.title}
                  </h3>
                  <p className="relative z-10 text-muted-foreground text-xs sm:text-sm leading-relaxed">
                    {r.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
