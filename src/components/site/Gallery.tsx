import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, MessageCircle, ChevronLeft, ChevronRight, X } from "lucide-react";
import { cakes } from "@/data/cakes";
import { Reveal } from "./Reveal";

const items = cakes.map((c, i) => ({
  img: c.image,
  name: c.name,
  likes: 120 + i * 27,
  comments: 8 + (i % 5) * 3,
}));

export function Gallery() {
  const [i, setI] = useState<number | null>(null);
  const close = () => setI(null);
  const prev = () => setI((v) => (v === null ? v : (v - 1 + items.length) % items.length));
  const next = () => setI((v) => (v === null ? v : (v + 1) % items.length));

  return (
    <section id="gallery" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="chip">The Feed</span>
              <h2 className="mt-3 font-display text-4xl md:text-5xl">Fresh from the oven</h2>
            </div>
            <a href="https://instagram.com/.sweet_aroma." target="_blank" rel="noreferrer"
               className="text-sm font-semibold text-rose hover:underline">@.sweet_aroma. →</a>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-3 lg:grid-cols-4">
            {items.map((it, idx) => (
              <button key={idx} onClick={() => setI(idx)}
                className="group relative aspect-square overflow-hidden rounded-2xl">
                <img src={it.img} alt={it.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 flex items-center justify-center gap-6 bg-cocoa/60 text-cream opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="flex items-center gap-1 font-semibold"><Heart size={16} fill="currentColor" /> {it.likes}</span>
                  <span className="flex items-center gap-1 font-semibold"><MessageCircle size={16} /> {it.comments}</span>
                </div>
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      <AnimatePresence>
        {i !== null && (
          <motion.div
            className="fixed inset-0 z-[90] grid place-items-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-cocoa/80 backdrop-blur-sm" onClick={close} />
            <button onClick={prev} className="absolute left-4 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-cream/90 hover:bg-blush"><ChevronLeft /></button>
            <button onClick={next} className="absolute right-4 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-cream/90 hover:bg-blush"><ChevronRight /></button>
            <button onClick={close} className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-cream/90 hover:bg-blush"><X /></button>
            <motion.img
              key={i}
              src={items[i].img} alt={items[i].name}
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35 }}
              className="relative z-0 max-h-[80vh] max-w-[90vw] rounded-2xl shadow-lift object-contain" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
