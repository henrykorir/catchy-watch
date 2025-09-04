<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import SearchBar from './common/SearchBar.vue'
import FilterSection from './recommendation/FilterSection.vue'
import RecommendationList from './recommendation/RecommendationList.vue'
import { useApi } from '../composables/useApi'
import tmdb from '../lib/tmdb-auth'
import { MovieDiscoverResult } from '@tdanks2000/tmdb-wrapper'
import { movieStore } from '../store/movie'

// State
const searchQuery = ref('')
const activeFilter = ref('All')
const touchedCard = ref<number | null>(null)
// const loading = ref(true)

const filters = ref(['All', 'Popular', 'Trending', 'New', 'Top Rated', 'For You', 'Nearby'])

// Methods
function setActiveFilter(filter: string) {
  activeFilter.value = filter
}


function handleSearch() {
  console.log('Searching for:', searchQuery.value)
}

function handleTouchStart(index: number) {
  touchedCard.value = index
}

function handleTouchEnd(index: number) {
  if (touchedCard.value === index) {
    touchedCard.value = null
  }
}

// const { data, execute } = useApi<MovieDiscoverResult>(async () => {
//   if (!movieStore.loaded) {
//     return await tmdb.discover.movie()
//   }
//   // If already loaded, return the cached data
//   return { results: movieStore.movies } as MovieDiscoverResult
// })
// const { data, execute, loading, error } = useApi<MovieDiscoverResult>(async (filter?: string) => {
//   if (!movieStore.loaded) {
//     switch (filter) {
//       case 'Popular':
//         return await tmdb.movies.popular()
//       case 'Trending':
//         return await tmdb.trending.trending('movie','day') // example
//       case 'New':
//         return await tmdb.movies.nowPlaying()
//       case 'Top Rated':
//         return await tmdb.movies.topRated()
//       case 'For You':
//         return await tmdb.discover.movie({ with_genres: '18' }) // example: drama
//       case 'Nearby':
//         return await tmdb.discover.movie({ region: 'KE' }) // example: Kenya region
//       default:
//         return await tmdb.discover.movie()
//     }
//   }

//   // return cached data
//   return { results: movieStore.movies } as MovieDiscoverResult
// })

// onMounted(async() => execute)
// watch(activeFilter, (newFilter) => {
//   execute(newFilter)
// }, { immediate: true })

// Watch the API data and update the global store
// watch(data, (val) => {
//   if (val && !movieStore.loaded) {
//     movieStore.movies = val.results
//     movieStore.loaded = true
//     console.log(movieStore.movies)
//   }
// })
// map filters to API calls
const filterToApi: Record<string, () => Promise<MovieDiscoverResult>> = {
  'Popular':   () => tmdb.movies.popular(),
  'Trending':  () => tmdb.trending.trending('movie','day'),
  'New':       () => tmdb.movies.nowPlaying(),
  'Top Rated': () => tmdb.movies.topRated(),
  'For You':   () => tmdb.discover.movie({ with_genres: '18' }),
  'Nearby':    () => tmdb.discover.movie({ region: 'KE' }),
  'All':       () => tmdb.discover.movie(),
}

// create a reactive api instance that uses the current filter
let api = useApi<MovieDiscoverResult>(() => filterToApi[activeFilter.value]())

// refetch when filter changes
watch(activeFilter, () => {
  // re-bind api to use the new filter
  api = useApi<MovieDiscoverResult>(() => filterToApi[activeFilter.value]())
  api.execute()
})

// initial fetch
onMounted(() => {
  api.execute()
})
</script>

<template>
  <div id="app">
    <!-- <Header /> -->
    <div class="container">
      <SearchBar v-model="searchQuery" @search="handleSearch" />
      <FilterSection
        :filters="filters"
        :active-filter="activeFilter"
        @filter-change="setActiveFilter"
      />
      <RecommendationList
        :recommendations="api.data.value?.results"
        @touch-start="handleTouchStart"
        @touch-end="handleTouchEnd"
      />
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
  background-color: #f8f9fa;
  color: #333;
  line-height: 1.6;
}

#app {
  max-width: 100%;
  overflow-x: hidden;
  padding-bottom: 80px;
}

.container {
  max-width: 100%;
  padding: 0 15px;
  margin: 0 auto;
}

@media (min-width: 576px) {
  .container {
    max-width: 540px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 720px;
  }
}

@media (min-width: 992px) {
  .container {
    max-width: 960px;
  }
}
</style>
