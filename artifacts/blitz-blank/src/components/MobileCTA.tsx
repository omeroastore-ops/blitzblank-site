import { Phone, MessageCircle } from "lucide-react";

export function MobileCTA() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      data-testid="mobile-cta-bar"
    >
      {/* Frosted glass bar */}
      <div
        className="bg-[hsl(220_15%_8%/0.88)] backdrop-blur-xl border-t border-white/8 px-4 pt-3 pb-3"
        style={{ boxShadow: "0 -8px 30px rgba(0,0,0,0.4)" }}
      >
        <div className="flex gap-2.5 max-w-sm mx-auto">
          <a
            href="tel:+4917620970960"
            className="flex-1 flex items-center justify-center gap-2 font-bold py-3 rounded-xl text-sm transition-all duration-200 active:scale-95"
            style={{
              background: "linear-gradient(135deg, hsl(185 100% 46%), hsl(185 100% 38%))",
              color: "hsl(220 15% 8%)",
              boxShadow: "0 0 20px hsl(185 100% 45% / 0.35)",
            }}
            data-testid="mobile-cta-phone"
          >
            <Phone className="w-4 h-4" />
            Jetzt anrufen
          </a>
          <a
            href="https://wa.me/4917620970960"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-[#22c55e]/90 text-white font-bold py-3 rounded-xl text-sm transition-all duration-200 active:scale-95 hover:bg-[#22c55e]"
            data-testid="mobile-cta-whatsapp"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
