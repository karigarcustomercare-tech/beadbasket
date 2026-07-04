import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, MessageCircle, Star, Sparkles } from "lucide-react";

const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

const WA = "https://wa.me/917000096818";

const slides = [
  {
    img: "https://res.cloudinary.com/khmp53v2/image/upload/v1783110257/Screenshot_2026-07-04_at_1.52.44_AM_y9c1ta.png",
    tag: "Signature",
    title: "Chocolate Berry Drip",
    sub: "Dark Belgian ganache · Berry compote",
  },
  {
    img: "https://res.cloudinary.com/khmp53v2/image/upload/v1783110257/Screenshot_2026-07-04_at_1.53.10_AM_xrnkdw.png",
    tag: "Bestseller",
    title: "Blush Rose Buttercream",
    sub: "Silky Swiss meringue · Sugar roses",
  },
  {
    img: "https://res.cloudinary.com/khmp53v2/image/upload/v1783110258/Screenshot_2026-07-04_at_1.53.51_AM_orngok.png",
    tag: "New",
    title: "Rustic Caramel Layered",
    sub: "Toasted caramel · Praline crunch",
  },
];

const stats = [
  { value: "500+", label: "Happy orders" },
  { value: "4.9★", label: "Rating" },
  { value: "100%", label: "Eggless option" },
];

