"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { getProjects, getProjectCategories } from "@/lib/projects";
import { Reveal } from "./Motion";
import TiltCard from "./TiltCard";

export default function Projects() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const categories = getProjectCategories();
  const allProjects = getProjects();

  const filteredProjects =
    selectedFilter === "all"
      ? allProjects
      : allProjects.filter((p) => p.category === selectedFilter);

  return (
    <section id="projects" className="section-shell">
      <Reveal>
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Featured Work</p>
            <h2 className="heading-lg">
              AI Systems, Agentic Workflows & Production Deployments.
            </h2>
            <p className="muted-copy mt-3 max-w-2xl text-silver/80">
              Explore autonomous multi-agent pipelines, RAG systems, and intelligent tools built with Python, LangGraph, and FastAPI.
            </p>
          </div>

          <Link href="/projects" className="royal-button shrink-0 self-start md:self-auto">
            Browse All Categories
          </Link>
        </div>
      </Reveal>

      {/* Filter Tabs */}
      <div className="mt-10 flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
        <button
          type="button"
          onClick={() => setSelectedFilter("all")}
          className={`rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wider transition ${
            selectedFilter === "all"
              ? "border border-neon/40 bg-neon/15 text-neon shadow-glow"
              : "border border-white/10 bg-white/[0.04] text-silver/70 hover:border-white/20 hover:text-white"
          }`}
        >
          All ({allProjects.length})
        </button>

        {categories.map((cat) => {
          const isActive = selectedFilter === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedFilter(cat.id)}
              className={`rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wider transition ${
                isActive
                  ? "border border-neon/40 bg-neon/15 text-neon shadow-glow"
                  : "border border-white/10 bg-white/[0.04] text-silver/70 hover:border-white/20 hover:text-white"
              }`}
            >
              {cat.title}
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project, index) => (
          <Reveal key={project.id} delay={index * 0.05}>
            <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-xl transition duration-300 hover:-translate-y-1.5 hover:border-neon/40 hover:bg-white/[0.06] hover:shadow-[0_20px_45px_rgba(0,0,0,0.4),0_0_24px_rgba(112,215,255,0.14)]">
              {/* Project Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/40">
                <Image
                  src={project.images[0]}
                  alt={`${project.title} cover`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                <span className="absolute left-3 top-3 rounded-md border border-white/20 bg-ink/80 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-neon backdrop-blur-md">
                  {project.category}
                </span>
              </div>

              {/* Project Content */}
              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <h3 className="text-xl font-black text-white group-hover:text-neon transition">
                    {project.title}
                  </h3>
                  <p className="mt-2.5 text-xs leading-5 text-silver/75 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech stack badges */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] font-semibold text-silver/80"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="rounded-md border border-white/10 bg-white/[0.04] px-1.5 py-0.5 text-[10px] font-semibold text-silver/50">
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions: Details & GitHub */}
                <div className="mt-6 flex items-center justify-between gap-2 border-t border-white/10 pt-4">
                  <Link
                    href={`/projects/${project.category}/${project.id}`}
                    className="text-xs font-black uppercase tracking-wider text-neon hover:text-white transition"
                  >
                    Details &rarr;
                  </Link>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.05] px-3 py-1.5 text-xs font-bold text-white transition hover:border-neon/40 hover:bg-neon/10 hover:text-neon"
                  >
                    <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
