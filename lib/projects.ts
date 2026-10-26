import projects from "@/data/projects.json";

export type Project = {
  id: string;
  category: ProjectCategoryId;
  title: string;
  description: string;
  details: string;
  images: string[];
  techStack: string[];
  github: string;
};

export type ProjectCategoryId =
  | "agentic-ai"
  | "rag-systems"
  | "python"
  | "web-development"
  | "salesforce"
  | "ai-automation";

export type ProjectCategory = {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: string;
  countLabel: string;
};

const canonicalCategories: Omit<ProjectCategory, "countLabel">[] = [
  {
    id: "agentic-ai",
    title: "Agentic AI & APA",
    description: "Autonomous multi-agent systems, LangGraph pipelines, HITL workflows, and business bots.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    icon: "APA"
  },
  {
    id: "rag-systems",
    title: "RAG & Vector Search",
    description: "Retrieval-Augmented Generation, FAISS vector embeddings, and context-grounded Q&A.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80",
    icon: "RAG"
  },
  {
    id: "python",
    title: "Python AI & Backend",
    description: "FastAPI microservices, OpenCV computer vision, Streamlit apps, and async workflows.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    icon: "PY"
  },
  {
    id: "web-development",
    title: "AI Web Apps & Full-Stack",
    description: "Next.js platforms, multi-model career engines, responsive UI, and API integrations.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    icon: "WEB"
  }
];

export function getProjects(): Project[] {
  return projects as Project[];
}

export function getProjectCategories(): ProjectCategory[] {
  const allProjects = getProjects();

  return canonicalCategories.map((category) => {
    const count = allProjects.filter((project) => project.category === category.id).length;

    return {
      ...category,
      countLabel: `${count}+ Projects`
    };
  });
}

function resolveCategoryId(categoryId: string): string {
  if (categoryId === "salesforce" || categoryId === "ai-automation") {
    return "agentic-ai";
  }
  return categoryId;
}

export function getProjectCategory(categoryId: string): ProjectCategory | undefined {
  const resolvedId = resolveCategoryId(categoryId);
  return getProjectCategories().find((category) => category.id === resolvedId);
}

export function getProjectsByCategory(categoryId: string): Project[] {
  const resolvedId = resolveCategoryId(categoryId);
  return getProjects().filter((project) => project.category === resolvedId);
}

export function getProject(categoryId: string, projectId: string): Project | undefined {
  const resolvedId = resolveCategoryId(categoryId);
  return getProjects().find(
    (project) =>
      (project.category === resolvedId || project.category === categoryId) &&
      project.id === projectId
  );
}
