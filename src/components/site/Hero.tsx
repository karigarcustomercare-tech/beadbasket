import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Cake, Cherry } from "lucide-react";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

const slides = [
  { img: hero1, tag: "Signature", title: "Chocolate Berry Drip" },
  { img: hero2, tag: "Bestseller", title: "Blush Rose Buttercream" },
  { img: hero3, tag: "New", title: "Rustic Caramel Layered" },
];

export function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* floating accents */}
      <Sparkles className="pointer-events-none absolute left-[8%] top-32 text-caramel/60 animate-float" size={26} />
      <Cherry className="pointer-events-none absolute right-[10%] top-40 text-rose/70 animate-float" size={28} style={{ animationDelay: "-2s" }} />
      <Cake className="pointer-events-none absolute left-[15%] bottom-16 text-cocoa/40 animate-float" size={22} style={{ animationDelay: "-4s" }} />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="relative">
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="chip">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-rose opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-rose" />
            </span>
            Now accepting orders · Khandwa, MP
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-5 font-display text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.05] text-foreground">
            Bespoke cakes,{" "}
            <span className="font-script text-rose">baked</span> with love.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }}
            className="mt-6 max-w-lg text-lg text-muted-foreground">
            A home bakery in the heart of Khandwa crafting Instagram-worthy cakes and desserts for the moments that matter most.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.7 }}
            className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#catalog" className="btn-primary">Order Now <ArrowRight size={16} /></a>
            <a href="#customize" className="btn-ghost">Customize Your Cake</a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="mt-10 flex items-center gap-8 text-sm text-muted-foreground">
            <div><div className="font-display text-2xl text-foreground">500+</div>happy orders</div>
            <div className="h-8 w-px bg-border" />
            <div><div className="font-display text-2xl text-foreground">4.9★</div>customer rating</div>
            <div className="h-8 w-px bg-border" />
            <div><div className="font-display text-2xl text-foreground">100%</div>eggless option</div>
          </motion.div>
        </div>

        {/* Rotating showcase */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-[4/5] w-full">
            <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-blush via-cream to-caramel/40 blur-2xl opacity-60" />
            <div className="relative h-full w-full overflow-hidden rounded-[2rem] shadow-lift border border-white/60">
              <AnimatePresence mode="wait">
                <motion.img
                  key={i}
                  src={slides[i].img}
                  alt={slides[i].title}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
                  className="h-full w-full object-cover"
                  width={1600} height={1200}
                />
              </AnimatePresence>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-cocoa/70 via-cocoa/10 to-transparent p-6 pt-16">
                <AnimatePresence mode="wait">
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="text-cream">
                    <span className="chip">{slides[i].tag}</span>
                    <div className="mt-2 font-display text-2xl">{slides[i].title}</div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* dots */}
            <div className="absolute -bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
              {slides.map((_, idx) => (
                <button key={idx} onClick={() => setI(idx)}
                  className={`h-1.5 rounded-full transition-all ${idx === i ? "w-8 bg-primary" : "w-3 bg-border"}`}
                  aria-label={`Slide ${idx+1}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
