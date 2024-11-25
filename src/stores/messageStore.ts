import { defineStore } from 'pinia';

interface Message {
  id: number;
  email: string;
  subject: string;
  content: string;
}

export const messageStore = defineStore('messageStore', {
  state: () => ({
    messages: [] as Message[]
  }),

  getters: {
    getMessage: (state) => state.messages
  },

  actions: {
    async fetchMessage() {
      // Implement actual fetch logic when needed
    },
  },
});
