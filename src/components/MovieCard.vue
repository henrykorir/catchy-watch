<script setup lang="ts">
defineProps({
  title: String,
  thumbnail: String
})
</script>

<template>
<div class="aspect-square w-full bg-white dark:bg-neutral-800 rounded-xl shadow-md overflow-hidden flex flex-col">
  <img
    :src="thumbnail"
    :alt="title"
    class="w-full h-2/3 object-cover"
  />
  <div class="p-2 text-center flex items-center justify-center h-1/3">
    <h2 class="text-sm font-semibold text-gray-800 dark:text-white truncate">
      {{ title }}
    </h2>
  </div>
</div>
</template>
