<template>
    <v-card-text ref="messagesContainer" class="chat-messages" :class="{ 'pe-0': !isMobile }">
        <v-slide-y-transition group>
            <div v-for="message in messages" :key="message.id" class="message-wrapper"
                :class="{ 'message-user': message.sender === 'user' }">
                <v-card :color="message.sender === 'user' ? 'primary' : 'grey-lighten-3'"
                    :class="message.sender === 'user' ? 'message-card-user' : 'message-card-bot'"
                    class="message-card mb-3" elevation="1">
                    <v-card-text :class="message.sender === 'user' ? 'text-white' : ''" class="py-2">
                        {{ message.text }}
                    </v-card-text>
                    <div class="message-timestamp"
                        :class="message.sender === 'user' ? 'timestamp-user' : 'timestamp-bot'">
                        {{ formatTimestamp(message.timestamp) }}
                    </div>
                </v-card>
            </div>
        </v-slide-y-transition>

        <div v-if="isTyping" class="typing-indicator">
            <v-card color="grey-lighten-3" class="message-card mb-3" elevation="1">
                <v-card-text class="py-2">
                    <v-progress-circular indeterminate size="16" width="2" color="primary"></v-progress-circular>
                </v-card-text>
            </v-card>
        </div>
    </v-card-text>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from 'vue'
import { useDisplay } from 'vuetify'

const props = defineProps({
    messages: {
        type: Array,
        required: true,
        default: () => []
    },
    isTyping: {
        type: Boolean,
        default: false
    }
})

const { mobile } = useDisplay()
const isMobile = ref(mobile.value)
const messagesContainer = ref(null)

// Scroll to bottom when new messages arrive
watch(() => props.messages, async () => {
    await nextTick()
    scrollToBottom()
}, { deep: true })

// Scroll to bottom when typing indicator changes
watch(() => props.isTyping, async () => {
    await nextTick()
    scrollToBottom()
})

// Format timestamp to readable time
const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    })
}

// Scroll to bottom of messages
const scrollToBottom = () => {
    if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
}

onMounted(() => {
    scrollToBottom()
})
</script>

<style scoped>
.chat-messages {
    height: calc(100% - 120px);
    overflow-y: auto;
    padding: 20px;
    background-color: #f8f9fa;
}

.message-wrapper {
    display: flex;
    margin-bottom: 4px;
}

.message-user {
    justify-content: flex-end;
}

.message-card {
    max-width: 80%;
    position: relative;
    border-radius: 12px !important;
}

.message-card-user {
    border-bottom-right-radius: 4px !important;
}

.message-card-bot {
    border-bottom-left-radius: 4px !important;
}

.message-timestamp {
    font-size: 0.7rem;
    position: absolute;
    bottom: 2px;
    opacity: 0.7;
    padding: 0 8px;
}

.timestamp-user {
    right: 8px;
    color: rgba(255, 255, 255, 0.7);
}

.timestamp-bot {
    left: 8px;
    color: rgba(0, 0, 0, 0.7);
}

.typing-indicator {
    display: flex;
    align-items: center;
    margin-top: 8px;
}
</style>