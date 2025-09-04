<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import SearchBar from './common/SearchBar.vue'
import FilterSection from './recommendation/FilterSection.vue'
import RecommendationList from './recommendation/RecommendationList.vue'
import { useApi } from '../composables/useApi'
import tmdb from '../lib/tmdb-auth'
import { PopularMovies } from '@tdanks2000/tmdb-wrapper'
import { movieStore } from '../store/movie'

// State
const searchQuery = ref('')
const activeFilter = ref('All')
const touchedCard = ref<number | null>(null)
// const loading = ref(true)

const filters = ref(['All', 'Popular', 'Trending', 'New', 'Top Rated', 'For You', 'Nearby'])

// const recommendations = ref([
//   {
//     id: 1,
//     title: 'Italian Restaurant',
//     description: 'Authentic Italian cuisine with a modern twist. Perfect for date night!',
//     rating: 4.8,
//     price: '$$',
//     image:
//       'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&h=400&q=80',
//     tags: ['food', 'popular'],
//   },
//   {
//     id: 2,
//     title: 'Yoga Studio',
//     description: 'Find your inner peace with our beginner-friendly yoga classes.',
//     rating: 4.9,
//     price: '$$',
//     image:
//       'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&h=400&q=80',
//     tags: ['wellness', 'trending'],
//   },
//   {
//     id: 3,
//     title: 'Fitness Center',
//     description: 'State-of-the-art equipment and personalized training programs.',
//     rating: 4.7,
//     price: '$$$',
//     image:
//       'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&h=400&q=80',
//     tags: ['fitness', 'popular'],
//   },
//   {
//     id: 4,
//     title: 'Bookstore Cafe',
//     description: 'Curated selection of books with artisanal coffee and pastries.',
//     rating: 4.8,
//     price: '$',
//     image:
//       'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=600&h=400&q=80',
//     tags: ['cafe', 'new'],
//   },
//   {
//     id: 5,
//     title: 'Indie Cinema',
//     description: 'Independent films and documentaries with comfortable seating.',
//     rating: 4.6,
//     price: '$$',
//     image:
//       'https://images.unsplash.com/photo-1573855619003-97b4799dcd8b?auto=format&fit=crop&w=600&h=400&q=80',
//     tags: ['entertainment', 'top rated'],
//   },
//   {
//     id: 6,
//     title: 'Mountain Getaway',
//     description: 'Weekend retreat in the mountains with breathtaking views.',
//     rating: 4.9,
//     price: '$$$$',
//     image:
//       'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=600&h=400&q=80',
//     tags: ['travel', 'for you'],
//   },
// ])

// Computed
// const filteredRecommendations = computed(() => {
//   if (activeFilter.value === 'All') {
//     return recommendations.value
//   }

//   return recommendations.value.filter((item) =>
//     item.tags.some(
//       (tag) => tag.toLowerCase() === activeFilter.value.toLowerCase().replace(' ', ''),
//     ),
//   )
// })

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

const { data, execute } = useApi<PopularMovies>(async () => {
  if (!movieStore.loaded) {
    return await tmdb.movies.popular()
  }
  // If already loaded, return the cached data
  return { results: movieStore.movies } as PopularMovies
})

onMounted(execute)

// Watch the API data and update the global store
watch(data, (val) => {
  if (val && !movieStore.loaded) {
    movieStore.movies = val.results
    movieStore.loaded = true
    console.log(movieStore.movies)
  }
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
        :recommendations="movieStore.movies"
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
