import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Cake, Upload, PartyPopper, Instagram, MessageCircle } from "lucide-react";
import { Reveal } from "./Reveal";

type Config = {
  shape: string;
  size: string;
  flavor: string;
  finish: string;
  message: string;
  refImage: string | null;
};

const SHAPES = ["Round", "Square", "Heart", "Number"];
const SIZES = [
  { key: "0.5 kg", mult: 0.6 },
  { key: "1 kg", mult: 1 },
  { key: "1.5 kg", mult: 1.5 },
  { key: "2 kg+", mult: 2.2 },
];
const FLAVORS = [
  { key: "Chocolate", color: "#5a3826" },
  { key: "Vanilla", color: "#f6ecd4" },
  { key: "Red Velvet", color: "#b23a3a" },
  { key: "Butterscotch", color: "#d99a4e" },
  { key: "Strawberry", color: "#f2a1b3" },
  { key: "Pineapple", color: "#f6e59a" },
];
const FINISHES = ["Fondant", "Buttercream", "Drip Cake", "Naked Cake"];
const BASE = 700;

const steps = ["Shape", "Size", "Flavor", "Finish", "Message", "Review"] as const;

export function Customizer() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [config, setConfig] = useState<Config>({
    shape: "Round", size: "1 kg", flavor: "Chocolate", finish: "Buttercream", message: "", refImage: null,
  });

  const price = useMemo(() => {
    const sizeMult = SIZES.find((s) => s.key === config.size)?.mult ?? 1;
    const finishAdd = { Fondant: 300, "Drip Cake": 200, Buttercream: 0, "Naked Cake": 100 }[config.finish] ?? 0;
    const shapeAdd = config.shape === "Heart" || config.shape === "Number" ? 150 : 0;
    return Math.round(BASE * sizeMult + finishAdd + shapeAdd);
  }, [config]);

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const update = <K extends keyof Config>(k: K, v: Config[K]) => setConfig((c) => ({ ...c, [k]: v }));

  return (
    <section id="customize" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="text-center">
            <span className="chip">Design Studio</span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">
              Customize your <span className="font-script text-rose">dream</span> cake
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Six simple steps. Live price. Baked exactly the way you imagined it.
            </p>
          </div>
        </Reveal>

        {!submitted ? (
          <Reveal delay={0.1}>
            <div className="mt-12 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
              {/* Wizard */}
              <div className="soft-card p-6 md:p-8">
                {/* Progress */}
                <div className="mb-8">
                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <span>Step {step + 1} of {steps.length}</span>
                    <span>{steps[step]}</span>
                  </div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                    <motion.div
                      initial={false}
                      animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
                      transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                      className="h-full rounded-full bg-gradient-to-r from-rose to-caramel"
                    />
                  </div>
                </div>

                <div className="min-h-[280px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.35 }}>
                      {step === 0 && (
                        <StepGrid>
                          {SHAPES.map((s) => (
                            <OptionCard key={s} active={config.shape === s} onClick={() => update("shape", s)}>
                              <ShapeIcon shape={s} />
                              <span className="mt-3 font-display text-lg">{s}</span>
                            </OptionCard>
                          ))}
                        </StepGrid>
                      )}

                      {step === 1 && (
                        <StepGrid>
                          {SIZES.map((s) => (
                            <OptionCard key={s.key} active={config.size === s.key} onClick={() => update("size", s.key)}>
                              <Cake size={30} className="text-rose" />
                              <span className="mt-3 font-display text-lg">{s.key}</span>
                              <span className="text-xs text-muted-foreground">₹{Math.round(BASE * s.mult)}+</span>
                            </OptionCard>
                          ))}
                        </StepGrid>
                      )}

                      {step === 2 && (
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                          {FLAVORS.map((f) => (
                            <button
                              key={f.key} onClick={() => update("flavor", f.key)}
                              className={`group relative flex items-center gap-3 rounded-2xl border p-3 transition ${
                                config.flavor === f.key ? "border-rose bg-blush-soft shadow-soft" : "border-border hover:bg-blush-soft"
                              }`}>
                              <span className="inline-block h-8 w-8 rounded-full ring-2 ring-white shadow" style={{ backgroundColor: f.color }} />
                              <span className="text-sm font-medium">{f.key}</span>
                              {config.flavor === f.key && (
                                <Check size={16} className="ml-auto text-rose" />
                              )}
                            </button>
                          ))}
                        </div>
                      )}

                      {step === 3 && (
                        <StepGrid>
                          {FINISHES.map((f) => (
                            <OptionCard key={f} active={config.finish === f} onClick={() => update("finish", f)}>
                              <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-blush to-caramel/60">
                                <Cake size={22} className="text-cocoa" />
                              </span>
                              <span className="mt-3 font-display text-lg">{f}</span>
                            </OptionCard>
                          ))}
                        </StepGrid>
                      )}

                      {step === 4 && (
                        <div className="space-y-5">
                          <div>
                            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Message on cake</label>
                            <input
                              type="text" maxLength={40}
                              value={config.message}
                              onChange={(e) => update("message", e.target.value)}
                              placeholder="Happy Birthday, Aditi!"
                              className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 font-display text-lg focus:outline-none focus:ring-2 focus:ring-rose"
                            />
                            <div className="mt-1 text-right text-xs text-muted-foreground">{config.message.length}/40</div>
                          </div>
                          <div>
                            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Reference image (optional)</label>
                            <label className="mt-2 flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-border p-4 hover:bg-blush-soft transition">
                              <span className="grid h-10 w-10 place-items-center rounded-full bg-blush"><Upload size={18} /></span>
                              <div className="text-sm">
                                <div className="font-medium">{config.refImage ? "Image attached" : "Upload a reference"}</div>
                                <div className="text-xs text-muted-foreground">JPG or PNG · UI only, share via WhatsApp after submit</div>
                              </div>
                              <input type="file" accept="image/*" className="hidden"
                                onChange={(e) => update("refImage", e.target.files?.[0]?.name ?? null)} />
                            </label>
                          </div>
                        </div>
                      )}

                      {step === 5 && (
                        <div className="space-y-3 text-sm">
                          {[
                            ["Shape", config.shape],
                            ["Size", config.size],
                            ["Flavor", config.flavor],
                            ["Finish", config.finish],
                            ["Message", config.message || "—"],
                            ["Reference", config.refImage ?? "None"],
                          ].map(([k, v]) => (
                            <div key={k} className="flex items-center justify-between border-b border-dashed border-border py-2">
                              <span className="text-muted-foreground">{k}</span>
                              <span className="font-medium">{v}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <button onClick={prev} disabled={step === 0}
                    className="btn-ghost disabled:opacity-40 disabled:cursor-not-allowed">
                    <ArrowLeft size={16} /> Back
                  </button>
                  {step < steps.length - 1 ? (
                    <button onClick={next} className="btn-primary">Next <ArrowRight size={16} /></button>
                  ) : (
                    <button onClick={() => setSubmitted(true)} className="btn-primary">
                      Submit Request <PartyPopper size={16} />
                    </button>
                  )}
                </div>
              </div>

              {/* Live preview */}
              <div className="soft-card p-6 md:p-8 lg:sticky lg:top-28 h-fit">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Live preview</div>
                <div className="mt-3 aspect-square w-full rounded-2xl bg-gradient-to-br from-blush to-cream grid place-items-center overflow-hidden relative">
                  <motion.div
                    key={config.shape + config.flavor + config.finish}
                    initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                    className="relative">
                    <PreviewCake config={config} />
                  </motion.div>
                  {config.message && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-cream/90 px-4 py-1 font-script text-lg text-cocoa shadow">
                      {config.message}
                    </div>
                  )}
                </div>
                <div className="mt-5 space-y-2 text-sm">
                  <Row k="Shape" v={config.shape} />
                  <Row k="Size" v={config.size} />
                  <Row k="Flavor" v={config.flavor} />
                  <Row k="Finish" v={config.finish} />
                </div>
                <div className="mt-5 flex items-baseline justify-between border-t border-border pt-4">
                  <span className="text-sm text-muted-foreground">Estimated total</span>
                  <motion.div key={price} initial={{ scale: 0.9 }} animate={{ scale: 1 }}
                    className="font-display text-3xl text-rose">₹{price}</motion.div>
                </div>
              </div>
            </div>
          </Reveal>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
            className="mx-auto mt-12 max-w-2xl soft-card p-10 text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-blush animate-pulse-ring">
              <PartyPopper size={28} className="text-rose" />
            </div>
            <h3 className="mt-6 font-display text-4xl">Your request is in the oven!</h3>
            <p className="mt-3 text-muted-foreground">
              Thank you! To confirm your order, please send us a quick message on Instagram or WhatsApp with your date and delivery details.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a href="https://instagram.com/.sweet_aroma." target="_blank" rel="noreferrer" className="btn-primary">
                <Instagram size={16} /> DM on Instagram
              </a>
              <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer" className="btn-ghost">
                <MessageCircle size={16} /> Chat on WhatsApp
              </a>
            </div>
            <button onClick={() => { setSubmitted(false); setStep(0); }} className="mt-6 text-sm text-muted-foreground underline">
              Customize another cake
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function StepGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{children}</div>;
}

function OptionCard({ active, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button onClick={onClick}
      className={`flex flex-col items-center rounded-2xl border p-4 transition ${
        active ? "border-rose bg-blush-soft shadow-soft -translate-y-1" : "border-border hover:bg-blush-soft hover:-translate-y-0.5"
      }`}>
      {children}
    </button>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{k}</span>
      <span className="font-medium">{v}</span>
    </div>
  );
}

function ShapeIcon({ shape }: { shape: string }) {
  const cls = "text-cocoa";
  if (shape === "Round") return <div className={`h-10 w-10 rounded-full bg-caramel ${cls}`} />;
  if (shape === "Square") return <div className="h-10 w-10 rounded-md bg-caramel" />;
  if (shape === "Heart") return <div className="text-3xl">♥</div>;
  return <div className="font-display text-3xl">#</div>;
}

function PreviewCake({ config }: { config: Config }) {
  const flavorColor = FLAVORS.find((f) => f.key === config.flavor)?.color ?? "#c48a6a";
  const isRound = config.shape === "Round";
  const isHeart = config.shape === "Heart";
  const isSquare = config.shape === "Square";
  return (
    <div className="relative">
      <div
        className="mx-auto shadow-lift"
        style={{
          width: 180, height: 180,
          background: `linear-gradient(180deg, ${flavorColor} 0%, ${flavorColor} 60%, color-mix(in oklab, ${flavorColor} 70%, white) 100%)`,
          borderRadius: isRound ? "50%" : isSquare ? "18px" : isHeart ? "50% 50% 50% 50% / 60% 60% 40% 40%" : "40% 40% 40% 40% / 60% 60% 30% 30%",
          transform: isHeart ? "rotate(0deg)" : "none",
        }}
      >
        <div className="h-6 w-full rounded-t-full opacity-80"
          style={{ background: config.finish === "Drip Cake"
            ? `radial-gradient(circle at 20% 100%, ${flavorColor} 0 6px, transparent 7px), radial-gradient(circle at 50% 100%, ${flavorColor} 0 6px, transparent 7px), radial-gradient(circle at 80% 100%, ${flavorColor} 0 6px, transparent 7px), color-mix(in oklab, ${flavorColor} 20%, white)`
            : config.finish === "Naked Cake" ? "transparent"
            : "color-mix(in oklab, white 80%, transparent)" }} />
      </div>
    </div>
  );
}
