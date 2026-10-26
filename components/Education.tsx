"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { education, experiences, certifications } from "@/lib/data";
import { Reveal } from "./Motion";

export default function Education() {
  const [activeTab, setActiveTab] = useState<"experience" | "education" | "certifications">("experience");

  return (
    <section id="experience" className="section-shell">
      <span id="education" className="absolute -top-24" aria-hidden="true" />
      <Reveal>
        <p className="eyebrow">Career & Credentials</p>
        <h2 className="heading-lg">
          Practical industry engineering, academic foundation & certifications.
        </h2>
      </Reveal>

      {/* Tab Switcher */}
      <div className="mt-8 flex flex-wrap gap-3 border-b border-white/10 pb-4">
        <button
          type="button"
          onClick={() => setActiveTab("experience")}
          className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-extrabold transition duration-300 ${
            activeTab === "experience"
              ? "border border-neon/40 bg-neon/15 text-neon shadow-glow"
              : "border border-white/10 bg-white/[0.04] text-silver/70 hover:border-white/20 hover:text-white"
          }`}
        >
          <span>💼</span>
          <span>Experience ({experiences.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("education")}
          className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-extrabold transition duration-300 ${
            activeTab === "education"
              ? "border border-neon/40 bg-neon/15 text-neon shadow-glow"
              : "border border-white/10 bg-white/[0.04] text-silver/70 hover:border-white/20 hover:text-white"
          }`}
        >
          <span>🎓</span>
          <span>Education ({education.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("certifications")}
          className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-extrabold transition duration-300 ${
            activeTab === "certifications"
              ? "border border-neon/40 bg-neon/15 text-neon shadow-glow"
              : "border border-white/10 bg-white/[0.04] text-silver/70 hover:border-white/20 hover:text-white"
          }`}
        >
          <span>📜</span>
          <span>Certifications ({certifications.length})</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="mt-10">
        <AnimatePresence mode="wait">
          {activeTab === "experience" && (
            <motion.div
              key="experience"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {experiences.map((exp, index) => (
                <article
                  key={`${exp.company}-${index}`}
                  className="group relative rounded-2xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-md transition-all duration-200 hover:border-neon/30 hover:bg-white/[0.06] hover:shadow-lg"
                >
                  <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                    <div>
                      <h3 className="text-xl font-black text-white group-hover:text-neon transition">
                        {exp.role}
                      </h3>
                      <p className="mt-1 text-sm font-semibold text-silver/90">
                        {exp.company} <span className="text-silver/50">•</span>{" "}
                        <span className="text-xs text-silver/60">{exp.location}</span>
                      </p>
                    </div>
                    <span className="self-start rounded-full border border-neon/30 bg-neon/10 px-3.5 py-1 text-xs font-black text-neon sm:self-auto">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="mt-4 space-y-2 border-t border-white/10 pt-4">
                    {exp.highlights.map((point, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm leading-6 text-silver/80">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neon/80" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </motion.div>
          )}

          {activeTab === "education" && (
            <motion.div
              key="education"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {education.map((item, index) => (
                <article
                  key={`${item.degree}-${index}`}
                  className="group relative rounded-2xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-md transition-all duration-200 hover:border-neon/30 hover:bg-white/[0.06] hover:shadow-lg"
                >
                  <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                    <div>
                      <span className="text-xs font-extrabold uppercase tracking-wider text-neon">
                        {item.year}
                      </span>
                      <h3 className="mt-1 text-xl font-black text-white group-hover:text-neon transition">
                        {item.degree}
                      </h3>
                      <p className="mt-1 text-sm font-semibold text-silver/90">
                        {item.institution}
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-silver/75 border-t border-white/10 pt-3">
                    {item.description}
                  </p>
                </article>
              ))}
            </motion.div>
          )}

          {activeTab === "certifications" && (
            <motion.div
              key="certifications"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {certifications.map((cert, index) => (
                <article
                  key={`${cert.title}-${index}`}
                  className="group relative flex flex-col justify-between rounded-xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:border-neon/35 hover:bg-white/[0.06] hover:shadow-glow"
                >
                  <div>
                    <span className="inline-block rounded-md border border-plasma/30 bg-plasma/10 px-2 py-0.5 text-[11px] font-black text-plasma uppercase tracking-wider">
                      {cert.year}
                    </span>
                    <h3 className="mt-3 text-base font-bold text-white group-hover:text-neon transition leading-snug">
                      {cert.title}
                    </h3>
                  </div>
                  <p className="mt-4 border-t border-white/10 pt-3 text-xs font-semibold text-silver/70">
                    Issuer: {cert.issuer}
                  </p>
                </article>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
