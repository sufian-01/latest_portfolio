import Image from "next/image";
import Link from "next/link";
import { getProjectCategories } from "@/lib/projects";
import { Reveal } from "./Motion";
import TiltCard from "./TiltCard";

export default function Projects() {
  const categories = getProjectCategories();

  return (
    <section id="projects" className="section-shell">
      <Reveal>
        <p className="eyebrow">Projects</p>
        <h2 className="heading-lg">Organized project categories built like a clean product showcase.</h2>
      </Reveal>

      <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {categories.map((category, index) => (
          <Reveal key={category.id} delay={index * 0.08}>
            <TiltCard className="h-full overflow-hidden rounded-2xl">
              <Link href={`/projects/${category.id}`} className="block h-full">
                <div className="relative overflow-hidden">
                 <Image
                  src={category.image}
                  alt={`${category.title} preview`}
                  width={1200}
                  height={850}
                  className="aspect-[1.18/1] object-cover transition duration-500 group-hover:scale-[1.08]"
                />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                  <div className="category-icon absolute left-4 top-4">{category.icon}</div>
                </div>
                <div className="p-5">
                  <span className="text-xs font-black uppercase tracking-[0.14em] text-neon">{category.countLabel}</span>
                  <h3 className="mt-3 text-2xl font-black leading-tight text-white">{category.title}</h3>
                  <p className="mt-3 min-h-24 text-sm leading-7 text-silver/75">{category.description}</p>
                  <span className="mt-5 inline-flex font-extrabold text-neon">View Category</span>
                </div>
              </Link>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.24} className="mt-10 flex justify-center">
        <Link href="/projects" className="royal-button">
          Explore All Projects
        </Link>
      </Reveal>
    </section>
  );
}
