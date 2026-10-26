import { socialLinks, personalInfo } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-4 py-12 bg-ink/40">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xl font-black text-white">Mohmmad Sufian</p>
          <p className="mt-1.5 text-sm text-neon font-medium">
            AI Automation Engineer • Generative AI • Agentic AI & RAG
          </p>
          <p className="mt-1 text-xs text-silver/60">
            © {new Date().getFullYear()} Mohmmad Sufian. All rights reserved.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="/resume/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="ghost-button min-h-10 text-xs text-neon border-neon/30"
          >
            Download Resume
          </a>
          {socialLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="ghost-button min-h-10 text-xs"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
