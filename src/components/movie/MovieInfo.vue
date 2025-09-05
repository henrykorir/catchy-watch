<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { MovieDetails } from '@tdanks2000/tmdb-wrapper'
import dayjs from 'dayjs'

interface MovieKeyword {
  id: number
  name: string
}

// Props
const props = defineProps<{
  movie?: MovieDetails
  tags?: MovieKeyword[]
}>()

// Emits
const emit = defineEmits<{
  (e: 'play-trailer', movie: MovieDetails): void
  (e: 'toggle-watchlist', payload: { movie: MovieDetails; inWatchlist: boolean }): void
  (e: 'share', movie: MovieDetails): void
}>()

// Reactive state
const movie = ref<MovieDetails>({
  id: 0,
  title: 'Loading...',
  release_date: '',
  runtime: 0,
  vote_average: 0,
  adult: false,
  genres: [],
  overview: '',
  backdrop_path: '',
  budget: 0,
  homepage: '',
  imdb_id: '',
  original_language: '',
  original_title: '',
  popularity: 0,
  production_companies: [],
  production_countries: [],
  revenue: 0,
  spoken_languages: [],
  status: '',
  tagline: '',
  video: false,
  vote_count: 0,
})

const movieTags = ref<MovieKeyword[]>([])
const inWatchlist = ref(false)

// Watch props for changes and safely update refs
watch(
  () => props.movie,
  (newMovie) => {
    if (newMovie) movie.value = newMovie
  },
  { immediate: true },
)

watch(
  () => props.tags,
  (newTags) => {
    movieTags.value = newTags ?? []
  },
  { immediate: true },
)

// Methods (safe emits)
const playTrailer = () => {
  if (!movie.value || movie.value.id === 0) return
  emit('play-trailer', movie.value)
}

const toggleWatchlist = () => {
  if (!movie.value || movie.value.id === 0) return
  inWatchlist.value = !inWatchlist.value
  emit('toggle-watchlist', { movie: movie.value, inWatchlist: inWatchlist.value })
}

const shareMovie = () => {
  if (!movie.value || movie.value.id === 0) return
  emit('share', movie.value)
}

// Computed
const watchlistIcon = computed(() => (inWatchlist.value ? 'fas fa-check' : 'fas fa-plus'))
const watchlistText = computed(() =>
  inWatchlist.value ? 'Added to Watchlist' : 'Add to Watchlist',
)
const releaseYear = computed(() => movie.value.release_date?.split('-')[0] ?? 'N/A')
const genres = computed(() => movie.value.genres.map((g) => g.name).join(', ') || 'N/A')
</script>

<template>
  <div class="movie-info">
    <h1 class="title">
      {{ movie.title }}
      <span class="year">({{ releaseYear }})</span>
      <span class="rating"><i class="fas fa-star"></i> {{ movie.vote_average }}</span>
    </h1>

    <div class="details">
      <div class="detail-item"><i class="far fa-clock"></i> {{ movie.runtime }} min</div>
      <div class="detail-item">
        <i class="far fa-calendar-alt"></i>
        {{
          dayjs(movie.release_date)
            .format('DD MMMM, YYYY')
            .toLowerCase()
            .replace(/\b\w/g, (char) => char.toUpperCase())
        }}
      </div>
      <div class="detail-item"><i class="fas fa-ticket-alt"></i> {{ genres }}</div>
    </div>

    <div class="tags">
      <span v-for="tag in movieTags" :key="tag.id" class="tag">{{ tag.name }}</span>
    </div>

    <p class="description">{{ movie.overview || 'No description available.' }}</p>

    <div class="action-buttons">
      <button class="btn btn-primary" @click="playTrailer">
        <i class="fas fa-play"></i> Watch Trailer
      </button>
      <button class="btn btn-secondary" @click="toggleWatchlist">
        <i :class="watchlistIcon"></i> {{ watchlistText }}
      </button>
      <button class="btn btn-secondary" @click="shareMovie">
        <i class="fas fa-share-alt"></i> Share
      </button>
    </div>
  </div>
</template>

<style scoped>
.movie-info {
  padding: 1rem;
}
.title {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}
.details {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.5rem;
}
.detail-item {
  font-size: 0.9rem;
}
.tags {
  margin: 0.5rem 0;
}
.tag {
  background: #eee;
  padding: 0.2rem 0.6rem;
  border-radius: 0.5rem;
  margin-right: 0.4rem;
  font-size: 0.8rem;
}
.description {
  margin: 1rem 0;
}
.action-buttons {
  display: flex;
  gap: 0.5rem;
}
.btn {
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
  border-radius: 0.25rem;
}
.btn-primary {
  background: #007bff;
  color: white;
}
.btn-secondary {
  background: #6c757d;
  color: white;
}
</style>
