import { motion } from 'framer-motion';
import MovieCard from './MovieCard';
import { Movie } from '@/types/movie';

interface MovieGridProps {
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
}

export default function MovieGrid({ movies, onMovieClick }: MovieGridProps) {
  return (
    <motion.div 
      layout
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
    >
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onClick={onMovieClick}
        />
      ))}
    </motion.div>
  );
}