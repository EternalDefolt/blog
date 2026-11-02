import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../api/posts';
import { useFavorites } from '../context/FavoritesContext';
import { useMyPosts } from '../context/MyPostsContext';
import { useDebounce } from '../hooks/useDebounce';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';

export default function PostsPage() {
  const { data, isLoading, isError, error, refetch } = useQuery({ queryKey: ['posts'], queryFn: getPosts });
  const { favorites, toggleFavorite } = useFavorites();
  const { myPosts, addPost } = useMyPosts();
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const debounced = useDebounce(search, 300);

  const visible = useMemo(() => {
    const q = debounced.trim().toLowerCase();
    return [...myPosts, ...(data ?? [])].filter((p) => !q || p.title.toLowerCase().includes(q));
  }, [myPosts, data, debounced]);

  return (
    <div className="stack">
      <div className="row between">
        <h1>Посты</h1>
        <button className="btn" onClick={() => setShowForm((v) => !v)}>
          {showForm ? 'Закрыть' : '+ Новый пост'}
        </button>
      </div>

      {showForm && (
        <PostForm
          onSubmit={(values) => {
            addPost(values);
            setShowForm(false);
          }}
        />
      )}

      <input type="search" placeholder="🔍 Поиск по заголовку…" value={search} onChange={(e) => setSearch(e.target.value)} />

      {isLoading && <p className="empty">Загрузка…</p>}
      {isError && (
        <div className="stack">
          <p className="error">Ошибка: {error.message}</p>
          <button className="btn" onClick={() => refetch()}>Повторить</button>
        </div>
      )}

      {!isLoading && visible.length === 0 && !isError && <p className="empty">Ничего не найдено</p>}

      <ul className="task-list">
        {visible.map((p) => (
          <PostCard key={p.id} post={p} favorite={favorites.includes(p.id)} onToggle={toggleFavorite} />
        ))}
      </ul>
    </div>
  );
}
