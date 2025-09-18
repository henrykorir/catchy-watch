<script setup lang="ts">
// Define props with TypeScript
const props = defineProps<{
  icon: string
  label: string
  badgeCount?: number
  isActive?: boolean
}>()

// Define emits
const emit = defineEmits<{
  (e: 'item-clicked', value: string): void
}>()

// Method to handle click
const handleClick = () => {
  emit('item-clicked', props.label.toLowerCase())
}
</script>

<template>
  <div class="nav-item" :class="{ active: isActive }" @click="handleClick">
    <i :class="icon"></i>
    <span>{{ label }}</span>
    <div v-if="badgeCount" class="badge">{{ badgeCount }}</div>
  </div>
</template>

<style scoped>
.nav-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.nav-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-item.active {
  background-color: #e50914;
  color: white;
}

.badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #e50914;
  color: white;
  font-size: 0.7rem;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
