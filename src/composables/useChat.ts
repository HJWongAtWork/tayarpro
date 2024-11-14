// composables/useChat.ts
import { ref } from 'vue'
import { useChatStore } from '@/stores/chatStore'
import { storeToRefs } from 'pinia'

export function useChat() {
  const chatStore = useChatStore()
  const { messages, isLoading, error, isTyping } = storeToRefs(chatStore)
  const isMinimized = ref(true)

  const toggleChat = () => {
    isMinimized.value = !isMinimized.value
  }

  const sendMessage = async (message: string) => {
    try {
      await chatStore.sendMessage(message)
    } catch (error) {
      console.error('Failed to send message:', error)
    }
  }

  const markMessagesAsRead = () => {
    messages.value.forEach(message => {
      if (message.sender === 'bot' && message.status !== 'read') {
        chatStore.updateMessageStatus(message.id, 'read')
      }
    })
  }

  return {
    isMinimized,
    toggleChat,
    sendMessage,
    markMessagesAsRead,
    messages,
    isLoading,
    isTyping,
    error
  }
}
