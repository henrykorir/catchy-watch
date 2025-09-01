<template>
  <div class="filter-section">
    <button
      v-for="(filter, index) in filters"
      :key="index"
      :class="['filter-btn', { active: activeFilter === filter }]"
      @click="handleFilterChange(filter)"
    >
      {{ filter }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

// Props
defineProps<{
  filters: string[]
  activeFilter: string
}>()

// Emits
const emit = defineEmits<{
  (e: 'filter-change', filter: string): void
}>()

// Methods
const handleFilterChange = (filter: string) => {
  emit('filter-change', filter)
}
</script>

<style scoped>
.filter-section {
  display: flex;
  overflow-x: auto;
  padding: 10px 0;
  margin-bottom: 15px;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.filter-section::-webkit-scrollbar {
  display: none;
}

.filter-btn {
  background: white;
  border: none;
  padding: 8px 16px;
  margin-right: 10px;
  border-radius: 20px;
  font-size: 0.9rem;
  white-space: nowrap;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-btn.active {
  background: #6e8efb;
  color: white;
}
</style>
