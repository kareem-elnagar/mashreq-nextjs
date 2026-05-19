const DB_NAME = "mashreq_images";
const STORE   = "images";
const DB_VER  = 1;

const GALLERY_ITEMS_KEY   = "mashreq_gallery_items";   // Record<slug, uid[]>
const GALLERY_REMOVED_KEY = "mashreq_gallery_removed"; // Record<slug, number[]>

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VER);
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

// ── Cover images ─────────────────────────────────────────────────────────────
// Stored under key = slug (kept for backward compatibility)

export async function saveImage(slug: string, blob: Blob): Promise<void> {
  const db = await openDB();
  return idbPut(db, slug, blob);
}

export async function deleteImage(slug: string): Promise<void> {
  const db = await openDB();
  return idbDelete(db, slug);
}

// ── Gallery images ────────────────────────────────────────────────────────────
// Stored under key = `gal:${slug}:${uid}` where uid is a timestamp string

function galKey(slug: string, uid: string) { return `gal:${slug}:${uid}`; }

function loadGalleryItemMap(): Record<string, string[]> {
  try { return JSON.parse(localStorage.getItem(GALLERY_ITEMS_KEY) ?? "{}"); }
  catch { return {}; }
}
function saveGalleryItemMap(m: Record<string, string[]>) {
  localStorage.setItem(GALLERY_ITEMS_KEY, JSON.stringify(m));
}

export function loadGalleryRemovedMap(): Record<string, number[]> {
  try { return JSON.parse(localStorage.getItem(GALLERY_REMOVED_KEY) ?? "{}"); }
  catch { return {}; }
}
export function saveGalleryRemovedMap(m: Record<string, number[]>) {
  localStorage.setItem(GALLERY_REMOVED_KEY, JSON.stringify(m));
}

export async function addGalleryImages(slug: string, files: File[]): Promise<string[]> {
  const db = await openDB();
  const map = loadGalleryItemMap();
  const uids: string[] = [];
  for (const file of files) {
    const uid = `${Date.now()}_${Math.random().toString(36).slice(2)}`;
    await idbPut(db, galKey(slug, uid), file);
    uids.push(uid);
  }
  map[slug] = [...(map[slug] ?? []), ...uids];
  saveGalleryItemMap(map);
  return uids;
}

export async function removeGalleryImage(slug: string, uid: string): Promise<void> {
  const db = await openDB();
  await idbDelete(db, galKey(slug, uid));
  const map = loadGalleryItemMap();
  map[slug] = (map[slug] ?? []).filter((u) => u !== uid);
  saveGalleryItemMap(map);
}

export function toggleDefaultRemoved(slug: string, index: number): number[] {
  const map = loadGalleryRemovedMap();
  const current = map[slug] ?? [];
  const next = current.includes(index)
    ? current.filter((i) => i !== index)
    : [...current, index];
  map[slug] = next;
  saveGalleryRemovedMap(map);
  return next;
}

// ── Load everything on startup ────────────────────────────────────────────────

export async function loadAllImages(): Promise<{
  covers: Record<string, string>;
  galleryBySlug: Record<string, { uid: string; url: string }[]>;
}> {
  const db = await openDB();
  const rawMap: Record<string, { key: string; blob: Blob }> = await new Promise((res, rej) => {
    const result: Record<string, { key: string; blob: Blob }> = {};
    const req = db.transaction(STORE, "readonly").objectStore(STORE).openCursor();
    req.onsuccess = (e) => {
      const cursor = (e.target as IDBRequest<IDBCursorWithValue | null>).result;
      if (cursor) {
        result[cursor.key as string] = { key: cursor.key as string, blob: cursor.value as Blob };
        cursor.continue();
      } else {
        res(result);
      }
    };
    req.onerror = () => rej(req.error);
  });

  const covers: Record<string, string> = {};
  const galBlobs: Record<string, { uid: string; url: string }[]> = {};

  for (const [key, { blob }] of Object.entries(rawMap)) {
    const url = URL.createObjectURL(blob);
    if (key.startsWith("gal:")) {
      // key = gal:${slug}:${uid}
      const [, slug, ...rest] = key.split(":");
      const uid = rest.join(":");
      if (!galBlobs[slug]) galBlobs[slug] = [];
      galBlobs[slug].push({ uid, url });
    } else {
      covers[key] = url;
    }
  }

  // Sort each gallery by the stored order
  const itemMap = loadGalleryItemMap();
  const galleryBySlug: Record<string, { uid: string; url: string }[]> = {};
  for (const [slug, uids] of Object.entries(itemMap)) {
    const uidToUrl = Object.fromEntries((galBlobs[slug] ?? []).map((g) => [g.uid, g.url]));
    galleryBySlug[slug] = uids
      .map((uid) => ({ uid, url: uidToUrl[uid] }))
      .filter((g) => g.url);
  }

  return { covers, galleryBySlug };
}

// Legacy alias (cover only) — used during cover image removal
export async function loadAllImageUrls(): Promise<Record<string, string>> {
  const { covers } = await loadAllImages();
  return covers;
}
