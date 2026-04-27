"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { navItems, socialLinks } from "@/lib/data";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/55 backdrop-blur-2xl">
      <nav className="mx-auto flex h-20 w-[min(1180px,calc(100%-2rem))] items-center justify-between">
        <a href="#home" className="flex items-center gap-3 font-black text-white" aria-label="Mohmmad Sufian home">
          <span className="grid h-11 w-11 place-items-center rounded-xl border border-neon/25 bg-white/[0.08] text-neon shadow-glow">
            MS
          </span>
          <span className="hidden sm:inline">Mohmmad Sufian</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-bold text-silver/75 transition hover:bg-white/[0.08] hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          {socialLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              aria-label={item.label}
              className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.05] text-xs font-black text-silver transition hover:-translate-y-0.5 hover:border-neon/40 hover:text-neon"
            >
              <img src={item.icon} alt={item.label} />
            </a>
          ))}
          <a href="#contact" className="ghost-button">
            Contact Me
          </a>
        </div>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-lg border border-white/15 bg-white/[0.08] md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="grid gap-1.5" aria-hidden="true">
            <span className={`block h-0.5 w-5 bg-white transition ${open ? "translate-y-1 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-white transition ${open ? "-translate-y-1 -rotate-45" : ""}`} />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="mx-4 mb-4 rounded-lg border border-white/15 bg-ink/90 p-2 shadow-royal backdrop-blur-2xl md:hidden"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-4 py-3 font-bold text-silver transition hover:bg-white/[0.08] hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
