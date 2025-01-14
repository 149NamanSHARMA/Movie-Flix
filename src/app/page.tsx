'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import MovieGrid from '@/components/MovieGrid';
import MovieDetails from '@/components/MovieDetails';
import { Movie } from '@/types/movie';
import { searchMovies } from '@/services/movieService';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    try {
      setLoading(true);
      const response = await searchMovies(query);
      setMovies(response.results);
    } catch (error) {
      console.error('Error searching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleHomeClick = () => {
    setMovies([]);  // Clear the movies array
    setSelectedMovie(null);  // Clear any selected movie
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <Navbar onSearch={handleSearch} onHomeClick={handleHomeClick} />
      <div className="pt-20 px-4 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center h-64"
            >
              <div className="text-xl text-gray-400">Loading movies...</div>
            </motion.div>
          ) : movies.length > 0 ? (
            <MovieGrid
              movies={movies}
              onMovieClick={setSelectedMovie}
            />
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-[70vh] text-center px-4"
            >
              <motion.h1
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800 mb-4"
              >
                Welcome to MovieFlix
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-gray-400 max-w-2xl"
              >
                Discover thousands of movies, watch trailers, and explore your favorite films.
                Start by searching above! ✨
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <MovieDetails
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </main>
  );
}