import { useRef, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import heroVideo from "@/assets/hero-video.mp4.asset.json";
import { quintSlow } from "@/lib/motion";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const onVideoReady = useCallback(() => {
    window.dispatchEvent(new Event("hero-video-ready"));
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden">
      {/* Video background */}
      <div className="absolute inset-0 will-change-transform" style={{ transform: "translateZ(0)" }}>
        <video
          src={heroVideo.url}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster=""
          onCanPlayThrough={onVideoReady}
          className="w-full h-full object-cover"
          style={{ willChange: "auto" }}
        />
      </div>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />

      {/* Hero content with parallax */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 flex flex-col items-start justify-center h-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto will-change-transform"
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...quintSlow, delay: 0.3, duration: 1.4 }}
          className="text-4xl sm:text-5xl lg:text-7xl font-semibold leading-[1.1] max-w-3xl tracking-tight"
        >
          Precision 3D Printing,
          <br />
          <span className="text-muted-foreground">Perfectly Crafted</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...quintSlow, delay: 0.6, duration: 1.4 }}
          className="mt-6 text-muted-foreground max-w-md text-base sm:text-lg font-light leading-relaxed"
        >
          Premium quality 3D printed objects designed with accuracy and attention to detail.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...quintSlow, delay: 0.9, duration: 1.4 }}
          className="mt-10 flex flex-col sm:flex-row items-start gap-4"
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
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity: textOpacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-light"
        >
          Scroll to explore
        </motion.span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
}
