import { socialLinks } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-4 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-black text-white">Mohmmad Sufian</p>
          <p className="mt-2 text-sm text-silver/70">AI Automation Engineer + Salesforce Admin</p>
        </div>

        <div className="flex flex-wrap gap-3">
          {socialLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="ghost-button min-h-11"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
