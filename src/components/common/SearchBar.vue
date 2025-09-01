<template>
  <div class="search-bar">
    <input
      type="text"
      placeholder="Search for recommendations..."
      :value="modelValue"
      @input="onInput"
    />
    <button @click="emit('search')">
      <i class="fas fa-search"></i>
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

// Props
defineProps<{
  modelValue: string
}>()

// Emits
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'search'): void
}>()

// Handlers
const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<style scoped>
.search-bar {
  display: flex;
  margin: 15px 0;
}

.search-bar input {
  flex: 1;
  padding: 12px 15px;
  border: none;
  border-radius: 25px 0 0 25px;
  font-size: 1rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.search-bar button {
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 0 25px 25px 0;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
</style>
