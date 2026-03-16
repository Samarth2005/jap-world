import { motion } from "framer-motion";
import { quint } from "@/lib/motion";
import workshopImg from "@/assets/workshop.jpg";

const stats = [
  { value: "0.05mm", label: "Minimum Layer Height" },
  { value: "200+", label: "Artifacts Printed" },
  { value: "15+", label: "Materials Used" },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-32 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ ...quint, duration: 0.8 }}
          >
            <img
              src={workshopImg}
              alt="3D printing workshop"
              className="w-full aspect-[4/3] object-cover rounded-2xl"
            />
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
