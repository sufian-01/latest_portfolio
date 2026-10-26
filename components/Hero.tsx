"use client";

import Image from "next/image";
import { useEffect, useState, memo } from "react";
import { Reveal } from "./Motion";
import TiltCard from "./TiltCard";

const subheading = "AI Automation Engineer | Generative AI | Agentic AI | LangGraph | Python";

const TypewriterSubheading = memo(function TypewriterSubheading() {
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setTypedText(subheading.slice(0, index));
      if (index >= subheading.length) {
        window.clearInterval(timer);
      }
    }, 28);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <p className="typing-line mt-5 max-w-2xl font-semibold tracking-wide">
      {typedText || "\u00A0"}
    </p>
  );
});

export default function Hero() {
  return (
    <section id="home" className="relative grid min-h-[92vh] place-items-center overflow-hidden px-4 pb-16 pt-28 md:pt-32">
      {/* Lightweight ambient background glows */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_15%,rgba(112,215,255,0.09),transparent_28rem)]" />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.12fr_.88fr]">
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-neon/30 bg-neon/[0.08] px-3.5 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-neon shadow-[0_0_15px_rgba(112,215,255,0.15)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-neon" />
            </span>
            AI AUTOMATION ENGINEER
          </div>

          <h1 className="heading-xl mt-4">
            Mohmmad <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-white via-slate-100 to-silver/80 bg-clip-text text-transparent">
              Sufian
            </span>
          </h1>

          <TypewriterSubheading />

          <p className="muted-copy mt-6 max-w-2xl">
            AI Engineer specializing in Agentic Process Automation (APA), LLM-powered applications,
            Retrieval-Augmented Generation (RAG) systems, and autonomous workflows using Python,
            LangChain, LangGraph, and FastAPI. Developing robust AI systems from prototype to production.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <a href="#projects" className="royal-button">
              View Projects
            </a>
            <a href="#contact" className="ghost-button">
              Contact Me
            </a>
            <a
              href="/resume/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="ghost-button flex items-center gap-2 border-neon/30 text-neon hover:border-neon hover:text-white"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span>Download Resume</span>
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-white/10 pt-6 text-xs text-silver/80">
            <div>
              <span className="block text-lg font-black text-white">10+</span>
              <span className="uppercase tracking-wider">AI Projects</span>
            </div>
            <div className="h-7 w-px bg-white/10" />
            <div>
              <span className="block text-lg font-black text-neon">APA</span>
              <span className="uppercase tracking-wider">Agentic Workflows</span>
            </div>
            <div className="h-7 w-px bg-white/10" />
            <div>
              <span className="block text-lg font-black text-plasma">100%</span>
              <span className="uppercase tracking-wider">Production Focus</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="relative mx-auto max-w-[460px]">
            <TiltCard className="relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-2.5 shadow-2xl backdrop-blur-md">
              <Image
                src="/front--.png"
                alt="Mohmmad Sufian - AI Automation Engineer"
                width={1100}
                height={1350}
                priority
                className="aspect-[4/5] rounded-xl object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />

              {/* Top-left badge: AI Automation */}
              <div className="absolute left-5 top-7 rounded-xl border border-white/20 bg-ink/85 px-3.5 py-2.5 backdrop-blur-md shadow-lg">
                <strong className="block text-xl font-black text-white tracking-tight">AI</strong>
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-plasma">Automation</span>
              </div>

              {/* Bottom-right badge: Agentic AI & LangGraph */}
              <div className="absolute bottom-7 right-5 rounded-xl border border-neon/30 bg-ink/90 px-3.5 py-2.5 backdrop-blur-md shadow-lg">
                <strong className="block text-xl font-black text-neon tracking-tight">AGENTIC</strong>
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-silver">AI & LangGraph</span>
              </div>
            </TiltCard>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
