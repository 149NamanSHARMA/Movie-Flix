import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Movie, MovieDetails as MovieDetailsType } from '@/types/movie';
import { getImageUrl, getBackdropUrl } from '@/utils/tmdb';
import { getMovieDetails } from '@/services/movieService';

interface MovieDetailsProps {
  movie: Movie | null;
  onClose: () => void;
}

export default function MovieDetails({ movie, onClose }: MovieDetailsProps) {
  const [details, setDetails] = useState<MovieDetailsType | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (movie) {
      const fetchDetails = async () => {
        setLoading(true);
        try {
          const data = await getMovieDetails(movie.id);
          setDetails(data);
        } catch (error) {
          console.error('Error fetching movie details:', error);
        }
        setLoading(false);
      };
      fetchDetails();
    }
  }, [movie]);

  if (!movie) return null;

  const backdropUrl = getBackdropUrl(movie.backdrop_path);
//   const posterUrl = getImageUrl(movie.poster_path);
  const trailer = details?.videos.results.find(
    (video) => video.type === 'Trailer' && video.site === 'YouTube'
  );

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 z-50 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          exit={{ y: 50 }}
          className="min-h-screen px-4 py-8"
          onClick={e => e.stopPropagation()}
        >
          <div className="max-w-6xl mx-auto bg-gray-900 rounded-xl overflow-hidden">
            {/* Backdrop */}
            {backdropUrl && (
              <div className="relative h-96">
                <Image
                  src={backdropUrl}
                  alt={movie.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
              </div>
            )}

            {/* Content */}
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-start">
                <h2 className="text-3xl font-bold">{movie.title}</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              {loading ? (
                <div className="mt-4">Loading details...</div>
              ) : (
                <>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {details?.genres.map(genre => (
                      <span
                        key={genre.id}
                        className="px-3 py-1 bg-gray-800 rounded-full text-sm"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>

                  <p className="mt-4 text-gray-300">{movie.overview}</p>

                  {trailer && (
                    <div className="mt-6">
                      <h3 className="text-xl font-semibold mb-4">Trailer</h3>
                      <div className="aspect-video">
                        <iframe
                          className="w-full h-full"
                          src={`https://www.youtube.com/embed/${trailer.key}`}
                          allowFullScreen
                        />
                      </div>
                    </div>
                  )}

                  {/* Cast Section */}

                    {details && details.credits && details.credits.cast && details.credits.cast.length > 0 && (
                    <div className="mt-6">
                        <h3 className="text-xl font-semibold mb-4">Cast</h3>
                        <div className="flex gap-4 overflow-x-auto pb-4">
                        {details.credits.cast.slice(0, 6).map((actor) => (
                            <div key={actor.id} className="flex-shrink-0 w-24">
                            {actor.profile_path ? (
                                <Image
                                src={getImageUrl(actor.profile_path, 'small')!}
                                alt={actor.name}
                                width={96}
                                height={144}
                                className="rounded-lg"
                                />
                            ) : (
                                <div className="w-24 h-36 bg-gray-800 rounded-lg" />
                            )}
                            <p className="mt-2 text-sm font-medium">{actor.name}</p>
                            <p className="text-sm text-gray-400">{actor.character}</p>
                            </div>
                        ))}
                        </div>
                    </div>
                    )}
                </>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}