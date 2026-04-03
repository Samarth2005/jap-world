import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  isVisible: boolean;
}

export default function Preloader({ isVisible }: PreloaderProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
        >
          {/* Logo / brand text */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl sm:text-3xl font-semibold tracking-tight mb-8"
          >
            Layer & Logic
          </motion.h1>

          {/* Minimal loading bar */}
          <div className="w-48 h-px bg-border overflow-hidden rounded-full">
            <motion.div
              className="h-full bg-foreground"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-4 text-[11px] uppercase tracking-[0.3em] text-muted-foreground font-light"
          >
            Loading
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}