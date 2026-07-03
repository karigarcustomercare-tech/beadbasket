import { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, X, ImagePlus, Loader2, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { cakesApi, type Cake } from "@/lib/api";

const CATEGORIES = ["Birthday", "Anniversary", "Theme", "Cupcakes", "Desserts"] as const;

const EMPTY_FORM = {
  name: "",
  price: "",
  category: "Birthday",
  description: "",
  flavors: "",
  sizes: "",
  featured: false,
  inStock: true,
};

export function CakesTab() {
  const qc = useQueryClient();
  const [modal, setModal] = useState<"create" | "edit" | null>(null);
  const [editTarget, setEditTarget] = useState<Cake | null>(null);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["cakes"],
    queryFn: () => cakesApi.list(),
  });

  const createMutation = useMutation({
    mutationFn: (fd: FormData) => cakesApi.create(fd),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cakes"] });
      toast.success("Cake created!");
      closeModal();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, fd }: { id: string; fd: FormData }) => cakesApi.update(id, fd),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cakes"] });
      toast.success("Cake updated!");
      closeModal();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => cakesApi.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cakes"] });
      toast.success("Cake deleted");
      setDeleteConfirm(null);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  function openCreate() {
    setForm({ ...EMPTY_FORM });
    setImageFile(null);
    setImagePreview(null);
    setEditTarget(null);
    setModal("create");
  }

  function openEdit(cake: Cake) {
    setForm({
      name: cake.name,
      price: String(cake.price),
      category: cake.category,
      description: cake.description,
      flavors: cake.flavors.join(", "),
      sizes: cake.sizes.join(", "),
      featured: cake.featured,
      inStock: cake.inStock,
    });
    setImageFile(null);
    setImagePreview(cake.image?.url ?? null);
    setEditTarget(cake);
    setModal("edit");
  }

  function closeModal() {
    setModal(null);
    setEditTarget(null);
    setImageFile(null);
    setImagePreview(null);
    setForm({ ...EMPTY_FORM });
  }

  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("price", form.price);
    fd.append("category", form.category);
    fd.append("description", form.description);
    fd.append("flavors", form.flavors);
    fd.append("sizes", form.sizes);
    fd.append("featured", String(form.featured));
    fd.append("inStock", String(form.inStock));
    if (imageFile) fd.append("image", imageFile);

    if (modal === "edit" && editTarget) {
      updateMutation.mutate({ id: editTarget._id, fd });
    } else {
      createMutation.mutate(fd);
    }
  }

  const isSaving = createMutation.isPending || updateMutation.isPending;
  const cakes = data?.data ?? [];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display text-2xl">Cake Catalog</h2>
          <p className="text-sm text-muted-foreground mt-0.5">{cakes.length} items</p>
        </div>
        <button onClick={openCreate} className="btn-primary text-sm gap-1.5">
          <Plus size={15} /> Add Cake
        </button>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="soft-card overflow-hidden">
              <div className="aspect-[4/3] bg-muted shimmer" />
              <div className="p-4 space-y-2">
                <div className="h-4 w-2/3 bg-muted rounded shimmer" />
                <div className="h-3 w-1/3 bg-muted rounded shimmer" />
              </div>
            </div>
          ))}
        </div>
      ) : cakes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-muted-foreground">
          <p className="text-lg font-display">No cakes yet</p>
          <p className="text-sm mt-1">Click "Add Cake" to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cakes.map((cake) => (
            <motion.div
              key={cake._id}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="soft-card overflow-hidden group"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                {cake.image?.url ? (
                  <img
                    src={cake.image.url}
                    alt={cake.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                    <ImagePlus size={28} />
                  </div>
                )}
                <span className="chip absolute left-2 top-2 !bg-cream/90 !text-xs">
                  {cake.category}
                </span>
                {cake.featured && (
                  <span className="absolute right-2 top-2 chip !bg-rose/90 !text-cream !text-xs">
                    Featured
                  </span>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-display text-lg leading-tight">{cake.name}</h3>
                    <p className="text-rose font-semibold mt-0.5">₹{cake.price}</p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button
                      onClick={() => openEdit(cake)}
                      className="h-8 w-8 grid place-items-center rounded-full border border-border hover:bg-blush transition-colors"
                      title="Edit"
                    >
                      <Pencil size={13} />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(cake._id)}
                      className="h-8 w-8 grid place-items-center rounded-full border border-border hover:bg-destructive/10 hover:text-destructive transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
                {cake.description && (
                  <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2">
                    {cake.description}
                  </p>
                )}
                <div className="mt-2 flex gap-1 flex-wrap">
                  {!cake.inStock && (
                    <span className="chip !bg-muted !text-muted-foreground !text-[10px]">
                      Out of stock
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Delete confirm */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            className="fixed inset-0 z-[100] grid place-items-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-cocoa/50 backdrop-blur-sm"
              onClick={() => setDeleteConfirm(null)}
            />
            <motion.div
              initial={{ scale: 0.9, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 16 }}
              className="relative z-10 soft-card p-6 max-w-sm w-full text-center"
            >
              <p className="font-display text-xl">Delete this cake?</p>
              <p className="text-sm text-muted-foreground mt-1">
                This will also remove the image from Cloudinary. Cannot be undone.
              </p>
              <div className="flex gap-3 mt-5">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="btn-ghost flex-1 text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteMutation.mutate(deleteConfirm)}
                  disabled={deleteMutation.isPending}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-destructive text-destructive-foreground px-4 py-2 text-sm font-semibold"
                >
                  {deleteMutation.isPending ? <Loader2 size={14} className="animate-spin" /> : null}
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create / Edit modal */}
      <AnimatePresence>
        {modal && (
          <motion.div
            className="fixed inset-0 z-[90] grid place-items-center p-4 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-cocoa/50 backdrop-blur-sm"
              onClick={closeModal}
            />
            <motion.div
              initial={{ scale: 0.93, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.93, y: 24 }}
              className="relative z-10 soft-card w-full max-w-2xl my-8"
            >
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h3 className="font-display text-2xl">
                  {modal === "create" ? "Add New Cake" : "Edit Cake"}
                </h3>
                <button
                  onClick={closeModal}
                  className="h-9 w-9 grid place-items-center rounded-full hover:bg-blush transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Image upload */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Cake Image</label>
                  <div
                    onClick={() => fileRef.current?.click()}
                    className="relative aspect-[16/7] w-full rounded-2xl border-2 border-dashed border-border hover:border-primary/50 cursor-pointer overflow-hidden bg-muted/30 transition-colors flex items-center justify-center"
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="preview"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <ImagePlus size={28} />
                        <span className="text-sm">Click to upload image</span>
                        <span className="text-xs">JPG, PNG, WEBP · max 5 MB</span>
                      </div>
                    )}
                    {imagePreview && (
                      <div className="absolute inset-0 bg-cocoa/40 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                        <ImagePlus size={24} className="text-cream" />
                      </div>
                    )}
                  </div>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImage}
                  />
                </div>

                {/* Name + Price */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1.5">Name *</label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Velvet Bliss"
                      className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1.5">Price (₹) *</label>
                    <input
                      required
                      type="number"
                      min={0}
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                      placeholder="899"
                      className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold mb-1.5">Category *</label>
                  <div className="relative">
                    <select
                      required
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full appearance-none rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring pr-8"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={14}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold mb-1.5">Description</label>
                  <textarea
                    rows={3}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Short description of the cake..."
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  />
                </div>

                {/* Flavors + Sizes */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1.5">
                      Flavors
                      <span className="text-muted-foreground font-normal ml-1">(comma-separated)</span>
                    </label>
                    <input
                      value={form.flavors}
                      onChange={(e) => setForm({ ...form, flavors: e.target.value })}
                      placeholder="Vanilla, Chocolate"
                      className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1.5">
                      Sizes
                      <span className="text-muted-foreground font-normal ml-1">(comma-separated)</span>
                    </label>
                    <input
                      value={form.sizes}
                      onChange={(e) => setForm({ ...form, sizes: e.target.value })}
                      placeholder="0.5 kg, 1 kg, 1.5 kg"
                      className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>

                {/* Toggles */}
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={form.featured}
                      onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                      className="h-4 w-4 rounded accent-primary"
                    />
                    <span className="text-sm font-medium">Featured</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={form.inStock}
                      onChange={(e) => setForm({ ...form, inStock: e.target.checked })}
                      className="h-4 w-4 rounded accent-primary"
                    />
                    <span className="text-sm font-medium">In Stock</span>
                  </label>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="btn-ghost flex-1 text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="btn-primary flex-1 text-sm"
                  >
                    {isSaving ? (
                      <Loader2 size={15} className="animate-spin" />
                    ) : modal === "create" ? (
                      "Create Cake"
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
