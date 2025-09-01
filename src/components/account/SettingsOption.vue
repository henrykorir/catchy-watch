<script setup lang="ts">
const props = defineProps<{
  icon: string
  label: string
}>()

const emit = defineEmits<{
  (e: 'option-clicked', value: string): void
}>()

function handleClick() {
  emit('option-clicked', props.label)
}
</script>

<template>
  <div class="settings-option" @click="handleClick">
    <i :class="props.icon"></i>
    <span>{{ props.label }}</span>
  </div>
</template>

<style scoped>
.settings-option {
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 0.75rem;
  cursor: pointer;
  transition: background 0.3s;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.settings-option:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.settings-option i {
  width: 20px;
  color: #e50914;
}
</style>
