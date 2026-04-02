import { motion } from "framer-motion";
import { Send, FileText, CalendarDays, Sparkles } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Send,
    title: "Anfrage senden",
    desc: "Schnell & unkompliziert per Telefon, WhatsApp oder Kontaktformular",
  },
  {
    number: "02",
    icon: FileText,
    title: "Angebot erhalten",
    desc: "Kostenlos, transparent und innerhalb von 24 Stunden",
  },
  {
    number: "03",
    icon: CalendarDays,
    title: "Termin vereinbaren",
    desc: "Flexibel nach Ihren Wünschen – auch kurzfristig möglich",
  },
  {
    number: "04",
    icon: Sparkles,
    title: "Perfektes Ergebnis",
    desc: "Blitzsauber und professionell gereinigt – Ihr Versprechen von uns",
  },
];

export function ProcessSection() {
  return (
    <section className="py-32 bg-secondary/20 border-y border-border relative overflow-hidden" data-testid="section-prozess">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_hsl(185_100%_45%/0.05)_0%,_transparent_60%)]" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-primary font-semibold tracking-widest text-sm uppercase mb-4">Unser Ablauf</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">So einfach funktioniert es</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 relative">
          {/* Connecting line (desktop only) */}
          <div className="absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-border to-transparent hidden lg:block" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex flex-col items-center text-center px-6 pb-8 relative group"
              >
                {/* Step circle */}
                <div className="relative z-10 w-24 h-24 rounded-full bg-card border-2 border-border group-hover:border-primary/50 flex flex-col items-center justify-center mb-8 transition-all duration-300 group-hover:shadow-[0_0_30px_hsl(185_100%_45%/0.2)]">
                  <Icon className="w-7 h-7 text-primary mb-1" />
                  <span className="text-xs text-muted-foreground font-mono">{step.number}</span>
                </div>

                {/* Large step number background */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[7rem] font-black text-primary/[0.04] leading-none select-none pointer-events-none">
                  {step.number}
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
