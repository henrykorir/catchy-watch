<script setup lang="ts">
import TopNav from './account/TopNav.vue'
import WatchlistSection from './account/WatchlistSection.vue'
import SettingsPanel from './account/SettingsPanel.vue'
import NotificationsPanel from './account/NotificationsPanel.vue'
import { inject, onMounted, ref, watch } from 'vue'
import { supabase } from '../lib/supabase-auth'

import { AuthContext } from '../types/auth'
import { MovieDetails } from '@tdanks2000/tmdb-wrapper'
const auth = inject<AuthContext>('auth')
// Reactive data
const activeNavItem = ref('watchlist')
const user = ref({
  avatarUrl:
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
  name: 'Alex Johnson',
  status: 'Premium Member',
})

const navItems = ref([
  { id: 'watchlist', icon: 'fas fa-clipboard-list', label: 'Watchlist', badgeCount: 0 },
  { id: 'settings', icon: 'fas fa-cog', label: 'Settings', badgeCount: 0 },
  { id: 'notifications', icon: 'fas fa-bell', label: 'Notifications', badgeCount: 3 },
])


const settingsOptions = ref([
  { id: 1, icon: 'fas fa-user', label: 'Account Settings' },
  { id: 2, icon: 'fas fa-moon', label: 'Appearance' },
  { id: 3, icon: 'fas fa-bell', label: 'Notifications' },
  { id: 4, icon: 'fas fa-lock', label: 'Privacy & Security' },
  { id: 5, icon: 'fas fa-language', label: 'Language' },
  { id: 6, icon: 'fas fa-play-circle', label: 'Playback Settings' },
  { id: 7, icon: 'fas fa-question-circle', label: 'Help & Support' },
  { id: 8, icon: 'fas fa-sign-out-alt', label: 'Logout' },
])

const notifications = ref([
  {
    id: 1,
    message: 'New episode of your favorite series is available',
    time: '2 hours ago',
    read: false,
  },
  { id: 2, message: 'Your watchlist movie is now streaming', time: '1 day ago', read: false },
  { id: 3, message: 'Weekly recommendations are ready', time: '2 days ago', read: true },
])

const watchlist = ref<{ id: string; user_id: string; movie_id: number; added_at: string }[]>([])
const movies = ref<MovieDetails[]>([])

onMounted(async () => {
  const uid = auth?.user.value?.id
  if (!uid) {
    console.warn('No authenticated user found')
    return
  }

  // 1. Get watchlist rows
  const { data, error } = await supabase.from('watchlist').select('*').eq('user_id', uid)

  if (error) {
    console.error('Error fetching watchlist:', error.message)
    return
  }

  watchlist.value = data ?? []

  // 2. Extract movie_ids
  const movieIds = watchlist.value.map((item) => item.movie_id)

  // 3. Fetch movie details in parallel
  const apiKey = import.meta.env.VITE_TMDB_API_KEY
  const requests = movieIds.map((id) =>
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`).then((res) => res.json()),
  )

  movies.value = await Promise.all(requests)

  console.log('Watchlist movies:', movies.value)
})
watch(
  () => auth?.user.value,
  (newUser) => {
    if (!newUser) window.location.hash = '#/recommendation'
  },
  { immediate: true },
)

// Methods
const handleAvatarClick = () => {
  alert('Avatar clicked! This would open a profile page.')
}

const handleNavItemClick = (item: string) => {
  activeNavItem.value = item
}

const handleViewAllWatchlist = () => {
  // alert('View all watchlist clicked!')
}

const handleMovieSelect = (movieId: number) => {
  window.location.hash = '#/movie/' + `${movieId}`
}

const handleSettingsOptionClick = async (option: string) => {
  // alert(`Settings option clicked: ${option}`)
  if (option === 'Logout') auth?.handleAuth('signout')
}

const handleNotificationClick = (notificationId: number) => {
  alert(`Notification clicked with ID: ${notificationId}`)
}
</script>

<template>
  <div class="container">
    <TopNav
      :user="user"
      :nav-items="navItems"
      :active-item="activeNavItem"
      @avatar-clicked="handleAvatarClick"
      @nav-item-clicked="handleNavItemClick"
    />

    <div class="content-section">
      <WatchlistSection
        v-if="activeNavItem === 'watchlist'"
        :movies="movies"
        @view-all="handleViewAllWatchlist"
        @movie-selected="handleMovieSelect"
      />

      <SettingsPanel
        v-if="activeNavItem === 'settings'"
        :options="settingsOptions"
        @option-clicked="handleSettingsOptionClick"
      />

      <NotificationsPanel
        v-if="activeNavItem === 'notifications'"
        :notifications="notifications"
        @notification-clicked="handleNotificationClick"
      />
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.content-section {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (max-width: 900px) {
  .content-section {
    grid-template-columns: 1fr;
  }
}
</style>
