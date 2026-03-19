import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Lightbulb, Layers, Sparkles, Truck } from "lucide-react";

import processDesign from "@/assets/process-design.jpg";
import processPrint from "@/assets/process-print.jpg";
import processFinish from "@/assets/process-finish.jpg";
import processShip from "@/assets/process-ship.jpg";

const steps = [
  { icon: Lightbulb, title: "Design", description: "Every object begins as a parametric model, engineered for precision.", image: processDesign },
  { icon: Layers, title: "Print", description: "Sliced and fabricated layer by layer over hours of careful deposition.", image: processPrint },
  { icon: Sparkles, title: "Finish", description: "Hand-finished for a flawless surface quality.", image: processFinish },
  { icon: Truck, title: "Ship", description: "Carefully packaged and shipped worldwide.", image: processShip },
];

function ParallaxImage({ src, alt, speed }: { src: string; alt: string; speed: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, speed * -100]);

  return (
    <div ref={ref} className="overflow-hidden rounded-lg max-w-sm mx-auto lg:mx-0 lg:ml-auto">
      <motion.img
        src={src}
        alt={alt}
        className="w-full aspect-[3/2] object-cover"
        style={{ y }}
        initial={{ scale: 1.15 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

export default function CinematicProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [0, 1, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.15], [60, 0]);
  const lineProgress = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="py-32 px-6 relative">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            From Code to Object
          </h2>
          <p className="text-muted-foreground text-lg">The journey of every artifact.</p>
        </motion.div>

        <div className="relative">
          {/* Background line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 hidden lg:block" />

          {/* Glowing progress line */}
          <div className="absolute left-1/2 top-0 w-px -translate-x-1/2 hidden lg:block overflow-hidden" style={{ bottom: 0 }}>
            <motion.div
              className="w-full origin-top"
              style={{
                height: lineProgress,
                background: "linear-gradient(to bottom, hsl(var(--foreground) / 0.8), hsl(var(--foreground) / 0.2))",
                boxShadow: "0 0 8px hsl(var(--foreground) / 0.4), 0 0 20px hsl(var(--foreground) / 0.15)",
              }}
            />
          </div>

          <div className="space-y-24 lg:space-y-32">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                  className={`flex flex-col lg:flex-row items-center gap-8 ${
                    isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Text + image side */}
                  <div className={`flex-1 ${isLeft ? "lg:text-right" : "lg:text-left"} text-center`}>
                    <span className="font-mono-data text-xs text-muted-foreground uppercase tracking-[0.3em]">
                      Step {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold mt-2 mb-3">{step.title}</h3>
                    <p className="text-muted-foreground max-w-sm mx-auto lg:mx-0 leading-relaxed mb-6">
                      {step.description}
                    </p>
                    <ParallaxImage src={step.image} alt={step.title} speed={0.15 + i * 0.08} />
                  </div>

                  {/* Center dot with glow */}
                  <div className="relative z-10 w-14 h-14 rounded-full border border-border bg-background flex items-center justify-center shrink-0 shadow-[0_0_12px_hsl(var(--foreground)/0.1)]">
                    <Icon className="w-5 h-5 text-foreground" />
                  </div>

                  <div className="flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
