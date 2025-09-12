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
  <header>
    <div class="container">
      <div class="header-content">
        <div class="logo">CatchyWatch</div>
        <SearchBar v-model="searchQuery" @search="handleSearch" />
        <div class="user-actions">
          <i class="fas fa-bell cursor-pointer"></i>
        </div>
      </div>
    </div>
  </header>
</template>
<style scoped>
header {
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  color: white;
  padding: 10px 0;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.logo,
.user-actions {
  flex: 0 0 auto;
}

.search-bar {
  flex: 1 1 auto;
  min-width: 0; /* ensures it shrinks on small screens */
}
</style>
