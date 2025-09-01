<script setup lang="ts">
/**
 * Movie interface for typing props
 */
interface Movie {
  id: number | string
  title: string
  year: number
  poster: string
}

/**
 * Props definition with strong typing
 */
const props = defineProps<{
  movie: Movie
}>()

/**
 * Emits definition with strong typing
 */
const emit = defineEmits<{
  (e: 'movie-selected', movieId: Movie['id']): void
}>()

/**
 * Methods
 */
const selectMovie = (): void => {
  window.location.hash = `/movie/${props.movie.id}`
}
</script>

<template>
  <div class="movie-card" @click="selectMovie">
    <img :src="props.movie.poster" :alt="props.movie.title" />
    <div class="movie-card-content">
      <h3 class="movie-card-title">{{ props.movie.title }}</h3>
      <div class="movie-card-year">{{ props.movie.year }}</div>
    </div>
  </div>
</template>

<style scoped>
.movie-card {
  background: var(--card-bg);
  border-radius: 8px;
  overflow: hidden;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  cursor: pointer;
}

.movie-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
}

.movie-card img {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.movie-card-content {
  padding: 1rem;
}

.movie-card-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.movie-card-year {
  color: var(--gray);
  font-size: 0.9rem;
}
</style>
