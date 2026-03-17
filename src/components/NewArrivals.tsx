import { motion } from "framer-motion";
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "./ProductCard";
import { quint } from "@/lib/motion";

const badges: Record<string, string> = {
  "6": "NEW",
  "7": "LIMITED PRINT",
  "3": "BEST SELLER",
};

export default function NewArrivals() {
  const { data: products = [] } = useProducts();
  const arrivals = products.filter((p) => !p.featured).slice(0, 4);

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
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">New Arrivals</h2>
          <p className="text-muted-foreground text-lg">Fresh from the print bed.</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {arrivals.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i}
              badge={badges[product.id]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
