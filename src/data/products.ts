/* Static product data used as fallback and for initial display */
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";
import product7 from "@/assets/product-7.jpg";
import product8 from "@/assets/product-8.jpg";

export interface Product {
  id: string;
  name: string;
  description: string;
  short_description: string;
  price: number;
  images: string[];
  material: string;
  layer_height: string;
  print_time: string;
  dimensions: string;
  stock: number;
  featured: boolean;
  category: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Geometric Vortex",
    description: "A mesmerizing geometric sculpture featuring interlocking spirals that create an optical illusion of perpetual motion. Each layer is precisely calibrated at 0.1mm for maximum detail. Perfect as a desk centerpiece or conversation starter.",
    short_description: "Interlocking spiral sculpture with optical illusion effect",
    price: 49.99,
    images: [product1],
    material: "Resin",
    layer_height: "0.05mm",
    print_time: "14 hours",
    dimensions: "120 × 120 × 180mm",
    stock: 12,
    featured: true,
    category: "Sculptures",
  },
  {
    id: "2",
    name: "Lattice Lamp Shade",
    description: "An intricate lattice-pattern lamp shade that casts beautiful geometric shadow patterns across any room. Designed with parametric algorithms and printed in translucent PLA for a warm ambient glow.",
    short_description: "Parametric lattice lamp shade with geometric shadow patterns",
    price: 79.99,
    images: [product2],
    material: "PLA+",
    layer_height: "0.1mm",
    print_time: "22 hours",
    dimensions: "200 × 200 × 250mm",
    stock: 8,
    featured: true,
    category: "Home Decor",
  },
  {
    id: "3",
    name: "Carbon Hex Coasters",
    description: "Set of 4 hexagonal coasters printed in carbon fiber-infused filament. Each coaster features a honeycomb internal structure for lightweight strength and heat resistance up to 110°C.",
    short_description: "Set of 4 carbon fiber hex coasters with honeycomb structure",
    price: 34.99,
    images: [product3],
    material: "Carbon Fiber",
    layer_height: "0.15mm",
    print_time: "6 hours",
    dimensions: "100 × 87 × 8mm each",
    stock: 25,
    featured: false,
    category: "Accessories",
  },
  {
    id: "4",
    name: "Fractal Dragon",
    description: "A stunning dragon sculpture built using fractal geometry principles. The wings feature self-similar patterns at multiple scales, creating extraordinary detail visible from any distance.",
    short_description: "Fractal geometry dragon with self-similar wing patterns",
    price: 129.99,
    images: [product4],
    material: "Resin",
    layer_height: "0.05mm",
    print_time: "36 hours",
    dimensions: "180 × 250 × 200mm",
    stock: 4,
    featured: true,
    category: "Sculptures",
  },
  {
    id: "5",
    name: "Modular Desk Organizer",
    description: "A snap-together modular desk organizer system. Each module connects magnetically, allowing infinite configurations. Includes phone stand, pen holder, cable management, and card slot modules.",
    short_description: "Magnetic modular desk organizer with 4 snap-together modules",
    price: 59.99,
    images: [product5],
    material: "PLA+",
    layer_height: "0.2mm",
    print_time: "18 hours",
    dimensions: "300 × 150 × 120mm",
    stock: 15,
    featured: true,
    category: "Accessories",
  },
  {
    id: "6",
    name: "Topographic Map Art",
    description: "A layered topographic map art piece representing actual terrain data. Each contour layer is individually printed and assembled, creating a stunning 3D relief map perfect for wall mounting.",
    short_description: "Layered 3D topographic terrain art for wall display",
    price: 89.99,
    images: [product6],
    material: "PLA+",
    layer_height: "0.1mm",
    print_time: "28 hours",
    dimensions: "300 × 300 × 40mm",
    stock: 6,
    featured: false,
    category: "Wall Art",
  },
  {
    id: "7",
    name: "Klein Bottle Vase",
    description: "A mathematical impossibility made real — this Klein bottle-inspired vase features a surface with no distinguishable inside or outside. Watertight inner chamber holds fresh or dried flowers.",
    short_description: "Mathematical Klein bottle vase with watertight chamber",
    price: 69.99,
    images: [product7],
    material: "Resin",
    layer_height: "0.05mm",
    print_time: "20 hours",
    dimensions: "100 × 100 × 220mm",
    stock: 10,
    featured: false,
    category: "Home Decor",
  },
  {
    id: "8",
    name: "Articulated Mech Hand",
    description: "A fully articulated mechanical hand with 15 independent joints. Each finger moves naturally with cable-driven mechanics. An incredible display piece and conversation starter.",
    short_description: "Fully articulated 15-joint mechanical hand sculpture",
    price: 149.99,
    images: [product8],
    material: "PLA+",
    layer_height: "0.1mm",
    print_time: "42 hours",
    dimensions: "200 × 150 × 280mm",
    stock: 3,
    featured: true,
    category: "Sculptures",
  },
];
