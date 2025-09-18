<script setup lang="ts">
const props = defineProps<{
  page: number | string
  isActive?: boolean
  disabled?: boolean
  ariaLabel?: string
}>()

const emit = defineEmits<{
  (e: 'page-change', page: number | string): void
}>()

const goToPage = () => {
  if (!props.disabled) {
    emit('page-change', props.page)
  }
}
</script>

<template>
  <button
    type="button"
    :disabled="disabled"
    :aria-label="ariaLabel"
    class="page-button"
    :class="{
      active: isActive,
      disabled: disabled,
      ellipsis: page === '...',
    }"
    @click="goToPage"
  >
    {{ page }}
  </button>
</template>

<style scoped>
.page-button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  min-width: 2.5rem;
  padding: 0 0.5rem;
  font-weight: 500;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background-color: white;
  color: #4b5563;
  cursor: pointer;
  transition: all 0.2s;
}

.page-button:hover:not(.disabled, .active, .ellipsis) {
  background-color: #f9fafb;
  border-color: #9ca3af;
}

.page-button.active {
  background-color: #4f46e5;
  color: white;
  border-color: #4f46e5;
}

.page-button.ellipsis {
  border: none;
  background: transparent;
  cursor: default;
}

.page-button.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
