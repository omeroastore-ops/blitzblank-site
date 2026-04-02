import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Zap, Menu, X } from "lucide-react";
import { Button } from "./ui/button";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/90 backdrop-blur-md border-b border-border py-4" : "bg-transparent py-6"
      }`}
      data-testid="nav-header"
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group" data-testid="nav-logo">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-card border border-border group-hover:border-primary/50 transition-colors">
            <Zap className="text-primary w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold leading-none tracking-tight">BlitzBlank</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Glas- & Gebäudereinigung</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {["Leistungen", "Vorteile", "Galerie", "Kontakt"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-primary after:origin-right after:scale-x-0 hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300"
              data-testid={`nav-link-${item.toLowerCase()}`}
            >
              {item}
            </a>
          ))}
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold" data-testid="nav-cta">
            <a href="#kontakt">Angebot anfragen</a>
          </Button>
        </nav>

        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          data-testid="nav-mobile-toggle"
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-background border-b border-border shadow-lg p-6 flex flex-col gap-6 md:hidden animate-in slide-in-from-top-4" data-testid="nav-mobile-menu">
          {["Leistungen", "Vorteile", "Galerie", "Kontakt"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-foreground"
            >
              {item}
            </a>
          ))}
          <Button asChild className="w-full bg-primary text-primary-foreground">
            <a href="#kontakt" onClick={() => setMobileMenuOpen(false)}>Angebot anfragen</a>
          </Button>
        </div>
      )}
    </header>
  );
}
