import { Instagram, MessageCircle, Mail, Heart } from "lucide-react";
import { toast } from "sonner";

export function Footer() {
  return (
    <footer className="relative mt-12 border-t border-border bg-cream/60 backdrop-blur">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground shadow-soft">
              <span className="font-script text-xl">S</span>
            </span>
            <div>
              <div className="font-display text-xl">Sweet Aroma</div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Bespoke Bakes</div>
            </div>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Handcrafted cakes and desserts, baked fresh in Khandwa, MP.
          </p>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Explore</div>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a className="hover:text-rose" href="#catalog">Menu</a></li>
            <li><a className="hover:text-rose" href="#customize">Customize</a></li>
            <li><a className="hover:text-rose" href="#gallery">Gallery</a></li>
            <li><a className="hover:text-rose" href="#contact">Contact</a></li>
          </ul>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Follow</div>
          <div className="mt-4 flex gap-3">
            {[
              { icon: Instagram, href: "https://instagram.com/.sweet_aroma." },
              { icon: MessageCircle, href: "https://wa.me/919999999999" },
              { icon: Mail, href: "mailto:hello@sweetaroma.in" },
            ].map(({ icon: Icon, href }, i) => (
              <a key={i} href={href} target="_blank" rel="noreferrer"
                className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card transition-transform hover:-translate-y-1 hover:bg-blush">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Newsletter</div>
          <form className="mt-4 flex gap-2"
            onSubmit={(e) => { e.preventDefault(); toast.success("Subscribed! Sweet updates coming your way 🍰"); (e.target as HTMLFormElement).reset(); }}>
            <input type="email" required placeholder="your@email.com"
              className="flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose" />
            <button className="btn-primary !py-2 !px-4 text-sm">Join</button>
          </form>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-5 text-xs text-muted-foreground md:flex-row">
          <div>© {new Date().getFullYear()} Sweet Aroma. All rights reserved.</div>
          <div className="flex items-center gap-1">Made with <Heart size={12} className="text-rose" fill="currentColor" /> in Khandwa, MP</div>
        </div>
      </div>
    </footer>
  );
}
