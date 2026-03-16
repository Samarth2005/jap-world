import { motion, useMotionValue, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { products } from "@/data/products";
import { quint } from "@/lib/motion";

export default function ProductSpotlight() {
  const flagship = products.find((p) => p.id === "4") || products[0];
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <section className="py-32 px-6 overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ ...quint, duration: 0.8 }}
            className="relative"
            onMouseMove={handleMouse}
            style={{ perspective: 1000 }}
          >
            <div className="absolute inset-0 bg-gradient-radial from-muted/50 to-transparent rounded-3xl" />
            <motion.div
              style={{ rotateX, rotateY }}
              className="relative"
            >
              <img
                src={flagship.images[0]}
                alt={flagship.name}
                className="w-full aspect-square object-cover rounded-2xl"
              />
            </motion.div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ ...quint, duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <p className="font-mono-data text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
                Product Spotlight
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">{flagship.name}</h2>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
                Parametric sculpture printed at {flagship.layer_height} ultra-fine layer resolution.
              </p>
            </div>

            <div className="flex items-center gap-8">
              <div>
                <p className="text-[11px] font-mono-data text-muted-foreground uppercase tracking-wider mb-1">Material</p>
                <p className="text-foreground font-medium">{flagship.material}</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div>
                <p className="text-[11px] font-mono-data text-muted-foreground uppercase tracking-wider mb-1">Price</p>
                <p className="text-foreground font-medium text-2xl">${flagship.price.toFixed(2)}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Link
                to={`/product/${flagship.id}`}
                className="px-8 py-3.5 bg-foreground text-background text-sm font-medium rounded-full hover:opacity-90 transition-opacity duration-300"
              >
                Buy Now
              </Link>
              <Link
                to={`/product/${flagship.id}`}
                className="px-8 py-3.5 border border-border text-foreground text-sm font-medium rounded-full hover:bg-muted transition-colors duration-300"
              >
                View Details
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
