import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";

interface PreloaderProps {
  isVisible: boolean;
  onFinished: () => void;
}

const LAYERS = 5;
const LAYER_STAGGER = 0.12;
const LOGO_REVEAL_END = 0.2 + LAYERS * LAYER_STAGGER + 0.6; // ~1.7s

export default function Preloader({ isVisible, onFinished }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"build" | "dissolve">("build");
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    if (!isVisible) return;
    intervalRef.current = setInterval(() => {
      setProgress((p) => Math.min(p + 2, 90));
    }, 40);
    return () => clearInterval(intervalRef.current);
  }, [isVisible]);

  const triggerExit = useCallback(() => {
    clearInterval(intervalRef.current);
    setProgress(100);
    setPhase("dissolve");
    // Signal hero to begin its entrance
    setTimeout(() => window.dispatchEvent(new Event("hero-enter")), 200);
    // Remove preloader after dissolve animation
    setTimeout(onFinished, 900);
  }, [onFinished]);

  useEffect(() => {
    const handler = () => triggerExit();
    window.addEventListener("hero-video-ready", handler);
    const safety = setTimeout(handler, 4000);
    return () => {
      window.removeEventListener("hero-video-ready", handler);
      clearTimeout(safety);
    };
  }, [triggerExit]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
        >
          {/* Logo container — builds up then scales/fades into hero */}
          <motion.div
            animate={
              phase === "dissolve"
                ? { scale: 2.5, opacity: 0, y: -40, filter: "blur(12px)" }
                : { scale: 1, opacity: 1, y: 0, filter: "blur(0px)" }
            }
            transition={
              phase === "dissolve"
                ? { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
                : {}
            }
            className="relative mb-10"
          >
            {/* Layer-by-layer printing effect */}
            {Array.from({ length: LAYERS }).map((_, i) => {
              const isLast = i === LAYERS - 1;
              const layerOpacity = 0.08 + (i / (LAYERS - 1)) * 0.25;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10, scaleX: 0.7, scaleY: 0.4 }}
                  animate={{ opacity: 1, y: 0, scaleX: 1, scaleY: 1 }}
                  transition={{
                    delay: 0.15 + i * LAYER_STAGGER,
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex items-center justify-center"
                  style={{ height: isLast ? "auto" : 6, marginTop: i === 0 ? 0 : -1 }}
                >
                  {!isLast ? (
                    <div
                      className="rounded-sm bg-foreground"
                      style={{
                        width: 160 + i * 10,
                        height: 2,
                        opacity: layerOpacity,
                      }}
                    />
                  ) : null}
                </motion.div>
              );
            })}

            {/* Final logo text — appears after layers are "printed" */}
            <motion.h1
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.15 + LAYERS * LAYER_STAGGER,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-2xl sm:text-3xl font-semibold tracking-tight text-center mt-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Layer & Logic
            </motion.h1>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            animate={phase === "dissolve" ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center"
          >
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
