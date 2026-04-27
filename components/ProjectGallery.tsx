"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

type ProjectGalleryProps = {
  images: string[];
  title: string;
};

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [active, setActive] = useState(0);
  const image = images[active];

  return (
    <div className="grid gap-4">
      <div className="glass relative overflow-hidden rounded-2xl p-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={image}
            initial={{ opacity: 0, scale: 0.98, x: 24 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.98, x: -24 }}
            transition={{ duration: 0.38, ease: "easeOut" }}
          >
            <Image
              src={image}
              alt={`${title} gallery image ${active + 1}`}
              width={1400}
              height={900}
              priority={active === 0}
              className="aspect-[16/10] rounded-xl object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {images.map((item, index) => (
          <button
            key={item}
            type="button"
            aria-label={`Show project image ${index + 1}`}
            onClick={() => setActive(index)}
            className={`overflow-hidden rounded-xl border p-1 transition ${
              active === index ? "border-neon shadow-glow" : "border-white/10 opacity-70 hover:opacity-100"
            }`}
          >
            <Image
              src={item}
              alt=""
              width={420}
              height={280}
              className="aspect-[16/10] rounded-lg object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
