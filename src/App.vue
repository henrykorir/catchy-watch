<script setup lang="ts">
import { ref } from 'vue';
import OnBoardingView from './components/OnBoardingView.vue';
import HomeView from './components/HomeView.vue';
import RecommendationView from './components/RecommendationView.vue';
import AccountView from './components/AccountView.vue';
import NotFound from './components/NotFound.vue';

const currentPath = ref<string>(window.location.hash.slice(1) || '/')

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash.slice(1) || '/'
})
</script>

<template>
  <OnBoardingView v-if="currentPath === '/'" />
  <RecommendationView v-else-if="currentPath === '/recommendation'" />
  <AccountView v-else-if="currentPath === '/account'" />
  <HomeView v-else-if="currentPath === '/home'" />
  <NotFound v-else />
</template>
