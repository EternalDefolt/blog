import { createContext, useCallback, useContext, useMemo, type ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Post } from '../api/posts';
import type { PostFormValues } from '../schemas/postSchema';

interface MyPostsValue {
  myPosts: Post[];
  addPost: (values: PostFormValues) => void;
  removePost: (id: number) => void;
}

const MyPostsContext = createContext<MyPostsValue | null>(null);

export function MyPostsProvider({ children }: { children: ReactNode }) {
  const [myPosts, setMyPosts] = useLocalStorage<Post[]>('blog_my_posts', []);

  const addPost = useCallback(
    (values: PostFormValues) => setMyPosts((prev) => [{ id: Date.now(), userId: 0, mine: true, ...values }, ...prev]),
    [setMyPosts],
  );
  const removePost = useCallback(
    (id: number) => setMyPosts((prev) => prev.filter((p) => p.id !== id)),
    [setMyPosts],
  );

  const value = useMemo(() => ({ myPosts, addPost, removePost }), [myPosts, addPost, removePost]);
  return <MyPostsContext.Provider value={value}>{children}</MyPostsContext.Provider>;
}

export function useMyPosts() {
  const ctx = useContext(MyPostsContext);
  if (!ctx) throw new Error('useMyPosts must be used within MyPostsProvider');
  return ctx;
}
