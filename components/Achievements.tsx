"use client";

import { motion } from "framer-motion";
import { Reveal } from "./Motion";

const stats = [
  { value: "APA", label: "Agentic Automation", desc: "LangGraph state workflows & tool calling" },
  { value: "RAG", label: "Vector Search & Embeddings", desc: "FAISS & ChromaDB context pipelines" },
  { value: "LLM", label: "Multi-Model Orchestration", desc: "Gemini 2.5, OpenAI GPT & Claude" },
  { value: "API", label: "FastAPI & Async Backends", desc: "Production microservices & webhooks" }
];

export default function Achievements() {
  return (
    <section className="section-shell">
      <Reveal>
        <div className="glass rounded-2xl p-6 md:p-10 border border-white/15">
          <p className="eyebrow">Engineering Focus</p>
          <h2 className="heading-lg">
            Architected for intelligence, reliability, and automated scalability.
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item, index) => (
              <motion.article
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group relative rounded-xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-neon/40 hover:bg-white/[0.07] hover:shadow-glow"
              >
                <strong className="block text-4xl font-black text-plasma tracking-tight md:text-5xl">
                  {item.value}
                </strong>
                <span className="mt-2 block font-extrabold text-white text-base">
                  {item.label}
                </span>
                <p className="mt-1.5 text-xs text-silver/70 leading-relaxed">
                  {item.desc}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
