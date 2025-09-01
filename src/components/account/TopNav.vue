<script setup lang="ts">
import Avatar from './Avatar.vue'
import NavItem from './NavItem.vue'

// Define user interface for TypeScript
interface User {
  avatarUrl: string
  name: string
  status: string
}

// Define nav item interface for TypeScript
interface NavItem {
  id: string
  icon: string
  label: string
  badgeCount: number
}

// Define props with TypeScript
const props = defineProps<{
  user: User
  navItems: NavItem[]
  activeItem?: string
}>()

// Define emits
const emit = defineEmits<{
  (e: 'avatar-clicked'): void
  (e: 'nav-item-clicked', value: string): void
}>()

// Method to handle avatar click
const handleAvatarClick = () => {
  emit('avatar-clicked')
}

// Method to handle nav item click
const handleNavItemClick = (item: string) => {
  emit('nav-item-clicked', item)
}
</script>

<template>
  <div class="top-nav">
    <Avatar
      :avatar-url="user.avatarUrl"
      :user-name="user.name"
      :user-status="user.status"
      @avatar-clicked="handleAvatarClick"
    />

    <div class="nav-items">
      <NavItem
        v-for="item in navItems"
        :key="item.id"
        :icon="item.icon"
        :label="item.label"
        :badge-count="item.badgeCount"
        :is-active="activeItem === item.id"
        @item-clicked="handleNavItemClick"
      />
    </div>
  </div>
</template>

<style scoped>
.top-nav {
  /* background-color: #1f1f1f; */
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  gap: 2;
}

.nav-items {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

@media (max-width: 900px) {
  .top-nav {
    flex-direction: column;
    gap: 1rem;
  }

  .nav-items {
    width: 100%;
    justify-content: space-around;
  }
}

@media (max-width: 600px) {
  .nav-items {
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
  }
}
</style>
