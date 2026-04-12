import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

interface PreloaderProps {
  isVisible: boolean;
  onFinished: () => void;
}

const LAYERS = 6;
const LAYER_STAGGER = 0.15;

export default function Preloader({ isVisible, onFinished }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    if (!isVisible) return;
    // Simulate progress — gets overridden when video fires canplaythrough
    intervalRef.current = setInterval(() => {
      setProgress((p) => Math.min(p + 2, 90)); // caps at 90 until video ready
    }, 40);
    return () => clearInterval(intervalRef.current);
  }, [isVisible]);

  // Exposed globally so HeroSection can call it
  useEffect(() => {
    const handler = () => {
      clearInterval(intervalRef.current);
      setProgress(100);
      setTimeout(onFinished, 400); // brief pause then exit
    };
    window.addEventListener("hero-video-ready", handler);
    // Safety timeout — never block longer than 4s
    const safety = setTimeout(handler, 4000);
    return () => {
      window.removeEventListener("hero-video-ready", handler);
      clearTimeout(safety);
    };
  }, [onFinished]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
        >
          {/* 3D-print layer-by-layer logo */}
          <div className="relative mb-10">
            {Array.from({ length: LAYERS }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8, scaleX: 0.8 }}
                animate={{ opacity: 1, y: 0, scaleX: 1 }}
                transition={{
                  delay: 0.2 + i * LAYER_STAGGER,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex items-center justify-center"
                style={{ marginTop: i === 0 ? 0 : -2 }}
              >
                <span
                  className="block text-2xl sm:text-3xl font-semibold tracking-tight text-foreground"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    opacity: 0.15 + (i / (LAYERS - 1)) * 0.85,
                    filter: i < LAYERS - 1 ? `blur(${(LAYERS - 1 - i) * 0.3}px)` : "none",
                  }}
                >
                  {i === LAYERS - 1 ? "Layer & Logic" : ""}
                </span>
              </motion.div>
            ))}

            {/* Final sharp logo on top */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 + LAYERS * LAYER_STAGGER, duration: 0.6 }}
              className="absolute inset-0 flex items-center justify-center text-2xl sm:text-3xl font-semibold tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Layer & Logic
            </motion.h1>
          </div>

          {/* Progress bar */}
          <div className="w-48 h-px bg-border overflow-hidden rounded-full">
            <motion.div
              className="h-full bg-foreground"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-4 text-[11px] uppercase tracking-[0.3em] text-muted-foreground font-light"
          >
            {progress < 100 ? "Preparing" : "Ready"}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