export function Hero() {
  const [idx, setIdx]         = useState(0);
  const [paused, setPaused]   = useState(false);
  const intervalRef           = useRef<ReturnType<typeof setInterval> | null>(null);

  const { scrollY }    = useScroll();
  // On mobile: no parallax, no opacity fade — both caused blank white sections on scroll
  const rawY           = useTransform(scrollY, isMobile ? [0, 1] : [0, 700], [0, isMobile ? 0 : 110]);
  const heroY          = useSpring(rawY, { stiffness: 60, damping: 20 });

  // Auto-advance slides
  useEffect(() => {
    if (!paused) {
      intervalRef.current = setInterval(
        () => setIdx((v) => (v + 1) % slides.length),
        4800
      );
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [paused]);

  const goTo = (i: number) => {
    setIdx(i);
    setPaused(true);
    setTimeout(() => setPaused(false), 8000);
  };

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex items-center overflow-hidden pt-20 pb-12 md:pt-28 md:pb-20"
    >
      {/* ── Ambient background blobs ─────────── */}
      {/* No blur() filter — replaced with radial-gradient to avoid mobile GPU compositing artifacts */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -top-40 -left-40 h-[700px] w-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, oklch(0.90 0.055 12 / 0.55) 0%, transparent 70%)" }} />
        <div className="absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, oklch(0.71 0.135 52 / 0.18) 0%, transparent 70%)" }} />
      </div>

      {/* ── Floating particles ───────────────── */}
      {[
        { x: "6%",  y: "20%", s: 7,  d: 0 },
        { x: "13%", y: "65%", s: 4,  d: 1.3 },
        { x: "90%", y: "18%", s: 6,  d: 0.7 },
        { x: "80%", y: "72%", s: 5,  d: 2.1 },
        { x: "50%", y: "88%", s: 8,  d: 1.6 },
        { x: "35%", y: "8%",  s: 4,  d: 3 },
      ].map(({ x, y, s, d }, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute rounded-full bg-rose/25"
          style={{ left: x, top: y, width: s, height: s }}
          animate={{ y: [0, -18, 0], opacity: [0.25, 0.7, 0.25], scale: [1, 1.5, 1] }}
          transition={{ duration: 3.5 + d, repeat: Infinity, delay: d, ease: "easeInOut" }}
        />
      ))}

      {/* ── Floating icon — Sparkles ─────────── */}
      <motion.div
        className="pointer-events-none absolute left-[7%] top-36 text-caramel/45 hidden sm:block"
        animate={{ y: [0, -16, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <Sparkles size={28} />
      </motion.div>
      <motion.div
        className="pointer-events-none absolute right-[9%] top-44 text-rose/50 hidden sm:block"
        animate={{ y: [0, -12, 0], rotate: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.8 }}
      >
        <Star size={22} fill="currentColor" />
      </motion.div>

      {/* ── Main grid ────────────────────────── */}
      <motion.div
        style={isMobile ? {} : { y: heroY }}
        className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-6 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-16"
      >
        {/* Left — copy ─────────────────────── */}
        <div className="relative text-center lg:text-left">
          {/* Status chip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-5"
          >
            <span className="chip">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-rose" />
              </span>
              Accepting orders · Khandwa, MP
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
            className="font-display text-[clamp(2rem,8vw,4.5rem)] font-medium leading-[1.06] text-foreground"
          >
            Cakes & Desserts,{" "}
            <br className="hidden sm:block" />
            <motion.span
              className="font-script text-rose inline-block"
              initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.55, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
            >
              baked
            </motion.span>{" "}
            with love.
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="mt-5 max-w-lg mx-auto lg:mx-0 text-[1.05rem] text-muted-foreground leading-relaxed"
          >
            A home bakery in the heart of Khandwa crafting Instagram-worthy cakes
            for the moments that matter most.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="mt-7 flex flex-wrap items-center justify-center lg:justify-start gap-3"
          >
            <motion.a
              href="#catalog"
              className="btn-primary text-base px-7 py-3.5"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Browse Cakes <ArrowRight size={16} />
            </motion.a>
            <motion.a
              href={WA}
              target="_blank"
              rel="noreferrer"
              className="btn-wa text-base px-6 py-3.5"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <MessageCircle size={16} />
              Order on WhatsApp
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85 }}
            className="mt-7 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3"
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85 + i * 0.1 }}
                className="flex flex-col items-center lg:items-start"
              >
                <span className="font-display text-2xl font-semibold text-foreground">{s.value}</span>
                <span className="text-xs text-muted-foreground mt-0.5">{s.label}</span>
              </motion.div>
            ))}
            <div className="hidden lg:block h-8 w-px bg-border" />
          </motion.div>
        </div>

        {/* Right — cake showcase ─────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative mx-auto w-full max-w-[300px] sm:max-w-[380px] lg:max-w-none"
        >
          {/* Glow ring — CSS gradient only, no blur filter (avoids mobile GPU compositing artifact) */}
          <div
            className="absolute -inset-8 rounded-[2.8rem]"
            style={{ background: "radial-gradient(ellipse at center, oklch(0.90 0.055 12 / 0.55) 0%, oklch(0.987 0.010 62 / 0.3) 50%, oklch(0.71 0.135 52 / 0.15) 100%)" }}
          />

          {/* Image card */}
          <div className="relative aspect-[3/4] sm:aspect-[4/5] w-full overflow-hidden rounded-[2.2rem] shadow-lift border border-white/50">
            <AnimatePresence mode="wait">
              <motion.img
                key={idx}
                src={slides[idx].img}
                alt={slides[idx].title}
                initial={{ opacity: 0, scale: 1.07 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.85, ease: [0.2, 0.8, 0.2, 1] }}
                className="h-full w-full object-cover"
                width={1200}
                height={1500}
              />
            </AnimatePresence>

            {/* Label overlay */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-cocoa/80 via-cocoa/20 to-transparent p-5 pt-16">
              <AnimatePresence mode="wait">
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.45 }}
                  className="text-cream"
                >
                  <span className="chip !bg-cream/15 !text-cream border border-cream/25 backdrop-blur-sm text-[10px]">
                    {slides[idx].tag}
                  </span>
                  <div className="mt-2 font-display text-2xl font-medium">{slides[idx].title}</div>
                  <div className="mt-0.5 text-xs text-cream/70">{slides[idx].sub}</div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Dot indicators */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Slide ${i + 1}`}
                className="focus-visible:outline-none"
              >
                <motion.span
                  className="block rounded-full bg-rose transition-all duration-300"
                  animate={{ width: i === idx ? 20 : 6, opacity: i === idx ? 1 : 0.35 }}
                  style={{ height: 6 }}
                />
              </button>
            ))}
          </div>

          {/* Floating badge — top right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
            className="absolute -right-3 top-8 sm:-right-6 glass-card px-3.5 py-2.5 text-center hidden sm:block"
          >
            <div className="font-display text-2xl text-rose">4.9</div>
            <div className="flex gap-0.5 justify-center mt-0.5">
              {Array.from({ length: 5 }).map((_, k) => (
                <Star key={k} size={9} className="text-gold" fill="currentColor" />
              ))}
            </div>
            <div className="text-[9px] text-muted-foreground mt-0.5 uppercase tracking-wider">Rating</div>
          </motion.div>

          {/* Floating badge — bottom left */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 1.4, type: "spring", stiffness: 200 }}
            className="absolute -left-3 bottom-12 sm:-left-6 glass-card px-3.5 py-2.5 flex items-center gap-2 hidden sm:flex"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-rose" />
            </span>
            <div>
              <div className="text-xs font-semibold">500+ Orders</div>
              <div className="text-[9px] text-muted-foreground">& counting</div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ── Scroll cue ───────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-1.5"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className="h-5 w-[1px] rounded-full bg-rose/50"
        />
      </motion.div>
    </section>
  );
}
