<template>
  <header>
    <div class="container">
      <div class="header-content">
        <div class="logo">Discover</div>
        <div class="user-actions">
          <i class="fas fa-bell"></i>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
// No props or emits needed yet
</script>

<style scoped>
header {
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  color: white;
  padding: 15px 0;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
}
</style>
