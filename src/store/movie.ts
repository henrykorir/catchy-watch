import { reactive } from 'vue'
import type { Movie } from '@tdanks2000/tmdb-wrapper'

export const movieStore = reactive({
  movies: [] as Movie[],
  loaded: false,
})
