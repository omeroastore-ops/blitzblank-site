import { motion } from "framer-motion";
import {
  Sparkles, Trees, Grid2x2, Droplets, Building2,
  Layers, HardHat, Package, CalendarCheck,
} from "lucide-react";

const services = [
  { icon: Sparkles, title: "Glasreinigung", desc: "Streifenfreie Glasflächen innen & außen — kristallklar garantiert." },
  { icon: Trees, title: "Wintergarten Reinigung", desc: "Professionelle Reinigung aller Wintergartentypen, innen & außen." },
  { icon: Grid2x2, title: "Terrassenreinigung", desc: "Hochdruckreinigung für makellose Außenbereiche und Platten." },
  { icon: Droplets, title: "Dachrinnenreinigung", desc: "Sichere, gründliche Entfernung von Laub und Schmutz." },
  { icon: Building2, title: "Büroreinigung", desc: "Saubere Arbeitsumgebungen — für motivierte Teams und Kunden." },
  { icon: Layers, title: "Treppenhausreinigung", desc: "Gepflegte Gemeinschaftsflächen, die einen bleibenden Eindruck hinterlassen." },
  { icon: HardHat, title: "Baureinigung", desc: "Professionelle Bauendreinigung nach Maß — bezugsfertig in einem Schritt." },
  { icon: Package, title: "Umzugsreinigung", desc: "Besenrein bis blitzsauber — auf Wunsch mit Übergabeprotokoll." },
  { icon: CalendarCheck, title: "Unterhaltsreinigung", desc: "Regelmäßige Pflege im Abonnement — verlässlich, pünktlich, professionell." },
];

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function ServicesSection() {
  return (
    <section id="leistungen" className="py-28 md:py-36 bg-background relative overflow-hidden" data-testid="section-leistungen">
      {/* Subtle ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-primary/[0.04] blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-5 sm:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-block text-primary font-semibold tracking-[0.2em] text-xs uppercase mb-4">
            Unsere Leistungen
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-1">
            Was wir für Sie reinigen
          </h2>
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto text-base">
            Von Glas bis Gebäude — wir übernehmen jede Reinigungsaufgabe mit Präzision.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={i}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className="group relative rounded-2xl overflow-hidden cursor-default"
                data-testid={`services-card-${service.title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {/* Card body */}
                <div
                  className="relative h-full p-7 md:p-8 border border-border rounded-2xl transition-all duration-400 ease-out
                    bg-card
                    hover:border-primary/40
                    hover:-translate-y-1.5
                    hover:shadow-[0_12px_40px_hsl(185_100%_45%/0.12),_0_2px_8px_hsl(220_15%_0%/0.3)]"
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/8 via-primary/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />

                  {/* Icon */}
                  <div
                    className="relative w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-400
                      bg-secondary border border-border
                      group-hover:bg-primary/18 group-hover:border-primary/35 group-hover:scale-105"
                  >
                    <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                  </div>

                  {/* Text */}
                  <h3 className="font-bold text-base sm:text-lg text-foreground mb-2 relative z-10">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed relative z-10">
                    {service.desc}
                  </p>

                  {/* Subtle bottom accent line */}
                  <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/30 transition-all duration-500" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
