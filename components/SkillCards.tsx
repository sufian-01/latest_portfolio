"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type Skill = {
  name: string;
  category: "agentic" | "backend" | "rag" | "tools";
  label: string;
  badge: string;
  icon: "agent" | "code" | "rag" | "api" | "prompt" | "hitl" | "database" | "bot" | "docker" | "data" | "cloud" | "workflow";
};

const coreSkills: Skill[] = [
  {
    name: "LangGraph & LangChain",
    category: "agentic",
    label: "Stateful agent graphs, multi-agent coordination & tool execution",
    badge: "Agentic AI",
    icon: "agent"
  },
  {
    name: "Agentic Process Automation",
    category: "agentic",
    label: "Autonomous business pipelines (APA) and goal-oriented agents",
    badge: "Automation",
    icon: "workflow"
  },
  {
    name: "Retrieval-Augmented Gen (RAG)",
    category: "rag",
    label: "Chunking, vector similarity, context retrieval & grounded Q&A",
    badge: "Vector AI",
    icon: "rag"
  },
  {
    name: "Python & Async Backend",
    category: "backend",
    label: "Core Python, async programming, Pydantic & clean architecture",
    badge: "Programming",
    icon: "code"
  },
  {
    name: "FastAPI & REST Webhooks",
    category: "backend",
    label: "High-performance AI microservices, endpoints & webhook routing",
    badge: "Backend & APIs",
    icon: "api"
  },
  {
    name: "Human-in-the-Loop (HITL)",
    category: "agentic",
    label: "Interrupt checkpoints, human approval & state persistence",
    badge: "Safety & Logic",
    icon: "hitl"
  },
  {
    name: "FAISS & ChromaDB",
    category: "rag",
    label: "High-dimensional vector storage, semantic search & embeddings",
    badge: "Vector DBs",
    icon: "database"
  },
  {
    name: "Prompt Engineering & Tools",
    category: "agentic",
    label: "Structured JSON outputs, function calling & prompt evaluation",
    badge: "LLM Eng",
    icon: "prompt"
  },
  {
    name: "Gemini, OpenAI & Claude APIs",
    category: "rag",
    label: "Multi-provider LLM integrations, model tuning & benchmarking",
    badge: "LLM APIs",
    icon: "cloud"
  },
  {
    name: "WhatsApp & Telegram Bots",
    category: "tools",
    label: "End-to-end bot automation connected to Google Workspace & APIs",
    badge: "Messaging Bots",
    icon: "bot"
  },
  {
    name: "Pandas & Data Pipelines",
    category: "backend",
    label: "Data preprocessing, BeautifulSoup scraping & structured exports",
    badge: "Data Science",
    icon: "data"
  },
  {
    name: "Docker, Git & Postman",
    category: "tools",
    label: "Containerized environments, version control & API testing",
    badge: "DevOps / Tools",
    icon: "docker"
  }
];

const categoryFilters = [
  { id: "all", label: "All Skills" },
  { id: "agentic", label: "Agentic AI & APA" },
  { id: "backend", label: "Backend & Python" },
  { id: "rag", label: "RAG & Vector DBs" },
  { id: "tools", label: "Automation & Tools" }
] as const;

function SkillIcon({ type }: { type: Skill["icon"] }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const
  };

  switch (type) {
    case "agent":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-neon" {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v3m0 14v3M2 12h3m14 0h3m-3.5-6.5-2.1 2.1m-8.8 8.8-2.1 2.1m0-13 2.1 2.1m8.8 8.8 2.1 2.1" />
        </svg>
      );
    case "workflow":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-plasma" {...common}>
          <rect x="3" y="3" width="6" height="6" rx="1.5" />
          <rect x="15" y="3" width="6" height="6" rx="1.5" />
          <rect x="9" y="15" width="6" height="6" rx="1.5" />
          <path d="M6 9v3a3 3 0 0 0 3 3h3m6-6v3a3 3 0 0 1-3 3" />
        </svg>
      );
    case "rag":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-royal" {...common}>
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
          <path d="M6 6h10m-10 4h10m-10 4h6" />
          <circle cx="18" cy="17" r="3" />
          <path d="m20.5 19.5 2 2" />
        </svg>
      );
    case "code":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-neon" {...common}>
          <path d="m8 9-4 3 4 3m8-6 4 3-4 3m-6 3 4-12" />
        </svg>
      );
    case "api":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-cyan-300" {...common}>
          <path d="M4 14h6m-3-3v6m8-9a4 4 0 0 1 4 4v4a4 4 0 0 1-4 4m-4-6h8" />
        </svg>
      );
    case "hitl":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-plasma" {...common}>
          <circle cx="12" cy="7" r="4" />
          <path d="M5.5 21a8.38 8.38 0 0 1 13 0" />
          <path d="M12 14v4m-2-2h4" />
        </svg>
      );
    case "database":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-royal" {...common}>
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
          <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
        </svg>
      );
    case "prompt":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-neon" {...common}>
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <path d="m8 10 2 2-2 2m4 0h4" />
        </svg>
      );
    case "cloud":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-cyan-300" {...common}>
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
        </svg>
      );
    case "bot":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-plasma" {...common}>
          <rect x="3" y="11" width="18" height="10" rx="2" />
          <circle cx="12" cy="5" r="2" />
          <path d="M12 7v4m-4 5h.01m7.99 0h.01" />
        </svg>
      );
    case "data":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-royal" {...common}>
          <path d="M3 3v18h18" />
          <path d="m19 9-5 5-4-4-3 3" />
        </svg>
      );
    case "docker":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-neon" {...common}>
          <path d="M4 13h16a2 2 0 0 1 2 2v2a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5v-2a2 2 0 0 1 2-2Z" />
          <rect x="5" y="7" width="2.5" height="3" rx="0.5" />
          <rect x="9.5" y="7" width="2.5" height="3" rx="0.5" />
          <rect x="14" y="7" width="2.5" height="3" rx="0.5" />
        </svg>
      );
  }
}

export default function SkillCards() {
  const [filter, setFilter] = useState<string>("all");

  const filteredSkills =
    filter === "all"
      ? coreSkills
      : coreSkills.filter((s) => s.category === filter);

  return (
    <div className="mt-8 w-full">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {categoryFilters.map((cat) => {
          const isActive = filter === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setFilter(cat.id)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition duration-200 ${
                isActive
                  ? "border border-neon/40 bg-neon/15 text-neon shadow-[0_0_15px_rgba(112,215,255,0.25)]"
                  : "border border-white/10 bg-white/[0.04] text-silver/70 hover:border-white/20 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Grid of Skill Cards with strict responsive layout */}
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredSkills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.03 }}
            className="group relative flex flex-col justify-between rounded-xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:border-neon/40 hover:bg-white/[0.07] hover:shadow-[0_12px_32px_rgba(0,0,0,0.35),0_0_20px_rgba(112,215,255,0.12)]"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] transition duration-300 group-hover:border-neon/30 group-hover:bg-neon/10">
                  <SkillIcon type={skill.icon} />
                </div>
                <span className="rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-silver/80">
                  {skill.badge}
                </span>
              </div>
              <h4 className="text-base font-bold text-white transition group-hover:text-neon">
                {skill.name}
              </h4>
              <p className="mt-1.5 text-xs leading-5 text-silver/70">
                {skill.label}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
