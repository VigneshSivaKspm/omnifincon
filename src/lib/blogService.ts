import {
  collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc,
  query, where, orderBy, Timestamp, increment,
} from "firebase/firestore";
import { ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "./firebase";

export interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  coverMediaType: "image" | "video";
  category: string;
  tags: string[];
  author: string;
  status: "draft" | "published";
  readTime: number;
  views: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  publishedAt: Timestamp | null;
}

const POSTS = "posts";

export async function getAllPosts(): Promise<BlogPost[]> {
  const q = query(collection(db, POSTS), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }) as BlogPost);
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const q = query(
    collection(db, POSTS),
    where("status", "==", "published"),
    orderBy("publishedAt", "desc"),
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }) as BlogPost);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const q = query(collection(db, POSTS), where("slug", "==", slug));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...d.data() } as BlogPost;
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  const snap = await getDoc(doc(db, POSTS, id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as BlogPost;
}

export async function createPost(
  data: Omit<BlogPost, "id" | "createdAt" | "updatedAt" | "views">,
): Promise<string> {
  const docRef = await addDoc(collection(db, POSTS), {
    ...data,
    views: 0,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  return docRef.id;
}

export async function updatePost(id: string, data: Partial<BlogPost>): Promise<void> {
  await updateDoc(doc(db, POSTS, id), { ...data, updatedAt: Timestamp.now() });
}

export async function deletePost(id: string): Promise<void> {
  await deleteDoc(doc(db, POSTS, id));
}

export async function uploadCoverImage(file: File): Promise<string> {
  const storageRef = ref(storage, `blog-covers/${Date.now()}-${file.name}`);
  const snap = await uploadBytes(storageRef, file);
  return getDownloadURL(snap.ref);
}

export function uploadCoverVideo(
  file: File,
  onProgress: (pct: number) => void,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, `blog-videos/${Date.now()}-${file.name}`);
    const task = uploadBytesResumable(storageRef, file);
    task.on(
      "state_changed",
      snap => onProgress((snap.bytesTransferred / snap.totalBytes) * 100),
      reject,
      async () => resolve(await getDownloadURL(task.snapshot.ref)),
    );
  });
}

export async function incrementViews(id: string): Promise<void> {
  await updateDoc(doc(db, POSTS, id), { views: increment(1) });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
