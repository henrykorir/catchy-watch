<script setup lang="ts">
import { ref, reactive } from 'vue'

import MoviePoster from './movie/MoviePoster.vue'
import MovieInfo from './movie/MovieInfo.vue'
import CastSection from './movie/CastSection.vue'
import SimilarMovies from './movie/SimilarMovies.vue'
// Interfaces
interface Movie {
  id: number
  title: string
  year: number
  rating: number
  runtime: number
  releaseDate: string
  genres: string[]
  tags: string[]
  description: string
  poster: string
}

interface CastMember {
  id: number
  name: string
  character: string
  image: string
}

interface SimilarMovie {
  id: number
  title: string
  year: number
  poster: string
}

// Movie data
const movie = reactive<Movie>({
  id: 1,
  title: 'Inception',
  year: 2010,
  rating: 8.8,
  runtime: 148,
  releaseDate: 'July 16, 2010',
  genres: ['Sci-Fi', 'Action'],
  tags: ['PG-13', 'Mind-bending', 'Heist', 'Dreams'],
  description:
    "Dom Cobb is a skilled thief, the absolute best in the dangerous art of extraction: stealing valuable secrets from deep within the subconscious during the dream state. Cobb's rare ability has made him a coveted player in this treacherous new world of corporate espionage, but it has also made him an international fugitive and cost him everything he has ever loved. Now Cobb is being offered a chance at redemption. One last job could give him his life back but only if he can accomplish the impossible—inception.",
  poster: 'https://image.tmdb.org/t/p/w500/9yBVqNruk6Ykrwc32qrK2TIE5xw.jpg',
})

// Cast data
const cast = ref<CastMember[]>([
  {
    id: 1,
    name: 'Leonardo DiCaprio',
    character: 'Cobb',
    image: 'https://image.tmdb.org/t/p/w200/edBk0bw7YPDwlvgqkRkNPKCxry.jpg',
  },
  {
    id: 2,
    name: 'Joseph Gordon-Levitt',
    character: 'Arthur',
    image: 'https://image.tmdb.org/t/p/w200/3vlnm0SOa8ybCLzAoEUa3a5RzLt.jpg',
  },
  {
    id: 3,
    name: 'Ellen Page',
    character: 'Ariadne',
    image: 'https://image.tmdb.org/t/p/w200/2qSiBmzNMvQsQPr35b5K4XbPbb5.jpg',
  },
  {
    id: 4,
    name: 'Tom Hardy',
    character: 'Eames',
    image: 'https://image.tmdb.org/t/p/w200/zFxx1Kd0LgLvBkQ5WgOJ7sT9hSy.jpg',
  },
  {
    id: 5,
    name: 'Ken Watanabe',
    character: 'Saito',
    image: 'https://image.tmdb.org/t/p/w200/hWiANEGMyay9hNRB2W1gH7NpUUO.jpg',
  },
  {
    id: 6,
    name: 'Cillian Murphy',
    character: 'Robert Fischer',
    image: 'https://image.tmdb.org/t/p/w200/cEJ3y4nhU5xSeQk4O1lVcPRi9j7.jpg',
  },
  {
    id: 7,
    name: 'Tom Berenger',
    character: 'Browning',
    image: 'https://image.tmdb.org/t/p/w200/hWXqy00aOfXp6eYpZJqL5pKNSI.jpg',
  },
  {
    id: 8,
    name: 'Dileep Rao',
    character: 'Yusuf',
    image: 'https://image.tmdb.org/t/p/w200/3vlnm0SOa8ybCLzAoEUa3a5RzLt.jpg',
  },
])

// Similar movies data
const similarMovies = ref<SimilarMovie[]>([
  {
    id: 2,
    title: 'Interstellar',
    year: 2014,
    poster: 'https://image.tmdb.org/t/p/w300/8IB2e4r4oVhHnANbnm7O3Tj6tF8.jpg',
  },
  {
    id: 3,
    title: 'The Matrix',
    year: 1999,
    poster: 'https://image.tmdb.org/t/p/w300/7sFErsI9x5cZ0xz0aRqaLqFkHrT.jpg',
  },
  {
    id: 4,
    title: 'Tenet',
    year: 2020,
    poster: 'https://image.tmdb.org/t/p/w300/aOIuZAjPaRIE6CMzbazvcHuHXDc.jpg',
  },
  {
    id: 5,
    title: 'Shutter Island',
    year: 2010,
    poster: 'https://image.tmdb.org/t/p/w300/g6pIozCBNM6dh2lpcSCcEExwQh0.jpg',
  },
])

