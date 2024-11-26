import axios from "axios";

const API_URL = import.meta.env.VITE_CHATBOT_API_URL || 'https://vertex-api-service-1082564059873.us-central1.run.app';

export type MessageStatus = 'pending' | 'completed' | 'failed';

export interface Message {
  id: string;
  content: string;
  status: MessageStatus;
  timestamp: string;
  is_user: boolean;
}

export interface ChatResponse {
  answer: string;
  status: number;
}

export const chatService = {
  async sendMessage(message: string): Promise<ChatResponse> {
    try {
      const response = await axios.post<ChatResponse>(`${API_URL}/query`, {
        question: message
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 30000 // 30 second timeout
      });

      if (response.status !== 200) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      return {
        answer: response.data.answer,
        status: response.data.status
      };
    } catch (error) {
      console.error('Error sending message:', error);
      
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          return {
            answer: error.response.data.answer || 'Server error occurred.',
            status: error.response.status
          };
        } else if (error.request) {
          // The request was made but no response was received
          return {
            answer: 'No response received from server.',
            status: 503
          };
        }
      }
      
      return {
        answer: 'An unexpected error occurred while processing your request.',
        status: 500
      };
    }
  },

  // Client-side storage implementation for chat history
  async getChatHistory(): Promise<Message[]> {
    try {
      const storedHistory = localStorage.getItem('chatHistory');
      return storedHistory ? JSON.parse(storedHistory) : [];
    } catch (error) {
      console.error('Error retrieving chat history:', error);
      return [];
    }
  },

  async updateMessageStatus(
    messageId: string,
    status: MessageStatus
  ): Promise<void> {
    try {
      const history = await this.getChatHistory();
      const updatedHistory = history.map(msg => 
        msg.id === messageId ? { ...msg, status } : msg
      );
      localStorage.setItem('chatHistory', JSON.stringify(updatedHistory));
    } catch (error) {
      console.error('Error updating message status:', error);
    }
  },

  async deleteMessage(messageId: string): Promise<void> {
    try {
      const history = await this.getChatHistory();
      const updatedHistory = history.filter(msg => msg.id !== messageId);
      localStorage.setItem('chatHistory', JSON.stringify(updatedHistory));
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  },

  // New method to save messages to local storage
  async saveMessage(message: Message): Promise<void> {
    try {
      const history = await this.getChatHistory();
      history.push(message);
      localStorage.setItem('chatHistory', JSON.stringify(history));
    } catch (error) {
      console.error('Error saving message:', error);
    }
  }
};
