<script setup lang="ts">
// Define notification interface for TypeScript
interface Notification {
  id: number
  message: string
  time: string
  read: boolean
}

// Define props with TypeScript
defineProps<{
  notifications: Notification[]
}>()

// Define emits
const emit = defineEmits<{
  (e: 'notification-clicked', id: number): void
}>()

// Method to handle notification click
const handleNotificationClick = (notificationId: number) => {
  emit('notification-clicked', notificationId)
}
</script>

<template>
  <div class="notifications-panel">
    <h2 class="section-title">Notifications</h2>

    <div
      v-for="notification in notifications"
      :key="notification.id"
      class="notification"
      :class="{ unread: !notification.read }"
      @click="handleNotificationClick(notification.id)"
    >
      <div class="notification-content">
        <p class="notification-message">{{ notification.message }}</p>
        <span class="notification-time">{{ notification.time }}</span>
      </div>
      <div v-if="!notification.read" class="notification-indicator"></div>
    </div>

    <div v-if="notifications.length === 0" class="empty-state">
      <i class="fas fa-bell-slash"></i>
      <p>No notifications</p>
    </div>
  </div>
</template>

<style scoped>
.notifications-panel {
  /* background-color: #1f1f1f; */
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.notification {
  display: flex;
  align-items: center;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 0.75rem;
  cursor: pointer;
  transition: background 0.3s;
  position: relative;
}

.notification:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.notification.unread {
  background-color: rgba(229, 9, 20, 0.1);
}

.notification-content {
  flex: 1;
}

.notification-message {
  margin-bottom: 0.25rem;
  line-height: 1.4;
}

.notification-time {
  font-size: 0.8rem;
  color: #808080;
}

.notification-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #e50914;
  margin-left: 0.5rem;
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: #808080;
}

.empty-state i {
  font-size: 2rem;
  margin-bottom: 1rem;
  display: block;
}
</style>
