<script setup lang="ts">
import CastMember from './CastMember.vue'
/**
 * Cast member interface for props typing
 */
interface CastMember {
  id: number | string
  name: string
  character: string
  image: string
}

/**
 * Props definition with strong typing
 */
const props = defineProps<{
  cast: CastMember[]
}>()
</script>

<template>
  <div class="cast-section">
    <h2 class="section-title"><i class="fas fa-users"></i> Cast</h2>

    <div class="cast-scroll">
      <CastMember v-for="actor in props.cast" :key="actor.id" :actor="actor" />
    </div>
  </div>
</template>

<style scoped>
.cast-section {
  margin: 3rem 0;
}

.section-title {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
}

.section-title i {
  margin-right: 0.5rem;
  color: var(--primary);
}

.cast-scroll {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding: 0.5rem 0;
  scrollbar-width: thin;
}

.cast-scroll::-webkit-scrollbar {
  height: 8px;
}

.cast-scroll::-webkit-scrollbar-thumb {
  background: var(--primary);
  border-radius: 8px;
}

.cast-member {
  flex: 0 0 150px;
  text-align: center;
}

.cast-img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 0.5rem;
  border: 2px solid transparent;
  transition: border 0.3s ease;
}

.cast-member:hover .cast-img {
  border: 2px solid var(--primary);
}

.cast-name {
  font-weight: 600;
  font-size: 0.9rem;
}

.cast-character {
  font-size: 0.8rem;
  color: var(--gray);
}
</style>
