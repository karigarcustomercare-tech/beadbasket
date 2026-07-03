import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { MapPin, Heart, Award, Leaf, ChefHat, Sparkles } from "lucide-react";
import { Reveal, RevealStagger, RevealItem } from "./Reveal";

const features = [
  {
    icon: Heart,
    title: "Handcrafted",
    copy: "Every layer piped and finished by hand with care.",
    color: "bg-rose/10 text-rose",
  },
  {
    icon: Leaf,
    title: "Fresh Daily",
    copy: "Baked on the morning of your event — never day-old.",
    color: "bg-blush text-rose",
  },
  {
    icon: Award,
    title: "Custom Design",
    copy: "Bring your reference — we'll bring it to life.",
    color: "bg-gold/15 text-caramel",
  },
  {
    icon: MapPin,
    title: "Local Delivery",
    copy: "Doorstep delivery across Khandwa city.",
    color: "bg-blue-50 text-blue-500",
  },
];

const stats = [
  { value: 500, suffix: "+", label: "Happy customers" },
  { value: 4,   suffix: ".9★", label: "Average rating" },
  { value: 3,   suffix: "+",   label: "Years of baking" },
  { value: 100, suffix: "%",   label: "Eggless available" },
];

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const ref    = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const mv     = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v));

  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(mv, target, { duration: 1.6, ease: [0.2, 0.8, 0.2, 1] });
    return () => ctrl.stop();
  }, [inView, mv, target]);

  return (
    <span ref={ref} className="font-display text-3xl sm:text-4xl font-semibold text-foreground tabular-nums">
      <motion.span>{rounded}</motion.span>{suffix}
    </span>
  );
}

export function About() {
  return (
    <section id="story" className="relative py-20 md:py-28 overflow-hidden">
      {/* Accent blobs */}
      <div className="pointer-events-none absolute -right-32 top-0 h-[500px] w-[500px] rounded-full bg-blush/30 blur-3xl" />
      <div className="pointer-events-none absolute left-0 bottom-0 h-[300px] w-[300px] rounded-full bg-caramel/10 blur-3xl" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        {/* ── Stats row ──────────────────────────── */}
        <Reveal variant="fadeUp">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {stats.map((s) => (
              <motion.div
                key={s.label}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="glass-card p-5 text-center hover-card"
              >
                <AnimatedNumber target={s.value} suffix={s.suffix} />
                <p className="mt-1 text-xs text-muted-foreground font-medium">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </Reveal>

        {/* ── Main 2-col ─────────────────────────── */}
        <div className="grid gap-12 lg:grid-cols-2 items-center">

          {/* Left — story ─────────────────── */}
          <Reveal variant="slideLeft">
            <div>
              <span className="chip">Our Story</span>
              <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.2rem)] leading-tight">
                A tiny kitchen.{" "}
                <br />
                A big obsession with{" "}
                <motion.span
                  className="font-script text-rose inline-block"
                  whileInView={{ scale: [0.9, 1.06, 1] }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  flavour
                </motion.span>
                .
              </h2>
              <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
                Sweet Aroma began as a weekend hobby and grew into a beloved home bakery in
                Khandwa. Every cake is baked-to-order, hand-decorated, and made with fresh,
                local ingredients — the same way we'd bake for our own family.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <motion.span
                  className="chip"
                  animate={{ boxShadow: ["0 0 0 0 rgba(203,94,111,0)", "0 0 0 8px rgba(203,94,111,0.18)", "0 0 0 0 rgba(203,94,111,0)"] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  🎂 Currently Accepting Orders
                </motion.span>
                <span className="chip">
                  <MapPin size={11} /> Khandwa, MP
                </span>
              </div>

              {/* Mini highlight row */}
              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  { icon: ChefHat, text: "Home-baked" },
                  { icon: Sparkles, text: "Custom designs" },
                  { icon: Leaf,     text: "Fresh ingredients" },
                ].map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    className="flex items-center gap-2 rounded-full border border-border/70 bg-card px-3.5 py-2 text-sm font-medium"
                  >
                    <Icon size={13} className="text-rose" />
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Right — feature cards ─────────── */}
          <RevealStagger className="grid grid-cols-2 gap-3 sm:gap-4" stagger={0.1} delay={0.08}>
            {features.map((f) => (
              <RevealItem key={f.title}>
                <motion.div
                  className="soft-card p-5 h-full cursor-default"
                  whileHover={{ y: -6, boxShadow: "0 24px 60px -20px rgba(60,30,20,0.22)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <motion.div
                    className={`inline-grid h-10 w-10 place-items-center rounded-xl ${f.color}`}
                    whileHover={{ rotate: [0, -8, 8, 0], scale: 1.15 }}
                    transition={{ duration: 0.5 }}
                  >
                    <f.icon size={20} />
                  </motion.div>
                  <div className="mt-3 font-display text-lg">{f.title}</div>
                  <p className="mt-1 text-sm text-muted-foreground leading-snug">{f.copy}</p>
                </motion.div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </div>
    </section>
  );
}
