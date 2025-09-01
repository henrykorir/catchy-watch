<template>
  <div
    class="card"
    @touchstart="emit('touch-start', index)"
    @touchend="emit('touch-end', index)"
    @click="viewMovie"
  >
    <img :src="item.image" :alt="item.title" class="card-img" />
    <div class="card-content">
      <h3 class="card-title">{{ item.title }}</h3>
      <p class="card-desc">{{ item.description }}</p>
      <div class="card-meta">
        <div class="rating"><i class="fas fa-star"></i> {{ item.rating }}</div>
        <div class="price">{{ item.price }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

// Define item type
interface RecommendationItem {
  image: string
  title: string
  description: string
  rating: number | string
  price: string
}

// Props
const props = defineProps<{
  item: RecommendationItem
  index: number
}>()

// Emits
const emit = defineEmits<{
  (e: 'touch-start', index: number): void
  (e: 'touch-end', index: number): void
}>()

const viewMovie = () => {
  window.location.hash = `/movie/${props.index}` // ✅ simpler, triggers hashchange
}
</script>

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
