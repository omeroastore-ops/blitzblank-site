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
    <section className="py-28 md:py-36 relative overflow-hidden" data-testid="section-prozess">
      <div className="absolute inset-0 bg-[hsl(220_15%_9%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_hsl(185_100%_45%/0.05)_0%,_transparent_60%)] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

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
            Unser Ablauf
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-1">
            So einfach funktioniert es
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative">
          {/* Connecting line on large screens */}
          <div className="absolute top-[52px] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-primary/15 via-primary/30 to-primary/15 hidden lg:block pointer-events-none" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="group flex flex-col items-center text-center relative"
              >
                {/* Step circle */}
                <div
                  className="relative z-10 w-[104px] h-[104px] rounded-full flex flex-col items-center justify-center mb-7 transition-all duration-400
                    border-2 border-border bg-card
                    group-hover:border-primary/50 group-hover:shadow-[0_0_35px_hsl(185_100%_45%/0.22)] group-hover:scale-[1.04]"
                >
                  {/* Large ghost number */}
                  <span
                    className="absolute inset-0 flex items-center justify-center text-5xl font-black text-primary/[0.07] select-none leading-none"
                  >
                    {step.number}
                  </span>
                  <Icon className="w-7 h-7 text-primary relative z-10 mb-0.5" />
                  <span className="text-[10px] text-muted-foreground font-mono relative z-10 mt-0.5">{step.number}</span>
                </div>

                {/* Connector dot for mobile */}
                {i < steps.length - 1 && (
                  <div className="sm:hidden h-6 w-px bg-gradient-to-b from-border to-transparent mb-6 -mt-1" />
                )}

                <h3 className="font-bold text-foreground text-base sm:text-lg mb-2.5">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-[180px] mx-auto">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