// Function to load a different movie (simplified for demo)
const loadMovie = (movieId: number): void => {
  alert(`Loading movie with ID: ${movieId} (this would fetch real data in a real app)`)
}
</script>

<template>
  <div class="container">
    <main>
      <div class="movie-content">
        <MoviePoster :posterUrl="movie.poster" :title="movie.title" />
        <MovieInfo :movie="movie" />
      </div>

      <CastSection :cast="cast" />

      <SimilarMovies :movies="similarMovies" @movie-changed="loadMovie" />
    </main>
  </div>
</template>

<style scoped>
/* 🎨 Your existing styles preserved */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.logo {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary);
  display: flex;
  align-items: center;
}

.logo i {
  margin-right: 0.5rem;
}

.search-bar {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  padding: 0.5rem 1rem;
  width: 300px;
}

.search-bar input {
  background: transparent;
  border: none;
  color: var(--light);
  padding: 0.5rem;
  width: 100%;
  outline: none;
}

.search-bar i {
  color: var(--gray);
}

.movie-content {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
}

.poster-container {
  flex: 0 0 300px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease;
}

.poster-container:hover {
  transform: scale(1.03);
}

.poster {
  width: 100%;
  height: auto;
  display: block;
}

.movie-info {
  flex: 1;
}

.title {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.year {
  color: var(--gray);
  font-weight: 400;
  margin-left: 0.75rem;
}

.rating {
  background: var(--primary);
  color: white;
  font-weight: bold;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  margin-left: 1rem;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
}

.rating i {
  margin-right: 0.25rem;
  font-size: 0.8rem;
}

.details {
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
  color: var(--gray);
  font-size: 0.9rem;
}

.detail-item {
  display: flex;
  align-items: center;
}

.detail-item i {
  margin-right: 0.25rem;
}

.tags {
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0;
  flex-wrap: wrap;
}

.tag {
  background: rgba(255, 255, 255, 0.1);
  padding: 0.35rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
}

.description {
  line-height: 1.6;
  margin: 1.5rem 0;
  max-width: 800px;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  margin: 2rem 0;
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background: var(--primary);
  color: white;
  border: none;
}

.btn-primary:hover {
  background: #ff0a16;
  transform: translateY(-2px);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: var(--light);
  border: none;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.btn i {
  margin-right: 0.5rem;
}

.cast-section {
  margin: 3rem 0;
}

.section-title {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
}

.section-title i {
  margin-right: 0.5rem;
  color: var(--primary);
}

.cast-scroll {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding: 0.5rem 0;
  scrollbar-width: thin;
}

.cast-scroll::-webkit-scrollbar {
  height: 8px;
}

.cast-scroll::-webkit-scrollbar-thumb {
  background: var(--primary);
  border-radius: 8px;
}

.cast-member {
  flex: 0 0 150px;
  text-align: center;
}

.cast-img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 0.5rem;
  border: 2px solid transparent;
  transition: border 0.3s ease;
}

.cast-member:hover .cast-img {
  border: 2px solid var(--primary);
}

.cast-name {
  font-weight: 600;
  font-size: 0.9rem;
}

.cast-character {
  font-size: 0.8rem;
  color: var(--gray);
}

.similar-movies {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.movie-card {
  background: var(--card-bg);
  border-radius: 8px;
  overflow: hidden;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  cursor: pointer;
}

.movie-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
}

.movie-card img {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.movie-card-content {
  padding: 1rem;
}

.movie-card-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.movie-card-year {
  color: var(--gray);
  font-size: 0.9rem;
}

footer {
  text-align: center;
  margin-top: 4rem;
  padding: 2rem;
  color: var(--gray);
  font-size: 0.9rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

@media (max-width: 900px) {
  .movie-content {
    flex-direction: column;
  }

  .poster-container {
    align-self: center;
    max-width: 300px;
  }
}

@media (max-width: 600px) {
  header {
    flex-direction: column;
    gap: 1rem;
  }

  .search-bar {
    width: 100%;
  }

  .title {
    font-size: 2rem;
  }

  .action-buttons {
    flex-direction: column;
  }
}
</style>
