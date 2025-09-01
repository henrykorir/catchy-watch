<script setup lang="ts">
import { ref, computed } from 'vue'
import OnBoardingView from './components/OnBoardingView.vue'
import RecommendationView from './components/RecommendationView.vue'
import AccountView from './components/AccountView.vue'
import NotFound from './components/NotFound.vue'
import MovieDetailsView from './components/MovieDetailsView.vue'

// Static routes
const routes: Record<string, any> = {
  '/': OnBoardingView,
  '/recommendation': RecommendationView,
  '/account': AccountView,
}

const currentPath = ref<string>(window.location.hash.slice(1) || '/')

// Watch hash changes
window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash.slice(1) || '/'
})

// Match route (supports dynamic `/movie/:id`)
const currentView = computed(() => {
  // Dynamic route check
  if (currentPath.value.startsWith('/movie/')) {
    const id = currentPath.value.split('/')[2]
    return { component: MovieDetailsView, props: { id } }
  }

  // Static route
  if (routes[currentPath.value]) {
    return { component: routes[currentPath.value], props: {} }
  }

  // Fallback
  return { component: NotFound, props: {} }
})
</script>

<template>
  <component :is="currentView.component" v-bind="currentView.props" />
</template>
