<script setup lang="ts">
interface MovieCardProps {
  id: number | string
  title: string
  thumbnail: string
}

const props = defineProps<MovieCardProps>()

const viewMovie = () => {
  window.location.hash = `/movie/${props.id}` // ✅ simpler, triggers hashchange
}
</script>

<template>
  <div
    class="aspect-square w-full bg-white dark:bg-neutral-800 rounded-xl shadow-md overflow-hidden flex flex-col movie-card"
    @click="viewMovie"
  >
    <img :src="props.thumbnail" :alt="props.title" class="w-full h-2/3 object-cover" />
    <div class="p-2 text-center flex items-center justify-center h-1/3">
      <h2 class="text-sm font-semibold text-gray-800 dark:text-white truncate">
        {{ props.title }}
      </h2>
    </div>
  </div>
</template>

<style scoped>
.movie-card {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  cursor: pointer;
}
</style>
