<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, inject } from 'vue'

import MoviePoster from './movie/MoviePoster.vue'
import MovieInfo from './movie/MovieInfo.vue'
import CastSection from './movie/CastSection.vue'
import SimilarMovie from './movie/SimilarMovie.vue'
import VideoIframe from './widgets/VideoIframe.vue'
import PaginationBar from './common/PaginationBar.vue'

import {
  Movie,
  getFullImagePath,
  ImageSizes,
  ImageFormats,
  SimilarMovies,
  MovieDetails,
  AppendToResponse,
  PageOption,
} from '@tdanks2000/tmdb-wrapper'

import { useApi } from '../composables/useApi'
import tmdb from '../lib/tmdb-auth'
import { supabase } from '../lib/supabase-auth'
import { AuthContext } from '../types/auth'

// ---------------- Props & Context ----------------
defineProps<{ id: number | string }>()
const auth = inject<AuthContext>('auth')

// ---------------- State ----------------
const selectedMovieDetails = ref<
  AppendToResponse<MovieDetails, ['keywords', 'credits', 'videos'], 'movie'> | null
>(null)
const similarMovies = ref<Movie[]>([])
const movieId = ref<number | null>(null)
const showTrailer = ref(false)
const isLoading = ref(false)
const errorMessage = ref<string | null>(null)
const currentPage = ref(1)
const totalPages = ref(1)

// ---------------- Utilities ----------------
function updateMovieId() {
  const id = Number(window.location.hash.replace('#/movie/', ''))
  movieId.value = isNaN(id) ? null : id
}

// ---------------- Computed ----------------
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
  const videos = selectedMovieDetails.value?.videos?.results || []
  return (
    videos.find(
      (video) =>
        video.type === 'Trailer' &&
        video.site === 'YouTube' &&
        video.name.includes('Official'),
    ) ||
    videos.find((video) => video.type === 'Trailer' && video.site === 'YouTube') ||
    null
  )
})

const movieCredits = computed(() => selectedMovieDetails.value?.credits?.cast || [])
const movieKeywords = computed(() => selectedMovieDetails.value?.keywords?.keywords || [])

// ---------------- API ----------------
const { execute: fetchSimilar } = useApi<SimilarMovies>(async (options?: PageOption) => {
  if (!movieId.value) return { page: 0, results: [], total_pages: 0, total_results: 0 }

  const data = await tmdb.movies.similar(movieId.value, options)
  similarMovies.value = data.results || []
  totalPages.value = data.total_pages
  return data
})

async function fetchMovieData(id: number) {
  isLoading.value = true
  errorMessage.value = null

  try {
    const [movieData] = await Promise.all([
      tmdb.movies.details(id, ['keywords', 'credits', 'videos']),
      fetchSimilar(),
    ])
    selectedMovieDetails.value = movieData
  } catch (err) {
    console.error('Error fetching movie data:', err)
    errorMessage.value = 'Failed to load movie data'
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
    if (id) fetchMovieData(id)
    else {
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
function loadMovie(id: number | string) {
  window.location.hash = `/movie/${id}`
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

async function onToggleWatchList(id: number) {
  if (!auth) throw new Error('Auth context not found')

  const movie_id = id || selectedMovieDetails.value?.id
  if (!movie_id) return

  try {
    const { data, error } = await supabase
      .from('watchlist')
      .select('*', { count: 'exact' })
      .eq('user_id', auth.user.value.id)
      .eq('movie_id', movie_id)

    if (error) throw error

    if (data?.length === 0) {
      await supabase.from('watchlist').insert({ user_id: auth.user.value.id, movie_id })
      console.log('Movie added to watchlist')
    } else {
      await supabase.from('watchlist').delete().eq('user_id', auth.user.value.id).eq('movie_id', movie_id)
      console.log('Movie removed from watchlist')
    }
  } catch (err: any) {
    console.error('Error toggling watchlist:', err.message)
  }
}

function onPlayTrailer() {
  if (trailer.value) showTrailer.value = true
  else alert('No trailer available for this movie')
}

function onCloseVideo() {
  showTrailer.value = false
}

function handlePageChange(pageNumber: number) {
  currentPage.value = pageNumber
  fetchSimilar({ page: pageNumber })
}
</script>

<template>
  <div class="container">
    <main>
      <!-- Loading -->
      <div v-if="isLoading" class="loading">Loading movie details...</div>

      <!-- Error -->
      <div v-else-if="errorMessage" class="error">{{ errorMessage }}</div>

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

      <!-- No Data -->
      <div v-else class="no-data">No movie data available</div>

      <CastSection v-if="selectedMovieDetails && movieCredits.length" :cast="movieCredits" />

      <SimilarMovie v-if="similarMovies.length" :movies="similarMovies" @movie-changed="loadMovie" />

      <PaginationBar :current-page="currentPage" :total-pages="totalPages" @select-page="handlePageChange" />

      <VideoIframe
        v-if="trailer"
        :videoId="trailer.key"
        :show="showTrailer"
        :title="`${selectedMovieDetails?.title} Trailer`"
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
