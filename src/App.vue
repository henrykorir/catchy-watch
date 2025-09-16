<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, provide } from 'vue'
import OnBoardingView from './components/OnBoardingView.vue'
import RecommendationView from './components/RecommendationView.vue'
import AccountView from './components/AccountView.vue'
import NotFound from './components/NotFound.vue'
import MovieDetailsView from './components/MovieDetailsView.vue'
import Header from './components/common/Header.vue'
import BottomNavigation from './components/common/BottomNavigation.vue'
import AuthProvider from './components/auth/AuthProvider.vue'
import AuthForm from './components/auth/AuthForm.vue'
import SearchResultsView from './components/SearchResultsView.vue'

/* ---------------- NAVIGATION ---------------- */
interface NavItem {
  name: string
  icon: string
  label: string
  link: string
}

const activeNav = ref('discover')

const inputRef = ref<HTMLInputElement | null>(null)

provide('inputRef', inputRef)

function setActiveNav(nav: string) {
  activeNav.value = nav
}

const navigation = ref<NavItem[]>([
  { name: 'home', icon: 'fas fa-home', label: 'Home', link: '#/recommendation' },
  { name: 'discover', icon: 'fas fa-compass', label: 'Discover', link: '#/recommendation' },
  { name: 'watchlist', icon: 'fas fa-bookmark', label: 'Watchlist', link: '#/account' },
  { name: 'search', icon: 'fas fa-magnifying-glass', label: 'Search', link: '#/account' },
  { name: 'profile', icon: 'fas fa-user', label: 'Profile', link: '#/account' },
])

/* ---------------- ROUTING ---------------- */
const routes: Record<string, any> = {
  '/': OnBoardingView,
  '/recommendation': RecommendationView,
  '/account': AccountView,
  '/auth': AuthForm,
  '/search': SearchResultsView,
}

const currentPath = ref<string>(window.location.hash.slice(1) || '/')

function updatePath() {
  currentPath.value = window.location.hash.slice(1) || '/'
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('hashchange', updatePath)
})

onBeforeUnmount(() => {
  window.removeEventListener('hashchange', updatePath)
})

function resolveRoute(path: string) {
  const [pathname, queryString] = path.split('?')

  if (pathname.startsWith('/movie/')) {
    const id = pathname.split('/')[2]
    return { component: MovieDetailsView, props: { id } }
  }

  if (routes[pathname]) {
    const queryParams = new URLSearchParams(queryString || '')
    return { component: routes[pathname], props: { queryParams } }
  }

  return { component: NotFound, props: {} }
}

const currentView = computed(() => resolveRoute(currentPath.value))
</script>

<template>
  <AuthProvider>
    <div>
      <!-- Show header only if not onboarding or auth -->
      <Header v-if="currentPath !== '/' && currentPath !== '/auth'" />

      <!-- Render main view -->
      <component :is="currentView.component" v-bind="currentView.props" />

      <!-- Show bottom nav only if not onboarding or auth -->
      <BottomNavigation
        v-if="currentPath !== '/' && currentPath !== '/auth'"
        :navigation="navigation"
        :active-nav="activeNav"
        @nav-change="setActiveNav"
      />
    </div>
  </AuthProvider>
</template>
