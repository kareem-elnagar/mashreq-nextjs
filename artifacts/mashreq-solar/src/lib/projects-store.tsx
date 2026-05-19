import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { projects as defaultProjects, Project } from "@/lib/data";
import {
  saveImage, deleteImage, loadAllImages,
  addGalleryImages, removeGalleryImage,
  toggleDefaultRemoved, loadGalleryRemovedMap,
} from "@/lib/image-store";

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

export interface GalleryItem {
  /** "default" = comes from data.ts; "custom" = uploaded via admin */
  type: "default" | "custom";
  url: string;
  /** index within original gallery array (type=default) */
  defaultIndex?: number;
  /** IndexedDB uid (type=custom) */
  uid?: string;
}

function buildGallery(
  defaultGallery: string[],
  removedIndices: number[],
  customItems: { uid: string; url: string }[],
): GalleryItem[] {
  const defaults: GalleryItem[] = defaultGallery
    .map((url, i) => ({ type: "default" as const, url, defaultIndex: i }))
    .filter((_, i) => !removedIndices.includes(i));
  const customs: GalleryItem[] = customItems.map(({ uid, url }) => ({
    type: "custom", url, uid,
  }));
  return [...defaults, ...customs];
}

function mergeProjects(
  defaults: Project[],
  overrides: Overrides,
  added: Project[],
  coverUrls: Record<string, string>,
  galleryBySlug: Record<string, { uid: string; url: string }[]>,
  removedBySlug: Record<string, number[]>,
): Project[] {
  const apply = (p: Project): Project => {
    const base = overrides[p.slug] ? { ...p, ...overrides[p.slug] } : p;
    const withCover = coverUrls[p.slug] ? { ...base, image: coverUrls[p.slug] } : base;
    const customItems = galleryBySlug[p.slug] ?? [];
    const removedIndices = removedBySlug[p.slug] ?? [];
    const hasGalleryChanges = customItems.length > 0 || removedIndices.length > 0;
    if (!hasGalleryChanges) return withCover;
    const gallery = buildGallery(p.gallery, removedIndices, customItems).map((g) => g.url);
    return { ...withCover, gallery };
  };
  return [...defaults.map(apply), ...added.map(apply)];
}

interface ProjectsContextType {
  projects:            Project[];
  updateProject:       (slug: string, changes: Partial<Project>) => void;
  resetProject:        (slug: string) => void;
  addProject:          (p: Project) => void;
  deleteProject:       (slug: string) => void;
  isAdded:             (slug: string) => boolean;
  updateProjectImage:  (slug: string, file: File) => Promise<void>;
  removeProjectImage:  (slug: string) => Promise<void>;
  hasCustomImage:      (slug: string) => boolean;
  getGalleryItems:     (slug: string) => GalleryItem[];
  addGalleryFiles:     (slug: string, files: File[]) => Promise<void>;
  removeGalleryItem:   (slug: string, item: GalleryItem) => void;
}

const ProjectsContext = createContext<ProjectsContextType | null>(null);

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const [overrides,     setOverrides]     = useState<Overrides>(loadOverrides);
  const [added,         setAdded]         = useState<Project[]>(loadAdded);
  const [coverUrls,     setCoverUrls]     = useState<Record<string, string>>({});
  const [galleryBySlug, setGalleryBySlug] = useState<Record<string, { uid: string; url: string }[]>>({});
  const [removedBySlug, setRemovedBySlug] = useState<Record<string, number[]>>(loadGalleryRemovedMap);

  useEffect(() => {
    loadAllImages()
      .then(({ covers, galleryBySlug: gal }) => {
        setCoverUrls(covers);
        setGalleryBySlug(gal);
      })
      .catch(() => {});
  }, []);

  // ── Project CRUD ────────────────────────────────────────────────────────────
  function updateProject(slug: string, changes: Partial<Project>) {
    if (added.some((p) => p.slug === slug)) {
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
    deleteImage(slug).catch(() => {});
    setCoverUrls((prev) => { const n = { ...prev }; delete n[slug]; return n; });
  }

  function isAdded(slug: string) { return added.some((p) => p.slug === slug); }

  // ── Cover image ─────────────────────────────────────────────────────────────
  async function updateProjectImage(slug: string, file: File) {
    await saveImage(slug, file);
    setCoverUrls((prev) => ({ ...prev, [slug]: URL.createObjectURL(file) }));
  }

  async function removeProjectImage(slug: string) {
    await deleteImage(slug);
    setCoverUrls((prev) => { const n = { ...prev }; delete n[slug]; return n; });
  }

  function hasCustomImage(slug: string) { return !!coverUrls[slug]; }

  // ── Gallery ─────────────────────────────────────────────────────────────────
  const allProjects = [...defaultProjects, ...added];

  function getGalleryItems(slug: string): GalleryItem[] {
    const p = allProjects.find((x) => x.slug === slug);
    if (!p) return [];
    return buildGallery(
      p.gallery,
      removedBySlug[slug] ?? [],
      galleryBySlug[slug] ?? [],
    );
  }

  async function addGalleryFiles(slug: string, files: File[]) {
    const uids = await addGalleryImages(slug, files);
    const newItems = uids.map((uid, i) => ({
      uid,
      url: URL.createObjectURL(files[i]),
    }));
    setGalleryBySlug((prev) => ({
      ...prev,
      [slug]: [...(prev[slug] ?? []), ...newItems],
    }));
  }

  function removeGalleryItem(slug: string, item: GalleryItem) {
    if (item.type === "custom" && item.uid) {
      removeGalleryImage(slug, item.uid).catch(() => {});
      setGalleryBySlug((prev) => ({
        ...prev,
        [slug]: (prev[slug] ?? []).filter((g) => g.uid !== item.uid),
      }));
    } else if (item.type === "default" && item.defaultIndex !== undefined) {
      const next = toggleDefaultRemoved(slug, item.defaultIndex);
      setRemovedBySlug((prev) => ({ ...prev, [slug]: next }));
    }
  }

  const projects = mergeProjects(
    defaultProjects, overrides, added, coverUrls, galleryBySlug, removedBySlug,
  );

  return (
    <ProjectsContext.Provider
      value={{
        projects, updateProject, resetProject, addProject, deleteProject, isAdded,
        updateProjectImage, removeProjectImage, hasCustomImage,
        getGalleryItems, addGalleryFiles, removeGalleryItem,
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
