import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cake, Image, Tag, LayoutDashboard } from "lucide-react";
import { CakesTab } from "@/components/admin/CakesTab";
import { GalleryTab } from "@/components/admin/GalleryTab";
import { CategoriesTab } from "@/components/admin/CategoriesTab";

export const Route = createFileRoute("/admin/")({
  component: AdminPage,
});

const TABS = [
  { id: "cakes", label: "Cakes", icon: Cake },
  { id: "gallery", label: "Gallery", icon: Image },
  { id: "categories", label: "Categories", icon: Tag },
] as const;

type TabId = (typeof TABS)[number]["id"];

function AdminPage() {
  const [active, setActive] = useState<TabId>("cakes");

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-border bg-cream/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center">
              <span className="font-script text-lg text-primary-foreground">S</span>
            </div>
            <div>
              <p className="font-display text-lg leading-tight">Sweet Aroma</p>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Admin Panel
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
            >
              <LayoutDashboard size={14} />
              View site
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Page title */}
        <div className="mb-8">
          <h1 className="font-display text-4xl">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Manage your cakes, gallery and categories.
          </p>
        </div>

        {/* Tab nav */}
        <div className="flex gap-1 p-1 rounded-2xl bg-muted/50 w-fit mb-8 border border-border">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="tab-pill"
                    className="absolute inset-0 rounded-xl bg-card shadow-soft border border-border"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative flex items-center gap-2">
                  <Icon size={15} />
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
          >
            {active === "cakes" && <CakesTab />}
            {active === "gallery" && <GalleryTab />}
            {active === "categories" && <CategoriesTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
