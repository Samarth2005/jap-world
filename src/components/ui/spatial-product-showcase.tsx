'use client';

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  Battery,
  Sliders,
  ChevronRight,
  Layers,
  Ruler,
  Box,
  Palette,
  LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// =========================================
// 1. CONFIGURATION & DATA TYPES
// =========================================

export type ProductId = 'left' | 'right';

export interface FeatureMetric {
  label: string;
  value: number;
  icon: LucideIcon;
}

export interface ProductData {
  id: ProductId;
  label: string;
  title: string;
  description: string;
  image: string;
  colors: {
    gradient: string;
    glow: string;
    ring: string;
  };
  stats: {
    connectionStatus: string;
    batteryLevel: number;
  };
  features: FeatureMetric[];
}

// 3D Printed Dragon product data
const PRODUCT_DATA: Record<ProductId, ProductData> = {
  left: {
    id: 'left',
    label: 'Standard',
    title: 'Fractal Dragon',
    description: 'Hand-finished PLA+ print at 0.05mm layer height. 12-hour print time with intricate parametric scales and articulated joints.',
    image: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=600&h=600&fit=crop',
    colors: {
      gradient: 'from-zinc-600 to-zinc-900',
      glow: 'bg-zinc-400',
      ring: 'border-l-zinc-400/50',
    },
    stats: { connectionStatus: 'In Stock', batteryLevel: 85 },
    features: [
      { label: 'Layer Height', value: 95, icon: Layers },
      { label: 'Detail', value: 98, icon: Ruler },
    ],
  },
  right: {
    id: 'right',
    label: 'Premium',
    title: 'Obsidian Dragon',
    description: 'Resin-printed limited edition with hand-painted obsidian finish. Museum-grade detail at 0.02mm resolution with UV-cured coating.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=600&fit=crop',
    colors: {
      gradient: 'from-neutral-600 to-neutral-900',
      glow: 'bg-neutral-300',
      ring: 'border-r-neutral-300/50',
    },
    stats: { connectionStatus: 'Limited Edition', batteryLevel: 12 },
    features: [
      { label: 'Resolution', value: 99, icon: Box },
      { label: 'Finish', value: 96, icon: Palette },
    ],
  },
};

// =========================================
// 2. ANIMATION VARIANTS
// =========================================

const ANIMATIONS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { type: 'spring' as const, stiffness: 100, damping: 20 },
    },
    exit: { opacity: 0, y: -10, filter: 'blur(5px)' },
  },
  image: (isLeft: boolean): Variants => ({
    initial: {
      opacity: 0,
      scale: 1.5,
      filter: 'blur(15px)',
      rotate: isLeft ? -30 : 30,
      x: isLeft ? -80 : 80,
    },
    animate: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      rotate: 0,
      x: 0,
      transition: { type: 'spring', stiffness: 260, damping: 20 },
    },
    exit: {
      opacity: 0,
      scale: 0.6,
      filter: 'blur(20px)',
      transition: { duration: 0.25 },
    },
  }),
};

// =========================================
// 3. SUB-COMPONENTS
// =========================================

const BackgroundGradient = ({ isLeft }: { isLeft: boolean }) => (
  <div className="absolute inset-0 overflow-hidden">
    <div className={cn(
      "absolute inset-0 bg-gradient-to-br opacity-20 transition-all duration-700",
      isLeft ? "from-zinc-600 to-zinc-900" : "from-neutral-600 to-neutral-900"
    )} />
  </div>
);

const ProductVisual = ({ data, isLeft }: { data: ProductData; isLeft: boolean }) => (
  <div className="relative flex items-center justify-center py-12 lg:py-0">
    {/* Animated Rings */}
    <div className={cn("absolute h-72 w-72 rounded-full border-2 opacity-20 animate-pulse", data.colors.ring)} />
    <div className={cn("absolute h-96 w-96 rounded-full border opacity-10 animate-pulse", data.colors.ring)} style={{ animationDelay: '0.5s' }} />

    {/* Image Container */}
    <div className="relative z-10">
      <AnimatePresence mode="wait">
        <motion.div
          key={data.id}
          variants={ANIMATIONS.image(isLeft)}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <div className="relative">
            <div className={cn("absolute -inset-4 rounded-full opacity-30 blur-2xl", data.colors.glow)} />
            <img
              src={data.image}
              alt={data.title}
              className="relative h-64 w-64 rounded-2xl object-cover shadow-2xl sm:h-80 sm:w-80"
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>

    {/* Status Label */}
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute bottom-4 lg:bottom-8">
      <div className="flex items-center gap-2 rounded-full bg-background/60 backdrop-blur-md px-4 py-2 text-xs text-foreground border border-border">
        <div className={cn("h-2 w-2 rounded-full animate-pulse", data.colors.glow)} />
        {data.stats.connectionStatus}
      </div>
    </motion.div>
  </div>
);

