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
watch(auth.user.value, (user) => {
  if (user.role === 'authenticated') {
    window.location.hash = '#/recommendation'
  }
})
</script>

<template>
  <div
    class="bg-[url('/catchywatch-hero-banner.webp')] bg-cover bg-center bg-no-repeat h-128 w-full"
  >
    <div
      class="text-white flex items-center justify-between bg-gradient-to-tr from-[#6e8efb] to-[#a777e3] py-[15px]"
      :style="{ /* background: 'linear-gradient(135deg, #6e8efb, #a777e3)',*/ padding: '15px 0' }"
    >
      <span>CatchyWatch</span>
      <div class="flex z-100">
        <SearchBarWrapper />
      </div>
      <span><i class="fa-solid fa-bars"></i></span>
    </div>
    <div class="fixed inset-0 flex items-center justify-center">
      <div class="flex flex-col items-center gap-4 text-center text-white">
        <h1 class="text-4xl font-bold">Vast Movie Library</h1>
        <p class="text-lg">Discover thousands of movies and TV shows</p>
        <a href="#/recommendation" class="btn">Get Started</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
