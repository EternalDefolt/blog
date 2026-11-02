import { NavLink, Outlet } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useFavorites } from '../context/FavoritesContext';

export default function Layout() {
  const { theme, toggleTheme } = useTheme();
  const { favorites } = useFavorites();

  return (
    <div className="app">
      <header className="header">
        <NavLink to="/" className="logo">
          <span className="logo-mark">B</span>
          <span>Блог-читалка</span>
        </NavLink>
        <nav className="nav">
          <NavLink to="/" end>Главная</NavLink>
          <NavLink to="/posts">Посты</NavLink>
          <NavLink to="/favorites">
            Избранное {favorites.length > 0 && <span className="pill">{favorites.length}</span>}
          </NavLink>
        </nav>
        <button className="icon-btn" onClick={toggleTheme} aria-label="Сменить тему" title="Сменить тему">
          {theme === 'dark' ? '🌙' : '☀️'}
        </button>
      </header>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
