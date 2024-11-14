<!-- components/ChatWidget.vue -->
<template>
    <div class="chat-widget">
        <!-- Chat Interface Container -->
        <v-dialog v-model="showChat" width="400" persistent :retain-focus="false" location="bottom right">
            <v-card class="chat-container">
                <ChatInterface @close="showChat = false" />
            </v-card>
        </v-dialog>

        <!-- Floating Chat Button -->
        <v-btn class="chat-fab" color="primary" icon elevation="4" size="large" @click="toggleChat"
            :loading="chatStore.isLoading">
            <v-icon>
                {{ showChat ? 'mdi-close' : 'mdi-message' }}
            </v-icon>

            <!-- Unread Messages Badge -->
            <v-badge v-if="unreadCount > 0 && !showChat" :content="unreadCount" color="error" floating />
        </v-btn>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useChatStore } from '@/stores/chatStore'
import ChatInterface from './ChatInterface.vue'

const chatStore = useChatStore()
const showChat = ref(false)

const unreadCount = computed(() => {
    // Implement your unread count logic here
    return chatStore.messages.filter(m => m.sender === 'bot' && m.status !== 'read').length
})

const toggleChat = () => {
    showChat.value = !showChat.value
}
</script>

<style scoped>
.chat-widget {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 100;
}

.chat-fab {
    position: relative;
}

.chat-container {
    height: 600px;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
}

/* Add responsive styles */
@media (max-width: 600px) {
    .v-dialog {
        margin: 0;
        position: fixed;
        bottom: 0;
        right: 0;
        width: 100% !important;
        height: 100%;
    }

    .chat-container {
        height: 100%;
        max-height: 100vh;
    }
}
</style>