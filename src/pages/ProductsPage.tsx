import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { quint } from "@/lib/motion";

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-6 pt-24 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={quint} className="mb-12 text-center">
          <p className="font-mono-data text-xs uppercase tracking-[0.3em] text-primary/60 mb-3">Full Collection</p>
          <h1 className="text-3xl sm:text-4xl font-bold">All <span className="text-gradient-cyan">Artifacts</span></h1>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
