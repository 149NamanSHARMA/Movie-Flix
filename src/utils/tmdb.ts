export const tmdb = {
    apiKey: process.env.NEXT_PUBLIC_TMDB_API_KEY as string,
    baseUrl: 'https://api.themoviedb.org/3',
    imageBaseUrl: 'https://image.tmdb.org/t/p',
    posterSize: {
      small: '/w342',
      medium: '/w500',
      large: '/w780',
      original: '/original'
    } as const,
    backdropSize: {
      small: '/w780',
      large: '/w1280',
      original: '/original'
    } as const
  };
  
  export type PosterSize = keyof typeof tmdb.posterSize;
  export type BackdropSize = keyof typeof tmdb.backdropSize;
  
  export const getImageUrl = (path: string | null, size: PosterSize = 'medium'): string | null => {
    if (!path) return null;
    return `${tmdb.imageBaseUrl}${tmdb.posterSize[size]}${path}`;
  };
  
  export const getBackdropUrl = (path: string | null, size: BackdropSize = 'large'): string | null => {
    if (!path) return null;
    return `${tmdb.imageBaseUrl}${tmdb.backdropSize[size]}${path}`;
  };