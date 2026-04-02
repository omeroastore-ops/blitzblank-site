import { motion } from "framer-motion";
import { Star } from "lucide-react";

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
        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="py-32 bg-background relative overflow-hidden" data-testid="section-bewertungen">
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <p className="text-primary font-semibold tracking-widest text-sm uppercase mb-4">Kundenstimmen</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">Was unsere Kunden sagen</h2>
        </motion.div>

        {/* Google Rating Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mb-16"
        >
          <div className="inline-flex items-center gap-3 bg-card border border-border rounded-full px-6 py-3 shadow-lg">
            <div className="flex">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <span className="font-bold text-foreground">4,9 / 5 bei Google</span>
            <span className="text-muted-foreground text-sm">· 34 Bewertungen</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative p-6 bg-card/60 backdrop-blur-sm border border-border rounded-2xl hover:border-primary/30 hover:bg-card/80 transition-all duration-300 hover:shadow-[0_8px_40px_hsl(185_100%_45%/0.08)]"
              data-testid={`testimonial-${i}`}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                <StarRating rating={t.rating} />
                <p className="mt-4 text-foreground/80 text-sm leading-relaxed italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
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
