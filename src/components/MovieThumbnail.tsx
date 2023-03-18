import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/MovieThumbnail.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

// main page movie thumnail

interface MovieThumbnailProps {
  image_url: string;
  title: string;
  year: number;
  rating: number;
  imdbUrl: string;
}

const MovieThumbnail: React.FC<MovieThumbnailProps> = ({ image_url, title, year, rating, imdbUrl }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/movie${imdbUrl.replace('/title/', '/')}`} passHref>
      <div
        className={`${styles.movieThumbnail} ${styles.link}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={styles.card}>
        {/* trying to optimize image loading because thumnail url is bad quality but image_url loads longer */}
        <img src={image_url} alt={title} loading="lazy" />
          {isHovered && (
            <div className={styles.hoverOverlay}>
              <h3>{title}</h3>
              <p>{year}</p>
              <p><i className="fas fa-star"></i>{rating.toFixed(1)}</p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default MovieThumbnail;