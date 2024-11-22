<template>
  <v-app>
    <v-main>
      <div>
        <Disclaimer />
      </div>
      <v-app-bar class="px-3" color="red" height="80" width="100">
        <v-spacer></v-spacer>
        <router-link to="/" class="link">
          <img src="../assets/logo_tayarpro_partial-removebg-preview.png" height="75" />
        </router-link>
        <v-spacer></v-spacer>
      </v-app-bar>
      <router-view />
    </v-main>
  <!-- Chat Widget Integration -->
  <div class="chat-widget">
        <!-- Chat Interface Container -->
        <v-card v-show="showChat" :class="['chat-card', { 'chat-card-center': isCenter }]" elevation="4">
          <ChatInterface @close="showChat = false" @toggle-position="togglePosition" :isResponsiveMode="isResponsiveMode" />
        </v-card>

        <!-- Floating Chat Button -->
        <v-btn class="chat-fab" color="#FF3131" icon elevation="4" size="large" @click="toggleChat" :loading="chatStore.isLoading">
          <v-icon>
            {{ showChat ? 'mdi-close' : 'mdi-message' }}
          </v-icon>

          <!-- Unread Messages Badge -->
          <v-badge v-if="unreadCount > 0 && !showChat" :content="unreadCount" color="error" floating />
        </v-btn>
      </div>

  </v-app>
</template>

<script lang="ts" setup>
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  import { useChatStore } from '@/stores/chatStore'
  import Disclaimer from '@/components/Disclaimer.vue';
  import ChatInterface from '@/components/ChatInterface.vue'

  const chatStore = useChatStore()
  const showChat = ref(false)
  const isCenter = ref(false)
  const windowWidth = ref(window.innerWidth)
  const previousWidth = ref(window.innerWidth)

  //const name = 'DefaultLayout';

  // Add this computed property
  const isResponsiveMode = computed(() => {
    return windowWidth.value <= 720 // matches your media query breakpoint
  })

  const crossesThreshold = (oldWidth: number, newWidth: number) => {
    const threshold = 720
    return (oldWidth <= threshold && newWidth > threshold) ||
           (oldWidth > threshold && newWidth <= threshold)
  }
  // Add window resize handler
  const handleResize = () => {
      windowWidth.value = window.innerWidth

      // Check if width crosses threshold
      if (crossesThreshold(previousWidth.value, windowWidth.value)) {
        showChat.value = false
        isCenter.value = false
      }

      previousWidth.value = windowWidth.value
  }


  // Add lifecycle hooks to handle resize events
  onMounted(() => {
      window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {
      window.removeEventListener('resize', handleResize)
  })

  const unreadCount = computed(() => {
    return chatStore.messages.filter(m => m.sender === 'bot' && m.status !== 'read').length
  })

  const toggleChat = () => {
    showChat.value = !showChat.value
    if (isCenter.value) {
      isCenter.value = false
    }
  }

  const togglePosition = () => {
    isCenter.value = !isCenter.value
  }

</script>

<style scoped>
  .v-application {
    position: relative;
    overflow-x: hidden;
  }

  .v-carousel {
    overflow: hidden !important;
  }

  html {
    overflow-y: scroll;
    scroll-behavior: smooth;
  }

  body {
    width: calc(100vw - (100vw - 100%));
  }

  /* Chat Widget Styles */
  .chat-widget {
    position: fixed;
    bottom: 40px;
    right: 20px;
    z-index: 9999;
    transform: scale(0.9);
    transform-origin: bottom right;
  }

  .chat-fab {
    position: relative;
  }

  .chat-card {
    position: fixed;
    right: 20px;
    bottom: 60px;
    height: 550px;
    width: 350px;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1) !important;
    z-index: 9999;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .chat-card-center {
    right: -125%;
    transform: translateX(-125%);
  }

  /* Slide animations for showing/hiding chat */
  .chat-card:not(:visible) {
    transform: translateX(100%);
  }

  .chat-card-center:not(:visible) {
    transform: translateX(-25%);
  }

  /* Animation for position toggle */
  .chat-card {
    will-change: transform, right;
    transition-property: transform, right;
    transition-duration: 0.3s;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
</style>

