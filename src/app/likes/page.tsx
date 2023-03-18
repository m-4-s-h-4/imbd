'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/Back';
import RemoveButton from '@/components/RemoveButton';
import styles from '@/styles/Likespage.module.css';

type Movie = {
  title: string;
  thumbUrl: string;
};

//uses local storage to store liked movies
const MovieThumbnail: React.FC<Movie & { onRemove?: () => void }> = ({ title, thumbUrl, onRemove }) => (
  <div className={styles.card}>
    <img src={thumbUrl} alt={title} className={styles.thumb} />
    <h2 className={styles.title}>{title}</h2>
    {onRemove && <RemoveButton onRemove={onRemove} />}
  </div>
);

const LikesPage = () => {
  const [likedMovies, setLikedMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const movies = JSON.parse(localStorage.getItem('likedMovies') || '[]') as Movie[];
    setLikedMovies(movies);
  }, []);

  const handleRemoveMovie = (indexToRemove: number) => {
    const newLikedMovies = likedMovies.filter((_, index) => index !== indexToRemove);
    setLikedMovies(newLikedMovies);
    localStorage.setItem('likedMovies', JSON.stringify(newLikedMovies));
  };

  return (
    <div>
      <nav className={styles.navbar}>
        <h1 className={styles.titleNav}>Liked Movies:</h1>
        <Button text="BACK" />
      </nav>
      {likedMovies.length ? (
        <div className={styles.container}>
          {likedMovies.map((movie, index) => (
            <div key={index} className={styles.movieItem}>
              <MovieThumbnail
                title={movie.title}
                thumbUrl={movie.thumbUrl}
              />
              <RemoveButton onRemove={() => handleRemoveMovie(index)} />
            </div>
          ))}
        </div>
      ) : (
        <h1>Choose movies you would like to add</h1>
      )}
    </div>
  );
};

export default LikesPage;
