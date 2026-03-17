import { motion } from "framer-motion";
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "./ProductCard";
import { quint } from "@/lib/motion";

export default function FeaturedSection() {
  const { data: products = [] } = useProducts();
  const featured = products.filter((p) => p.featured).slice(0, 4);

  return (
    <section className="py-32 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={quint}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Featured Prints</h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Our most popular 3D printed artifacts.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
