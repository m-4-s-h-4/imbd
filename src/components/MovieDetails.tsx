import styles from '../styles/MovieDetails.module.css';
import { Movie } from './MovieType';

//single movie page info 

type MovieDetailsProps = {
  movie: Movie;
};

const MovieDetails = ({ movie }: MovieDetailsProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={movie.image_url} alt={movie.name} />
      </div>
      <div className={styles.textContainer}>
      <h1 className={styles.title}>{movie.name}</h1>
        <p className={styles.description}><strong>Description:</strong> {movie.desc}</p>
        <p className={styles.info}><strong>Year:</strong> {movie.year}</p>
        <p className={styles.info}><strong>Rating:</strong> {movie.rating}</p>
        <p className={styles.info}><strong>Directors:</strong> {movie.directors.join(', ')}</p>
        <p className={styles.info}><strong>Actors:</strong> {movie.actors.join(', ')}</p>
        <p className={styles.info}><strong>Genres:</strong> {movie.genre.join(', ')}</p>
      </div>
    </div>
  );
};

export default MovieDetails;
