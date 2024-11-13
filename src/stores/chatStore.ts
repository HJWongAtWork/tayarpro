// stores/chatStore.ts
import { defineStore } from "pinia";
import { chatService } from "@/services/chatService";

// Define message status type
type MessageStatus = "sent" | "delivered" | "read";

// Define interfaces for type safety
interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  type: "text" | "image" | "file";
  status?: MessageStatus;
}

interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  isTyping: boolean;
}

interface ChatResponse {
  message: string;
  status: number;
}

export const useChatStore = defineStore({
  id: "chatStore",
  state: (): ChatState => ({
    messages: [],
    isLoading: false,
    error: null,
    isTyping: false,
  }),

  getters: {
    getMessages: (state): Message[] => state.messages,
    getLoadingState: (state): boolean => state.isLoading,
    getError: (state): string | null => state.error,
    getTypingState: (state): boolean => state.isTyping,
  },

  actions: {
    async sendMessage(messageText: string): Promise<void> {
      try {
        this.isLoading = true;
        this.isTyping = true;

        // Create and add user message
        const userMessage: Message = {
          id: crypto.randomUUID(),
          text: messageText,
          sender: "user",
          timestamp: new Date(),
          type: "text",
          status: "sent",
        };

        this.messages.push(userMessage);

        // Get bot response
        const response: ChatResponse = await chatService.sendMessage(
          messageText
        );

        // Create and add bot message
        const botMessage: Message = {
          id: crypto.randomUUID(),
          text: response.message,
          sender: "bot",
          timestamp: new Date(),
          type: "text",
          status: "delivered",
        };

        this.messages.push(botMessage);
      } catch (error) {
        this.error =
          error instanceof Error ? error.message : "An unknown error occurred";
        throw error;
      } finally {
        this.isLoading = false;
        this.isTyping = false;
      }
    },

    async loadChatHistory(): Promise<void> {
      try {
        this.isLoading = true;
        const history = await chatService.getChatHistory();

        // Ensure proper typing for loaded messages
        this.messages = history.map(
          (msg: any): Message => ({
            id: msg.id,
            text: msg.text,
            sender: msg.sender,
            timestamp: new Date(msg.timestamp),
            type: msg.type || "text",
            status: msg.status as MessageStatus,
          })
        );
      } catch (error) {
        this.error =
          error instanceof Error
            ? error.message
            : "Failed to load chat history";
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    setTypingStatus(status: boolean): void {
      this.isTyping = status;
    },

    clearError(): void {
      this.error = null;
    },

    clearMessages(): void {
      this.messages = [];
    },

    async deleteMessage(messageId: string): Promise<void> {
      try {
        this.messages = this.messages.filter((msg) => msg.id !== messageId);
        await chatService.deleteMessage(messageId);
      } catch (error) {
        this.error =
          error instanceof Error ? error.message : "Failed to delete message";
        throw error;
      }
    },

    async updateMessageStatus(
      messageId: string,
      status: MessageStatus
    ): Promise<void> {
      try {
        const message = this.messages.find((msg) => msg.id === messageId);
        if (message) {
          message.status = status;
          await chatService.updateMessageStatus(messageId, status);
        }
      } catch (error) {
        this.error =
          error instanceof Error
            ? error.message
            : "Failed to update message status";
        throw error;
      }
    },
  },
});

// Export types for use in components
export type { Message, ChatState, ChatResponse, MessageStatus };
