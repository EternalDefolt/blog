import { memo } from 'react';
import { Link } from 'react-router-dom';
import type { Post } from '../api/posts';

interface PostCardProps {
  post: Post;
  favorite: boolean;
  onToggle: (id: number) => void;
}

const PostCard = memo(function PostCard({ post, favorite, onToggle }: PostCardProps) {
  return (
    <li className="card post">
      <div className="post-main">
        <Link to={`/posts/${post.id}`} className="post-title">{post.title}</Link>
        <p className="post-excerpt">{post.body.slice(0, 90)}…</p>
        {post.mine && <span className="tag">Мой пост</span>}
      </div>
      <button
        className="star"
        onClick={() => onToggle(post.id)}
        aria-label={favorite ? 'Убрать из избранного' : 'В избранное'}
      >
        {favorite ? '⭐' : '☆'}
      </button>
    </li>
  );
});

export default PostCard;
