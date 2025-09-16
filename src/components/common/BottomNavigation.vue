<script setup lang="ts">
import { inject, ref, onMounted, onBeforeUnmount, Ref } from 'vue'
import { AuthContext } from '../../types/auth'

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

const auth = inject<AuthContext>('auth')
const inputRef = inject<Ref<HTMLInputElement | null>>('inputRef')

// which nav has an open dropup
const activeDropUp = ref<string | null>(null)

const emit = defineEmits<{
  (e: 'nav-change', navName: string): void
}>()

// handle nav clicks
const handleNavChange = (nav: NavItem) => {
  if ((!auth || !auth.user.value) && nav.name === 'profile') {
    // open dropup only for the clicked nav
    activeDropUp.value = nav.name
    return
  }
  if (nav.name === 'search') {
    inputRef?.value?.focus()
    console.log('inputRef: ', inputRef)
    return
  }

  activeDropUp.value = null
  emit('nav-change', nav.name)
  window.location.hash = nav.link
}

// close dropup when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.nav-item-wrapper')) {
    activeDropUp.value = null
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside))
</script>

<template>
  <nav
  class="fixed bottom-0 left-0 right-0 bg-white flex justify-around shadow-[0_-2px_10px_rgba(0,0,0,0.1)] bottom-nav"
>
  <div v-for="(nav, index) in navigation" :key="index" class="relative nav-item-wrapper">
    <!-- Nav Item -->
    <a
      v-if="!(nav.name === 'watchlist' && (!auth || !auth.user.value))"
      :class="[
        'flex flex-col items-center text-sm cursor-pointer text-gray-600 py-2', 
        { 'text-indigo-500': activeNav === nav.name },
      ]"
      @click="handleNavChange(nav)"
    >
      <i :class="[nav.icon, 'text-lg mb-1']"></i>
      <span>{{ nav.label }}</span>
    </a>

    <!-- Dropup -->
    <div
      v-if="activeDropUp === nav.name && nav.name === 'profile'"
      class="absolute bottom-14 left-1/2 -translate-x-1/2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 z-30 animate-fadeIn px-4"
    >
      <!-- Arrow -->
      <div
        class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r border-b border-gray-100 rotate-45"
      ></div>

      <!-- Header -->
      <div class="px-8 py-3 border-b border-gray-100 text-sm text-gray-500 font-medium">
        Account
      </div>

      <!-- Menu Items -->
      <a
        href="#/auth"
        class="flex items-center gap-2 px-5 py-2.5 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors first:rounded-t-2xl"
      >
        <i class="i-mdi-login text-lg"></i>
        Login
      </a>
      <a
        href="#/auth"
        class="flex items-center gap-2 px-5 py-2.5 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors last:rounded-b-2xl"
      >
        <i class="i-mdi-account-plus text-lg"></i>
        Signup
      </a>
    </div>
  </div>
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
.dropup {
  position: relative;
  display: inline-block;
}
.dropup {
  position: relative;
  display: inline-block;
}

.dropup-content {
  display: none;
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 6px;
}

.dropup-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}
/* 
.dropup:hover .dropup-content {
  display: block;
} */
</style>
