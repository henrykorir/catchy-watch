// src/types/tmdb.d.ts

/** Pagination wrapper */
export interface TMDBPaginatedResponse<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

/** Common media base properties */
interface TMDBBaseMedia {
  id: number
  overview: string
  popularity: number
  vote_average: number
  vote_count: number
  poster_path: string | null
  backdrop_path?: string | null
  genre_ids?: number[]
  original_language: string
}

/** Movie type */
export interface TMDBMovie extends TMDBBaseMedia {
  title: string
  original_title: string
  release_date: string
  adult: boolean
  video: boolean
}

/** Movie details (extended) */
export interface TMDBMovieDetails extends TMDBMovie {
  belongs_to_collection: {
    id: number
    name: string
    poster_path: string | null
    backdrop_path: string | null
  } | null
  budget: number
  genres: TMDBGenre[]
  homepage: string | null
  imdb_id: string | null
  production_companies: {
    id: number
    name: string
    logo_path: string | null
    origin_country: string
  }[]
  production_countries: {
    iso_3166_1: string
    name: string
  }[]
  release_date: string
  revenue: number
  runtime: number | null
  spoken_languages: {
    iso_639_1: string
    name: string
  }[]
  status: string
  tagline: string | null
}

/** TV Show type */
export interface TMDBTvShow extends TMDBBaseMedia {
  name: string
  original_name: string
  first_air_date: string
  origin_country: string[]
}

/** TV Show details (extended) */
export interface TMDBTvShowDetails extends TMDBTvShow {
  created_by: { id: number; name: string; profile_path: string | null }[]
  episode_run_time: number[]
  genres: TMDBGenre[]
  homepage: string | null
  in_production: boolean
  languages: string[]
  last_air_date: string
  number_of_episodes: number
  number_of_seasons: number
  networks: { id: number; name: string; logo_path: string | null; origin_country: string }[]
  production_companies: {
    id: number
    name: string
    logo_path: string | null
    origin_country: string
  }[]
  seasons: {
    air_date: string
    episode_count: number
    id: number
    name: string
    overview: string
    poster_path: string | null
    season_number: number
  }[]
  status: string
  type: string
}

/** Person type */
export interface TMDBPerson {
  id: number
  name: string
  gender: 0 | 1 | 2 | 3
  popularity: number
  profile_path: string | null
  adult?: boolean
  known_for_department?: string
}

/** Person details */
export interface TMDBPersonDetails extends TMDBPerson {
  biography: string
  birthday: string | null
  deathday: string | null
  homepage: string | null
  also_known_as: string[]
  place_of_birth: string | null
  imdb_id: string | null
  known_for: (TMDBMovie | TMDBTvShow)[]
}

/** Genre type */
export interface TMDBGenre {
  id: number
  name: string
}

/** Genre list */
export interface TMDBGenreResponse {
  genres: TMDBGenre[]
}

/** Search result item (multi-search) */
export interface TMDBSearchItem extends TMDBMovie, TMDBTvShow, TMDBPerson {}

/** Trending response */
export interface TMDBTrendingResponse {
  page: number
  results: (TMDBMovie | TMDBTvShow | TMDBPerson)[]
  total_pages: number
  total_results: number
}

/** Image configuration (for building URLs) */
export interface TMDBImageConfig {
  base_url: string
  secure_base_url: string
  backdrop_sizes: string[]
  logo_sizes: string[]
  poster_sizes: string[]
  profile_sizes: string[]
  still_sizes: string[]
}

/** Configuration response */
export interface TMDBConfigResponse {
  images: TMDBImageConfig
  change_keys: string[]
}

/** Credits (cast + crew) */
export interface TMDBCrew {
  id: number
  department: string
  job: string
  name: string
  profile_path: string | null
}

export interface TMDBCast {
  cast_id: number
  character: string
  credit_id: string
  gender: number | null
  id: number
  name: string
  order: number
  profile_path: string | null
}

export interface TMDBCreditResponse {
  id: number
  cast: TMDBCast[]
  crew: TMDBCrew[]
}
