<script setup lang="ts">
// Define props with TypeScript
defineProps<{
  avatarUrl: string
  userName: string
  userStatus?: string
}>()

// Define emits
const emit = defineEmits<{
  (e: 'avatar-clicked'): void
}>()

// Method to handle avatar click
const handleAvatarClick = () => {
  emit('avatar-clicked')
}
</script>

<template>
  <div class="avatar-section">
    <div class="avatar" @click="handleAvatarClick">
      <img :src="avatarUrl" :alt="userName + ' Avatar'" />
    </div>
    <div class="user-info">
      <div class="user-name">{{ userName }}</div>
      <div class="user-status">{{ userStatus || 'Member' }}</div>
    </div>
  </div>
</template>

<style scoped>
.avatar-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #e50914;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.avatar:hover {
  transform: scale(1.05);
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: 600;
  font-size: 1.1rem;
}

.user-status {
  font-size: 0.85rem;
  color: #808080;
}
</style>
