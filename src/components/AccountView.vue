<script setup lang="ts">
import TopNav from './account/TopNav.vue'
import WatchlistSection from './account/WatchlistSection.vue'
import SettingsPanel from './account/SettingsPanel.vue'
import NotificationsPanel from './account/NotificationsPanel.vue'
import { ref } from 'vue'

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

const watchlistMovies = ref([
  {
    id: 1,
    title: 'Inception',
    year: 2010,
    rating: 8.8,
    poster: 'https://image.tmdb.org/t/p/w500/9yBVqNruk6Ykrwc32qrK2TIE5xw.jpg',
  },
  {
    id: 2,
    title: 'The Dark Knight',
    year: 2008,
    rating: 9.0,
    poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
  },
  {
    id: 3,
    title: 'Interstellar',
    year: 2014,
    rating: 8.6,
    poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
  },
  {
    id: 4,
    title: 'Pulp Fiction',
    year: 1994,
    rating: 8.9,
    poster: 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
  },
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

// Methods
const handleAvatarClick = () => {
  alert('Avatar clicked! This would open a profile page.')
}

const handleNavItemClick = (item: string) => {
  activeNavItem.value = item
}

const handleViewAllWatchlist = () => {
  alert('View all watchlist clicked!')
}

const handleMovieSelect = (movieId: number) => {
  alert(`Movie selected with ID: ${movieId}`)
}

const handleSettingsOptionClick = (option: string) => {
  alert(`Settings option clicked: ${option}`)
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
        :movies="watchlistMovies"
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
  grid-template-columns: 1fr 300px;
  gap: 2rem;
}

@media (max-width: 900px) {
  .content-section {
    grid-template-columns: 1fr;
  }
}
</style>
