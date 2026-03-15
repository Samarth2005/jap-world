import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Product } from "@/data/products";
import { useCart } from "@/hooks/useCart";
import { useState } from "react";
import { quint } from "@/lib/motion";

interface Props {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: Props) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ ...quint, delay: index * 0.1 }}
      className="group rounded-2xl overflow-hidden glass card-hover-glow border-gradient-top"
    >
      <div className="relative aspect-square overflow-hidden scan-line">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-foreground text-sm leading-tight">{product.name}</h3>
          <span className="font-mono-data text-primary text-sm whitespace-nowrap">${product.price.toFixed(2)}</span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2">{product.short_description}</p>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[10px] font-mono-data text-muted-foreground/60 uppercase tracking-wider">{product.material}</span>
          <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
          <span className="text-[10px] font-mono-data text-muted-foreground/60">{product.layer_height}</span>
        </div>
        <div className="flex gap-2">
          <Link
            to={`/product/${product.id}`}
            className="flex-1 text-center text-xs py-2 rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors duration-300"
          >
            View Details
          </Link>
          <button
            onClick={handleAdd}
            disabled={product.stock === 0}
            className="flex-1 text-xs py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 
                       transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed active:scale-[0.98]"
          >
            {product.stock === 0 ? "Depleted Filament" : added ? "Added ✓" : "Add to Collection"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
