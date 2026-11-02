import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { useMyPosts } from '../context/MyPostsContext';

export default function HomePage() {
  const { favorites } = useFavorites();
  const { myPosts } = useMyPosts();

  return (
    <div className="stack">
      <h1>Блог-читалка</h1>
      <p className="muted">Читай посты с публичного API, добавляй в избранное и пиши свои.</p>
      <section className="stats">
        <div className="card stat">
          <span className="stat-num">{favorites.length}</span>
          <span className="stat-label">В избранном</span>
        </div>
        <div className="card stat">
          <span className="stat-num">{myPosts.length}</span>
          <span className="stat-label">Моих постов</span>
        </div>
      </section>
      <Link to="/posts" className="btn primary big">Читать посты →</Link>
    </div>
  );
}
