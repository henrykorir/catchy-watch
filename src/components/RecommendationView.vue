<script setup lang="ts">
import { ref, onMounted, watchEffect, onUnmounted } from 'vue'
import FilterSection from './recommendation/FilterSection.vue'
import RecommendationList from './recommendation/RecommendationList.vue'
import PaginationBar from './common/PaginationBar.vue'

import { useApi } from '../composables/useApi'
import tmdb from '../lib/tmdb-auth'
import { MovieDiscoverResult, PageOption } from '@tdanks2000/tmdb-wrapper'

// ----------------------
// Interfaces
// ----------------------
interface LocationData {
  countryCode?: string
  countryName?: string
  stateProv?: string
  city?: string
  ipAddress?: string
}

// ----------------------
// Constants
// ----------------------
const FILTERS = ['All', 'Popular', 'Trending', 'New', 'Top Rated', 'For You', 'Nearby']

// ----------------------
// State
// ----------------------
const activeFilter = ref<string>('All')
const touchedCard = ref<number | null>(null)
const currentPage = ref<number>(1)
const location = ref<LocationData | null>(null)
const locationError = ref<string | null>(null)

// ----------------------
// Handlers
// ----------------------
const setActiveFilter = (filter: string) => {
  activeFilter.value = filter
  currentPage.value = 1 // reset to first page on filter change
}

const handleTouchStart = (index: number) => {
  touchedCard.value = index
}

const handleTouchEnd = (index: number) => {
  if (touchedCard.value === index) touchedCard.value = null
}

const handlePageChange = (pageNumber: number) => {
  currentPage.value = pageNumber
}

// ----------------------
// API Mapping (reactive to location)
// ----------------------
const filterToApi: Record<string, (options?: PageOption) => Promise<MovieDiscoverResult>> = {
  All: (options) => tmdb.discover.movie(options),
  Popular: (options) => tmdb.movies.popular(options),
  Trending: (options) => tmdb.trending.trending('movie', 'day', options),
  New: (options) => tmdb.movies.nowPlaying(options),
  'Top Rated': (options) => tmdb.movies.topRated(options),
  'For You': (options) => tmdb.discover.movie({ ...options, with_genres: '18' }),
  Nearby: (options) => {
    const region = location.value?.countryCode || 'US' // Fallback to US if location not available
    return tmdb.discover.movie({ ...options, region })
  },
}

// ----------------------
// API Hook
// ----------------------
const api = useApi<MovieDiscoverResult>(() => {
  return filterToApi[activeFilter.value]({ page: currentPage.value })
})

// ----------------------
// Lifecycle & Watchers
// ----------------------
const stopWatch = watchEffect(() => {
  if (activeFilter.value && currentPage.value) {
    api.execute()
  }
})

onMounted(async () => {
  try {
    const res = await fetch('https://api.db-ip.com/v2/free/self')
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`)

    location.value = await res.json()
    console.log('Location:', location.value)

    if (activeFilter.value === 'Nearby') {
      api.execute()
    }
  } catch (err) {
    console.error('Failed to fetch location:', err)
    locationError.value = 'Could not determine your location. Using default region.'
    location.value = { countryCode: 'US' }
  }
})

onUnmounted(() => {
  stopWatch()
})
</script>

<template>
  <div class="container">
    <FilterSection
      :filters="FILTERS"
      :active-filter="activeFilter"
      @filter-change="setActiveFilter"
    />

    <div v-if="locationError" class="location-warning">⚠️ {{ locationError }}</div>

    <RecommendationList
      :recommendations="api.data.value?.results"
      :loading="api.loading?.value || false"
      :error="api.error?.value || null"
      @touch-start="handleTouchStart"
      @touch-end="handleTouchEnd"
    />

    <PaginationBar
      :current-page="currentPage"
      :total-pages="api.data.value?.total_pages || 1"
      @select-page="handlePageChange"
    />

    <div v-if="api.loading?.value" class="loading-overlay">Loading...</div>
  </div>
</template>

<style scoped>
.location-warning {
  background-color: #fff3cd;
  border: 1px solid #ffeaa7;
  color: #856404;
  padding: 8px 12px;
  border-radius: 4px;
  margin: 10px 0;
  font-size: 14px;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
</style>
