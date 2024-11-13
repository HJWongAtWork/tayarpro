// services/chatService.ts
import axios from "axios";
import type { Message, ChatResponse, MessageStatus } from "@/stores/chatStore";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const chatService = {
  async sendMessage(message: string): Promise<ChatResponse> {
    const response = await axios.post(`${API_URL}/chat`, { message });
    return response.data;
  },

  async getChatHistory(): Promise<Message[]> {
    const response = await axios.get(`${API_URL}/chat/history`);
    return response.data;
  },

  async updateMessageStatus(
    messageId: string,
    status: MessageStatus
  ): Promise<void> {
    await axios.patch(`${API_URL}/chat/messages/${messageId}`, { status });
  },

  async deleteMessage(messageId: string): Promise<void> {
    await axios.delete(`${API_URL}/chat/messages/${messageId}`);
  },
};
