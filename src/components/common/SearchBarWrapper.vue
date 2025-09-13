<script setup lang="ts">
import { ref } from 'vue'
import SearchBar from './SearchBar.vue'

const searchQuery = ref<string>('')

const handleSearch = () => {
  window.location.hash = '#/search?query=' + searchQuery.value
  searchQuery.value = ''
}
</script>
<template>
  <SearchBar v-model="searchQuery" @search="handleSearch" />
</template>
