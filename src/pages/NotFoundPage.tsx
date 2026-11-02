import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="notfound">
      <h1>404</h1>
      <p>Такой страницы не существует</p>
      <Link to="/" className="btn primary">На главную</Link>
    </div>
  );
}
