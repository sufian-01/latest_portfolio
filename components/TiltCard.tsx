"use client";

import type { ReactNode } from "react";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
};

export default function TiltCard({ children, className = "" }: TiltCardProps) {
  return (
    <div
      className={`group relative transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.4),0_0_30px_rgba(112,215,255,0.12)] ${className}`}
    >
      {children}
    </div>
  );
}
