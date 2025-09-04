<script setup lang="ts">
import { Movie, getFullImagePath, ImageSizes, ImageFormats } from '@tdanks2000/tmdb-wrapper'
import { computed } from 'vue'
import dayjs from 'dayjs'

/**
 * Props definition
 */
const props = defineProps<{
  movie: Movie
}>()

/**
 * Emits definition
 */
const emit = defineEmits<{
  (e: 'movie-selected', movieId: Movie['id']): void
}>()

/**
 * Methods
 */
const selectMovie = (): void => {
  if (!props.movie?.id) return

  // Emit to parent
  emit('movie-selected', props.movie.id)

  // Optional: update hash and scroll
  window.location.hash = `/movie/${props.movie.id}`
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

/**
 * Computed poster URL
 */
const posterUrl = computed(() =>
  props.movie.poster_path
    ? getFullImagePath(
        'https://image.tmdb.org/t/p/',
        ImageSizes.W500,
        props.movie.poster_path,
        ImageFormats.JPG,
      )
    : '',
)

/**
 * Computed formatted release date (e.g., 29 July, 2025)
 */
const releaseDateFormatted = computed(() =>
  props.movie.release_date ? dayjs(props.movie.release_date).format('DD MMMM, YYYY') : 'N/A',
)
</script>

<template>
  <div class="movie-card" @click="selectMovie">
    <img :src="posterUrl" :alt="props.movie.title" />
    <div class="movie-card-content">
      <h3 class="movie-card-title">{{ props.movie.title }}</h3>
      <div class="movie-card-year">{{ releaseDateFormatted }}</div>
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
