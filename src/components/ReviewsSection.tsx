import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { quint } from "@/lib/motion";

const reviews = [
  { author: "Alex M.", rating: 5, content: "The Fractal Dragon is absolutely stunning. The level of detail at 0.05mm layers is something you have to see in person to believe. Worth every penny." },
  { author: "Sarah K.", rating: 5, content: "Ordered the Lattice Lamp Shade and it transforms my entire room. The shadow patterns are mesmerizing. Packaging was impeccable too." },
  { author: "James T.", rating: 4, content: "The Modular Desk Organizer is incredibly practical and looks amazing on my desk. The magnetic connections are satisfying. Would love more module options." },
  { author: "Maya R.", rating: 5, content: "As a fellow maker, I can appreciate the precision here. The Geometric Vortex is a masterpiece of parametric design. Instant conversation starter." },
];

export default function ReviewsSection() {
  const [current, setCurrent] = useState(0);
  const next = () => setCurrent((c) => (c + 1) % reviews.length);
  const prev = () => setCurrent((c) => (c - 1 + reviews.length) % reviews.length);

  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={quint} className="text-center mb-12">
          <p className="font-mono-data text-xs uppercase tracking-[0.3em] text-primary/60 mb-3">Testimonials</p>
          <h2 className="text-3xl sm:text-4xl font-bold">What <span className="text-gradient-cyan">Collectors</span> Say</h2>
        </motion.div>
        <div className="relative glass rounded-2xl p-8 sm:p-12 min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={quint} className="text-center">
              <div className="flex justify-center gap-1 mb-4">
                {Array.from({ length: reviews[current].rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6 italic">"{reviews[current].content}"</p>
              <p className="font-mono-data text-xs text-primary/80">— {reviews[current].author}</p>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center gap-4 mt-8">
            <button onClick={prev} className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              {reviews.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === current ? "bg-primary w-4" : "bg-muted-foreground/30"}`} />
              ))}
            </div>
            <button onClick={next} className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
