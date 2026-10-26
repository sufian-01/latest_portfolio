"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { navItems, socialLinks } from "@/lib/data";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/70 backdrop-blur-2xl">
      <nav className="mx-auto flex h-20 w-[min(1180px,calc(100%-2rem))] items-center justify-between">
        <a href="#home" className="flex items-center gap-3 font-black text-white group" aria-label="Mohmmad Sufian home">
          <span className="grid h-11 w-11 place-items-center rounded-xl border border-neon/30 bg-white/[0.08] text-neon shadow-[0_0_20px_rgba(112,215,255,0.2)] transition group-hover:scale-105 group-hover:border-neon">
            MS
          </span>
          <div className="flex flex-col">
            <span className="text-base font-extrabold tracking-tight text-white group-hover:text-neon transition">
              Mohmmad Sufian
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-silver/60">
              AI Automation Engineer
            </span>
          </div>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-bold text-silver/80 transition hover:bg-white/[0.08] hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2.5 sm:flex">
          {socialLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              aria-label={item.label}
              className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.05] p-2 transition hover:-translate-y-0.5 hover:border-neon/40 hover:bg-white/[0.1] hover:text-neon"
            >
              <img src={item.icon} alt={item.label} className="h-4 w-4 object-contain" />
            </a>
          ))}
          <a href="#contact" className="ghost-button !min-h-10 !px-4 !py-1.5 !text-xs !font-black uppercase tracking-wider">
            Contact
          </a>
        </div>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-lg border border-white/15 bg-white/[0.08] lg:hidden"
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
            className="mx-4 mb-4 rounded-xl border border-white/15 bg-ink/95 p-3 shadow-royal backdrop-blur-2xl lg:hidden"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-4 py-3 text-sm font-bold text-silver transition hover:bg-white/[0.08] hover:text-white"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-2 flex items-center gap-2 border-t border-white/10 pt-3">
              <a
                href="/resume/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="ghost-button w-full text-center text-xs"
              >
                Download Resume
              </a>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="royal-button w-full text-center text-xs"
              >
                Contact Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
