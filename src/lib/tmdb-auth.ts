// src/lib/tmdbClient.ts
import { TMDB } from '@tdanks2000/tmdb-wrapper'

// Load from environment
const apiKey = import.meta.env.VITE_TMDB_API_KEY
const accessToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN

// Prefer token if available, fallback to apiKey
let tmdb: TMDB
if (accessToken) {
  tmdb = new TMDB(accessToken)
} else if (apiKey) {
  tmdb = new TMDB({ apiKey })
} else {
  throw new Error(
    'Missing TMDB credentials. Please set VITE_TMDB_API_KEY or VITE_TMDB_ACCESS_TOKEN in your .env file.',
  )
}

export default tmdb
