import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Motion";
import TiltCard from "@/components/TiltCard";
import {
  getProjectCategories,
  getProjectCategory,
  getProjectsByCategory
} from "@/lib/projects";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getProjectCategories().map((category) => ({ slug: category.id }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getProjectCategory(slug);

  if (!category) {
    return {};
  }

  return {
    title: `${category.title} | Mohmmad Sufian`,
    description: category.description
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getProjectCategory(slug);
  const projects = getProjectsByCategory(slug);

  if (!category) {
    notFound();
  }

  return (
    <main className="min-h-screen overflow-hidden px-4 pb-24 pt-28">
      <section className="mx-auto w-full max-w-6xl">
        <Reveal>
          <Link href="/#projects" className="ghost-button mb-8">
            Back to Categories
          </Link>
          <p className="eyebrow">{category.countLabel}</p>
          <h1 className="heading-lg">{category.title}</h1>
          <p className="muted-copy mt-6 max-w-3xl">{category.description}</p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.08}>
              <TiltCard className="h-full overflow-hidden rounded-2xl">
                <Image
                  src={project.images[0]}
                  alt={`${project.title} preview`}
                  width={1200}
                  height={850}
                  className="aspect-[16/10] object-cover transition duration-500 group-hover:scale-[1.05]"
                />
                <div className="p-6">
                  <h2 className="text-2xl font-black text-white">{project.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-silver/75">{project.description}</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link href={`/projects/${project.category}/${project.id}`} className="royal-button">
                      Read More
                    </Link>
                    <a href={project.github} target="_blank" rel="noreferrer" className="ghost-button">
                      GitHub
                    </a>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