const ProductDetails = ({ data, isLeft }: { data: ProductData; isLeft: boolean }) => {
  const alignClass = isLeft ? 'items-start text-left' : 'items-end text-right';
  const flexDirClass = isLeft ? 'flex-row' : 'flex-row-reverse';
  const barColorClass = isLeft ? 'left-0 bg-zinc-400' : 'right-0 bg-neutral-300';

  return (
    <motion.div
      variants={ANIMATIONS.container}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={cn("flex flex-col gap-6", alignClass)}
    >
      <motion.p variants={ANIMATIONS.item} className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">
        {data.label} Edition
      </motion.p>
      <motion.h2 variants={ANIMATIONS.item} className="text-4xl font-bold text-foreground sm:text-5xl">
        {data.title}
      </motion.h2>
      <motion.p variants={ANIMATIONS.item} className="max-w-sm text-sm leading-relaxed text-muted-foreground">
        {data.description}
      </motion.p>

      {/* Feature Grid */}
      <motion.div variants={ANIMATIONS.item} className="flex flex-col gap-3 w-full max-w-xs">
        {data.features.map((feature, idx) => (
          <div key={idx} className={cn("flex items-center gap-3", flexDirClass)}>
            <div className="flex items-center gap-2 min-w-[100px]">
              <feature.icon className="h-4 w-4 text-muted-foreground" />
              <span className={cn("text-xs", feature.value > 50 ? 'text-foreground' : 'text-muted-foreground')}>
                {feature.label}
              </span>
            </div>
            <span className="text-sm font-medium text-foreground">{feature.value}%</span>
          </div>
        ))}
        <div className={cn("flex items-center gap-3 mt-2", flexDirClass)}>
          <div className="relative h-8 w-full overflow-hidden rounded-lg bg-muted/30 backdrop-blur-sm">
            <div className={cn("absolute top-0 h-full rounded-lg transition-all duration-700", barColorClass)} style={{ width: '60%' }} />
          </div>
        </div>

        <div className={cn("flex items-center gap-2 mt-2", flexDirClass)}>
          <button className="flex items-center gap-1 rounded-full bg-primary px-5 py-2.5 text-xs font-medium text-primary-foreground hover:opacity-90 transition-opacity">
            View Specs
            <ChevronRight className="h-3 w-3" />
          </button>
        </div>
      </motion.div>

      {/* Stock indicator */}
      <motion.div variants={ANIMATIONS.item} className={cn("flex items-center gap-2 text-xs text-muted-foreground", flexDirClass)}>
        <Sliders className="h-3 w-3" />
        {data.stats.batteryLevel} units remaining
      </motion.div>
    </motion.div>
  );
};

const Switcher = ({
  activeId,
  onToggle
}: {
  activeId: ProductId;
  onToggle: (id: ProductId) => void
}) => {
  const options = Object.values(PRODUCT_DATA).map(p => ({ id: p.id, label: p.label }));

  return (
    <div className="flex items-center justify-center">
      <div className="relative flex gap-1 rounded-full bg-muted/40 backdrop-blur-md p-1 border border-border">
        {options.map((opt) => (
          <motion.button
            key={opt.id}
            onClick={() => onToggle(opt.id)}
            whileTap={{ scale: 0.96 }}
            className="relative w-24 h-12 rounded-full flex items-center justify-center text-sm font-medium focus:outline-none"
          >
            {activeId === opt.id && (
              <motion.div
                layoutId="activePill"
                className="absolute inset-0 rounded-full bg-primary"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className={cn("relative z-10", activeId === opt.id ? "text-primary-foreground" : "text-muted-foreground")}>
              {opt.label}
            </span>
            {activeId === opt.id && (
              <motion.div
                layoutId="activeGlow"
                className="absolute -inset-1 rounded-full bg-primary/20 blur-md -z-10"
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

// =========================================
// 4. MAIN COMPONENT
// =========================================

export default function SpatialProductShowcase() {
  const [activeSide, setActiveSide] = useState<ProductId>('left');

  const currentData = PRODUCT_DATA[activeSide];
  const isLeft = activeSide === 'left';

  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden bg-background py-20 px-6">
      <BackgroundGradient isLeft={isLeft} />

      <div className="container relative mx-auto max-w-6xl">
        <AnimatePresence mode="wait">
          <motion.div key={activeSide} className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* Left Column: Visuals */}
            <ProductVisual data={currentData} isLeft={isLeft} />

            {/* Right Column: Content */}
            <div className="flex flex-col items-center lg:items-start gap-10">
              <ProductDetails data={currentData} isLeft={isLeft} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <Switcher activeId={activeSide} onToggle={setActiveSide} />
    </section>
  );
}
