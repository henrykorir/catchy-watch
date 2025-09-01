<script setup lang="ts"></script>

<template>
  <div class="fixed inset-0 flex items-center justify-center">
    <div class="flex flex-col items-center gap-4 text-center">
      <h1 class="text-4xl font-bold">Vast Movie Library</h1>
      <p class="text-lg">Discover thousands of movies and TV shows</p>
      <a href="#/recommendation" class="btn">Get Started</a>
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
