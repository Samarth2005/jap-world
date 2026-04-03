import { Link, useNavigate } from "react-router-dom";
import { Trash2, ArrowLeft } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { quint } from "@/lib/motion";

export default function CartPage() {
  const { items, removeItem, clearCart, total } = useCart();
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-6 pt-24 pb-16 max-w-2xl">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Continue Browsing
          </Link>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={quint} className="text-3xl font-bold mb-8">
            Your Cart
          </motion.h1>

          {items.length === 0 ? (
            <div className="bg-muted/30 border border-border/50 rounded-2xl p-12 text-center">
              <p className="text-muted-foreground mb-4">Your cart is empty.</p>
              <Link to="/products" className="text-foreground text-sm hover:underline">Browse Products →</Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <motion.div key={item.product.id} layout className="bg-muted/30 border border-border/50 rounded-xl p-4 flex items-center gap-4">
                  <img src={item.product.images[0]} alt={item.product.name} className="w-16 h-16 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold truncate">{item.product.name}</h3>
                    <p className="font-mono text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-mono text-foreground text-sm">${(item.product.price * item.quantity).toFixed(2)}</p>
                  <button onClick={() => removeItem(item.product.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}

              <div className="bg-muted/30 border border-border/50 rounded-xl p-6 mt-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-muted-foreground">Total</span>
                  <span className="font-mono text-xl text-foreground font-bold">${total.toFixed(2)}</span>
                </div>
                <button className="w-full py-3 rounded-lg bg-foreground text-background font-medium text-sm hover:opacity-90 active:scale-[0.98] transition-all duration-200">
                  Proceed to Checkout
                </button>
                <button onClick={clearCart} className="w-full py-2 mt-2 text-xs text-muted-foreground hover:text-destructive transition-colors">
                  Clear Cart
                </button>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </PageTransition>
  );
}
