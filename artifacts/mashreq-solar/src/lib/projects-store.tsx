import { createContext, useContext, useState, ReactNode } from "react";
import { projects as defaultProjects, Project } from "@/lib/data";

const OVERRIDES_KEY = "mashreq_project_overrides";
const ADDED_KEY     = "mashreq_project_added";

type Overrides = Record<string, Partial<Project>>;

function loadOverrides(): Overrides {
  try { return JSON.parse(localStorage.getItem(OVERRIDES_KEY) ?? "{}"); }
  catch { return {}; }
}

function loadAdded(): Project[] {
  try { return JSON.parse(localStorage.getItem(ADDED_KEY) ?? "[]"); }
  catch { return []; }
}

function mergeProjects(defaults: Project[], overrides: Overrides, added: Project[]): Project[] {
  const merged = defaults.map((p) =>
    overrides[p.slug] ? { ...p, ...overrides[p.slug] } : p
  );
  return [...merged, ...added];
}

interface ProjectsContextType {
  projects: Project[];
  updateProject: (slug: string, changes: Partial<Project>) => void;
  resetProject:  (slug: string) => void;
  addProject:    (p: Project) => void;
  deleteProject: (slug: string) => void;
  isAdded:       (slug: string) => boolean;
}

const ProjectsContext = createContext<ProjectsContextType | null>(null);

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const [overrides, setOverrides] = useState<Overrides>(loadOverrides);
  const [added,     setAdded]     = useState<Project[]>(loadAdded);

  function updateProject(slug: string, changes: Partial<Project>) {
    // Check if it's an added project first
    const isAddedProject = added.some((p) => p.slug === slug);
    if (isAddedProject) {
      setAdded((prev) => {
        const next = prev.map((p) => p.slug === slug ? { ...p, ...changes } : p);
        localStorage.setItem(ADDED_KEY, JSON.stringify(next));
        return next;
      });
    } else {
      setOverrides((prev) => {
        const next = { ...prev, [slug]: { ...(prev[slug] ?? {}), ...changes } };
        localStorage.setItem(OVERRIDES_KEY, JSON.stringify(next));
        return next;
      });
    }
  }

  function resetProject(slug: string) {
    setOverrides((prev) => {
      const next = { ...prev };
      delete next[slug];
      localStorage.setItem(OVERRIDES_KEY, JSON.stringify(next));
      return next;
    });
  }

  function addProject(p: Project) {
    setAdded((prev) => {
      const next = [...prev, p];
      localStorage.setItem(ADDED_KEY, JSON.stringify(next));
      return next;
    });
  }

  function deleteProject(slug: string) {
    setAdded((prev) => {
      const next = prev.filter((p) => p.slug !== slug);
      localStorage.setItem(ADDED_KEY, JSON.stringify(next));
      return next;
    });
  }

  function isAdded(slug: string) {
    return added.some((p) => p.slug === slug);
  }

  return (
    <ProjectsContext.Provider
      value={{
        projects: mergeProjects(defaultProjects, overrides, added),
        updateProject, resetProject, addProject, deleteProject, isAdded,
      }}
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
