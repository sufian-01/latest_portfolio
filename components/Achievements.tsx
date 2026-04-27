"use client";

import { motion } from "framer-motion";
import { Reveal } from "./Motion";

const stats = [
  ["AI", "Workflow Automation"],
  ["CRM", "Salesforce Admin"],
  ["API", "FastAPI & Flask"],
  ["UX", "Clean Web Interfaces"]
];

export default function Achievements() {
  return (
    <section className="section-shell">
      <Reveal>
        <div className="glass rounded-lg p-6 md:p-10">
          <p className="eyebrow">Focus Areas</p>
          <h2 className="heading-lg">A practical stack for building smarter digital operations.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {stats.map(([value, label], index) => (
              <motion.article
                key={label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-lg border border-white/10 bg-white/[0.04] p-5"
              >
                <strong className="block text-4xl font-black text-plasma md:text-5xl">{value}</strong>
                <span className="mt-2 block font-bold text-silver/75">{label}</span>
              </motion.article>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
