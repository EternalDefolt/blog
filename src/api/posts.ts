const BASE = 'https://jsonplaceholder.typicode.com';

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
  mine?: boolean;
}

async function request<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json() as Promise<T>;
}

export const getPosts = () => request<Post[]>('/posts?_limit=24');
export const getPost = (id: string) => request<Post>(`/posts/${id}`);
