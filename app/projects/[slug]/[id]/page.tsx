import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectGallery from "@/components/ProjectGallery";
import { getProject, getProjectCategories, getProjects } from "@/lib/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string; id: string }>;
};

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.category, id: project.id }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug, id } = await params;
  const project = getProject(slug, id);

  if (!project) {
    return {};
  }

  return {
    title: `${project.title} | Mohmmad Sufian`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [{ url: project.images[0], width: 1200, height: 630, alt: project.title }]
    }
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug, id } = await params;
  const category = getProjectCategories().find((item) => item.id === slug);
  const project = getProject(slug, id);

  if (!project || !category) {
    notFound();
  }

  return (
    <main className="min-h-screen overflow-hidden px-4 pb-24 pt-28">
      <section className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[0.88fr_1.12fr]">
        <div>
          <Link href={`/projects/${slug}`} className="ghost-button mb-8">
            Back to {category.title}
          </Link>
          <p className="eyebrow">{category.title}</p>
          <h1 className="heading-lg">{project.title}</h1>
          <p className="muted-copy mt-6">{project.details}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            {project.techStack.map((tech) => (
              <span key={tech} className="skill-tag">
                {tech}
              </span>
            ))}
          </div>

          <a href={project.github} target="_blank" rel="noreferrer" className="royal-button mt-10">
            Open GitHub
          </a>
        </div>

        <ProjectGallery images={project.images} title={project.title} />
      </section>
    </main>
  );
}
