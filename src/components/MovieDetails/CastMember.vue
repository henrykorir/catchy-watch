<script setup lang="ts">
/**
 * Interface for a cast member
 * (should match the one in CastSection.vue for consistency)
 */
export interface CastMember {
  id: number | string
  name: string
  character: string
  image: string
}

/**
 * Strongly typed props
 */
const props = defineProps<{
  actor: CastMember
}>()
</script>

<template>
  <div class="cast-member">
    <img :src="props.actor.image" :alt="props.actor.name" class="cast-img" />
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
