<script setup lang="ts">
import { ref, computed, type Ref, type ComputedRef } from 'vue'

/**
 * Movie interface for props typing
 */
interface Movie {
  title: string
  year: number
  rating: number
  runtime: number
  releaseDate: string
  genres: string[]
  tags: string[]
  description: string
}

/**
 * Props definition
 */
const props = defineProps<{
  movie: Movie
}>()

/**
 * Emits definition for reusability instead of alerts
 */
const emit = defineEmits<{
  (e: 'play-trailer', movie: Movie): void
  (e: 'toggle-watchlist', payload: { movie: Movie; inWatchlist: boolean }): void
  (e: 'share', movie: Movie): void
}>()

/**
 * State
 */
const inWatchlist: Ref<boolean> = ref(false)

/**
 * Methods
 */
const playTrailer = (): void => {
  emit('play-trailer', props.movie)
}

const toggleWatchlist = (): void => {
  inWatchlist.value = !inWatchlist.value
  emit('toggle-watchlist', { movie: props.movie, inWatchlist: inWatchlist.value })
}

const shareMovie = (): void => {
  emit('share', props.movie)
}

/**
 * Computed values
 */
const watchlistIcon: ComputedRef<string> = computed(() =>
  inWatchlist.value ? 'fas fa-check' : 'fas fa-plus'
)

const watchlistText: ComputedRef<string> = computed(() =>
  inWatchlist.value ? 'Added to Watchlist' : 'Add to Watchlist'
)
</script>

<template>
  <div class="movie-info">
    <h1 class="title">
      {{ props.movie.title }}
      <span class="year">({{ props.movie.year }})</span>
      <span class="rating">
        <i class="fas fa-star"></i> {{ props.movie.rating }}
      </span>
    </h1>

    <div class="details">
      <div class="detail-item">
        <i class="far fa-clock"></i> {{ props.movie.runtime }} min
      </div>
      <div class="detail-item">
        <i class="far fa-calendar-alt"></i> {{ props.movie.releaseDate }}
      </div>
      <div class="detail-item">
        <i class="fas fa-ticket-alt"></i> {{ props.movie.genres.join(', ') }}
      </div>
    </div>

    <div class="tags">
      <span class="tag" v-for="tag in props.movie.tags" :key="tag">
        {{ tag }}
      </span>
    </div>

    <p class="description">
      {{ props.movie.description }}
    </p>

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
