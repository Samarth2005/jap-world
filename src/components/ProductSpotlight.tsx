import { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { quint } from "@/lib/motion";

export default function ProductSpotlight() {
  const { data: products = [] } = useProducts();
  const spotlight = products.find((p) => p.name === "Fractal Dragon") ?? products[0];
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [5, -5]), { stiffness: 100, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-5, 5]), { stiffness: 100, damping: 20 });

  const handleMouse = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  if (!spotlight) return null;

  return (
    <section className="py-32 px-6 overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            ref={containerRef}
            onMouseMove={handleMouse}
            onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative aspect-square rounded-2xl overflow-hidden cursor-crosshair"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ ...quint, duration: 0.8 }}
          >
            <div className="absolute inset-0 bg-gradient-radial from-muted/40 to-transparent rounded-2xl" />
            <img
              src={spotlight.images[0]}
              alt={spotlight.name}
              className="w-full h-full object-cover rounded-2xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ ...quint, duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
                Product Spotlight
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">{spotlight.name}</h2>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
                {spotlight.short_description}
              </p>
            </div>

            <div className="flex items-center gap-8">
              <div>
                <p className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-wider mb-1">Material</p>
                <p className="text-foreground font-medium">{spotlight.material}</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div>
                <p className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-wider mb-1">Price</p>
                <p className="text-foreground font-medium text-2xl">${spotlight.price.toFixed(2)}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Link
                to={`/product/${spotlight.id}`}
                className="px-8 py-3.5 bg-foreground text-background text-sm font-medium rounded-full hover:opacity-90 transition-opacity duration-300"
              >
                Buy Now
              </Link>
              <Link
                to={`/product/${spotlight.id}`}
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
