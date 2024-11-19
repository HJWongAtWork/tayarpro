<template>
  <v-app>
    <div>
      <Disclaimer />
    </div>
    <Header />
    <v-main>
      <router-view />
    </v-main>
    
    <!-- Chat Widget Integration -->
    <div class="chat-widget">
      <!-- Chat Interface Container -->
      <v-card v-show="showChat" class="chat-card" elevation="4">
        <ChatInterface @close="showChat = false" />
      </v-card>

      <!-- Floating Chat Button -->
      <v-btn class="chat-fab" color="#FF3131" icon elevation="4" size="large" @click="toggleChat"
        :loading="chatStore.isLoading">
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
import { ref, computed } from 'vue'
import { useChatStore } from '@/stores/chatStore'
import Disclaimer from '@/components/Disclaimer.vue';
import ChatInterface from '@/components/ChatInterface.vue'

const chatStore = useChatStore()
const showChat = ref(false)

const unreadCount = computed(() => {
    return chatStore.messages.filter(m => m.sender === 'bot' && m.status !== 'read').length
})

const toggleChat = () => {
    showChat.value = !showChat.value
}
</script>

<style>
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
  bottom: 60px; /* Changed from top: 50% to bottom: 80px */
  transform: none; /* Removed translateY(-50%) */
  height: 550px;
  width: 350px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1) !important;
  transition: transform 0.3s ease-in-out;
  z-index: 9999;
}

.chat-card:not(:visible) {
  transform: translateX(100%);
}

/* Responsive adjustments */
@media (max-width: 960px) {
  .chat-widget {
    bottom: 40px;
    right: 10px;
    transform: scale(0.9);
    transform-origin: bottom right;
  }

  .chat-card {
    bottom: 65px; /* Adjusted for mobile */
  }
}
</style>