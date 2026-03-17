import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { useProduct } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { quint } from "@/lib/motion";

export default function ProductDetail() {
  const { id } = useParams();
  const { product, isLoading } = useProduct(id);
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (!product) return;
    for (let i = 0; i < qty; i++) addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-6 pt-24 pb-16">
          <Link to="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Collection
          </Link>

          {isLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="aspect-square rounded-2xl bg-muted animate-pulse" />
              <div className="space-y-4">
                <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                <div className="h-8 w-64 bg-muted animate-pulse rounded" />
                <div className="h-6 w-20 bg-muted animate-pulse rounded" />
              </div>
            </div>
          ) : !product ? (
            <p className="text-muted-foreground text-center py-20">Product not found.</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={quint} className="rounded-2xl overflow-hidden bg-muted">
                <img src={product.images[0]} alt={product.name} className="w-full aspect-square object-cover" />
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ ...quint, delay: 0.1 }} className="flex flex-col justify-center">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">{product.category}</p>
                <h1 className="text-3xl sm:text-4xl font-bold mb-4">{product.name}</h1>
                <p className="font-mono text-2xl text-foreground mb-6">${product.price.toFixed(2)}</p>
                <p className="text-muted-foreground leading-relaxed mb-8">{product.description}</p>

                <div className="grid grid-cols-2 gap-3 mb-8">
                  {[
                    { label: "Material", value: product.material },
                    { label: "Layer Height", value: product.layer_height },
                    { label: "Print Time", value: product.print_time },
                    { label: "Dimensions", value: product.dimensions },
                  ].map((spec) => (
                    <div key={spec.label} className="bg-muted/50 border border-border/50 rounded-lg p-3">
                      <p className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-wider">{spec.label}</p>
                      <p className="font-mono text-sm text-foreground mt-1">{spec.value}</p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 mb-6">
                  <div className={`w-2 h-2 rounded-full ${product.stock > 0 ? "bg-foreground" : "bg-destructive"}`} />
                  <span className="text-xs font-mono text-muted-foreground">
                    {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                  </span>
                </div>

                <div className="flex gap-4">
                  <div className="flex items-center gap-3 bg-muted/50 border border-border/50 rounded-lg px-3">
                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="text-muted-foreground hover:text-foreground transition-colors">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-mono text-sm w-6 text-center">{qty}</span>
                    <button onClick={() => setQty(Math.min(product.stock, qty + 1))} className="text-muted-foreground hover:text-foreground transition-colors">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={handleAdd}
                    disabled={product.stock === 0}
                    className="flex-1 py-3 rounded-lg bg-foreground text-background font-medium text-sm hover:opacity-90 active:scale-[0.98] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    {added ? "Added ✓" : "Add to Cart"}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </PageTransition>
  );
}
