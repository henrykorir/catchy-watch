<script setup lang="ts">
import SettingsOption from './SettingsOption.vue'

// Define option interface for TypeScript
interface Option {
  id: number
  icon: string
  label: string
}

// Define props with TypeScript
const props = defineProps<{
  title?: string
  options: Option[]
}>()

// Define emits
const emit = defineEmits<{
  (e: 'option-clicked', value: string): void
}>()

// Method to handle option click
const handleOptionClick = (option: string) => {
  emit('option-clicked', option)
}
</script>

<template>
  <div class="settings-panel">
    <h2 class="section-title">{{ title || 'Settings' }}</h2>

    <SettingsOption
      v-for="option in options"
      :key="option.id"
      :icon="option.icon"
      :label="option.label"
      @option-clicked="handleOptionClick"
    />
  </div>
</template>

<style scoped>
.settings-panel {
  background-color: #1f1f1f;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}
</style>
