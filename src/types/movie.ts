export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string;
    vote_average: number;
    genre_ids: number[];
  }
  
  export interface MovieDetails extends Movie {
    genres: Array<{
      id: number;
      name: string;
    }>;
    runtime: number;
    videos: {
      results: Array<{
        key: string;
        site: string;
        type: string;
      }>;
    };
    credits: {
      cast: Array<{
        id: number;
        name: string;
        character: string;
        profile_path: string | null;
      }>;
    };
  }
  
  export interface SearchResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
  }