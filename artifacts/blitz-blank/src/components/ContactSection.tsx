import { motion } from "framer-motion";
import { Phone, MapPin, MessageCircle, Zap, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(2, "Bitte geben Sie Ihren Namen ein"),
  phone: z.string().min(5, "Bitte geben Sie Ihre Telefonnummer ein"),
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein"),
  message: z.string().min(10, "Bitte beschreiben Sie Ihr Anliegen kurz"),
});

type FormValues = z.infer<typeof formSchema>;

const contactCards = [
  {
    icon: Phone,
    label: "Telefon",
    value: "+49 176 20970960",
    href: "tel:+4917620970960",
    desc: "Direkt anrufen",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Direkt schreiben",
    href: "https://wa.me/4917620970960",
    desc: "Schnelle Antwort",
  },
  {
    icon: MapPin,
    label: "Standort",
    value: "An d. Harle 9",
    href: "https://maps.google.com/?q=An+d.+Harle+9,+26409+Wittmund",
    desc: "26409 Wittmund",
  },
  {
    icon: Zap,
    label: "Reaktionszeit",
    value: "Innerhalb 2 Stunden",
    href: undefined,
    desc: "In der Regel",
  },
];

export function ContactSection() {
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", phone: "", email: "", message: "" },
  });

  const onSubmit = (_data: FormValues) => {
    toast({
      title: "Vielen Dank!",
      description: "Wir melden uns zeitnah bei Ihnen. In der Regel innerhalb von 2 Stunden.",
    });
    form.reset();
  };

  return (
    <section id="kontakt" className="py-32 bg-background relative overflow-hidden" data-testid="section-kontakt">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(185_100%_45%/0.05)_0%,_transparent_70%)]" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-primary font-semibold tracking-widest text-sm uppercase mb-4">Kontakt</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Bereit für blitzsaubere Ergebnisse?
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Fordern Sie jetzt Ihr kostenloses Angebot an. Wir melden uns schnell bei Ihnen.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactCards.map((card, i) => {
                const Icon = card.icon;
                const content = (
                  <div
                    key={i}
                    className="group p-6 bg-card border border-border rounded-2xl hover:border-primary/40 transition-all duration-300 hover:shadow-[0_4px_30px_hsl(185_100%_45%/0.1)]"
                    data-testid={`contact-card-${i}`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center mb-4 group-hover:bg-primary/25 transition-colors">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">{card.label}</p>
                    <p className="font-bold text-foreground">{card.value}</p>
                    <p className="text-muted-foreground text-sm mt-1">{card.desc}</p>
                  </div>
                );

                return card.href ? (
                  <a href={card.href} target={card.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" key={i}>
                    {content}
                  </a>
                ) : (
                  <div key={i}>{content}</div>
                );
              })}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-10 bg-card border border-border rounded-3xl"
          >
            <h3 className="text-2xl font-bold text-foreground mb-8">Angebot anfordern</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Ihr vollständiger Name" {...field} data-testid="contact-input-name" className="bg-secondary border-border focus:border-primary" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefon</FormLabel>
                      <FormControl>
                        <Input placeholder="+49 ..." type="tel" {...field} data-testid="contact-input-phone" className="bg-secondary border-border focus:border-primary" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-Mail</FormLabel>
                      <FormControl>
                        <Input placeholder="ihre@email.de" type="email" {...field} data-testid="contact-input-email" className="bg-secondary border-border focus:border-primary" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nachricht</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Was können wir für Sie reinigen? Kurze Beschreibung des Objekts..."
                          rows={4}
                          {...field}
                          data-testid="contact-input-message"
                          className="bg-secondary border-border focus:border-primary resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-base h-14 rounded-xl mt-2 group relative overflow-hidden"
                  data-testid="contact-form-submit"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Jetzt Angebot anfordern
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
