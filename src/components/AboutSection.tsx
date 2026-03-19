import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { quint } from "@/lib/motion";
import { Skeleton } from "@/components/ui/skeleton";

const stats = [
  { value: "0.05mm", label: "Minimum Layer Height" },
  { value: "200+", label: "Artifacts Printed" },
  { value: "15+", label: "Materials Used" },
];

export default function AboutSection() {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const iframe = document.getElementById("splineFrame") as HTMLIFrameElement;
      if (iframe) {
        iframe.style.opacity = "0";
        setTimeout(() => {
          iframe.src = iframe.src;
          iframe.style.opacity = "1";
        }, 100);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="py-32 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* 3D Scene */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ ...quint, duration: 0.8 }}
          >
            <div className="relative w-full rounded-2xl overflow-hidden" style={{ height: "650px" }}>
              {!iframeLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-muted/50 rounded-2xl">
                  <Skeleton className="w-full h-full absolute inset-0 rounded-2xl" />
                  <div className="relative z-10 flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
                    <p className="text-xs text-muted-foreground font-mono-data uppercase tracking-widest">Loading 3D Scene</p>
                  </div>
                </div>
              )}
              <iframe
                id="splineFrame"
                src="https://my.spline.design/3dprinter-gwKGVag0cgOwB2rSEBVZUntf/"
                frameBorder="0"
                width="100%"
                height="100%"
                className={`w-full h-full transition-opacity duration-700 ${iframeLoaded ? "opacity-100" : "opacity-0"}`}
                title="3D Printer Scene"
                loading="lazy"
                onLoad={() => setIframeLoaded(true)}
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ ...quint, duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <p className="font-mono-data text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">About</p>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">The Workshop</h2>
            </div>

            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed text-lg">
                Layer & Logic is a small fabrication studio where every artifact is designed, printed, and finished with precision.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We specialize in parametric objects and algorithmic design realized through high-precision additive manufacturing.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-foreground font-mono-data">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-tight">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
