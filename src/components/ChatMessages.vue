<template>
    <v-card-text ref="messagesContainer" class="chat-messages" :class="{ 'pe-0': !isMobile }">
        <v-slide-y-transition group>
            <div v-for="message in messages" :key="message.id" class="message-wrapper"
                :class="{ 'message-user': message.sender === 'user' }">
                <v-card :color="message.sender === 'user' ? '#FF3131' : 'grey-lighten-3'"
                    :class="message.sender === 'user' ? 'message-card-user' : 'message-card-bot'"
                    class="message-card mb-3" min-width="100px" elevation="1">
                    <v-card-text :class="message.sender === 'user' ? 'text-white' : ''"
                        class="py-2 pb-5 message-content" v-html="parseMarkdown(message.text)">
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
                    <v-progress-circular indeterminate size="16" width="2" color="#FF3131"></v-progress-circular>
                </v-card-text>
            </v-card>
        </div>
    </v-card-text>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from 'vue'
import { useDisplay } from 'vuetify'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

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

// Configure marked options
marked.setOptions({
    breaks: true, // Adds <br> on single line breaks
    gfm: true,    // GitHub Flavored Markdown
})

// Parse markdown and sanitize HTML
const parseMarkdown = (text) => {
    const rawHtml = marked(text)
    return DOMPurify.sanitize(rawHtml)
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
    margin-right: 16px;
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

/* Add styles for markdown content */
.message-content :deep(p) {
    margin: 0.5em 0;
}

.message-content :deep(ul),
.message-content :deep(ol) {
    margin: 0.5em 0;
    padding-left: 1.5em;
}

.message-content :deep(li) {
    margin: 0.25em 0;
}

.message-content :deep(h1),
.message-content :deep(h2),
.message-content :deep(h3),
.message-content :deep(h4),
.message-content :deep(h5),
.message-content :deep(h6) {
    margin: 0.5em 0;
    font-weight: bold;
}

.message-content :deep(h1) {
    font-size: 1.5em;
}

.message-content :deep(h2) {
    font-size: 1.3em;
}

.message-content :deep(h3) {
    font-size: 1.2em;
}

.message-content :deep(h4) {
    font-size: 1.1em;
}

.message-content :deep(h5) {
    font-size: 1em;
}

.message-content :deep(h6) {
    font-size: 0.9em;
}

.message-content :deep(strong) {
    font-weight: bold;
}

.message-content :deep(em) {
    font-style: italic;
}

.message-content :deep(code) {
    background-color: rgba(0, 0, 0, 0.05);
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-family: monospace;
}

.message-content :deep(pre) {
    background-color: rgba(0, 0, 0, 0.05);
    padding: 1em;
    border-radius: 4px;
    overflow-x: auto;
}

.message-content :deep(a) {
    color: #2196F3;
    text-decoration: none;
}

.message-content :deep(a:hover) {
    text-decoration: underline;
}

/* Adjust styles for user messages */
.message-card-user .message-content :deep(a) {
    color: #ffffff;
    text-decoration: underline;
}

.message-card-user .message-content :deep(code) {
    background-color: rgba(255, 255, 255, 0.2);
}

.message-card-user .message-content :deep(pre) {
    background-color: rgba(255, 255, 255, 0.1);
}

.message-content :deep(blockquote) {
    border-left: 3px solid #ccc;
    margin: 0.5em 0;
    padding-left: 1em;
    color: #666;
}

.message-card-user .message-content :deep(blockquote) {
    border-left: 3px solid rgba(255, 255, 255, 0.3);
    color: rgba(255, 255, 255, 0.9);
}

.message-content :deep(code) {
    font-size: 0.9em;
}

.message-content :deep(pre code) {
    display: block;
    padding: 0.5em;
    overflow-x: auto;
}
</style>