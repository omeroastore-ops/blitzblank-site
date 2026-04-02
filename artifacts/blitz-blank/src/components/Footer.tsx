import { Zap, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[hsl(220_15%_6%)] border-t border-border py-16" data-testid="footer">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-card border border-border flex items-center justify-center">
                <Zap className="text-primary w-4 h-4" />
              </div>
              <div>
                <span className="text-lg font-bold block leading-none">BlitzBlank</span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Glas- & Gebäudereinigung</span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Professionelle Glas- und Gebäudereinigung in Wittmund und Umgebung. Streifenfrei. Zuverlässig. Eindrucksvoll.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-bold text-foreground mb-5 text-sm uppercase tracking-widest">Leistungen</h4>
            <ul className="flex flex-col gap-2.5">
              {[
                "Glasreinigung",
                "Wintergarten Reinigung",
                "Terrassenreinigung",
                "Dachrinnenreinigung",
                "Büroreinigung",
                "Baureinigung",
              ].map((item) => (
                <li key={item}>
                  <a href="#leistungen" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-foreground mb-5 text-sm uppercase tracking-widest">Kontakt</h4>
            <div className="flex flex-col gap-3">
              <a href="tel:+4917620970960" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors text-sm group">
                <Phone className="w-4 h-4 text-primary" />
                +49 176 20970960
              </a>
              <div className="flex items-start gap-3 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>An d. Harle 9,<br />26409 Wittmund, Niedersachsen</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-xs">
            &copy; 2025 BlitzBlank Glas- & Gebäudereinigung. Alle Rechte vorbehalten.
          </p>
          <p className="text-muted-foreground text-xs">Wittmund, Niedersachsen</p>
        </div>
      </div>
    </footer>
  );
}
