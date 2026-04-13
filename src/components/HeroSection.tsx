import { useRef, useCallback, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import heroVideo from "@/assets/hero-video.mp4.asset.json";
import { quintSlow } from "@/lib/motion";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hasEntered, setHasEntered] = useState(false);

  // Scroll-based parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Mouse-based parallax — subtle depth layers
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 50, damping: 30, mass: 1 };
  const textMoveX = useSpring(useTransform(mouseX, [-1, 1], [12, -12]), springConfig);
  const textMoveY = useSpring(useTransform(mouseY, [-1, 1], [8, -8]), springConfig);
  const overlayMoveX = useSpring(useTransform(mouseX, [-1, 1], [-6, 6]), springConfig);
  const overlayMoveY = useSpring(useTransform(mouseY, [-1, 1], [-4, 4]), springConfig);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    // Normalize to -1...1 from center
    mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
    mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const onVideoReady = useCallback(() => {
    window.dispatchEvent(new Event("hero-video-ready"));
  }, []);

  // Delay hero entrance to sync with preloader exit
  useEffect(() => {
    const handler = () => setHasEntered(true);
    window.addEventListener("hero-enter", handler);
    // Fallback if event never fires
    const t = setTimeout(() => setHasEntered(true), 4500);
    return () => {
      window.removeEventListener("hero-enter", handler);
      clearTimeout(t);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Video background */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={hasEntered ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 will-change-transform"
        style={{ transform: "translateZ(0)" }}
      >
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
      </motion.div>

      {/* Gradient overlay — lighter in light mode for clarity */}
      <motion.div
        style={{ x: overlayMoveX, y: overlayMoveY }}
        className="absolute -inset-4 will-change-transform bg-gradient-to-b from-transparent via-transparent to-background/15 dark:to-background/40"
      />

      {/* Hero content with scroll parallax + mouse parallax */}
      <motion.div
        style={{ y: textY, opacity: textOpacity, x: textMoveX }}
        className="relative z-10 flex flex-col items-start justify-center h-full px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto will-change-transform"
      >
        <motion.div style={{ y: textMoveY }}>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={hasEntered ? { opacity: 1, y: 0 } : {}}
            transition={{ ...quintSlow, delay: 0.1, duration: 1.4 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-semibold leading-[1.1] max-w-3xl tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.3)] dark:drop-shadow-[0_2px_16px_rgba(0,0,0,0.6)]"
          >
            Precision 3D Printing,
            <br />
            <span className="text-muted-foreground">Perfectly Crafted</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={hasEntered ? { opacity: 1, y: 0 } : {}}
            transition={{ ...quintSlow, delay: 0.3, duration: 1.4 }}
            className="mt-6 text-muted-foreground max-w-md text-base sm:text-lg font-light leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.2)] dark:drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]"
          >
            Premium quality 3D printed objects designed with accuracy and attention to detail.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={hasEntered ? { opacity: 1, y: 0 } : {}}
            transition={{ ...quintSlow, delay: 0.5, duration: 1.4 }}
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
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity: textOpacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={hasEntered ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 1 }}
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
