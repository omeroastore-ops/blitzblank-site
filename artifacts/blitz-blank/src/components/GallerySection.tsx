import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import img1 from "@assets/IMG_5981_1775145254574.png";
import img2 from "@assets/IMG_5982_1775145254574.png";
import img3 from "@assets/IMG_5983_1775145254574.png";
import img4 from "@assets/IMG_5984_1775145254574.png";
import img5 from "@assets/IMG_5985_1775145254574.png";
import img6 from "@assets/IMG_5987_1775145254574.jpeg";

const images = [
  { src: img6, alt: "BlitzBlank Firmenfahrzeug", label: "Unser Fahrzeug", featured: true },
  { src: img1, alt: "Professionelle Glasreinigung", label: "Glasreinigung" },
  { src: img4, alt: "Gebäudereinigung Außen", label: "Gebäudereinigung" },
  { src: img5, alt: "Terrassenreinigung Vorher Nachher", label: "Terrassenreinigung" },
  { src: img2, alt: "Professioneller Einsatz", label: "Einsatz vor Ort" },
  { src: img3, alt: "Wintergarten & Dach Reinigung", label: "Wintergarten" },
];

export function GallerySection() {
  return (
    <section id="galerie" className="py-32 bg-background relative overflow-hidden" data-testid="section-galerie">
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-primary/3 blur-[150px] rounded-full pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-primary font-semibold tracking-widest text-sm uppercase mb-4">Galerie</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">Einblicke in unsere Arbeit</h2>
          <p className="mt-4 text-muted-foreground">Qualität, die man sehen kann</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[220px] md:auto-rows-[260px]">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`relative group rounded-2xl overflow-hidden border border-border ${
                img.featured ? "col-span-2 row-span-2" : ""
              }`}
              data-testid={`gallery-image-${i}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400" />
              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-white font-semibold text-sm">BlitzBlank — {img.label}</span>
                </div>
              </div>
              {/* Featured badge */}
              {img.featured && (
                <div className="absolute top-4 left-4 bg-primary/90 text-primary-foreground text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                  Unser Team
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
