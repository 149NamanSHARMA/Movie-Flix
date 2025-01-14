import Image from 'next/image';
import { motion } from 'framer-motion';
import { Movie } from '@/types/movie';
import { getImageUrl } from '@/utils/tmdb';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

export default function MovieCard({ movie, onClick }: MovieCardProps) {
  const posterUrl = getImageUrl(movie.poster_path);
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onClick={() => onClick(movie)}
      className="cursor-pointer relative group"
    >
      <div className="aspect-[2/3] relative rounded-lg overflow-hidden">
        {posterUrl ? (
          <Image
            src={posterUrl}
            alt={movie.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            <span className="text-gray-400">No Image</span>
          </div>
        )}
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
          <h3 className="text-lg font-semibold text-white">{movie.title}</h3>
          <p className="text-sm text-gray-200">
            {new Date(movie.release_date).getFullYear()}
            {" • "}
            {movie.vote_average.toFixed(1)} ⭐
          </p>
        </div>
      </div>
    </motion.div>
  );
}