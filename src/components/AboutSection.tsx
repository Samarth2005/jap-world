import { motion } from "framer-motion";
import { quint } from "@/lib/motion";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="container mx-auto max-w-3xl text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={quint}>
          <p className="font-mono-data text-xs uppercase tracking-[0.3em] text-primary/60 mb-3">About</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">The <span className="text-gradient-cyan">Workshop</span></h2>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ ...quint, delay: 0.2 }} className="glass rounded-2xl p-8 sm:p-12 text-left space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            Layer & Logic is a one-person fabrication studio where every artifact is designed, printed, and finished by hand. Using a carefully tuned personal 3D printer and premium filaments, each piece is built layer by layer with obsessive attention to detail.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            We believe in the intersection of algorithms and craftsmanship — parametric designs generated through code, then realized through the patient precision of additive manufacturing. No mass production. No compromises. Just precision in every layer.
          </p>
          <div className="grid grid-cols-3 gap-4 pt-4">
            {[
              { value: "0.05mm", label: "Min Layer Height" },
              { value: "200+", label: "Artifacts Shipped" },
              { value: "15+", label: "Materials Used" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-mono-data text-primary text-xl font-bold">{stat.value}</p>
                <p className="text-[10px] text-muted-foreground/60 uppercase tracking-wider mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
