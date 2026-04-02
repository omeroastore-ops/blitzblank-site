import { motion } from "framer-motion";
import { Sparkles, Trees, Grid2x2, Droplets, Building2, Layers, HardHat, Package, CalendarCheck } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const services = [
  { icon: Sparkles, title: "Glasreinigung", desc: "Streifenfreie Glasflächen innen & außen" },
  { icon: Trees, title: "Wintergarten Reinigung", desc: "Professionelle Reinigung aller Wintergartentypen" },
  { icon: Grid2x2, title: "Terrassenreinigung", desc: "Hochdruckreinigung für perfekte Außenbereiche" },
  { icon: Droplets, title: "Dachrinnenreinigung", desc: "Sichere Entfernung von Laub und Schmutz" },
  { icon: Building2, title: "Büroreinigung", desc: "Saubere Arbeitsumgebungen für Teams" },
  { icon: Layers, title: "Treppenhausreinigung", desc: "Gepflegte Gemeinschaftsflächen" },
  { icon: HardHat, title: "Baureinigung", desc: "Professionelle Bauendreinigung nach Maß" },
  { icon: Package, title: "Umzugsreinigung", desc: "Besenrein bis blitzsauber auf Wunsch" },
  { icon: CalendarCheck, title: "Unterhaltsreinigung", desc: "Regelmäßige Pflege im Abonnement" },
];

export function ServicesSection() {
  return (
    <section id="leistungen" className="py-32 bg-background relative" data-testid="section-leistungen">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-primary font-semibold tracking-widest text-sm uppercase mb-4">Unsere Leistungen</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">Was wir für Sie reinigen</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="group relative bg-card border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 overflow-hidden" data-testid={`services-card-${service.title.toLowerCase().replace(/\s+/g, '-')}`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <CardContent className="p-8 relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                      <Icon className="w-7 h-7 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{service.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
