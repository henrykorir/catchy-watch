<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

import MoviePoster from './movie/MoviePoster.vue'
import MovieInfo from './movie/MovieInfo.vue'
import CastSection from './movie/CastSection.vue'
import SimilarMovie from './movie/SimilarMovie.vue'
import {
  Movie,
  getFullImagePath,
  ImageSizes,
  ImageFormats,
  SimilarMovies,
  MovieDetails,
  Videos,
  Video,
} from '@tdanks2000/tmdb-wrapper'
import { useApi } from '../composables/useApi'
import tmdb from '../lib/tmdb-auth'
import VideoIframe from './widgets/VideoIframe.vue'

// ---------------- Interfaces ----------------
interface MovieKeyword {
  id: number
  name: string
}

interface MovieKeywordsResponse {
  id: number
  keywords: MovieKeyword[]
}

interface CastCredit {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string | null
  cast_id: number
  character: string
  credit_id: string
  order: number
}

interface MovieCreditsResponse {
  id: number
  cast: CastCredit[]
}

// ---------------- State ----------------
const selectedMovie = ref<MovieDetails>({
  adult: false,
  backdrop_path: '',
  budget: 0,
  genres: [],
  homepage: '',
  id: 0,
  imdb_id: '',
  original_language: '',
  original_title: '',
  overview: '',
  popularity: 0,
  production_companies: [],
  production_countries: [],
  release_date: '',
  revenue: 0,
  runtime: 0,
  spoken_languages: [],
  status: '',
  tagline: '',
  title: '',
  video: false,
  vote_average: 0,
  vote_count: 0,
})
const similarMovies = ref<Movie[]>([])
const creditsData = ref<MovieCreditsResponse>({ id: 0, cast: [] })
const keywordsData = ref<MovieKeywordsResponse>({ id: 0, keywords: [] })
const videosData = ref<Videos>()
const movieId = ref<number | null>()
const show = ref(false)

defineProps<{ id: number }>()
const updateMovieId = () => {
  const id = Number(window.location.hash.replace('#/movie/', ''))
  movieId.value = isNaN(id) ? null : id
}

// Always have a valid poster URL
const posterUrl = computed(() =>
  selectedMovie.value?.poster_path
    ? getFullImagePath(
        'https://image.tmdb.org/t/p/',
        ImageSizes.W500,
        selectedMovie.value?.poster_path,
        ImageFormats.JPG,
      )
    : 'no-poster.svg',
)

// ---------------- API Calls ----------------
const { execute: fetchKeywords } = useApi<MovieKeywordsResponse>(async () => {
  if (!movieId.value) return { id: 0, keywords: [] }
  const data = await tmdb.movies.keywords(movieId.value)
  keywordsData.value = data
  return data
})

const { execute: fetchSimilar } = useApi<SimilarMovies>(async () => {
  if (!movieId.value) return { page: 0, results: [], total_pages: 0, total_results: 0 }
  const data = await tmdb.movies.similar(movieId.value)
  similarMovies.value = data.results || []
  return data
})

const { execute: fetchCredits } = useApi<MovieCreditsResponse>(async () => {
  if (!movieId.value) return { id: 0, cast: [] }
  const data = await tmdb.movies.credits(movieId.value)
  creditsData.value = data
  return data
})

const { execute: fetchVideos } = useApi<Videos>(async () => {
  if (!movieId.value) return { id: 0, results: [] }
  const data = await tmdb.movies.videos(movieId.value)
  videosData.value = data
  return data
})

// ---------------- Computed ----------------
const trailer = computed<Video | null>(() => {
  if (!videosData.value) return null

  // Prefer "Official Trailer"
  const official = videosData.value.results.find(
    (video) =>
      video.type === 'Trailer' && video.site === 'YouTube' && video.name.includes('Official'),
  )

  if (official) return official

  // Fallback: any YouTube trailer
  return (
    videosData.value.results.find(
      (video) => video.type === 'Trailer' && video.site === 'YouTube',
    ) || null
  )
})

// ---------------- Watchers ----------------
watch(
  movieId,
  async (id) => {
    if (!id) return

    // fetch details when movieId changes
    selectedMovie.value = await tmdb.movies.details(id)
    await Promise.all([fetchKeywords(), fetchSimilar(), fetchCredits()])
    fetchVideos()
  },
  { immediate: true },
)

// ---------------- Lifecycle ----------------
onMounted(() => {
  updateMovieId()
  window.addEventListener('hashchange', updateMovieId)
})

onUnmounted(() => {
  window.removeEventListener('hashchange', updateMovieId)
})

// ---------------- Methods ----------------
const loadMovie = async (id: number | string) => {
  window.location.hash = `/movie/${id}`
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const onToggleWatchList = () => {
  // TODO: implement watchlist logic
}

const onPlayTrailer = () => {
  if (trailer.value) {
    show.value = true
  } else {
    alert('No trailer available for this movie')
  }
}

const onCloseVideo = () => {
  show.value = false
}
</script>

<template>
  <div class="container">
    <main>
      <div class="movie-content">
        <MoviePoster :posterUrl="posterUrl" :title="selectedMovie.title" />
        <MovieInfo
          :movie="selectedMovie"
          :tags="keywordsData.keywords"
          @toggle-watchlist="onToggleWatchList"
          @play-trailer="onPlayTrailer"
        />
      </div>

      <CastSection :cast="creditsData.cast" />

      <SimilarMovie :movies="similarMovies" @movie-changed="loadMovie" />

      <VideoIframe
        v-if="trailer"
        :videoId="trailer.key"
        :show="show"
        :title="selectedMovie.title + ' Trailer'"
        @close="onCloseVideo"
      />
    </main>
  </div>
</template>

<style scoped>
.movie-content {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
}
@media (max-width: 900px) {
  .movie-content {
    flex-direction: column;
  }
}
</style>
