'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { NextPage } from 'next';
import { Movie } from '../components/MovieType';
import MovieThumbnail from '../components/MovieThumbnail';
import SearchBar from '../components/SearchBar';
import { OutlinedInput, MenuItem, Select, FormControl } from '@mui/material';
import styles from '../styles/Home.module.css';

type SortOption = 'rating' | 'name' | 'year';

const Home: NextPage = () => {
  const [sortOption, setSortOption] = useState<SortOption>('rating');
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/theapache64/top250/master/top250_min.json')
      .then((response) => response.json())
      .then((data) => setMovies(data));
  }, []);

  //uses quicksort algorithm for sorting O(n log n)
  const handleSort = (option: SortOption) => {
    setSortOption(option);
  };

  const handleSearch = () => {
    setFilter(searchQuery);
  };

  const sortedMovies = [...movies].sort((a, b) => {
    switch (sortOption) {
      case 'rating':
        return b.rating - a.rating;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'year':
        return b.year - a.year;
      default:
        return 0;
    }
  });

  const filteredMovies = sortedMovies.filter((movie) =>
    movie.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <div className={`${styles.container} ${styles.whiteBackground}`}></div>
      <div className={styles.toolbar}>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={handleSearch} />
        <div className={styles.buttonWrapper}>
          <Link href="/likes">
            <button className={styles.button}>Liked Movies</button>
          </Link>
          <FormControl variant="outlined" size="small" className={styles.sortFormControl}>
            <Select
              value={sortOption}
              onChange={(e) => handleSort(e.target.value as SortOption)}
              displayEmpty
              //button had outline that wasnt aesthetically pleasing :) 
              input={<OutlinedInput />}
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'transparent',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'transparent',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'transparent',
                },
              }}
            >
              <MenuItem value="" disabled>
                Sort Movies by:
              </MenuItem>
              <MenuItem value="rating">Rating</MenuItem>
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="year">Date</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gridGap: '1rem',
          padding: '0.5rem',
          borderRadius: '10px',
        }}
      >
        {filteredMovies.map((movie, index) => (
          <MovieThumbnail
            key={index}
            image_url={movie.image_url}
            title={movie.name}
            year={movie.year}
            rating={movie.rating}
            imdbUrl={movie.imdb_url}
          />
        ))}
      </div>
    </div>
  );
}  

export default Home;
