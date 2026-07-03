import { MapPin, Heart, Award, Leaf } from "lucide-react";
import { Reveal } from "./Reveal";

export function About() {
  return (
    <section id="story" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <Reveal>
            <span className="chip">Our Story</span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl leading-tight">
              A tiny kitchen. A big obsession with{" "}
              <span className="font-script text-rose">flavour</span>.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Sweet Aroma began as a weekend hobby and grew into a beloved home bakery in Khandwa.
              Every cake is baked-to-order, hand-decorated, and made with fresh, local ingredients —
              the same way we'd bake for our own family.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="chip animate-pulse-ring">🎂 Currently Accepting Orders</span>
              <span className="chip"><MapPin size={12} /> Khandwa, MP</span>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Heart, title: "Handcrafted", copy: "Every layer piped and finished by hand." },
                { icon: Leaf, title: "Fresh Daily", copy: "Baked on the morning of your event." },
                { icon: Award, title: "Custom Design", copy: "Bring us your reference — we'll bring it to life." },
                { icon: MapPin, title: "Local Delivery", copy: "Doorstep delivery across Khandwa city." },
              ].map((f) => (
                <div key={f.title} className="soft-card p-5 transition hover:-translate-y-1 hover:shadow-lift">
                  <f.icon className="text-rose" size={22} />
                  <div className="mt-3 font-display text-xl">{f.title}</div>
                  <p className="mt-1 text-sm text-muted-foreground">{f.copy}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
