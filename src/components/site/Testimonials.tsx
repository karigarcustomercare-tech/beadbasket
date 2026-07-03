import { Star } from "lucide-react";
import { Reveal } from "./Reveal";

const reviews = [
  { name: "Priya S.", initial: "P", rating: 5, text: "The red velvet was pure magic. My anniversary cake looked exactly like the reference — actually better!" },
  { name: "Rahul M.", initial: "R", rating: 5, text: "Ordered a unicorn cake for my daughter's 5th birthday. She wouldn't stop smiling. Sweet Aroma is our new go-to." },
  { name: "Aditi K.", initial: "A", rating: 5, text: "So soft, not too sweet, and the design was next-level. Best home baker in Khandwa hands down." },
  { name: "Ishan V.", initial: "I", rating: 5, text: "The butterscotch is legendary. My office finished it in 10 minutes." },
  { name: "Neha B.", initial: "N", rating: 5, text: "Their customization flow is so easy. Delivery was on time and beautifully packaged." },
  { name: "Kabir T.", initial: "K", rating: 5, text: "Cheesecake tasted like a Parisian café. Will order again and again." },
];

export function Testimonials() {
  const loop = [...reviews, ...reviews];
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="text-center">
            <span className="chip">Kind Words</span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">Loved by <span className="font-script text-rose">happy tummies</span></h2>
          </div>
        </Reveal>
      </div>

      <div className="mt-12 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <div className="flex gap-5 animate-marquee w-max">
          {loop.map((r, i) => (
            <article key={i} className="soft-card w-[320px] shrink-0 p-6">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-blush font-display text-xl text-cocoa">{r.initial}</div>
                <div>
                  <div className="font-semibold">{r.name}</div>
                  <div className="flex text-gold">
                    {Array.from({ length: r.rating }).map((_, k) => <Star key={k} size={14} fill="currentColor" strokeWidth={0} />)}
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">"{r.text}"</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
