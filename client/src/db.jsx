/*import {
  openDB
} from "idb";

const DB_NAME = "bookshelf_db";
const STORE = "books";

const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE)) {
      db.createObjectStore(STORE);
    }
  },
});

export async function saveBook(id, file) {
  const db = await dbPromise;
  await db.put(STORE,
    file,
    id);
}

export async function getBook(id) {
  const db = await dbPromise;
  return await db.get(STORE,
    id);
}

export async function getAllBooks() {
  const db = await dbPromise;
  return await db.getAll(STORE);
}

export async function deleteBook(id) {
  const db = await dbPromise;
  return await db.delete(STORE,
    id);
}


import {
  openDB
} from 'idb';*/