<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import PageNavButton from './PageNavButton.vue'

const props = defineProps<{
  totalPages: number
  currentPage?: number
}>()

const emit = defineEmits<{
  (e: 'select-page', page: number): void
}>()

const internalCurrentPage = ref(props.currentPage || 1)

// Update internal current page when prop changes
watch(
  () => props.currentPage,
  (newVal) => {
    if (newVal !== undefined) {
      internalCurrentPage.value = newVal
    }
  },
)

// Calculate the range of pages to display
const pagesRange = computed(() => {
  const range = []
  const current = internalCurrentPage.value
  const total = props.totalPages > 500 ? 500 : props.totalPages
  const maxVisible = 5 // Number of page buttons to show

  if (total <= maxVisible) {
    // If total pages is less than max visible, show all pages
    for (let i = 1; i <= total; i++) {
      range.push(i)
    }
  } else {
    // Always include first page
    range.push(1)

    // Calculate start and end of visible page range
    let start = Math.max(2, current - 1)
    let end = Math.min(total - 1, current + 1)

    // Adjust if we're at the beginning
    if (current <= 3) {
      end = 4
    }

    // Adjust if we're at the end
    if (current >= total - 2) {
      start = total - 3
    }

    // Add ellipsis after first page if needed
    if (start > 2) {
      range.push('...')
    }

    // Add page numbers in the middle
    for (let i = start; i <= end; i++) {
      range.push(i)
    }

    // Add ellipsis before last page if needed
    if (end < total - 1) {
      range.push('...')
    }

    // Always include last page
    range.push(total)
  }

  return range
})

const handlePageChange = (page: number | string) => {
  if (page === '...' || page === internalCurrentPage.value) return

  internalCurrentPage.value = page as number
  emit('select-page', page as number)
}

const goToPreviousPage = () => {
  if (internalCurrentPage.value > 1) {
    internalCurrentPage.value--
    emit('select-page', internalCurrentPage.value)
  }
}

const goToNextPage = () => {
  if (internalCurrentPage.value < props.totalPages) {
    internalCurrentPage.value++
    emit('select-page', internalCurrentPage.value)
  }
}
</script>

<template>
  <nav aria-label="Pagination" class="pagination">
    <button
      class="nav-button"
      :disabled="internalCurrentPage === 1"
      aria-label="Go to previous page"
      @click="goToPreviousPage"
    >
      &lt;
    </button>

    <PageNavButton
      v-for="(page, index) in pagesRange"
      :key="index"
      :page="page"
      :isActive="internalCurrentPage === page"
      :ariaLabel="page === '...' ? 'More pages' : `Go to page ${page}`"
      :disabled="page === '...'"
      @page-change="handlePageChange"
    />

    <button
      class="nav-button"
      :disabled="internalCurrentPage === totalPages"
      aria-label="Go to next page"
      @click="goToNextPage"
    >
      &gt;
    </button>
  </nav>
</template>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-button {
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

.nav-button:hover:not(:disabled) {
  background-color: #f9fafb;
  border-color: #9ca3af;
}

.nav-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
