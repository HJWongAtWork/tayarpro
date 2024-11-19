<template>
    <v-card-actions class="chat-input">
        <v-form @submit.prevent="sendMessage" class="d-flex align-center w-100">
            <!-- File upload button -->
            <v-btn v-if="allowFiles" icon="mdi-paperclip" variant="text" :disabled="loading"
                @click="triggerFileInput" />
            <input v-if="allowFiles" ref="fileInput" type="file" @change="handleFileUpload" style="display: none"
                :accept="acceptedFileTypes">

            <!-- Message input -->
            <v-textarea v-model="messageText" :loading="loading" :disabled="loading" hide-details
                placeholder="Type a message..." variant="outlined" density="comfortable" class="mx-2 chat-textarea"
                :class="{ 'textarea-focused': isFocused }" rows="1" auto-grow max-rows="4"
                @keydown.enter.prevent="handleEnterKey" @focus="isFocused = true" @blur="isFocused = false">
                <template v-slot:append-inner>
                    <!-- Emoji picker button -->
                    <v-btn v-if="allowEmoji" icon="mdi-emoticon-outline" variant="text" size="small" :disabled="loading"
                        @click="toggleEmojiPicker" />
                </template>
            </v-textarea>

            <!-- Send button -->
            <v-btn icon="mdi-send" color="#FF3131" :disabled="!messageText.trim() || loading" @click="sendMessage" />
        </v-form>

        <!-- Emoji picker (you'll need to implement or use a library) -->
        <v-menu v-if="allowEmoji" v-model="showEmojiPicker" :close-on-content-click="false" location="top">
            <div class="emoji-picker">
                <!-- Add your emoji picker implementation here -->
            </div>
        </v-menu>
    </v-card-actions>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    loading: {
        type: Boolean,
        default: false
    },
    allowFiles: {
        type: Boolean,
        default: false
    },
    allowEmoji: {
        type: Boolean,
        default: false
    },
    acceptedFileTypes: {
        type: String,
        default: 'image/*,.pdf,.doc,.docx'
    }
})

const emit = defineEmits(['send-message', 'file-upload'])

const messageText = ref('')
const fileInput = ref(null)
const showEmojiPicker = ref(false)

// Send text message
const sendMessage = () => {
    const trimmedMessage = messageText.value.trim()
    if (trimmedMessage && !props.loading) {
        emit('send-message', trimmedMessage)
        messageText.value = ''
    }
}

// Handle file upload
const triggerFileInput = () => {
    fileInput.value?.click()
}

const handleFileUpload = (event) => {
    const file = event.target.files?.[0]
    if (file) {
        emit('file-upload', file)
    }
    // Reset file input
    if (fileInput.value) {
        fileInput.value.value = ''
    }
}

const handleEnterKey = (e) => {
    // Send message on Enter without Shift
    if (!e.shiftKey) {
        sendMessage()
    }
}

// Toggle emoji picker
const toggleEmojiPicker = () => {
    showEmojiPicker.value = !showEmojiPicker.value
}

// Add emoji to message (implement when adding emoji picker)
const addEmoji = (emoji) => {
    messageText.value += emoji
    showEmojiPicker.value = false
}
</script>

<style scoped>
.chat-input {
    border-top: 1px solid rgba(0, 0, 0, 0.12);
    padding: 8px 16px;
    background-color: white;
}

.chat-textarea {
    :deep(.v-field__input) {
        min-height: 44px !important;
        padding-top: 8px !important;
        padding-bottom: 8px !important;
    }

    :deep(.v-field__field) {
        min-height: auto !important;
    }

    :deep(textarea) {
        line-height: 1.5;
        margin-top: 0;
    }

    &.textarea-focused {
        :deep(.v-field.v-field--outlined) {
            --v-field-border-width: 2px;
            --v-field-border-opacity: 1;
            border-color: #FF3131 !important;
            /* Matches your send button color */
            background-color: #fff;
        }

        :deep(.v-field__outline) {
            --v-field-border-width: 2px;
            border-color: #FF3131 !important;
        }
    }
}

.emoji-picker {
    padding: 8px;
    background: white;
    border-radius: 4px;
}
</style>