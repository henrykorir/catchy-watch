<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'search'): void
}>()

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="search-bar">
    <input
      type="text"
      placeholder="Search by title or keyword..."
      :value="modelValue"
      @input="onInput"
      @keyup.enter="emit('search')"
    />
    <button class="flex justify-center items-center" @click="emit('search')">
      <i class="fas fa-search"></i>
    </button>
  </div>
</template>

/*
<style scoped>
.search-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  border: 1px solid #ccc;
  background: white;
  transition:
    flex-grow 0.3s ease,
    box-shadow 0.3s ease,
    transform 0.3s ease;
  flex: 1; /* allow flexible growth inside header */
  min-width: 200px; /* avoids collapsing too much */
  max-width: 600px; /* cap for large screens */
  height: 2rem;
}

.search-bar:focus-within {
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  /* flex: 2; /* expand more space in header */
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  transform: scale(1.02);
  z-index: 1000;
}

.search-bar input {
  flex: 1;
  padding: 12px 15px;
  border: none;
  font-size: 1rem;
  outline: none;
  background: transparent;
  color: black;
}

.search-bar button {
  background: #ff6b6b;
  color: white;
  border: none;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 12px 20px;
  cursor: pointer;
  transition: background 0.2s ease;
  height: 2rem;
}

.search-bar button:hover {
  background: #ff4c4c;
}
@media (min-width: 768px) {
  .search-bar:focus-within {
    position: inherit;
    flex: 2;
    width: auto;
  }
}
</style>
