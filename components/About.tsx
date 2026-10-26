import Image from "next/image";
import { Reveal } from "./Motion";
import SkillCards from "./SkillCards";
import TiltCard from "./TiltCard";

export default function About() {
  return (
    <section id="about" className="section-shell">
      <Reveal>
        <p className="eyebrow">About Me</p>
        <h2 className="heading-lg">
          Building production-grade Agentic AI pipelines & intelligent automation workflows.
        </h2>
      </Reveal>

      <div className="mt-12 grid items-start gap-12 lg:grid-cols-[.78fr_1.22fr]">
        <Reveal>
          <div className="sticky top-28">
            <TiltCard className="overflow-hidden rounded-2xl border border-white/15 bg-white/[0.04] p-3 shadow-2xl backdrop-blur-xl">
              <Image
                src="/front1---.png"
                alt="Mohmmad Sufian portrait"
                width={1000}
                height={1000}
                className="aspect-square rounded-xl object-cover transition duration-500 group-hover:scale-[1.03]"
              />
            </TiltCard>

            <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-md">
              <h4 className="text-sm font-black uppercase tracking-wider text-neon">
                Current Role
              </h4>
              <p className="mt-1 text-base font-bold text-white">
                AI Engineer Intern
              </p>
              <p className="text-xs text-silver/70">
                Multiply Tech India Private Limited (Noida)
              </p>
              <div className="mt-4 border-t border-white/10 pt-3 flex flex-col gap-1.5 text-xs text-silver/80">
                <div>
                  <span className="text-white font-semibold">Location:</span> Noida / New Delhi, India
                </div>
                <div>
                  <span className="text-white font-semibold">Degree:</span> B.Tech CSE (Final Year), Jamia Hamdard
                </div>
                <div>
                  <span className="text-white font-semibold">Email:</span> khansyrian1@gmail.com
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="space-y-4">
            <p className="muted-copy text-silver/90">
              I am an <strong className="text-white font-semibold">AI Engineer</strong> with hands-on experience building LLM-powered applications, Retrieval-Augmented Generation (RAG) systems, and agentic AI workflows using Python, LangChain, LangGraph, and FastAPI.
            </p>
            <p className="muted-copy text-silver/80 text-base">
              Currently working at <strong className="text-white">Multiply Tech India</strong>, I develop Agentic Process Automation (APA) pipelines, construct multi-agent coordination architectures, and integrate generative AI into high-impact product workflows and WhatsApp automation systems.
            </p>
            <p className="muted-copy text-silver/80 text-base">
              My engineering toolkit centers on prompt engineering, semantic search, FAISS and ChromaDB vector embeddings, modular tool calling, Human-in-the-Loop (HITL) checkpoints, and model evaluation — consistently taking AI innovations from prototype to production deployment through robust asynchronous backend APIs.
            </p>
          </div>

          <div className="mt-10 border-t border-white/10 pt-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black uppercase tracking-[0.14em] text-white">
                  Technical & Core Skills
                </h3>
                <p className="mt-1 text-xs text-silver/70">
                  Comprehensive toolset based on real-world implementations & production workflows
                </p>
              </div>
            </div>
            <SkillCards />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
