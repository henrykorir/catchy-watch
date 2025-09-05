<script setup lang="ts">
import { getFullImagePath, ImageFormats, ImageSizes, Movie } from '@tdanks2000/tmdb-wrapper'
import { defineProps, defineEmits } from 'vue'
import dayjs from 'dayjs'

// Props
const props = defineProps<{
  item: Movie
  index: number
}>()

// Emits
const emit = defineEmits<{
  (e: 'touch-start', index: number): void
  (e: 'touch-end', index: number): void
}>()

const viewMovie = () => {
  window.location.hash = `/movie/${props.item.id}` // ✅ simpler, triggers hashchange
}
const posterUrl = getFullImagePath(
  'https://image.tmdb.org/t/p/',
  ImageSizes.W500,
  props.item.poster_path,
  ImageFormats.JPG,
)
</script>
<template>
  <div
    class="card"
    @touchstart="emit('touch-start', index)"
    @touchend="emit('touch-end', index)"
    @click="viewMovie"
  >
    <img :src="posterUrl" :alt="item.title" class="card-img" />
    <div class="card-content">
      <h3 class="card-title">{{ item.title }}</h3>
      <p class="card-desc">{{ item.overview }}</p>
      <div class="card-meta">
        <div class="rating"><i class="fas fa-star"></i> {{ item.vote_average }}</div>
        <div class="price">
          {{
            dayjs(item.release_date)
              .format('DD MMMM, YYYY')
              .toLowerCase()
              .replace(/\b\w/g, (char) => char.toUpperCase())
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.card:active {
  transform: scale(0.98);
}

.card-img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.card-content {
  padding: 15px;
}

.card-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.card-desc {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.rating {
  color: #ffc107;
  font-weight: 600;
}

.price {
  font-weight: 700;
  color: #6e8efb;
}
</style>
