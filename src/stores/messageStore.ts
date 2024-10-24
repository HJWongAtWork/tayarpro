import { defineStore } from 'pinia';

export const messageStore = defineStore('messageStore', {
  state: () => ({
    messages: [] as {
      id: number,
      email: string,
      subject: string,
      content: string
    }[]
  }),

  getters: {
    getMessage: (state) => state.messages
  },

  actions: {
    async fetchMessage() {
      //dummy data
      // const messageData = {
      //   id: -1,
      //   email: '',
      //   subject: '',
      //   content: ''
      // }
      // this.messages.push(messageData)
    },
  },

});