import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { quint } from "@/lib/motion";

import catHomeDecor from "@/assets/cat-home-decor.jpg";
import catDesk from "@/assets/cat-desk.jpg";
import catLighting from "@/assets/cat-lighting.jpg";
import catFigurines from "@/assets/cat-figurines.jpg";
import catMechanical from "@/assets/cat-mechanical.jpg";

const categories = [
  { name: "Home Decor", image: catHomeDecor },
  { name: "Desk Accessories", image: catDesk },
  { name: "Lighting", image: catLighting },
  { name: "Figurines", image: catFigurines },
  { name: "Mechanical Parts", image: catMechanical },
];

export default function CategoriesSection() {
  return (
    <section className="py-32 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={quint}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Categories</h2>
          <p className="text-muted-foreground text-lg">Browse by collection.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ ...quint, duration: 0.9, delay: i * 0.12 }}
              className="group relative overflow-hidden rounded-xl cursor-pointer aspect-[4/3]"
            >
              <Link to="/products" className="block w-full h-full">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-transparent group-hover:bg-background/15 transition-colors duration-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)] dark:drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">{cat.name}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
