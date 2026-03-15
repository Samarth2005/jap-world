import { motion } from "framer-motion";
import { Lightbulb, Layers, Sparkles, Truck } from "lucide-react";
import { quint } from "@/lib/motion";

const steps = [
  { icon: Lightbulb, title: "Design", description: "Every object begins as a parametric model, engineered for printability and visual impact." },
  { icon: Layers, title: "Print", description: "Sliced at 0.05–0.2mm layer heights and fabricated over hours of precise material deposition." },
  { icon: Sparkles, title: "Finish", description: "Hand-finished with sanding, UV curing, or acetone vapor for a flawless surface quality." },
  { icon: Truck, title: "Ship", description: "Carefully packaged in custom foam inserts and shipped worldwide with tracking." },
];

export default function ProcessSection() {
  return (
    <section className="py-24 px-6 relative">
      <div className="absolute inset-0 grid-floor opacity-50" />
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={quint}
          className="mb-16 text-center"
        >
          <p className="font-mono-data text-xs uppercase tracking-[0.3em] text-primary/60 mb-3">The Process</p>
          <h2 className="text-3xl sm:text-4xl font-bold">From <span className="text-gradient-cyan">Code</span> to Object</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...quint, delay: i * 0.15 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-14 h-14 rounded-xl glass flex items-center justify-center mb-4 glow-cyan">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
