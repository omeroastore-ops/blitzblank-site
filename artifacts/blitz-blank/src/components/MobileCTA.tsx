import { Phone, MessageCircle } from "lucide-react";

export function MobileCTA() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/90 backdrop-blur-md border-t border-border py-3 px-4"
      data-testid="mobile-cta-bar"
    >
      <div className="flex gap-3 max-w-sm mx-auto">
        <a
          href="tel:+4917620970960"
          className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold py-3 rounded-xl text-sm hover:bg-primary/90 transition-colors"
          data-testid="mobile-cta-phone"
        >
          <Phone className="w-4 h-4" />
          Jetzt anrufen
        </a>
        <a
          href="https://wa.me/4917620970960"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-3 rounded-xl text-sm hover:bg-[#25D366]/90 transition-colors"
          data-testid="mobile-cta-whatsapp"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
