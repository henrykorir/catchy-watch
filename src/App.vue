<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
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

function setActiveNav(nav: string) {
  activeNav.value = nav
}

const navigation = ref<NavItem[]>([
  { name: 'home', icon: 'fas fa-home', label: 'Home', link: '#/recommendation' },
  { name: 'favorite', icon: 'fas fa-list', label: 'Discover', link: '#/account' },
  { name: 'saved', icon: 'fas fa-heart', label: 'Saved', link: '#/account' },
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
  window.scrollTo({ top: 0, behavior: 'smooth' }) // scroll to top on route change
}

onMounted(() => {
  window.addEventListener('hashchange', updatePath)
})

onBeforeUnmount(() => {
  window.removeEventListener('hashchange', updatePath)
})

function resolveRoute(path: string) {
  // Separate query string
  const [pathname, queryString] = path.split('?')

  // Dynamic route check: /movie/:id
  if (pathname.startsWith('/movie/')) {
    const id = pathname.split('/')[2]
    return { component: MovieDetailsView, props: { id } }
  }

  // Static route: /search, /account, etc.
  if (routes[pathname]) {
    // Pass query params down as props
    const queryParams = new URLSearchParams(queryString || '')
    return { component: routes[pathname], props: { queryParams } }
  }

  // Fallback
  return { component: NotFound, props: {} }
}

const currentView = computed(() => resolveRoute(currentPath.value))
</script>

<template>
  <AuthProvider>
    <div>
      <Header v-if="currentPath !== '/'" />

      <component :is="currentView.component" v-bind="currentView.props" />

      <BottomNavigation
        v-if="currentPath !== '/'"
        :navigation="navigation"
        :active-nav="activeNav"
        @nav-change="setActiveNav"
      />
    </div>
  </AuthProvider>
</template>
