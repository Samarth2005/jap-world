import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Product } from "@/data/products";
import { useCart } from "@/hooks/useCart";
import { useState } from "react";
import { quint } from "@/lib/motion";
import { Eye, ShoppingBag } from "lucide-react";

interface Props {
  product: Product;
  index?: number;
  badge?: string;
}

export default function ProductCard({ product, index = 0, badge }: Props) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ ...quint, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-muted">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        />
        
        {badge && (
          <span className="absolute top-4 left-4 px-3 py-1 text-[10px] font-mono-data uppercase tracking-widest bg-foreground text-background rounded-full">
            {badge}
          </span>
        )}

        {/* Hover overlay with actions */}
        <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-3">
          <Link
            to={`/product/${product.id}`}
            className="w-11 h-11 rounded-full bg-foreground text-background flex items-center justify-center hover:scale-110 transition-transform duration-300"
          >
            <Eye className="w-4 h-4" />
          </Link>
          <button
            onClick={handleAdd}
            disabled={product.stock === 0}
            className="w-11 h-11 rounded-full bg-foreground text-background flex items-center justify-center hover:scale-110 transition-transform duration-300 disabled:opacity-30"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-medium text-foreground leading-tight">{product.name}</h3>
          <span className="font-mono-data text-sm text-foreground">${product.price.toFixed(2)}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono-data text-muted-foreground uppercase tracking-wider">{product.material}</span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span className="text-[11px] font-mono-data text-muted-foreground">{product.layer_height}</span>
        </div>
      </div>
    </motion.div>
  );
}
