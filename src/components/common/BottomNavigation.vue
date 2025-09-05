<script setup lang="ts">
// Props
interface NavItem {
  name: string
  icon: string
  label: string
  link: string
}

defineProps<{
  navigation: NavItem[]
  activeNav: string
}>()

// Emits
const emit = defineEmits<{
  (e: 'nav-change', navName: string): void
}>()

// Methods
const handleNavChange = (link: string) => {
  emit('nav-change', link)
  window.location.hash = `${link}`
}
</script>

<template>
  <nav class="bottom-nav">
    <a
      v-for="(nav, index) in navigation"
      :key="index"
      :class="['nav-item', { active: activeNav === nav.name }]"
      @click="handleNavChange(nav.link)"
    >
      <i :class="nav.icon"></i>
      <span>{{ nav.label }}</span>
    </a>
  </nav>
</template>

<style scoped>
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  display: flex;
  justify-content: space-around;
  padding: 12px 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #666;
  font-size: 0.8rem;
  cursor: pointer;
}

.nav-item.active {
  color: #6e8efb;
}

.nav-item i {
  font-size: 1.2rem;
  margin-bottom: 4px;
}
</style>
