<!-- components/ChatInterface.vue -->
<template>
    <div class="chat-interface">
      <!-- Header -->
      <v-card-title class="chat-header">
        <span>Chat Support</span>
        <v-spacer />
        <v-btn icon size="small" @click="$emit('close')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
  
      <!-- Messages -->
      <ChatMessages 
        :messages="chatStore.messages"
        :is-typing="chatStore.isTyping"
      />
  
      <!-- Input -->
      <ChatInput 
        @send-message="handleSendMessage"
        :loading="chatStore.isLoading"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted } from 'vue'
  import { useChatStore } from '@/stores/chatStore'
  
  const chatStore = useChatStore()
  
  defineEmits(['close'])
  
  const handleSendMessage = async (message: string) => {
    await chatStore.sendMessage(message)
  }
  
  onMounted(async () => {
    await chatStore.loadLocalChatHistory()
  })
  </script>
  
  <style scoped>
  .chat-interface {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  
  .chat-header {
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  }
  </style>