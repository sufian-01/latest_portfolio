"use client";

import { motion } from "framer-motion";

type Skill = {
  name: string;
  label: string;
  icon: "code" | "markup" | "style" | "server" | "api" | "flow" | "design" | "ai" | "prompt" | "cloud";
};

const skills: Skill[] = [
  { name: "Python", label: "Backend", icon: "code" },
  { name: "HTML", label: "Structure", icon: "markup" },
  { name: "CSS", label: "Interface", icon: "style" },
  { name: "Flask", label: "Web Apps", icon: "server" },
  { name: "FastAPI", label: "APIs", icon: "api" },
  { name: "Automation (n8n)", label: "Workflows", icon: "flow" },
  { name: "Canva", label: "Design", icon: "design" },
  { name: "AI Tools", label: "Productivity", icon: "ai" },
  { name: "Prompt Engineering", label: "AI Systems", icon: "prompt" },
  { name: "Salesforce Admin", label: "CRM", icon: "cloud" }
];

function SkillIcon({ type }: { type: Skill["icon"] }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const
  };

  const paths = {
    code: (
      <>
        <path d="m9 8-4 4 4 4" />
        <path d="m15 8 4 4-4 4" />
        <path d="m13 5-2 14" />
      </>
    ),
    markup: (
      <>
        <path d="M6 4h12l-1.1 14L12 20l-4.9-2L6 4Z" />
        <path d="M9 8h6" />
        <path d="M9.5 12h5l-.4 3-2.1.8-2.1-.8" />
      </>
    ),
    style: (
      <>
        <path d="M7 5h10l-1 13-4 2-4-2L7 5Z" />
        <path d="M10 9h5" />
        <path d="M9.5 13h4.8l-.3 2.3-2 .9-2-.9" />
      </>
    ),
    server: (
      <>
        <rect x="5" y="5" width="14" height="5" rx="2" />
        <rect x="5" y="14" width="14" height="5" rx="2" />
        <path d="M8 7.5h.01" />
        <path d="M8 16.5h.01" />
      </>
    ),
    api: (
      <>
        <path d="M8 7a4 4 0 0 1 8 0v2" />
        <path d="M8 17a4 4 0 0 0 8 0v-2" />
        <path d="M7 12h10" />
        <path d="M5 10v4" />
        <path d="M19 10v4" />
      </>
    ),
    flow: (
      <>
        <circle cx="6" cy="7" r="2" />
        <circle cx="18" cy="7" r="2" />
        <circle cx="12" cy="18" r="2" />
        <path d="M8 7h8" />
        <path d="M7.2 8.7 11 16" />
        <path d="m16.8 8.7-3.8 7.3" />
      </>
    ),
    design: (
      <>
        <path d="M7 20h10" />
        <path d="M8 16 15.5 8.5a2.1 2.1 0 0 0-3-3L5 13v3h3Z" />
        <path d="M14 7 17 4" />
      </>
    ),
    ai: (
      <>
        <path d="M12 3v3" />
        <path d="M12 18v3" />
        <path d="M3 12h3" />
        <path d="M18 12h3" />
        <path d="m5 5 2.1 2.1" />
        <path d="m16.9 16.9 2.1 2.1" />
        <path d="m19 5-2.1 2.1" />
        <path d="m7.1 16.9-2.1 2.1" />
        <path d="M12 8.2 13.2 11l2.8 1.2-2.8 1.2L12 16.2l-1.2-2.8L8 12.2l2.8-1.2L12 8.2Z" />
      </>
    ),
    prompt: (
      <>
        <path d="M5 6h14v10H9l-4 4V6Z" />
        <path d="m9 10 2 2-2 2" />
        <path d="M13 14h3" />
      </>
    ),
    cloud: (
      <>
        <path d="M17.5 17H8a4 4 0 1 1 .8-7.9A5.5 5.5 0 0 1 19 11.7 2.7 2.7 0 0 1 17.5 17Z" />
        <path d="M9 13h6" />
      </>
    )
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" {...common}>
      {paths[type]}
    </svg>
  );
}

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  return (
    <motion.div
      className="skill-card group"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.48, delay: index * 0.04, ease: [0.21, 0.8, 0.28, 1] }}
      whileHover={{
        y: -4,
        boxShadow: "0 18px 42px rgba(0, 0, 0, 0.26), 0 0 0 1px rgba(112, 215, 255, 0.36)"
      }}
    >
      <div className="skill-icon">
        <SkillIcon type={skill.icon} />
      </div>
      <div className="relative z-10 min-w-0 text-center sm:text-left">
        <p className="skill-title">{skill.name}</p>
        <p className="skill-label">
          {skill.label}
        </p>
      </div>
    </motion.div>
  );
}

export default function SkillCards() {
  return (
    <div className="skills-stage mt-5">
      <div className="grid auto-rows-fr grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 xl:grid-cols-3">
        {skills.map((skill, index) => (
          <SkillCard key={skill.name} skill={skill} index={index} />
        ))}
      </div>
    </div>
  );
}
