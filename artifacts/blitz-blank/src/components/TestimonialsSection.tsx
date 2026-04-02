import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Familie Müller",
    location: "Wittmund",
    text: "Absolute Spitzenklasse! Der Wintergarten wurde wie neu gereinigt. Wir sind begeistert von der Professionalität und dem Ergebnis.",
    rating: 5,
  },
  {
    name: "Thomas K.",
    location: "Aurich",
    text: "Sehr professionell und pünktlich. Die Fenster sind streifenfrei — ich sehe endlich wieder die Sonne. Werde definitiv wieder buchen.",
    rating: 5,
  },
  {
    name: "Sabine H.",
    location: "Norden",
    text: "Für unser Büro regelmäßig gebucht. Zuverlässig, diskret und gründlich. Kann ich nur wärmstens empfehlen.",
    rating: 5,
  },
  {
    name: "Michael B.",
    location: "Jever",
    text: "Terrassenreinigung mit Hochdruck — das Ergebnis war verblüffend. Wie neu! Sehr faire Preise und freundliches Team.",
    rating: 5,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: rating }).map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="py-28 md:py-36 bg-background relative overflow-hidden" data-testid="section-bewertungen">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.04] blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-5 sm:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10"
        >
          <span className="inline-block text-primary font-semibold tracking-[0.2em] text-xs uppercase mb-4">
            Kundenstimmen
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-1">
            Was unsere Kunden sagen
          </h2>
        </motion.div>

        {/* Google Rating Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center mb-14 md:mb-16"
        >
          <div
            className="inline-flex items-center gap-3 px-5 sm:px-6 py-3 rounded-full border border-primary/25 bg-primary/8 backdrop-blur-sm"
            style={{ boxShadow: "0 0 30px hsl(185 100% 45% / 0.12)" }}
          >
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <span className="font-bold text-foreground text-sm sm:text-base">4,9 / 5 bei Google</span>
            <span className="hidden sm:inline text-muted-foreground text-sm">· 34 Bewertungen</span>
          </div>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="group relative"
              data-testid={`testimonial-${i}`}
            >
              <div
                className="relative h-full p-6 rounded-2xl border border-border
                  bg-card/70 backdrop-blur-sm
                  transition-all duration-400 ease-out
                  hover:border-primary/30
                  hover:-translate-y-1.5
                  hover:shadow-[0_12px_40px_hsl(185_100%_45%/0.1),_0_2px_8px_hsl(220_15%_0%/0.25)]"
              >
                {/* Gradient on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/6 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />

                {/* Quote icon */}
                <div className="relative z-10 mb-4 flex items-start justify-between">
                  <StarRating rating={t.rating} />
                  <Quote className="w-6 h-6 text-primary/20 group-hover:text-primary/35 transition-colors duration-300 flex-shrink-0 ml-2" />
                </div>

                {/* Review text */}
                <p className="relative z-10 text-foreground/75 text-sm leading-relaxed">
                  &ldquo;{t.text}&rdquo;
                </p>

                {/* Author */}
                <div className="relative z-10 mt-5 flex items-center gap-3 pt-4 border-t border-border/50">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm flex-shrink-0"
                    style={{
                      background: "linear-gradient(135deg, hsl(185 100% 40%), hsl(185 100% 30%))",
                    }}
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{t.name}</p>
                    <p className="text-muted-foreground text-xs">{t.location}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
