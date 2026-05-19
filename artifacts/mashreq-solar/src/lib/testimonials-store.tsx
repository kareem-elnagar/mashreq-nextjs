import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { defaultTestimonials, Testimonial } from "@/lib/data";

const OVERRIDES_KEY = "mashreq_testimonial_overrides";
const ADDED_KEY     = "mashreq_testimonial_added";
const DELETED_KEY   = "mashreq_testimonial_deleted";

const DB_NAME = "mashreq_images";
const STORE   = "images";

type Overrides = Record<string, Partial<Testimonial>>;

function loadOverrides(): Overrides {
  try { return JSON.parse(localStorage.getItem(OVERRIDES_KEY) ?? "{}"); }
  catch { return {}; }
}
function loadAdded(): Testimonial[] {
  try { return JSON.parse(localStorage.getItem(ADDED_KEY) ?? "[]"); }
  catch { return []; }
}
function loadDeleted(): string[] {
  try { return JSON.parse(localStorage.getItem(DELETED_KEY) ?? "[]"); }
  catch { return []; }
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
    };
    req.onsuccess = (e) => resolve((e.target as IDBOpenDBRequest).result);
    req.onerror   = () => reject(req.error);
  });
}

function idbPut(db: IDBDatabase, key: string, val: Blob): Promise<void> {
  return new Promise((res, rej) => {
    const req = db.transaction(STORE, "readwrite").objectStore(STORE).put(val, key);
    req.onsuccess = () => res();
    req.onerror   = () => rej(req.error);
  });
}

function idbDelete(db: IDBDatabase, key: string): Promise<void> {
  return new Promise((res, rej) => {
    const req = db.transaction(STORE, "readwrite").objectStore(STORE).delete(key);
    req.onsuccess = () => res();
    req.onerror   = () => rej(req.error);
  });
}

function getTestimonialImageKey(id: string) {
  return `testi_img:${id}`;
}

interface TestimonialsContextType {
  testimonials:           Testimonial[];
  addTestimonial:         (t: Testimonial) => void;
  updateTestimonial:      (id: string, changes: Partial<Testimonial>) => void;
  deleteTestimonial:      (id: string) => void;
  updateTestimonialImage: (id: string, file: File) => Promise<void>;
  removeTestimonialImage: (id: string) => Promise<void>;
  isAdded:                (id: string) => boolean;
}

const TestimonialsContext = createContext<TestimonialsContextType | null>(null);

export function TestimonialsProvider({ children }: { children: ReactNode }) {
  const [overrides, setOverrides] = useState<Overrides>(loadOverrides);
  const [added, setAdded] = useState<Testimonial[]>(loadAdded);
  const [deleted, setDeleted] = useState<string[]>(loadDeleted);
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});

  // Load all testimonial images from IndexedDB on mount
  useEffect(() => {
    openDB()
      .then((db) => {
        return new Promise<Record<string, string>>((resolve, reject) => {
          const result: Record<string, string> = {};
          const req = db.transaction(STORE, "readonly").objectStore(STORE).openCursor();
          req.onsuccess = (e) => {
            const cursor = (e.target as IDBRequest<IDBCursorWithValue | null>).result;
            if (cursor) {
              const key = cursor.key as string;
              if (key.startsWith("testi_img:")) {
                const id = key.substring("testi_img:".length);
                result[id] = URL.createObjectURL(cursor.value as Blob);
              }
              cursor.continue();
            } else {
              resolve(result);
            }
          };
          req.onerror = () => reject(req.error);
        });
      })
      .then((urls) => setImageUrls(urls))
      .catch((err) => console.error("Failed to load testimonial images:", err));
  }, []);

  function addTestimonial(t: Testimonial) {
    setAdded((prev) => {
      const next = [...prev, t];
      localStorage.setItem(ADDED_KEY, JSON.stringify(next));
      return next;
    });
  }

  function updateTestimonial(id: string, changes: Partial<Testimonial>) {
    if (added.some((t) => t.id === id)) {
      setAdded((prev) => {
        const next = prev.map((t) => t.id === id ? { ...t, ...changes } : t);
        localStorage.setItem(ADDED_KEY, JSON.stringify(next));
        return next;
      });
    } else {
      setOverrides((prev) => {
        const next = { ...prev, [id]: { ...(prev[id] ?? {}), ...changes } };
        localStorage.setItem(OVERRIDES_KEY, JSON.stringify(next));
        return next;
      });
    }
  }

  function deleteTestimonial(id: string) {
    const isDefault = defaultTestimonials.some((t) => t.id === id);
    if (isDefault) {
      setDeleted((prev) => {
        const next = [...prev, id];
        localStorage.setItem(DELETED_KEY, JSON.stringify(next));
        return next;
      });
    } else {
      setAdded((prev) => {
        const next = prev.filter((t) => t.id !== id);
        localStorage.setItem(ADDED_KEY, JSON.stringify(next));
        return next;
      });
    }
    // Delete custom image if any
    removeTestimonialImage(id).catch(() => {});
  }

  async function updateTestimonialImage(id: string, file: File) {
    const db = await openDB();
    const key = getTestimonialImageKey(id);
    await idbPut(db, key, file);
    setImageUrls((prev) => ({ ...prev, [id]: URL.createObjectURL(file) }));
  }

  async function removeTestimonialImage(id: string) {
    const db = await openDB();
    const key = getTestimonialImageKey(id);
    await idbDelete(db, key);
    setImageUrls((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }

  function isAdded(id: string) {
    return added.some((t) => t.id === id);
  }

  // Merge default + overrides, filter out deleted, append added
  const mergedDefaults = defaultTestimonials
    .filter((t) => !deleted.includes(t.id))
    .map((t) => {
      const o = overrides[t.id];
      return o ? { ...t, ...o } : t;
    });

  const allTestimonials = [...mergedDefaults, ...added].map((t) => {
    // Inject the uploaded image URL if available
    const customUrl = imageUrls[t.id];
    return customUrl ? { ...t, image: customUrl } : t;
  });

  return (
    <TestimonialsContext.Provider
      value={{
        testimonials: allTestimonials,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        updateTestimonialImage,
        removeTestimonialImage,
        isAdded
      }}
    >
      {children}
    </TestimonialsContext.Provider>
  );
}

export function useTestimonials() {
  const ctx = useContext(TestimonialsContext);
  if (!ctx) throw new Error("useTestimonials must be inside TestimonialsProvider");
  return ctx;
}
