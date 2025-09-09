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
  AppendToResponse,
} from '@tdanks2000/tmdb-wrapper'
import { useApi } from '../composables/useApi'
import tmdb from '../lib/tmdb-auth'
import VideoIframe from './widgets/VideoIframe.vue'

// ---------------- State ----------------
const selectedMovieDetails = ref<AppendToResponse<
  MovieDetails,
  ['keywords', 'credits', 'videos'],
  'movie'
> | null>(null)
const similarMovies = ref<Movie[]>([])
const movieId = ref<number | null>()
const show = ref(false)
const isLoading = ref(false)
const error = ref<string | null>(null)

defineProps<{ id: number }>()

// ---------------- Utilities ----------------
const updateMovieId = () => {
  const id = Number(window.location.hash.replace('#/movie/', ''))
  movieId.value = isNaN(id) ? null : id
}

// ---------------- Computed Properties ----------------
const posterUrl = computed(() =>
  selectedMovieDetails.value?.poster_path
    ? getFullImagePath(
        'https://image.tmdb.org/t/p/',
        ImageSizes.W500,
        selectedMovieDetails.value.poster_path,
        ImageFormats.JPG,
      )
    : 'no-poster.svg',
)

const trailer = computed(() => {
  if (!selectedMovieDetails.value?.videos?.results) return null

  const videos = selectedMovieDetails.value.videos.results

  // Prefer "Official Trailer"
  const officialTrailer = videos.find(
    (video) =>
      video.type === 'Trailer' && video.site === 'YouTube' && video.name.includes('Official'),
  )

  if (officialTrailer) return officialTrailer

  // Fallback: any YouTube trailer
  return videos.find((video) => video.type === 'Trailer' && video.site === 'YouTube') || null
})

// Simplified computed for template usage
const movieCredits = computed(() => selectedMovieDetails.value?.credits?.cast || [])
const movieKeywords = computed(() => selectedMovieDetails.value?.keywords?.keywords || [])

// ---------------- API Calls ----------------
const { execute: fetchSimilar } = useApi<SimilarMovies>(async () => {
  if (!movieId.value) return { page: 0, results: [], total_pages: 0, total_results: 0 }
  const data = await tmdb.movies.similar(movieId.value)
  similarMovies.value = data.results || []
  return data
})

// ---------------- Data Fetching ----------------
const fetchMovieData = async (id: number) => {
  isLoading.value = true
  error.value = null

  try {
    // Fetch main details with all required data in a single call
    const [movieData] = await Promise.all([
      tmdb.movies.details(id, ['keywords', 'credits', 'videos'] as const),
      fetchSimilar(),
    ])

    selectedMovieDetails.value = movieData

    console.log('Movie details with appended data:', selectedMovieDetails.value)
  } catch (err) {
    error.value = 'Failed to load movie data'
    console.error('Error fetching movie data:', err)
    selectedMovieDetails.value = null
    similarMovies.value = []
  } finally {
    isLoading.value = false
  }
}

// ---------------- Watchers ----------------
watch(
  movieId,
  (id) => {
    if (id) {
      fetchMovieData(id)
    } else {
      selectedMovieDetails.value = null
      similarMovies.value = []
    }
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
  console.log('Toggle watchlist for movie:', selectedMovieDetails.value?.id)
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
      <!-- Loading State -->
      <div v-if="isLoading" class="loading">Loading movie details...</div>

      <!-- Error State -->
      <div v-else-if="error" class="error">
        {{ error }}
      </div>

      <!-- Content -->
      <div v-else-if="selectedMovieDetails" class="movie-content">
        <MoviePoster :posterUrl="posterUrl" :title="selectedMovieDetails.title" />

        <MovieInfo
          :movie="selectedMovieDetails"
          :tags="movieKeywords"
          @toggle-watchlist="onToggleWatchList"
          @play-trailer="onPlayTrailer"
        />
      </div>

      <!-- No Data State -->
      <div v-else class="no-data">No movie data available</div>

      <CastSection v-if="selectedMovieDetails && movieCredits.length > 0" :cast="movieCredits" />

      <SimilarMovie
        v-if="similarMovies.length > 0"
        :movies="similarMovies"
        @movie-changed="loadMovie"
      />

      <VideoIframe
        v-if="trailer"
        :videoId="trailer.key"
        :show="show"
        :title="selectedMovieDetails?.title + ' Trailer'"
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

.loading,
.error,
.no-data {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
}

.error {
  color: #ff4444;
}

@media (max-width: 900px) {
  .movie-content {
    flex-direction: column;
  }
}
</style>
