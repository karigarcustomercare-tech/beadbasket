import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Instagram } from "lucide-react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#story", label: "Story" },
  { href: "#catalog", label: "Cakes" },
  { href: "#customize", label: "Customize" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-cream/80 backdrop-blur-xl shadow-[0_4px_30px_-15px_rgba(60,30,20,0.25)]"
          : "bg-transparent"
      }`}
      style={{ backgroundColor: scrolled ? "color-mix(in oklab, var(--cream) 82%, transparent)" : "transparent" }}
    >
      <div className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}>
        <a href="#home" className="flex items-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground shadow-soft">
            <span className="font-script text-xl">S</span>
          </span>
          <div className="leading-tight">
            <div className="font-display text-xl font-semibold text-foreground">Sweet Aroma</div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Bespoke Bakes</div>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href}
              className="relative text-sm font-medium text-foreground/80 hover:text-foreground transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a href="https://instagram.com/.sweet_aroma." target="_blank" rel="noreferrer"
             className="grid h-10 w-10 place-items-center rounded-full border border-border/60 text-foreground/70 hover:text-foreground hover:bg-blush transition">
            <Instagram size={16} />
          </a>
          <a href="#customize" className="btn-primary text-sm">Order Now</a>
        </div>

        <button className="md:hidden grid h-10 w-10 place-items-center rounded-full bg-cream/80 border border-border" onClick={() => setOpen(v => !v)} aria-label="Menu">
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-cream/95 backdrop-blur-xl border-t border-border">
            <div className="flex flex-col gap-1 p-4">
              {links.map(l => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                   className="rounded-xl px-4 py-3 text-foreground/80 hover:bg-blush">{l.label}</a>
              ))}
              <a href="#customize" onClick={() => setOpen(false)} className="btn-primary mt-2 text-sm">Order Now</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
