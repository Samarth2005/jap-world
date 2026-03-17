import { useState, useMemo } from "react";
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { quint } from "@/lib/motion";
import { ChevronDown } from "lucide-react";

const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low → High", value: "price-asc" },
  { label: "Price: High → Low", value: "price-desc" },
  { label: "Name A–Z", value: "name" },
] as const;

type SortValue = (typeof SORT_OPTIONS)[number]["value"];

export default function ProductsPage() {
  const { data: products = [], isLoading } = useProducts();
  const [category, setCategory] = useState("All");
  const [material, setMaterial] = useState("All");
  const [sort, setSort] = useState<SortValue>("newest");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(products.map((p) => p.category).filter(Boolean)))],
    [products]
  );
  const materials = useMemo(
    () => ["All", ...Array.from(new Set(products.map((p) => p.material).filter(Boolean)))],
    [products]
  );

  const filtered = useMemo(() => {
    let list = [...products];
    if (category !== "All") list = list.filter((p) => p.category === category);
    if (material !== "All") list = list.filter((p) => p.material === material);
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "name":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    return list;
  }, [products, category, material, sort]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto max-w-6xl px-6 pt-32 pb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={quint} className="mb-12 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">All Products</h1>
            <p className="text-muted-foreground text-lg">Browse the complete collection.</p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...quint, delay: 0.1 }}
            className="flex flex-wrap items-center gap-3 mb-12"
          >
            <FilterSelect label="Category" value={category} options={categories} onChange={setCategory} />
            <FilterSelect label="Material" value={material} options={materials} onChange={setMaterial} />
            <FilterSelect
              label="Sort"
              value={sort}
              options={SORT_OPTIONS.map((o) => o.value)}
              displayOptions={SORT_OPTIONS.map((o) => o.label)}
              onChange={(v) => setSort(v as SortValue)}
            />
            <span className="ml-auto text-xs text-muted-foreground font-mono">
              {filtered.length} product{filtered.length !== 1 ? "s" : ""}
            </span>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-[3/4] rounded-xl bg-muted animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-20">No products match your filters.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          )}
        </div>
        <Footer />
      </div>
    </PageTransition>
  );
}

function FilterSelect({
  label,
  value,
  options,
  displayOptions,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  displayOptions?: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-muted/50 border border-border/50 rounded-lg pl-3 pr-8 py-2 text-sm text-foreground cursor-pointer focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-colors"
      >
        {options.map((opt, i) => (
          <option key={opt} value={opt}>
            {label}: {displayOptions ? displayOptions[i] : opt}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
    </div>
  );
}
