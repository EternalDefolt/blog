import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../api/posts';
import { useFavorites } from '../context/FavoritesContext';
import { useMyPosts } from '../context/MyPostsContext';
import PostCard from '../components/PostCard';

export default function FavoritesPage() {
  const { data } = useQuery({ queryKey: ['posts'], queryFn: getPosts });
  const { favorites, toggleFavorite } = useFavorites();
  const { myPosts } = useMyPosts();

  const list = useMemo(
    () => [...myPosts, ...(data ?? [])].filter((p) => favorites.includes(p.id)),
    [myPosts, data, favorites],
  );

  return (
    <div className="stack">
      <h1>Избранное</h1>
      {list.length === 0 ? (
        <div className="stack">
          <p className="empty">Пока пусто. Нажми ☆ у любого поста.</p>
          <Link to="/posts" className="btn">К постам</Link>
        </div>
      ) : (
        <ul className="task-list">
          {list.map((p) => (
            <PostCard key={p.id} post={p} favorite onToggle={toggleFavorite} />
          ))}
        </ul>
      )}
    </div>
  );
}
