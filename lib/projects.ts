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

export type ProjectCategoryId = "python" | "salesforce" | "web-development" | "ai-automation";

export type ProjectCategory = {
  id: ProjectCategoryId;
  title: string;
  description: string;
  image: string;
  icon: string;
  countLabel: string;
};

const categoryCopy: Omit<ProjectCategory, "countLabel">[] = [
  {
    id: "python",
    title: "Python Projects",
    description: "Automation scripts, data tools, APIs, and AI-assisted Python systems.",
    image: "https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?auto=format&fit=crop&w=1200&q=80",
    icon: "PY"
  },
  {
    id: "salesforce",
    title: "Salesforce Projects",
    description: "CRM setup, admin flows, dashboards, reports, and operational improvements.",
    image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&w=1200&q=80",
    icon: "SF"
  },
  {
    id: "web-development",
    title: "Web Development Projects",
    description: "Modern responsive interfaces, full-stack app patterns, and polished product UI.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    icon: "WD"
  },
  {
    id: "ai-automation",
    title: "AI / Automation Projects",
    description: "Workflow systems, AI chat flows, tool integrations, and business automation.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
    icon: "AI"
  }
];

export function getProjects(): Project[] {
  return projects as Project[];
}

export function getProjectCategories(): ProjectCategory[] {
  const allProjects = getProjects();

  return categoryCopy.map((category) => {
    const count = allProjects.filter((project) => project.category === category.id).length;

    return {
      ...category,
      countLabel: `${count}+ Projects`
    };
  });
}

export function getProjectCategory(categoryId: string) {
  return getProjectCategories().find((category) => category.id === categoryId);
}

export function getProjectsByCategory(categoryId: string) {
  return getProjects().filter((project) => project.category === categoryId);
}

export function getProject(categoryId: string, projectId: string) {
  return getProjects().find((project) => project.category === categoryId && project.id === projectId);
}
