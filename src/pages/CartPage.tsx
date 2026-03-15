import { Link } from "react-router-dom";
import { Trash2, ArrowLeft } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { quint } from "@/lib/motion";

export default function CartPage() {
  const { items, removeItem, clearCart, total } = useCart();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-6 pt-24 pb-16 max-w-2xl">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Continue Browsing
        </Link>

        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={quint} className="text-3xl font-bold mb-8">
          Your <span className="text-gradient-cyan">Collection</span>
        </motion.h1>

        {items.length === 0 ? (
          <div className="glass rounded-2xl p-12 text-center">
            <p className="text-muted-foreground mb-4">Your collection is empty.</p>
            <Link to="/products" className="text-primary text-sm hover:underline">Browse Artifacts →</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <motion.div key={item.product.id} layout className="glass rounded-xl p-4 flex items-center gap-4">
                <img src={item.product.images[0]} alt={item.product.name} className="w-16 h-16 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold truncate">{item.product.name}</h3>
                  <p className="font-mono-data text-xs text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <p className="font-mono-data text-primary text-sm">${(item.product.price * item.quantity).toFixed(2)}</p>
                <button onClick={() => removeItem(item.product.id)} className="text-muted-foreground/40 hover:text-destructive transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))}

            <div className="glass rounded-xl p-6 mt-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-muted-foreground">Total</span>
                <span className="font-mono-data text-xl text-primary font-bold">${total.toFixed(2)}</span>
              </div>
              <button className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:scale-[0.98] active:scale-[0.96] transition-transform duration-200 glow-cyan">
                Proceed to Checkout
              </button>
              <button onClick={clearCart} className="w-full py-2 mt-2 text-xs text-muted-foreground/40 hover:text-destructive transition-colors">
                Clear Collection
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
