import { motion } from "framer-motion";
import { products } from "@/data/products";
import ProductCard from "./ProductCard";

const transition = { duration: 0.5, ease: [0.22, 1, 0.36, 1] };

export default function ProductGrid() {
  return (
    <section id="products" className="py-24 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={transition}
          className="mb-16 text-center"
        >
          <p className="font-mono-data text-xs uppercase tracking-[0.3em] text-primary/60 mb-3">
            Collection
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Precision <span className="text-gradient-cyan">Artifacts</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
