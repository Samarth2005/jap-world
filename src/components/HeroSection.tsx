import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const transition = { duration: 0.8, ease: [0.22, 1, 0.36, 1] };

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background image (acts as video placeholder) */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="3D printer depositing filament layers"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.2 }}
          className="font-mono-data text-xs uppercase tracking-[0.3em] text-primary/80 mb-4"
        >
          Precision Fabrication Studio
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.4 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight max-w-4xl"
        >
          Precision in every{" "}
          <span className="text-gradient-cyan">layer</span>.
          <br />
          Artifacts for the modern maker.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.6 }}
          className="mt-6 text-muted-foreground max-w-lg text-base sm:text-lg"
        >
          Handcrafted 3D printed objects designed with algorithmic precision
          and manufactured layer by layer on our personal fabrication systems.
        </motion.p>

        <motion.a
          href="#products"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.8 }}
          className="mt-10 px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm 
                     hover:scale-[0.98] active:scale-[0.96] transition-transform duration-200 glow-cyan"
        >
          Explore Collection
        </motion.a>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono-data">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-primary/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
