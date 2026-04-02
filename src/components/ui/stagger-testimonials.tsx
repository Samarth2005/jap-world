"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    tempId: 0,
    testimonial: "The Fractal Dragon is absolutely stunning. The level of detail at 0.05mm layers is something you have to see in person to believe.",
    by: "Alex M., Product Designer",
    imgSrc: "https://i.pravatar.cc/150?img=1"
  },
  {
    tempId: 1,
    testimonial: "Ordered the Lattice Lamp Shade and it transforms my entire room. The shadow patterns are mesmerizing. Packaging was impeccable.",
    by: "Sarah K., Interior Architect",
    imgSrc: "https://i.pravatar.cc/150?img=2"
  },
  {
    tempId: 2,
    testimonial: "The Modular Desk Organizer is incredibly practical and looks amazing on my desk. The magnetic connections are satisfying.",
    by: "James T., Software Engineer",
    imgSrc: "https://i.pravatar.cc/150?img=3"
  },
  {
    tempId: 3,
    testimonial: "As a fellow maker, I can appreciate the precision here. The Geometric Vortex is a masterpiece of parametric design.",
    by: "Maya R., 3D Artist",
    imgSrc: "https://i.pravatar.cc/150?img=4"
  },
  {
    tempId: 4,
    testimonial: "Print quality is unmatched. You can tell these are made with care, not mass-produced. Worth every penny.",
    by: "Andre, Head of Design at CreativeLab",
    imgSrc: "https://i.pravatar.cc/150?img=5"
  },
  {
    tempId: 5,
    testimonial: "SO HAPPY with my order! The packaging alone shows how much they care. The print itself is flawless.",
    by: "Jeremy, Collector",
    imgSrc: "https://i.pravatar.cc/150?img=6"
  },
  {
    tempId: 6,
    testimonial: "Took some convincing to buy art prints online, but the quality blew me away. Never going back to mass-produced decor.",
    by: "Pam, Interior Designer",
    imgSrc: "https://i.pravatar.cc/150?img=7"
  },
  {
    tempId: 7,
    testimonial: "Every piece I've ordered has been perfect. The attention to post-processing and finishing is incredible.",
    by: "Daniel, Architect",
    imgSrc: "https://i.pravatar.cc/150?img=8"
  },
  {
    tempId: 8,
    testimonial: "It's just the best 3D print shop. Period.",
    by: "Fernando, UX Designer",
    imgSrc: "https://i.pravatar.cc/150?img=9"
  },
  {
    tempId: 9,
    testimonial: "I've been collecting 3D printed art for years. This shop is on another level in terms of quality.",
    by: "Andy, Tech Enthusiast",
    imgSrc: "https://i.pravatar.cc/150?img=10"
  },
  {
    tempId: 10,
    testimonial: "I've been searching for premium 3D printed decor for YEARS. So glad I finally found this shop!",
    by: "Pete, Art Collector",
    imgSrc: "https://i.pravatar.cc/150?img=11"
  },
  {
    tempId: 11,
    testimonial: "Gifted the Fractal Dragon to my partner. They were speechless. The detail is museum-quality.",
    by: "Marina, Gift Buyer",
    imgSrc: "https://i.pravatar.cc/150?img=12"
  },
];

interface TestimonialCardProps {
  position: number;
  testimonial: typeof testimonials[0];
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  position,
  testimonial,
  handleMove,
  cardSize
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-500 ease-in-out",
        isCenter
          ? "z-10 bg-primary text-primary-foreground border-primary"
          : "z-0 bg-card text-card-foreground border-border hover:border-primary/50"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? "0px 8px 0px 4px hsl(var(--border))" : "0px 0px 0px 0px transparent"
      }}
    >
      <img
        src={testimonial.imgSrc}
        alt={testimonial.by}
        className="mb-4 h-14 w-14 rounded-full border-2 border-border object-cover"
      />
      <p className={cn(
        "text-base italic leading-relaxed",
        isCenter ? "text-primary-foreground/90" : "text-muted-foreground"
      )}>
        "{testimonial.testimonial}"
      </p>
      <p className={cn(
        "mt-4 text-sm font-medium",
        isCenter ? "text-primary-foreground/70" : "text-muted-foreground/70"
      )}>
        - {testimonial.by}
      </p>
    </div>
  );
};

export const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div className="relative flex w-full items-center justify-center overflow-hidden" style={{ height: `${cardSize * 1.6}px` }}>
      {testimonialsList.map((testimonial, index) => {
        const position = testimonialsList.length % 2
          ? index - (testimonialsList.length + 1) / 2
          : index - testimonialsList.length / 2;
        return (
          <TestimonialCard
            key={testimonial.tempId}
            position={position}
            testimonial={testimonial}
            handleMove={handleMove}
            cardSize={cardSize}
          />
        );
      })}
      <div className="absolute bottom-8 z-20 flex items-center gap-4">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
            "bg-background border-2 border-border hover:bg-primary hover:text-primary-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          )}
          aria-label="Previous testimonial"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
            "bg-background border-2 border-border hover:bg-primary hover:text-primary-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          )}
          aria-label="Next testimonial"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};
