<!-- components/ChatWidget.vue -->
<template>
    <div class="chat-widget">
        <!-- Chat Interface Container -->
        <v-dialog v-model="showChat" width="400" persistent :retain-focus="false" :scrim="false" class="chat-dialog"
            transition="slide-x-transition" :fullscreen="false" :no-click-animation="true">
            <v-card class="chat-container">
                <ChatInterface @close="showChat = false" />
            </v-card>
        </v-dialog>

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
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useChatStore } from '@/stores/chatStore'
import ChatInterface from './ChatInterface.vue'

const chatStore = useChatStore()
const showChat = ref(false)

const unreadCount = computed(() => {
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
    border-radius: 8px;
    overflow: hidden;
    box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1) !important;
}

/* Position dialog in center-right */
:deep(.v-dialog) {
    position: fixed !important;
    top: 50% !important;
    right: 20px !important;
    transform: translateY(-50%) !important;
    margin: 0 !important;
    max-height: 80vh;
    pointer-events: auto;
}

/* Enable background scrolling */
:deep(.v-overlay) {
    position: fixed !important;
    overflow-y: auto !important;
}

:deep(.v-dialog__content) {
    position: fixed !important;
    overflow-y: visible !important;
}

/* Remove overlay and allow background interaction */
:deep(.v-overlay__scrim) {
    opacity: 0 !important;
    pointer-events: none !important;
}

:deep(.v-overlay__content) {
    pointer-events: auto !important;
}

/* Slide transition */
.slide-x-transition-enter-active,
.slide-x-transition-leave-active {
    transition: transform 0.3s ease-in-out;
}

.slide-x-transition-enter-from,
.slide-x-transition-leave-to {
    transform: translateX(100%);
}

/* Responsive styles */
@media (max-width: 600px) {
    :deep(.v-dialog) {
        width: 90% !important;
        right: 10px !important;
        top: 50% !important;
        transform: translateY(-50%) !important;
        max-height: 90vh;
    }

    .chat-container {
        height: 90vh;
        max-height: 90vh;
    }

    .chat-fab {
        bottom: 20px;
        right: 20px;
    }
}

/* Optional: Add smooth scrolling to the page */
:deep(html) {
    scroll-behavior: smooth;
}

/* Ensure chat interface stays above other content */
:deep(.v-dialog__content) {
    z-index: 1000;
}
</style>