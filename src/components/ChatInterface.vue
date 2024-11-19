<template>
  <div class="chat-interface">
    <v-card-title class="chat-header">
      <v-row>
        <v-col cols="6" class="d-flex align-center">
          <span>Chat Support</span>
          <v-btn
            icon="mdi-arrow-left-right"
            variant="text"
            size="small"
            class="ml-2"
            @click="$emit('toggle-position')"
            :disabled="props.isResponsiveMode"
            v-show="!props.isResponsiveMode"></v-btn>
        </v-col>
        <v-col cols="6" align="right">
          <v-btn icon size="small" @click="$emit('close')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>

    <!-- Messages -->
    <ChatMessages :messages="chatStore.messages" :is-typing="chatStore.isTyping" />

    <!-- Input -->
    <ChatInput @send-message="handleSendMessage" :loading="chatStore.isLoading" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useChatStore } from '@/stores/chatStore'

const props = defineProps({
  isResponsiveMode: {
    type: Boolean,
    default: false
  }
})

const chatStore = useChatStore()

defineEmits(['close', 'toggle-position'])

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