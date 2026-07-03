import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, Plus, X, Sparkles } from "lucide-react";
import { cakes, categories, type Cake } from "@/data/cakes";
import { Reveal } from "./Reveal";
import { toast } from "sonner";

export function Catalog() {
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const [sort, setSort] = useState<"featured" | "low" | "high">("featured");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Cake | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  const list = useMemo(() => {
    let l = cakes.filter((c) => (cat === "All" ? true : c.category === cat));
    if (sort === "low") l = [...l].sort((a, b) => a.price - b.price);
    if (sort === "high") l = [...l].sort((a, b) => b.price - a.price);
    return l;
  }, [cat, sort]);

  return (
    <section id="catalog" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="chip">The Menu</span>
              <h2 className="mt-3 font-display text-4xl md:text-5xl">Signature bakes, ready to order</h2>
              <p className="mt-3 max-w-xl text-muted-foreground">
                A curated collection of our most-loved creations. Each cake is baked fresh — allow 24 hours.
              </p>
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium shadow-soft focus:outline-none focus:ring-2 focus:ring-rose">
              <option value="featured">Featured</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>
        </Reveal>

        {/* filters */}
        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button key={c}
                onClick={() => setCat(c)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                  cat === c
                    ? "border-transparent bg-primary text-primary-foreground shadow-soft"
                    : "border-border bg-card text-foreground/70 hover:bg-blush hover:text-foreground"
                }`}>
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        {/* grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="soft-card overflow-hidden">
                  <div className="aspect-[4/5] w-full bg-muted shimmer" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 w-2/3 rounded bg-muted shimmer" />
                    <div className="h-3 w-full rounded bg-muted shimmer" />
                    <div className="h-3 w-1/2 rounded bg-muted shimmer" />
                  </div>
                </div>
              ))
            : (
              <AnimatePresence mode="popLayout">
                {list.map((c) => (
                  <motion.article
                    key={c.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="soft-card group relative overflow-hidden">
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img src={c.image} alt={c.name} loading="lazy" width={900} height={900}
                        className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-cocoa/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <span className="chip absolute left-3 top-3 !bg-cream/90">{c.category}</span>
                      <div className="absolute inset-x-0 bottom-0 flex translate-y-4 items-center gap-2 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                        <button onClick={() => setSelected(c)} className="btn-ghost !py-2 !px-4 text-xs">
                          <Eye size={14} /> View
                        </button>
                        <button
                          onClick={() => toast.success(`${c.name} added — we'll confirm on WhatsApp!`, { icon: "🎂" })}
                          className="btn-primary !py-2 !px-4 text-xs">
                          <Plus size={14} /> Add
                        </button>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-baseline justify-between gap-3">
                        <h3 className="font-display text-xl">{c.name}</h3>
                        <div className="font-display text-lg text-rose">₹{c.price}</div>
                      </div>
                      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{c.description}</p>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            )}
        </div>
      </div>

      {/* modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[80] grid place-items-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-cocoa/60 backdrop-blur-sm" onClick={() => setSelected(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
              className="relative z-10 grid w-full max-w-4xl overflow-hidden rounded-3xl bg-card shadow-lift md:grid-cols-2">
              <img src={selected.image} alt={selected.name} className="h-64 w-full object-cover md:h-full" />
              <div className="p-8">
                <button onClick={() => setSelected(null)}
                  className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-cream/90 backdrop-blur hover:bg-blush transition">
                  <X size={16} />
                </button>
                <span className="chip">{selected.category}</span>
                <h3 className="mt-3 font-display text-3xl">{selected.name}</h3>
                <div className="mt-1 font-display text-2xl text-rose">₹{selected.price}</div>
                <p className="mt-4 text-muted-foreground">{selected.description}</p>

                <div className="mt-5">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Flavors</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selected.flavors.map((f) => (
                      <span key={f} className="rounded-full border border-border px-3 py-1 text-sm">{f}</span>
                    ))}
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Sizes</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selected.sizes.map((s) => (
                      <span key={s} className="rounded-full border border-border px-3 py-1 text-sm">{s}</span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex gap-3">
                  <button
                    onClick={() => { toast.success(`${selected.name} added!`, { icon: "🎂" }); setSelected(null); }}
                    className="btn-primary flex-1"><Plus size={16} /> Add to order</button>
                  <a href="#customize" onClick={() => setSelected(null)} className="btn-ghost"><Sparkles size={16} /> Customize</a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
