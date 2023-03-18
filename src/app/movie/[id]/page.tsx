'use client';

import { useEffect, useState } from 'react';
import MovieDetails from '@/components/MovieDetails';
import Button from '@/components/Back';
import styles from '@/styles/MoviePage.module.css';
import { Movie } from '@/components/MovieType';

type Props = {
  params: {
    id: string;
  };
};
//displays movie based on id 
const MoviePage = ({ params }: Props) => {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    if (params.id) {
      fetch('https://raw.githubusercontent.com/theapache64/top250/master/top250_min.json')
        .then((response) => response.json())
        .then((data) => {
          const foundMovie = data.find((m: Movie) => m.imdb_url.slice(-10, -1) === params.id);
          setMovie(foundMovie || null);
        });
    }
  }, [params.id]);

  if (!movie) return <p>wait</p>;

  const saveToLikes = () => {
    const likedMovies = JSON.parse(localStorage.getItem('likedMovies') || '[]');
    likedMovies.push({ title: movie.name, thumbUrl: movie.thumb_url });
    localStorage.setItem('likedMovies', JSON.stringify(likedMovies));
  };

  return (
    <div className={styles.moviePage}>
      <div className={styles.toolbar}>
        <button className={styles.likeButton} onClick={saveToLikes}>Like</button>
        <Button text="BACK" />
      </div>
      <MovieDetails movie={movie} />
    </div>
  );
};

export default MoviePage;


