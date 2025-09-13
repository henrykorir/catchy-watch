<script setup lang="ts">
import { defineProps, computed } from 'vue'

interface Props {
  videoId: string
  show: boolean
  title: string
}

const props = defineProps<Props>()
const emit = defineEmits(['close'])

const embedUrl = computed(
  () => `https://www.youtube.com/embed/${props.videoId}?autoplay=0&modestbranding=1&fs=1&rel=0`,
)

function closePopup() {
  emit('close')
}
</script>

<template>
  <div v-if="props.show || false">
    <!-- Overlay -->
    <div class="overlay" @click="closePopup"></div>

    <!-- Centered popup window -->
    <div class="player-window" role="dialog" :aria-labelledby="`${props.videoId}-title`">
      <div class="player-window-titlebar">
        <span :id="`${props.videoId}-title`" class="player-window-title">
          {{ props.title || 'Play Trailer' }}
        </span>
        <div class="player-window-titlebar-actions">
          <button
            class="player-window-titlebar-action cursor-pointer;"
            aria-label="Close"
            @click="closePopup"
          >
            ✕
          </button>
        </div>
      </div>

      <div class="player-window-content">
        <iframe
          class="video-frame"
          :src="embedUrl"
          :title="props.title || 'YouTube video player'"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  width: 100%;
  height: 100%;
  position: fixed;
  inset: 0;
  background-color: #000;
  opacity: 0.5;
  z-index: 10001;
  overflow: hidden;
}

.player-window {
  min-width: 300px;
  max-width: 90%;
  width: 700px; /* default */
  background-color: #000;
  color: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10004;
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.7);
}

.player-window-titlebar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: #000;
  border-bottom: 1px solid #222;
}

.player-window-content {
  width: 100%;
  aspect-ratio: 16 / 9;
  background: black;
}

.video-frame {
  width: 100%;
  height: 100%;
}
</style>
