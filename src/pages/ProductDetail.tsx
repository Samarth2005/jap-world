import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { products } from "@/data/products";
import { useCart } from "@/hooks/useCart";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { quint } from "@/lib/motion";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Product not found.</p>
      </div>
    );
  }

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const specs = [
    { label: "Material", value: product.material },
    { label: "Layer Height", value: product.layer_height },
    { label: "Print Time", value: product.print_time },
    { label: "Dimensions", value: product.dimensions },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-6 pt-24 pb-16">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={quint} className="rounded-2xl overflow-hidden glass">
            <img src={product.images[0]} alt={product.name} className="w-full aspect-square object-cover" />
          </motion.div>

          {/* Details */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ ...quint, delay: 0.1 }} className="flex flex-col justify-center">
            <p className="font-mono-data text-xs uppercase tracking-[0.3em] text-primary/60 mb-2">{product.category}</p>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">{product.name}</h1>
            <p className="font-mono-data text-2xl text-primary mb-6">${product.price.toFixed(2)}</p>
            <p className="text-muted-foreground leading-relaxed mb-8">{product.description}</p>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {specs.map((spec) => (
                <div key={spec.label} className="glass rounded-lg p-3">
                  <p className="text-[10px] font-mono-data text-muted-foreground/50 uppercase tracking-wider">{spec.label}</p>
                  <p className="font-mono-data text-sm text-foreground mt-1">{spec.value}</p>
                </div>
              ))}
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2 mb-6">
              <div className={`w-2 h-2 rounded-full ${product.stock > 0 ? "bg-primary animate-pulse-glow" : "bg-destructive"}`} />
              <span className="text-xs font-mono-data text-muted-foreground">
                {product.stock > 0 ? `${product.stock} in stock` : "Depleted Filament"}
              </span>
            </div>

            {/* Quantity + Add */}
            <div className="flex gap-4">
              <div className="flex items-center gap-3 glass rounded-lg px-3">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="text-muted-foreground hover:text-primary transition-colors">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-mono-data text-sm w-6 text-center">{qty}</span>
                <button onClick={() => setQty(Math.min(product.stock, qty + 1))} className="text-muted-foreground hover:text-primary transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={handleAdd}
                disabled={product.stock === 0}
                className="flex-1 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm 
                           hover:scale-[0.98] active:scale-[0.96] transition-transform duration-200 glow-cyan
                           disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {added ? "Added to Collection ✓" : "Acquire Artifact"}
              </button>
            </div>

            {/* 3D Viewer Placeholder */}
            <div className="mt-8 glass rounded-2xl p-8 flex flex-col items-center justify-center min-h-[200px]" style={{ perspective: "1000px" }}>
              <div className="w-full h-32 border border-border/30 rounded-lg grid-floor flex items-center justify-center" style={{ transform: "rotateX(20deg)" }}>
                <p className="font-mono-data text-xs text-muted-foreground/40 animate-pulse-glow">Loading Mesh...</p>
              </div>
              <p className="text-[10px] font-mono-data text-muted-foreground/30 mt-4">3D Viewer — Coming Soon</p>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
