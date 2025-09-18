<template>
  <div>
    <h2 class="section-title">Recommended for you</h2>
    <div class="recommendation-grid">
      <RecommendationCard
        v-for="(item, index) in recommendations"
        :key="item.id"
        :item="item"
        :index="index"
        @touchstart="() => handleTouchStart(index)"
        @touchend="() => handleTouchEnd(index)"
      />
    </div>
  </div>
</template>

<script>
import RecommendationCard from './RecommendationCard.vue'

export default {
  name: 'RecommendationList',
  components: {
    RecommendationCard,
  },
  props: {
    recommendations: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['touch-start', 'touch-end'],
  methods: {
    handleTouchStart(index) {
      this.$emit('touch-start', index)
    },
    handleTouchEnd(index) {
      this.$emit('touch-end', index)
    },
  },
}
</script>

<style scoped>
.recommendation-grid {
  display: grid;
  /* grid-template-columns: 1fr; */
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 70px;
}

.section-title {
  margin: 20px 0 15px;
  font-size: 1.3rem;
  font-weight: 600;
}

@media (min-width: 576px) {
  .recommendation-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 992px) {
  .recommendation-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
