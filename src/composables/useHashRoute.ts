// composables/useHashRoute.ts
import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Simple hash-based router composable.
 * Keeps track of the current hash and exposes it as a reactive ref.
 */
export function useHashRoute() {
  const currentHash = ref<string>(window.location.hash || '')

  const updateHash = () => {
    currentHash.value = window.location.hash || ''
  }

  const setHash = (hash: string) => {
    if (hash !== currentHash.value) {
      window.location.hash = hash
    }
  }

  onMounted(() => {
    updateHash()
    window.addEventListener('hashchange', updateHash)
  })

  onUnmounted(() => {
    window.removeEventListener('hashchange', updateHash)
  })

  return {
    currentHash,
    setHash,
  }
}
