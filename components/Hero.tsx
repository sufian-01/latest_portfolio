"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Reveal } from "./Motion";
import TiltCard from "./TiltCard";

const subheading = "AI Automation Engineer | Salesforce Admin | Building Smart Digital Solutions";

export default function Hero() {
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setTypedText(subheading.slice(0, index));
      if (index >= subheading.length) {
        window.clearInterval(timer);
      }
    }, 34);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative grid min-h-screen place-items-center overflow-hidden px-4 pb-20 pt-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,.08),transparent_26rem)]" />
      <motion.div
        aria-hidden="true"
        className="absolute right-[8%] top-[18%] h-44 w-44 rounded-[2rem] border border-white/10 bg-white/[0.035] blur-[1px]"
        animate={{ rotate: [0, 8, -6, 0], y: [0, -14, 8, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute bottom-[14%] left-[9%] h-28 w-28 rounded-full border border-neon/15 bg-neon/[0.045]"
        animate={{ scale: [1, 1.12, 1], x: [0, 18, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-16 lg:grid-cols-[1.05fr_.8fr]">
        <Reveal>
          <p className="eyebrow">AI Automation Engineer + Salesforce Admin</p>
          <h1 className="heading-xl">Mohmmad Sufian</h1>
          <p className="typing-line mt-6 max-w-3xl">{typedText || "\u00A0"}</p>
          <p className="muted-copy mt-6 max-w-2xl">
            I specialize in building intelligent automation systems and scalable web solutions using
            modern technologies. From AI-driven workflows to Salesforce customization, I help
            businesses optimize processes and grow faster.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#projects" className="royal-button">
              View Projects
            </a>
            <a href="#contact" className="ghost-button">
              Contact Me
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="relative mx-auto max-w-[520px] perspective-1000">
            <motion.div
              className="absolute inset-8 rounded-full border border-neon/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-0 rounded-[2rem] border border-royal/30"
              animate={{ rotate: -360 }}
              transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
            />
            <TiltCard className="relative overflow-hidden p-3">
              <Image
                src="/front--.png"
                alt="AI automation dashboard"
                width={1100}
                height={1350}
                priority
                className="aspect-[4/5] rounded-xl object-cover transition duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute left-6 top-8 rounded-xl border border-white/15 bg-ink/70 p-4 backdrop-blur-xl">
                <strong className="block text-2xl text-white">AI</strong>
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-silver">Automation</span>
              </div>
              <div className="absolute bottom-8 right-6 rounded-xl border border-white/15 bg-ink/70 p-4 backdrop-blur-xl">
                <strong className="block text-2xl text-neon">CRM</strong>
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-silver">Salesforce</span>
              </div>
            </TiltCard>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
