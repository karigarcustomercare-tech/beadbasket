import { useState } from "react";
import { MapPin, Clock, Instagram, MessageCircle, Send, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { toast } from "sonner";

const WA = "https://wa.me/917000096818";

export function Contact() {
  const [sending, setSending] = useState(false);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Message sent! We'll be in touch on WhatsApp soon 💌");
      (e.target as HTMLFormElement).reset();
    }, 900);
  };

  return (
    <section id="contact" className="relative py-20 md:py-28 overflow-hidden">
      <div className="pointer-events-none absolute -bottom-20 left-1/2 -translate-x-1/2 h-[400px] w-[700px] rounded-full bg-blush/22 blur-3xl" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="text-center">
            <span className="chip">Get in Touch</span>
            <h2 className="mt-3 font-display text-[clamp(2rem,5vw,3.2rem)]">
              Let's bake something{" "}
              <motion.span
                className="font-script text-rose inline-block"
                whileInView={{ scale: [0.9, 1.05, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                unforgettable
              </motion.span>
            </h2>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_1fr]">
          {/* ── Form ──────────────────────── */}
          <Reveal variant="slideLeft">
            <motion.form
              onSubmit={submit}
              className="soft-card p-6 sm:p-8 space-y-4"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Your name" name="name" required />
                <Field label="Phone" name="phone" type="tel" required />
              </div>
              <Field label="Occasion" name="occasion" placeholder="Birthday, anniversary…" />
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Tell us about your cake
                </label>
                <motion.textarea
                  name="msg"
                  rows={4}
                  required
                  whileFocus={{ scale: 1.005 }}
                  className="mt-2 w-full rounded-2xl border-[1.5px] border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose/30 focus:border-rose transition-shadow resize-none"
                  placeholder="Flavors, size, delivery date, design ideas…"
                />
              </div>
              <motion.button
                disabled={sending}
                type="submit"
                className="btn-primary w-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {sending ? (
                  <motion.span
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  >
                    Sending…
                  </motion.span>
                ) : (
                  <>Send Message <Send size={15} /></>
                )}
              </motion.button>
            </motion.form>
          </Reveal>

          {/* ── Info ──────────────────────── */}
          <Reveal delay={0.1} variant="slideRight">
            <div className="flex flex-col gap-4 h-full">
              {[
                {
                  icon: MapPin,
                  title: "Visit our kitchen",
                  copy: "Khandwa, Madhya Pradesh — pickup by appointment.",
                },
                {
                  icon: Clock,
                  title: "Business hours",
                  copy: "Mon–Sun · 10 AM – 9 PM · 24 hr advance notice",
                },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  className="soft-card p-5"
                  whileHover={{ y: -3, boxShadow: "0 20px 50px -16px rgba(60,30,20,0.18)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                >
                  <div className="flex items-start gap-3.5">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blush">
                      <item.icon size={17} className="text-rose" />
                    </span>
                    <div>
                      <div className="font-semibold text-sm">{item.title}</div>
                      <div className="text-sm text-muted-foreground mt-0.5">{item.copy}</div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Social quick links */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Instagram,     href: "https://instagram.com/.sweet_aroma.", label: "Instagram", sub: "@.sweet_aroma." },
                  { icon: MessageCircle, href: WA, label: "WhatsApp", sub: "Fastest replies" },
                ].map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="soft-card flex flex-col gap-2 p-5"
                    whileHover={{ y: -5, boxShadow: "0 24px 60px -20px rgba(60,30,20,0.22)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  >
                    <s.icon className="text-rose" size={20} />
                    <div className="font-semibold text-sm">{s.label}</div>
                    <div className="text-xs text-muted-foreground">{s.sub}</div>
                  </motion.a>
                ))}
              </div>

              {/* Map */}
              <div className="soft-card overflow-hidden flex-1 min-h-[160px]">
                <iframe
                  title="Khandwa map"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=76.30%2C21.79%2C76.42%2C21.86&layer=mapnik&marker=21.8257,76.3527"
                  className="h-40 w-full border-0"
                  loading="lazy"
                />
                <div className="flex items-center justify-between px-3 py-2.5 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Phone size={11} /> By appointment
                  </span>
                  <a
                    className="text-rose hover:underline"
                    href="https://www.openstreetmap.org/?mlat=21.8257&mlon=76.3527#map=13/21.8257/76.3527"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open in maps ↗
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label, name, type = "text", required, placeholder,
}: {
  label: string; name: string; type?: string; required?: boolean; placeholder?: string;
}) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <motion.input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        whileFocus={{ scale: 1.005 }}
        className="mt-2 w-full rounded-2xl border-[1.5px] border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose/30 focus:border-rose transition-shadow"
      />
    </div>
  );
}
