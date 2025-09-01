<script setup lang="ts">
// Define movie interface for TypeScript
interface Movie {
  id: number
  title: string
  year: number
  rating?: number
  poster: string
}

// Define props with TypeScript
const props = defineProps<{
  movie: Movie
}>()

// Define emits
const emit = defineEmits<{
  (e: 'movie-selected', id: number): void
}>()

// Method to handle click
const handleClick = () => {
  emit('movie-selected', props.movie.id)
}
</script>

<template>
  <div class="movie-card" @click="handleClick">
    <img :src="movie.poster" :alt="movie.title + ' Poster'" class="movie-poster" />
    <div class="movie-content">
      <h3 class="movie-title">{{ movie.title }}</h3>
      <div class="movie-year">{{ movie.year }}</div>
      <div v-if="movie.rating" class="movie-rating">
        <i class="fas fa-star"></i>
        <span>{{ movie.rating }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.movie-card {
  background: rgba(20, 20, 20, 0.8);
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

.movie-poster {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.movie-content {
  padding: 0.75rem;
}

.movie-title {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.movie-year {
  color: #808080;
  font-size: 0.8rem;
  margin-bottom: 0.25rem;
}

.movie-rating {
  display: flex;
  align-items: center;
  color: #ffd700;
  font-weight: 600;
  font-size: 0.8rem;
}

.movie-rating i {
  margin-right: 0.25rem;
}
</style>
