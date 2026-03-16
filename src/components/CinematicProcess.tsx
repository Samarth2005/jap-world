import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Lightbulb, Layers, Sparkles, Truck } from "lucide-react";

const steps = [
  { icon: Lightbulb, title: "Design", description: "Every object begins as a parametric model, engineered for precision." },
  { icon: Layers, title: "Print", description: "Sliced and fabricated layer by layer over hours of careful deposition." },
  { icon: Sparkles, title: "Finish", description: "Hand-finished for a flawless surface quality." },
  { icon: Truck, title: "Ship", description: "Carefully packaged and shipped worldwide." },
];

export default function CinematicProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [0, 1, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.15], [60, 0]);

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
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 hidden lg:block" />

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
                  <div className={`flex-1 ${isLeft ? "lg:text-right" : "lg:text-left"} text-center`}>
                    <span className="font-mono-data text-xs text-muted-foreground uppercase tracking-[0.3em]">
                      Step {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold mt-2 mb-3">{step.title}</h3>
                    <p className="text-muted-foreground max-w-sm mx-auto lg:mx-0 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Center dot */}
                  <div className="relative z-10 w-14 h-14 rounded-full border border-border bg-background flex items-center justify-center shrink-0">
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
