<script setup lang="ts">
import { ref, computed, watch, inject } from 'vue'
import type { AppendToResponse, MovieDetails } from '@tdanks2000/tmdb-wrapper'
import dayjs from 'dayjs'
import { AuthContext } from '../../types/auth'

interface MovieKeyword {
  id: number
  name: string
}
const auth = inject<AuthContext>('auth')

// Props
const props = defineProps<{
  movie?: AppendToResponse<MovieDetails, ['keywords', 'credits', 'videos'], 'movie'>
  tags?: MovieKeyword[]
}>()

// Emits
const emit = defineEmits<{
  (e: 'play-trailer', movie: MovieDetails): void
  (e: 'toggle-watchlist', id: number): void
  (e: 'share', movie: MovieDetails): void
}>()

// Reactive state
const movie = ref<AppendToResponse<
  MovieDetails,
  ['keywords', 'credits', 'videos'],
  'movie'
> | null>()

const movieTags = ref<MovieKeyword[]>([])
const inWatchlist = ref<boolean>(false)
const showPopup = ref<boolean>(false)

// Watch props for changes and safely update refs
watch(
  () => props.movie,
  (newMovie) => {
    if (newMovie) movie.value = newMovie
  },
  { immediate: true },
)

watch(
  () => props.tags,
  (newTags) => {
    movieTags.value = newTags ?? []
  },
  { immediate: true },
)

// Methods (safe emits)
const playTrailer = () => {
  if (!movie.value || movie.value.id === 0) return
  emit('play-trailer', movie.value)
}

const toggleWatchlist = () => {
  if (!movie.value || movie.value.id === 0) return

  const isLoggedIn = auth?.user.value !== null
  const hasValidGuestSession =
    !!auth?.guestSessionId && dayjs(auth.guestSessionExpiry).isAfter(dayjs())

  if (isLoggedIn || hasValidGuestSession) {
    inWatchlist.value = !inWatchlist.value
    emit('toggle-watchlist', movie.value.id)
  } else {
    showPopup.value = true
    setTimeout(() => (showPopup.value = false), 4000) // auto-hide after 3s
  }
}

const shareMovie = () => {
  if (!movie.value || movie.value.id === 0) return
  emit('share', movie.value)
}

// Computed
const watchlistIcon = computed(() => (inWatchlist.value ? 'fas fa-check' : 'fas fa-plus'))
const watchlistText = computed(() =>
  inWatchlist.value ? 'Added to Watchlist' : 'Add to Watchlist',
)
const releaseYear = computed(() => movie.value?.release_date?.split('-')[0] ?? 'N/A')
const genres = computed(() => movie.value?.genres.map((g) => g.name).join(', ') || 'N/A')

console.log('movie-detail: ', movie.value)
</script>

<template>
  <div class="movie-info">
    <h1 class="title">
      {{ movie?.title }}
      <span class="year">({{ releaseYear }})</span>
      <span class="rating"><i class="fas fa-star"></i> {{ movie?.vote_average.toFixed(1) }}</span>
    </h1>

    <div class="details">
      <div class="detail-item"><i class="far fa-clock"></i> {{ movie?.runtime }} min</div>
      <div class="detail-item">
        <i class="far fa-calendar-alt"></i>
        {{
          dayjs(movie?.release_date)
            .format('DD MMMM, YYYY')
            .toLowerCase()
            .replace(/\b\w/g, (char) => char.toUpperCase())
        }}
      </div>
      <div class="detail-item"><i class="fas fa-ticket-alt"></i> {{ genres }}</div>
    </div>

    <div class="tags">
      <span v-for="tag in movieTags" :key="tag.id" class="tag">{{ tag.name }}</span>
    </div>

    <p class="description">{{ movie?.overview || 'No description available.' }}</p>

    <div class="action-buttons">
      <button
        v-if="(movie?.videos.results || []).length > 0"
        class="btn btn-primary"
        @click="playTrailer"
      >
        <i class="fas fa-play"></i> Watch Trailer
      </button>
      <div>
        <div class="popup">
          <button class="btn btn-secondary" @click="toggleWatchlist">
            <i :class="watchlistIcon"></i> {{ watchlistText }}
          </button>
          <span
            id="myPopup"
            role="tooltip"
            aria-live="polite"
            :class="['popuptext', { show: showPopup }]"
          >
            <a href="#/auth" class="text-blue-400">Login</a> to add watchlist
          </span>
        </div>
      </div>
      <button class="btn btn-secondary" @click="shareMovie">
        <i class="fas fa-share-alt"></i> Share
      </button>
    </div>
  </div>
</template>

<style scoped>
.movie-info {
  padding: 1rem;
}
.title {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}
.details {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.5rem;
}
.detail-item {
  font-size: 0.9rem;
}
.tags {
  margin: 0.5rem 0;
}
.tag {
  background: #eee;
  padding: 0.2rem 0.6rem;
  border-radius: 0.5rem;
  margin-right: 0.4rem;
  font-size: 0.8rem;
}
.description {
  margin: 1rem 0;
}
.action-buttons {
  display: flex;
  gap: 0.5rem;
}
.btn {
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
  border-radius: 0.25rem;
}
.btn-primary {
  background: #007bff;
  color: white;
}
.btn-secondary {
  background: #6c757d;
  color: white;
}
.popup {
  position: relative;
  display: inline-block;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* The actual popup */
.popup .popuptext {
  visibility: hidden;
  width: 100%;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 8px 2px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -80px;
}
.popup .popuptext a {
  color: rgb(0, 132, 255);
}
/* Popup arrow */
.popup .popuptext::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

/* Toggle this class - hide and show the popup */
.popup .show {
  visibility: visible;
  -webkit-animation: fadeIn 1s;
  animation: fadeIn 1s;
}

/* Add animation (fade in the popup) */
@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
