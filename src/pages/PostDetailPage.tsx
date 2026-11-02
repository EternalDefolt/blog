import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getPost } from '../api/posts';
import { useFavorites } from '../context/FavoritesContext';
import { useMyPosts } from '../context/MyPostsContext';

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useFavorites();
  const { myPosts, removePost } = useMyPosts();

  const local = myPosts.find((p) => String(p.id) === id);

  const { data, isLoading } = useQuery({
    queryKey: ['posts', id],
    queryFn: () => getPost(id!),
    enabled: !!id && !local,
    retry: false,
  });

  const post = local ?? data;

  if (!local && isLoading) return <p className="empty">Загрузка…</p>;

  if (!post) {
    return (
      <div className="stack">
        <h1>Не найдено</h1>
        <Link to="/posts" className="btn">← К постам</Link>
      </div>
    );
  }

  const fav = favorites.includes(post.id);

  return (
    <div className="stack">
      <button className="link-btn start" onClick={() => navigate(-1)}>← Назад</button>
      <article className="card stack">
        <h1 style={{ textTransform: 'capitalize' }}>{post.title}</h1>
        <p className="article">{post.body}</p>
        <p className="muted">{post.mine ? 'Мой пост' : `Автор: userId ${post.userId}`}</p>
        <div className="row">
          <button className="btn primary" onClick={() => toggleFavorite(post.id)}>
            {fav ? '⭐ В избранном' : '☆ В избранное'}
          </button>
          {post.mine && (
            <button
              className="btn danger"
              onClick={() => {
                if (confirm('Удалить пост?')) {
                  removePost(post.id);
                  navigate('/posts', { replace: true });
                }
              }}
            >
              Удалить
            </button>
          )}
        </div>
      </article>
    </div>
  );
}
