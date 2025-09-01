<script setup lang="ts">
import MovieCard from './MovieCard.vue'

// Define movie interface for TypeScript
interface Movie {
  id: number
  title: string
  year: number
  rating?: number
  poster: string
}

// Define props with TypeScript
defineProps<{
  title?: string
  movies: Movie[]
}>()

// Define emits
const emit = defineEmits<{
  (e: 'view-all'): void
  (e: 'movie-selected', id: number): void
}>()

// Method to handle view all click
const handleViewAll = () => {
  emit('view-all')
}

// Method to handle movie selection
const handleMovieSelect = (movieId: number) => {
  emit('movie-selected', movieId)
}
</script>

<template>
  <div class="watchlist-section">
    <div class="section-header">
      <h2 class="section-title">{{ title || 'Your Watchlist' }}</h2>
      <a class="view-all" @click="handleViewAll">View All</a>
    </div>

    <div class="movies-grid">
      <MovieCard
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
        @movie-selected="handleMovieSelect"
      />
    </div>
  </div>
</template>

<style scoped>
.watchlist-section {
  background-color: #1f1f1f;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
}

.view-all {
  color: #e50914;
  text-decoration: none;
  font-size: 0.9rem;
  cursor: pointer;
}

.movies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
}

@media (max-width: 600px) {
  .movies-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
