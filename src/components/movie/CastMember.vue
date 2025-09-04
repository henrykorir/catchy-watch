<script setup lang="ts">
import { getFullImagePath, ImageSizes, ImageFormats } from '@tdanks2000/tmdb-wrapper'
import { computed } from 'vue'

/**
 * Interface for a cast member
 * (should match the one in CastSection.vue for consistency)
 */
export interface CastMember {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string | null
  cast_id: number
  character: string
  credit_id: string
  order: number
}

/**
 * Strongly typed props
 */
const props = defineProps<{
  actor: CastMember
}>()
const avatarUrl = computed(() =>
  props.actor.profile_path
    ? getFullImagePath(
        'https://image.tmdb.org/t/p/',
        ImageSizes.W300,
        props.actor.profile_path,
        ImageFormats.JPG,
      )
    : '',
)
</script>

<template>
  <div class="cast-member">
    <div class="flex justify-center items-center">
      <img :src="avatarUrl" :alt="props.actor.name" class="cast-img" />
    </div>
    <div class="cast-name">{{ props.actor.name }}</div>
    <div class="cast-character">{{ props.actor.character }}</div>
  </div>
</template>

<style scoped>
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
