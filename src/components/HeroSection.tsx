import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import heroVideo from "@/assets/hero-video.mp4.asset.json";
import { quintSlow } from "@/lib/motion";

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video background with cinematic zoom */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1 }}
        animate={{ scale: 1.08 }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
      >
        <video
          src={heroVideo.url}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...quintSlow, delay: 0.3 }}
          className="text-4xl sm:text-5xl lg:text-7xl font-semibold leading-[1.1] max-w-4xl tracking-tight"
        >
          Precision 3D Printing,
          <br />
          <span className="text-muted-foreground">Perfectly Crafted</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...quintSlow, delay: 0.5 }}
          className="mt-6 text-muted-foreground max-w-md text-base sm:text-lg font-light leading-relaxed"
        >
          Premium quality 3D printed objects designed with accuracy and attention to detail.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...quintSlow, delay: 0.7 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            to="/products"
            className="px-8 py-3 rounded-full bg-foreground text-background font-medium text-sm
                       hover:opacity-90 transition-opacity duration-300"
          >
            Browse Products
          </Link>
          <a
            href="#products"
            className="px-8 py-3 rounded-full border border-border text-foreground font-medium text-sm
                       hover:bg-muted/50 transition-colors duration-300"
          >
            View Collection
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-light">
          Scroll to explore
        </span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
}
