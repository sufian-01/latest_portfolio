"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import type { ReactNode } from "react";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
};

export default function TiltCard({ children, className = "" }: TiltCardProps) {
  const rotateX = useSpring(useMotionValue(0), { stiffness: 180, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 180, damping: 20 });
  const glowX = useMotionValue("50%");
  const glowY = useMotionValue("0%");
  const background = useMotionTemplate`radial-gradient(circle at ${glowX} ${glowY}, rgba(112, 215, 255, 0.18), transparent 18rem), rgba(255,255,255,0.07)`;

  return (
    <motion.div
      className={`image-tilt glass group rounded-xl ${className}`}
      style={{ rotateX, rotateY, background }}
      whileHover={{ scale: 1.05, boxShadow: "0 36px 110px rgba(112, 215, 255, 0.22)" }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        rotateX.set((y / rect.height - 0.5) * -12);
        rotateY.set((x / rect.width - 0.5) * 12);
        glowX.set(`${(x / rect.width) * 100}%`);
        glowY.set(`${(y / rect.height) * 100}%`);
      }}
      onMouseLeave={() => {
        rotateX.set(0);
        rotateY.set(0);
        glowX.set("50%");
        glowY.set("0%");
      }}
    >
      {children}
    </motion.div>
  );
}
