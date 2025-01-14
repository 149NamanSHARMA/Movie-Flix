import axios from 'axios';
import { Movie, MovieDetails, SearchResponse } from '@/types/movie';
import { tmdb } from '@/utils/tmdb';

const api = axios.create({
  baseURL: tmdb.baseUrl,
  params: {
    api_key: tmdb.apiKey,
  },
});

export const searchMovies = async (query: string): Promise<SearchResponse> => {
  const response = await api.get<SearchResponse>('/search/movie', {
    params: { query },
  });
  return response.data;
};

export const getMovieDetails = async (movieId: number): Promise<MovieDetails> => {
  const response = await api.get<MovieDetails>(`/movie/${movieId}`, {
    params: {
      append_to_response: 'videos,credits',
    },
  });
  return response.data;
};