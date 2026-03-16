import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { quint } from "@/lib/motion";

const reviews = [
  { author: "Alex M.", profession: "Product Designer", rating: 5, content: "The Fractal Dragon is absolutely stunning. The level of detail at 0.05mm layers is something you have to see in person to believe." },
  { author: "Sarah K.", profession: "Interior Architect", rating: 5, content: "Ordered the Lattice Lamp Shade and it transforms my entire room. The shadow patterns are mesmerizing. Packaging was impeccable." },
  { author: "James T.", profession: "Software Engineer", rating: 5, content: "The Modular Desk Organizer is incredibly practical and looks amazing on my desk. The magnetic connections are satisfying." },
  { author: "Maya R.", profession: "3D Artist", rating: 5, content: "As a fellow maker, I can appreciate the precision here. The Geometric Vortex is a masterpiece of parametric design." },
];

export default function ReviewsSection() {
  const [current, setCurrent] = useState(0);
  const next = () => setCurrent((c) => (c + 1) % reviews.length);
  const prev = () => setCurrent((c) => (c - 1 + reviews.length) % reviews.length);

  return (
    <section className="py-32 px-6">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={quint}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">What Collectors Say</h2>
        </motion.div>

        <div className="relative min-h-[240px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={quint}
              className="text-center"
            >
              <div className="flex justify-center gap-1 mb-8">
                {Array.from({ length: reviews[current].rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-foreground text-foreground" />
                ))}
              </div>
              <p className="text-xl sm:text-2xl text-foreground leading-relaxed mb-8 italic font-light">
                "{reviews[current].content}"
              </p>
              <p className="text-sm font-medium text-foreground">{reviews[current].author}</p>
              <p className="text-xs text-muted-foreground mt-1">{reviews[current].profession}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center items-center gap-6 mt-12">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors duration-300"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? "bg-foreground w-6" : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors duration-300"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
