import { useState } from "react";
import { MapPin, Clock, Instagram, MessageCircle, Send, Phone } from "lucide-react";
import { Reveal } from "./Reveal";
import { toast } from "sonner";

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
    <section id="contact" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="text-center">
            <span className="chip">Get in Touch</span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">Let's bake something <span className="font-script text-rose">unforgettable</span></h2>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <form onSubmit={submit} className="soft-card p-6 md:p-8 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Your name" name="name" required />
                <Field label="Phone" name="phone" type="tel" required />
              </div>
              <Field label="Occasion" name="occasion" placeholder="Birthday, anniversary…" />
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tell us about your cake</label>
                <textarea name="msg" rows={4} required
                  className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose"
                  placeholder="Flavors, size, delivery date, design ideas…" />
              </div>
              <button disabled={sending} className="btn-primary w-full">
                {sending ? "Sending…" : <>Send Message <Send size={16} /></>}
              </button>
            </form>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-4">
              <div className="soft-card p-6">
                <div className="flex items-start gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-blush"><MapPin size={18} className="text-rose" /></span>
                  <div>
                    <div className="font-semibold">Visit our kitchen</div>
                    <div className="text-sm text-muted-foreground">Khandwa, Madhya Pradesh — pickup by appointment.</div>
                  </div>
                </div>
              </div>
              <div className="soft-card p-6">
                <div className="flex items-start gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-blush"><Clock size={18} className="text-rose" /></span>
                  <div>
                    <div className="font-semibold">Business hours</div>
                    <div className="text-sm text-muted-foreground">Mon–Sun · 10 AM – 9 PM · 24 hr advance notice</div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <a href="https://instagram.com/.sweet_aroma." target="_blank" rel="noreferrer"
                  className="soft-card group flex flex-col gap-2 p-6 transition hover:-translate-y-1 hover:shadow-lift">
                  <Instagram className="text-rose" />
                  <div className="font-semibold">Instagram</div>
                  <div className="text-xs text-muted-foreground">@.sweet_aroma.</div>
                </a>
                <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer"
                  className="soft-card group flex flex-col gap-2 p-6 transition hover:-translate-y-1 hover:shadow-lift">
                  <MessageCircle className="text-rose" />
                  <div className="font-semibold">WhatsApp</div>
                  <div className="text-xs text-muted-foreground">Fastest replies</div>
                </a>
              </div>
              <div className="soft-card overflow-hidden">
                <iframe
                  title="Khandwa map"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=76.30%2C21.79%2C76.42%2C21.86&layer=mapnik&marker=21.8257,76.3527"
                  className="h-56 w-full border-0"
                  loading="lazy"
                />
                <div className="flex items-center justify-between p-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Phone size={12} /> By appointment</span>
                  <a className="text-rose hover:underline" href="https://www.openstreetmap.org/?mlat=21.8257&mlon=76.3527#map=13/21.8257/76.3527" target="_blank" rel="noreferrer">Open in maps ↗</a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", required, placeholder }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</label>
      <input name={name} type={type} required={required} placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose" />
    </div>
  );
}
