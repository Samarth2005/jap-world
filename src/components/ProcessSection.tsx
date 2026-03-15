import { motion } from "framer-motion";
import { Lightbulb, Layers, Sparkles, Truck } from "lucide-react";

const transition = { duration: 0.5, ease: [0.22, 1, 0.36, 1] };

const steps = [
  {
    icon: Lightbulb,
    title: "Design",
    description: "Every object begins as a parametric model, engineered for printability and visual impact.",
  },
  {
    icon: Layers,
    title: "Print",
    description: "Sliced at 0.05–0.2mm layer heights and fabricated over hours of precise material deposition.",
  },
  {
    icon: Sparkles,
    title: "Finish",
    description: "Hand-finished with sanding, UV curing, or acetone vapor for a flawless surface quality.",
  },
  {
    icon: Truck,
    title: "Ship",
    description: "Carefully packaged in custom foam inserts and shipped worldwide with tracking.",
  },
];

export default function ProcessSection() {
  return (
    <section className="py-24 px-6 relative">
      {/* Grid floor background */}
      <div className="absolute inset-0 grid-floor opacity-50" />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={transition}
          className="mb-16 text-center"
        >
          <p className="font-mono-data text-xs uppercase tracking-[0.3em] text-primary/60 mb-3">
            The Process
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold">
            From <span className="text-gradient-cyan">Code</span> to Object
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20 hidden md:block" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...transition, delay: i * 0.15 }}
                  className={`flex flex-col items-center text-center md:items-${
                    isLeft ? "end" : "start"
                  } md:text-${isLeft ? "right" : "left"} ${
                    isLeft ? "md:pr-16" : "md:pl-16 md:col-start-2"
                  } ${!isLeft && i === 1 ? "md:row-start-2" : ""}`}
                  style={!isLeft ? { gridColumn: 2, gridRow: i } : undefined}
                >
                  <div className="w-14 h-14 rounded-xl glass flex items-center justify-center mb-4 glow-cyan">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
