import { defineStore } from 'pinia';

export const userStore = defineStore('userStore', {
  state: () => ({
    users: [] as {
      id: number,
      email: string,
      phone: string,
      firstName: string,
      lastName: string,
      gender: string,
      dateOfBirth: Date,
      address: string,
      postalcode: string,
      city: string,
      state: string,
      country: string
    }[]
  }),
  getters: {
    getUsers: (state) => state.users,
  },
  actions: {
    async fetchUser() {
      //dummy data
      const userData = {
        id: 1, 
        email: 'XVb1j@example.com',
        phone: '0123456789',
        firstName: 'John',
        lastName: 'Doe',
        gender: 'm',
        dateOfBirth: new Date('1990-01-01'),
        address: 'Jalan Saya Tak Tahu',
        postalcode: '58200',
        city: 'Bangsar',
        state: 'Kuala Lumpur',
        country: 'Malaysia'
      };
      
      this.users.push(userData);
    },
  },
});