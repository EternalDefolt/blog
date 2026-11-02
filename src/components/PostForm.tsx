import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { postSchema, type PostFormValues } from '../schemas/postSchema';

interface PostFormProps {
  onSubmit: (values: PostFormValues) => void;
}

export default function PostForm({ onSubmit }: PostFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    mode: 'onChange',
    defaultValues: { title: '', body: '' },
  });

  return (
    <form
      className="card form col"
      noValidate
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
    >
      <div className="field">
        <input {...register('title')} placeholder="Заголовок" aria-invalid={!!errors.title} />
        {errors.title && <p className="error">{errors.title.message}</p>}
      </div>
      <div className="field">
        <textarea {...register('body')} rows={4} placeholder="Текст поста" aria-invalid={!!errors.body} />
        {errors.body && <p className="error">{errors.body.message}</p>}
      </div>
      <button type="submit" className="btn primary" disabled={!isValid}>
        Опубликовать
      </button>
    </form>
  );
}
