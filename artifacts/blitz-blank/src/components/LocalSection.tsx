import { motion } from "framer-motion";
import { MapPin, Clock, Phone, Zap } from "lucide-react";

const areas = ["Wittmund", "Aurich", "Norden", "Esens", "Jever", "Sande", "Wilhelmshaven", "und mehr"];

const hours = [
  { day: "Mo – Fr", time: "07:30 – 18:00 Uhr" },
  { day: "Samstag", time: "07:30 – 18:00 Uhr" },
  { day: "Sonntag", time: "Geschlossen" },
];

export function LocalSection() {
  return (
    <section className="py-32 bg-secondary/20 border-y border-border relative overflow-hidden" data-testid="section-region">
      {/* Stylized map background pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(185 100% 45%) 1px, transparent 1px),
            linear-gradient(90deg, hsl(185 100% 45%) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px"
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_hsl(220_15%_8%)_100%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-primary font-semibold tracking-widest text-sm uppercase mb-4">Unser Einzugsgebiet</p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Ihr regionaler Reinigungspartner
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Wir sind für Sie da in Wittmund und der gesamten Umgebung. Schnelle Reaktionszeiten — oft noch am selben Tag.
            </p>

            {/* Location */}
            <div className="flex items-start gap-4 mb-6 p-5 bg-card border border-border rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Standort</p>
                <p className="text-muted-foreground text-sm mt-1">An d. Harle 9, 26409 Wittmund, Niedersachsen</p>
              </div>
            </div>

            {/* Service areas */}
            <div className="flex flex-wrap gap-2 mb-8">
              {areas.map((area) => (
                <span
                  key={area}
                  className="px-3 py-1.5 bg-card border border-border rounded-full text-sm text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors"
                >
                  {area}
                </span>
              ))}
            </div>

            {/* CTA Phone */}
            <a
              href="tel:+4917620970960"
              className="inline-flex items-center gap-3 bg-primary text-primary-foreground font-bold text-lg px-8 py-4 rounded-full hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_30px_hsl(185_100%_45%/0.4)] group"
              data-testid="local-phone-cta"
            >
              <Phone className="w-5 h-5" />
              +49 176 20970960
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            {/* Opening hours */}
            <div className="p-8 bg-card border border-border rounded-3xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Öffnungszeiten</h3>
              </div>
              <div className="flex flex-col gap-3">
                {hours.map((h) => (
                  <div key={h.day} className="flex justify-between items-center py-3 border-b border-border last:border-0">
                    <span className="text-foreground font-medium">{h.day}</span>
                    <span className={`font-semibold ${h.time === "Geschlossen" ? "text-muted-foreground" : "text-primary"}`}>
                      {h.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Promise card */}
            <div className="p-6 bg-primary/10 border border-primary/20 rounded-2xl flex items-start gap-4">
              <Zap className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-foreground mb-1">Schnelle Reaktionszeit</p>
                <p className="text-muted-foreground text-sm">Oft noch am selben Tag verfügbar. Wir melden uns in der Regel innerhalb von 2 Stunden.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
