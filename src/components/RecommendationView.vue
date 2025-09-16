<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import FilterSection from './recommendation/FilterSection.vue'
import RecommendationList from './recommendation/RecommendationList.vue'
import { useApi } from '../composables/useApi'
import tmdb from '../lib/tmdb-auth'
import { MovieDiscoverResult } from '@tdanks2000/tmdb-wrapper'

// State
const activeFilter = ref('All')
const touchedCard = ref<number | null>(null)
// const loading = ref(true)

const filters = ref(['All', 'Popular', 'Trending', 'New', 'Top Rated', 'For You', 'Nearby'])
const location = ref<any>(null)
// Methods
function setActiveFilter(filter: string) {
  activeFilter.value = filter
}

function handleTouchStart(index: number) {
  touchedCard.value = index
}

function handleTouchEnd(index: number) {
  if (touchedCard.value === index) {
    touchedCard.value = null
  }
}

// map filters to API calls
const filterToApi: Record<string, () => Promise<MovieDiscoverResult>> = {
  Popular: () => tmdb.movies.popular(),
  Trending: () => tmdb.trending.trending('movie', 'day'),
  New: () => tmdb.movies.nowPlaying(),
  'Top Rated': () => tmdb.movies.topRated(),
  'For You': () => tmdb.discover.movie({ with_genres: '18' }),
  Nearby: () => tmdb.discover.movie({ region: location.value.countryCode }),
  All: () => tmdb.discover.movie(),
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
onMounted(async () => {
  try {
    api.execute()
    const res = await fetch('https://api.db-ip.com/v2/free/self')
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`)

    const data = await res.json()
    location.value = data
    console.log('loci:', data)
  } catch (error) {
    console.error('error:', error)
  }
})

console.log('recom: ', api.data)
</script>

<template>
  <div id="">
    <!-- <Header /> -->
    <div class="container">
      <!-- <SearchBar v-model="searchQuery" @search="handleSearch" /> -->
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
