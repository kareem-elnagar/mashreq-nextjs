const DB_NAME   = "mashreq_images";
const STORE     = "images";
const DB_VER    = 1;

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

export async function saveImage(slug: string, blob: Blob): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const store = db.transaction(STORE, "readwrite").objectStore(STORE);
    const req = store.put(blob, slug);
    req.onsuccess = () => resolve();
    req.onerror   = () => reject(req.error);
  });
}

export async function deleteImage(slug: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const store = db.transaction(STORE, "readwrite").objectStore(STORE);
    const req = store.delete(slug);
    req.onsuccess = () => resolve();
    req.onerror   = () => reject(req.error);
  });
}

export async function loadAllImageUrls(): Promise<Record<string, string>> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const store = db.transaction(STORE, "readonly").objectStore(STORE);
    const urls: Record<string, string> = {};
    const req = store.openCursor();
    req.onsuccess = (e) => {
      const cursor = (e.target as IDBRequest<IDBCursorWithValue | null>).result;
      if (cursor) {
        urls[cursor.key as string] = URL.createObjectURL(cursor.value as Blob);
        cursor.continue();
      } else {
        resolve(urls);
      }
    };
    req.onerror = () => reject(req.error);
  });
}
