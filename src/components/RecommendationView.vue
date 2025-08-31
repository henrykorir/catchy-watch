<script setup lang="ts">
import { ref } from 'vue'
import MovieCard from './MovieCard.vue'

const query = ref('')

const movies = [
  // {
  //   id: 1,
  //   title: 'Inception',
  //   thumbnail: 'https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg'
  // },
  {
    id: 2,
    title: 'Interstellar',
    thumbnail: 'https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg'
  },
  {
    id: 3,
    title: 'Tenet',
    thumbnail: 'https://image.tmdb.org/t/p/w500/k68nPLbIST6NP96JmTxmZijEvCA.jpg'
  },
  {
    id: 4,
    title: 'The Dark Knight',
    thumbnail: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg'
  }
]

function handleSearch() {
  console.log('Searching for:', query.value)
}
</script>

<template>
  <div class="w-full max-w-full mx-auto px-4 py-6">
    <div class="relative">
      <!-- Input field -->
      <input
        v-model="query"
        @keyup.enter="handleSearch"
        type="text"
        placeholder="Search"
        class="w-full pl-12 pr-4 py-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-neutral-800 dark:text-white"
      />

      <!-- Icon + Label inside input -->
      <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
        <!-- Magnifying glass SVG -->
        <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" stroke-width="2"
             viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
        </svg>
        <!-- <span class="text-sm">Search</span> -->
      </div>
    </div>
    <h2 class="text-center">Recommendations</h2>
    <div class="px-4 py-6">
    <div class="grid grid-cols-2 gap-4">
      <MovieCard
        v-for="movie in movies"
        :key="movie.id"
        :title="movie.title"
        :thumbnail="movie.thumbnail"
      />
    </div>
  </div>
  </div>
</template>
