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
  answer: string;
  status: number;
}
export const useChatStore = defineStore({
  id: "chatStore",
  state: (): ChatState => ({
    messages: loadMessagesFromLocalStorage(), // Initialize with stored messages
    isLoading: false,
    error: null,
    isTyping: false,
  }),

  // ... (keep your existing getters)

  actions: {
    async sendMessage(messageText: string): Promise<void> {
      try {
        this.isLoading = true;
        this.isTyping = true;

        // Create user message
        const userMessage: Message = {
          id: crypto.randomUUID(),
          text: messageText,
          sender: "user",
          timestamp: new Date(),
          type: "text",
          status: "sent",
        };

        this.messages.push(userMessage);
        this.saveMessagesToLocalStorage();

        // Get context from previous messages
        const context = this.getMessageContext();

        // Send message with context to the chatbot
        const response: ChatResponse = await chatService.sendMessage(
          messageText, context
          //`Context: ${context} \n\nQuestion: ${messageText}`
          //context
        );

        // Create and add bot message
        const botMessage: Message = {
          id: crypto.randomUUID(),
          text: response.answer,
          sender: "bot",
          timestamp: new Date(),
          type: "text",
          status: "delivered",
        };

        this.messages.push(botMessage);
        this.saveMessagesToLocalStorage();
      } catch (error) {
        this.error =
          error instanceof Error ? error.message : "An unknown error occurred";
        throw error;
      } finally {
        this.isLoading = false;
        this.isTyping = false;
      }
    },

    getMessageContext(contextMessageCount: number = 10): string {
      const relevantMessages = this.messages
        .slice(-contextMessageCount * 2) // Get last N back-and-forth exchanges
        .map(
          (msg) =>
            `${msg.sender === "user" ? "Human" : "Assistant"}: ${msg.text}`
        )
        .join("\n");

      return relevantMessages
        ? `Previous conversation:\n${relevantMessages}\n\n`
        : "";
    },

    // Replace loadChatHistory with loadLocalChatHistory
    loadLocalChatHistory(): void {
      try {
        this.isLoading = true;
        const storedMessages = loadMessagesFromLocalStorage();
        this.messages = storedMessages;
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

    clearMessages(): void {
      this.messages = [];
      localStorage.removeItem("chatMessages"); // Clear from local storage too
    },

    deleteMessage(messageId: string): void {
      this.messages = this.messages.filter((msg) => msg.id !== messageId);
      this.saveMessagesToLocalStorage(); // Save after deletion
    },

    updateMessageStatus(messageId: string, status: MessageStatus): void {
      const message = this.messages.find((msg) => msg.id === messageId);
      if (message) {
        message.status = status;
        this.saveMessagesToLocalStorage(); // Save after status update
      }
    },
    limitStoredMessages(limit: number = 50): void {
      if (this.messages.length > limit) {
        this.messages = this.messages.slice(-limit);
        this.saveMessagesToLocalStorage();
      }
    },
    // New method to save messages to localStorage
    saveMessagesToLocalStorage(): void {
      try {
        const messagesToStore = this.messages.map((msg) => ({
          ...msg,
          timestamp: msg.timestamp.toISOString(), // Convert Date to string for storage
        }));
        localStorage.setItem("chatMessages", JSON.stringify(messagesToStore));
      } catch (error) {
        console.error("Failed to save messages to localStorage:", error);
      }
    },
  },
});

// Helper function to load messages from localStorage
function loadMessagesFromLocalStorage(): Message[] {
  try {
    const storedMessages = localStorage.getItem("chatMessages");
    if (!storedMessages) return [];

    return JSON.parse(storedMessages).map((msg: any) => ({
      ...msg,
      timestamp: new Date(msg.timestamp), // Convert string back to Date
    }));
  } catch (error) {
    console.error("Failed to load messages from localStorage:", error);
    return [];
  }
}

// Export types for use in components
export type { Message, ChatState, ChatResponse, MessageStatus };
