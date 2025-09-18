<script setup lang="ts">
import { inject, onMounted, watch } from 'vue'
import { AuthContext } from '../types/auth'
import SearchBarWrapper from './common/SearchBarWrapper.vue'

const auth = inject<AuthContext>('auth')

if (!auth) throw new Error('Auth context not found')

// Redirect if user is already logged in on mount
onMounted(() => {
  if (auth.user?.value) {
    window.location.hash = '#/recommendation'
  }
})

// Watch for user changes (login success) and redirect automatically
watch(auth.user, (newUser) => {
  if (newUser && newUser.role === 'authenticated') {
    window.location.hash = '#/recommendation'
  }
})
</script>
<template>
  <div class="hero-container">
    <div class="navbar">
      <div class="logo">CatchyWatch</div>
      <div class="search-container">
        <SearchBarWrapper />
      </div>
      <div class="menu-icon">
        <i class="fas fa-bars"></i>
      </div>
    </div>

    <div class="hero-content">
      <h1 class="hero-title">Vast Movie Library</h1>
      <p class="hero-subtitle">Discover thousands of movies and TV shows from around the world</p>
      <a href="#/recommendation" class="btn">Get Started</a>
    </div>
  </div>

  <div class="features">
    <h2 class="section-title">Why Choose CatchyWatch?</h2>
    <div class="features-grid">
      <div class="feature-card">
        <div class="feature-icon">
          <i class="fas fa-film"></i>
        </div>
        <h3 class="feature-title">Extensive Collection</h3>
        <p class="feature-desc">
          Access over 50,000 movies and TV shows from every genre imaginable.
        </p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">
          <i class="fas fa-tv"></i>
        </div>
        <h3 class="feature-title">4K Streaming</h3>
        <p class="feature-desc">
          Enjoy content in stunning 4K resolution with immersive audio quality.
        </p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">
          <i class="fas fa-user-circle"></i>
        </div>
        <h3 class="feature-title">Personalized Recommendations</h3>
        <p class="feature-desc">Get suggestions based on your viewing preferences and history.</p>
      </div>
    </div>
  </div>
</template>
<style scoped>
.hero-container {
  background:
    linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1850&q=80');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #0f172a;
  color: white;
  min-height: 100vh;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  padding: 15px 5%;
  position: sticky;
  top: 0;
  z-index: 100;
}

.logo {
  font-size: 1.8rem;
  font-weight: bold;
  letter-spacing: 1px;
}

.search-container {
  flex: 0 1 500px;
  margin: 0 20px;
}

.search-input {
  width: 100%;
  padding: 10px 15px;
  border-radius: 25px;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  backdrop-filter: blur(10px);
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.menu-icon {
  font-size: 1.5rem;
  cursor: pointer;
}

.hero-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 20px;
  background: linear-gradient(45deg, #6e8efb, #a777e3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 40px;
  max-width: 600px;
  opacity: 0.9;
}

.btn {
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  color: white;
  padding: 15px 40px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(110, 142, 251, 0.4);
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(110, 142, 251, 0.6);
}

.features {
  padding: 80px 5%;
  text-align: center;
}

.section-title {
  font-size: 2.5rem;
  margin-bottom: 50px;
  color: #a777e3;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 30px;
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-10px);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 20px;
  color: #6e8efb;
}

.feature-title {
  font-size: 1.5rem;
  margin-bottom: 15px;
}

.feature-desc {
  opacity: 0.8;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .navbar {
    padding: 15px;
  }

  .logo {
    font-size: 1.5rem;
  }

  .search-container {
    flex: 1;
    margin: 0 10px;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }
}
</style>
