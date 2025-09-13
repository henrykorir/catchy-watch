<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import tmdb from '../lib/tmdb-auth'
import { Movie, Search } from '@tdanks2000/tmdb-wrapper'
import dayjs from 'dayjs';

const props = defineProps<{
  queryParams: URLSearchParams
}>()

const query = ref(props.queryParams.get('query') || '')
const loading = ref(false)
const error = ref('')
const results = ref<Search<Movie>>({
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
})

// Watch query string
watch(
  () => props.queryParams,
  (newParams) => {
    query.value = newParams.get('query') || ''
    fetchResults()
  },
  { deep: true },
)

async function fetchResults() {
  if (!query.value) return
  loading.value = true
  error.value = ''
  try {
    results.value = await tmdb.search.movies({ query: query.value })
  } catch (err: any) {
    error.value = 'Failed to fetch results.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(fetchResults)

// Helpers
function posterUrl(item: Movie) {
  return item.poster_path ? `https://image.tmdb.org/t/p/w185${item.poster_path}` : 'no-poster.svg'
}

function displayTitle(item: Movie) {
  return item.title
}

function onViewMovieDetails(movie_id: number){
  window.location.hash = '#/movie/' + movie_id
}
</script>

<template>
  <div class="content p-4">
    <!-- Heading -->
    <h2 class="text-lg font-semibold mb-4">
      Results for "<span class="text-red-500">{{ query }}</span
      >"
    </h2>

    <!-- Loading -->
    <div v-if="loading" class="text-center text-gray-500">Loading...</div>

    <!-- Error -->
    <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>

    <!-- Empty -->
    <div v-else-if="!results.results.length" class="text-center text-gray-400">
      No results found.
    </div>

    <!-- List View -->
    <ul v-else class="space-y-6">
      <li
        v-for="item in results.results"
        :key="item.id + '-' + 'movie'"
        class="flex gap-6 bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden cursor-pointer" @click="onViewMovieDetails(item.id)"
      >
        <img
          :src="posterUrl(item)"
          :alt="displayTitle(item)"
          class="w-20 h-28 object-cover flex-shrink-0"
        />
        <div class="flex flex-col justify-center pr-2">
          <h3 class="text-base font-semibold truncate">
            {{ displayTitle(item) }}
          </h3>
          <p class="text-xs text-gray-500 capitalize mb-1">
            {{ dayjs(item.release_date).year() }}
          </p>
          <p class="text-sm text-gray-600 line-clamp-2">
            {{ item.overview || 'No description available.' }}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.content {
  min-height: 100vh;
  background: #f9fafb;
}

/* truncate overview to 2 lines */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
