import { motion } from "framer-motion";
import { MessageCircle, Sparkles, Cake, Heart, Star, ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

const WA_NUMBER = "917000096818";

function openWhatsApp() {
  const msg = encodeURIComponent(
    "Hi Sweet Aroma! 🎂 I'd like to order a custom cake. Can you help me?"
  );
  window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, "_blank", "noopener,noreferrer");
}

const highlights = [
  { icon: Cake,     label: "Custom shapes & sizes" },
  { icon: Heart,    label: "Personalised messages" },
  { icon: Sparkles, label: "Premium finishes" },
  { icon: Star,     label: "Fresh-baked to order" },
];

export function Customizer() {
  return (
    <section id="customize" className="relative py-20 md:py-28 overflow-hidden">
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-caramel/12 blur-3xl" />
      <div className="pointer-events-none absolute left-0 bottom-0 h-[400px] w-[400px] rounded-full bg-blush/20 blur-3xl" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* Header */}
        <Reveal>
          <div className="text-center">
            <span className="chip">Design Studio</span>
            <h2 className="mt-3 font-display text-[clamp(2rem,5vw,3.4rem)] leading-tight">
              Want something{" "}
              <motion.span
                className="font-script text-rose inline-block"
                whileInView={{ scale: [0.9, 1.06, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                unique?
              </motion.span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-muted-foreground text-base leading-relaxed">
              Tell us your vision — shape, flavor, message, occasion — and we'll bake it
              exactly the way you dreamed it.
            </p>
          </div>
        </Reveal>

        {/* Highlight pills */}
        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap justify-center gap-2.5">
            {highlights.map(({ icon: Icon, label }) => (
              <motion.div
                key={label}
                whileHover={{ y: -3, scale: 1.04 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium shadow-soft"
              >
                <Icon size={14} className="text-rose" />
                {label}
              </motion.div>
            ))}
          </div>
        </Reveal>

        {/* CTA card */}
        <Reveal delay={0.18}>
          <div className="mt-10 soft-card overflow-hidden">
            {/* Gradient top strip */}
            <div className="h-1.5 w-full bg-gradient-to-r from-rose via-caramel to-rose animate-gradient" />

            <div className="p-8 sm:p-12 text-center">
              {/* Animated icon */}
              <motion.div
                className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-blush to-petal shadow-[0_8px_28px_-8px_rgba(203,94,111,0.35)]"
                animate={{
                  boxShadow: [
                    "0 8px 28px -8px rgba(203,94,111,0.25)",
                    "0 12px 40px -8px rgba(203,94,111,0.5)",
                    "0 8px 28px -8px rgba(203,94,111,0.25)",
                  ],
                }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <Cake size={34} className="text-rose" />
              </motion.div>

              <h3 className="font-display text-2xl sm:text-3xl">
                Let's create your cake together
              </h3>
              <p className="mx-auto mt-3 max-w-sm text-muted-foreground text-sm leading-relaxed">
                Share your ideas — flavors, size, occasion, reference photos — and we'll come
                back to you with a quote within a few hours.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <motion.button
                  onClick={openWhatsApp}
                  className="btn-wa w-full sm:w-auto px-8 py-4 text-base"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <MessageCircle size={20} />
                  Connect with us on WhatsApp
                </motion.button>
                <motion.a
                  href="#catalog"
                  className="btn-ghost w-full sm:w-auto px-6 py-4 text-base"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Browse Cakes <ArrowRight size={16} />
                </motion.a>
              </div>

              <p className="mt-5 text-xs text-muted-foreground">
                Usually replies within 2–3 hours · WhatsApp only
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
