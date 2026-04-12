import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
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

function StepImage({ src, alt, speed }: { src: string; alt: string; speed: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, speed * -100]);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  return (
    <div ref={ref} className="overflow-hidden rounded-lg max-w-sm mx-auto lg:mx-0 lg:ml-auto">
      <motion.img
        src={src}
        alt={alt}
        className="w-full aspect-[3/2] object-cover transition-shadow duration-700"
        style={{ y }}
        animate={isInView ? {
          scale: 1.04,
          boxShadow: "0 8px 30px -8px hsl(var(--foreground) / 0.15)",
        } : {
          scale: 1,
          boxShadow: "0 0px 0px 0px hsl(var(--foreground) / 0)",
        }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

function StepNode({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-120px" });
  const Icon = step.icon;
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
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
          Step {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="text-2xl sm:text-3xl font-bold mt-2 mb-3">{step.title}</h3>
        <p className="text-muted-foreground max-w-sm mx-auto lg:mx-0 leading-relaxed mb-6">
          {step.description}
        </p>
        <StepImage src={step.image} alt={step.title} speed={0.15 + index * 0.08} />
      </div>

      {/* Center dot with active glow */}
      <div
        className={`relative z-10 w-14 h-14 rounded-full border bg-background flex items-center justify-center shrink-0 transition-all duration-700 ${
          isInView
            ? "border-foreground/60 shadow-[0_0_20px_hsl(var(--foreground)/0.25)] scale-110"
            : "border-border shadow-[0_0_12px_hsl(var(--foreground)/0.05)] scale-100"
        }`}
      >
        <Icon className={`w-5 h-5 transition-colors duration-500 ${isInView ? "text-foreground" : "text-muted-foreground"}`} />
      </div>

      <div className="flex-1" />
    </motion.div>
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
            {steps.map((step, i) => (
              <StepNode key={step.title} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
