import { createContext, useContext, useState, ReactNode } from "react";
import { projects as defaultProjects, Project } from "@/lib/data";

const STORAGE_KEY = "mashreq_project_overrides";

type Overrides = Record<string, Partial<Project>>;

function loadOverrides(): Overrides {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function mergeProjects(defaults: Project[], overrides: Overrides): Project[] {
  return defaults.map((p) =>
    overrides[p.slug] ? { ...p, ...overrides[p.slug] } : p
  );
}

interface ProjectsContextType {
  projects: Project[];
  updateProject: (slug: string, changes: Partial<Project>) => void;
  resetProject: (slug: string) => void;
}

const ProjectsContext = createContext<ProjectsContextType | null>(null);

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const [overrides, setOverrides] = useState<Overrides>(loadOverrides);

  function updateProject(slug: string, changes: Partial<Project>) {
    setOverrides((prev) => {
      const next = { ...prev, [slug]: { ...(prev[slug] ?? {}), ...changes } };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }

  function resetProject(slug: string) {
    setOverrides((prev) => {
      const next = { ...prev };
      delete next[slug];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }

  return (
    <ProjectsContext.Provider
      value={{ projects: mergeProjects(defaultProjects, overrides), updateProject, resetProject }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const ctx = useContext(ProjectsContext);
  if (!ctx) throw new Error("useProjects must be inside ProjectsProvider");
  return ctx;
}
