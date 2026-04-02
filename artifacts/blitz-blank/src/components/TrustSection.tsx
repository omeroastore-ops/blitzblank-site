import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const reasons = [
  { title: "Zuverlässig & termintreu", desc: "Pünktlichkeit ist unsere Garantie" },
  { title: "Gründlich & professionell", desc: "Kein Detail wird übersehen" },
  { title: "Flexible Termine", desc: "Auch kurzfristig verfügbar" },
  { title: "Privat & Gewerbe", desc: "Erfahrung in allen Bereichen" },
  { title: "Moderne Methoden", desc: "Neueste Reinigungstechnik" },
  { title: "Persönlicher Service", desc: "Direkter Ansprechpartner" },
  { title: "Faire Preise", desc: "Transparent und ohne versteckte Kosten" },
  { title: "Regionale Nähe", desc: "Ihr Partner in der Region" }
];

export function TrustSection() {
  return (
    <section id="vorteile" className="py-24 bg-secondary/30 border-y border-border relative overflow-hidden" data-testid="section-vorteile">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary font-semibold tracking-widest text-sm uppercase mb-4">Warum BlitzBlank?</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">Warum Kunden uns vertrauen</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="bg-card/50 backdrop-blur-sm border-white/5 hover:bg-card/80 transition-colors">
                <CardContent className="p-6 flex flex-col items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                  <div>
                    <h3 className="font-bold text-foreground mb-1">{reason.title}</h3>
                    <p className="text-sm text-muted-foreground">{reason.desc}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
