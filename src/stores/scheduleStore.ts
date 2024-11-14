import { defineStore } from 'pinia';

export const scheduleStore = defineStore('scheduleStore', {
  state: () => ({
    schedule: {
      '9 AM': {
        'Bay 1': { id: -1, service: '', bay: 'Bay 1', startHour: '9 AM', endHour: '10 AM', brand: '', model: '', year: -1, status: '' },
        'Bay 2': { id: -1, service: '', bay: 'Bay 2', startHour: '9 AM', endHour: '10 AM', brand: '', model: '', year: -1, status: '' },
        'Bay 3': { id: -1, service: '', bay: 'Bay 3', startHour: '9 AM', endHour: '10 AM', brand: '', model: '', year: -1, status: '' },
        'Bay 4': { id: -1, service: '', bay: 'Bay 4', startHour: '9 AM', endHour: '10 AM', brand: '', model: '', year: -1, status: '' },
        'Bay 5': { id: -1, service: '', bay: 'Bay 5', startHour: '9 AM', endHour: '10 AM', brand: '', model: '', year: -1, status: '' }
      },
      '10 AM': {
        'Bay 1': { id: -1, service: '', bay: 'Bay 1', startHour: '10 AM', endHour: '11 AM', brand: '', model: '', year: -1, status: '' },
        'Bay 2': { id: -1, service: '', bay: 'Bay 2', startHour: '10 AM', endHour: '11 AM', brand: '', model: '', year: -1, status: '' },
        'Bay 3': { id: -1, service: '', bay: 'Bay 3', startHour: '10 AM', endHour: '11 AM', brand: '', model: '', year: -1, status: '' },
        'Bay 4': { id: -1, service: '', bay: 'Bay 4', startHour: '10 AM', endHour: '11 AM', brand: '', model: '', year: -1, status: '' },
        'Bay 5': { id: -1, service: '', bay: 'Bay 5', startHour: '10 AM', endHour: '11 AM', brand: '', model: '', year: -1, status: '' }
      },
      '11 AM': {
        'Bay 1': { id: -1, service: '', bay: 'Bay 1', startHour: '11 AM', endHour: '12 PM', brand: '', model: '', year: -1, status: '' },
        'Bay 2': { id: -1, service: '', bay: 'Bay 2', startHour: '11 AM', endHour: '12 PM', brand: '', model: '', year: -1, status: '' },
        'Bay 3': { id: -1, service: '', bay: 'Bay 3', startHour: '11 AM', endHour: '12 PM', brand: '', model: '', year: -1, status: '' },
        'Bay 4': { id: -1, service: '', bay: 'Bay 4', startHour: '11 AM', endHour: '12 PM', brand: '', model: '', year: -1, status: '' },
        'Bay 5': { id: -1, service: '', bay: 'Bay 5', startHour: '11 AM', endHour: '12 PM', brand: '', model: '', year: -1, status: '' }
      },
      '12 PM': {
        'Bay 1': { id: -1, service: '', bay: 'Bay 1', startHour: '12 PM', endHour: '1 PM', brand: '', model: '', year: -1, status: '' },
        'Bay 2': { id: -1, service: '', bay: 'Bay 2', startHour: '12 PM', endHour: '1 PM', brand: '', model: '', year: -1, status: '' },
        'Bay 3': { id: -1, service: '', bay: 'Bay 3', startHour: '12 PM', endHour: '1 PM', brand: '', model: '', year: -1, status: '' },
        'Bay 4': { id: -1, service: '', bay: 'Bay 4', startHour: '12 PM', endHour: '1 PM', brand: '', model: '', year: -1, status: '' },
        'Bay 5': { id: -1, service: '', bay: 'Bay 5', startHour: '12 PM', endHour: '1 PM', brand: '', model: '', year: -1, status: '' }
      },
      '1 PM': {
        'Bay 1': { id: -1, service: '', bay: 'Bay 1', startHour: '1 PM', endHour: '2 PM', brand: '', model: '', year: -1, status: '' },
        'Bay 2': { id: -1, service: '', bay: 'Bay 2', startHour: '1 PM', endHour: '2 PM', brand: '', model: '', year: -1, status: '' },
        'Bay 3': { id: -1, service: '', bay: 'Bay 3', startHour: '1 PM', endHour: '2 PM', brand: '', model: '', year: -1, status: '' },
        'Bay 4': { id: -1, service: '', bay: 'Bay 4', startHour: '1 PM', endHour: '2 PM', brand: '', model: '', year: -1, status: '' },
        'Bay 5': { id: -1, service: '', bay: 'Bay 5', startHour: '1 PM', endHour: '2 PM', brand: '', model: '', year: -1, status: '' }
      },
      '2 PM': {
        'Bay 1': { id: -1, service: '', bay: 'Bay 1', startHour: '2 PM', endHour: '3 PM', brand: '', model: '', year: -1, status: '' },
        'Bay 2': { id: -1, service: '', bay: 'Bay 2', startHour: '2 PM', endHour: '3 PM', brand: '', model: '', year: -1, status: '' },
        'Bay 3': { id: -1, service: '', bay: 'Bay 3', startHour: '2 PM', endHour: '3 PM', brand: '', model: '', year: -1, status: '' },
        'Bay 4': { id: -1, service: '', bay: 'Bay 4', startHour: '2 PM', endHour: '3 PM', brand: '', model: '', year: -1, status: '' },
        'Bay 5': { id: -1, service: '', bay: 'Bay 5', startHour: '2 PM', endHour: '3 PM', brand: '', model: '', year: -1, status: '' }
      },
      '3 PM': {
        'Bay 1': { id: -1, service: '', bay: 'Bay 1', startHour: '3 PM', endHour: '4 PM', brand: '', model: '', year: -1, status: '' },
        'Bay 2': { id: -1, service: '', bay: 'Bay 2', startHour: '3 PM', endHour: '4 PM', brand: '', model: '', year: -1, status: '' },
        'Bay 3': { id: -1, service: '', bay: 'Bay 3', startHour: '3 PM', endHour: '4 PM', brand: '', model: '', year: -1, status: '' },
        'Bay 4': { id: -1, service: '', bay: 'Bay 4', startHour: '3 PM', endHour: '4 PM', brand: '', model: '', year: -1, status: '' },
        'Bay 5': { id: -1, service: '', bay: 'Bay 5', startHour: '3 PM', endHour: '4 PM', brand: '', model: '', year: -1, status: '' }
      },
      '4 PM': {
        'Bay 1': { id: -1, service: '', bay: 'Bay 1', startHour: '4 PM', endHour: '5 PM', brand: '', model: '', year: -1, status: '' },
        'Bay 2': { id: -1, service: '', bay: 'Bay 2', startHour: '4 PM', endHour: '5 PM', brand: '', model: '', year: -1, status: '' },
        'Bay 3': { id: -1, service: '', bay: 'Bay 3', startHour: '4 PM', endHour: '5 PM', brand: '', model: '', year: -1, status: '' },
        'Bay 4': { id: -1, service: '', bay: 'Bay 4', startHour: '4 PM', endHour: '5 PM', brand: '', model: '', year: -1, status: '' },
        'Bay 5': { id: -1, service: '', bay: 'Bay 5', startHour: '4 PM', endHour: '5 PM', brand: '', model: '', year: -1, status: '' }
      },
      '5 PM': {
        'Bay 1': { id: -1, service: '', bay: 'Bay 1', startHour: '5 PM', endHour: '6 PM', brand: '', model: '', year: -1, status: '' },
        'Bay 2': { id: -1, service: '', bay: 'Bay 2', startHour: '5 PM', endHour: '6 PM', brand: '', model: '', year: -1, status: '' },
        'Bay 3': { id: -1, service: '', bay: 'Bay 3', startHour: '5 PM', endHour: '6 PM', brand: '', model: '', year: -1, status: '' },
        'Bay 4': { id: -1, service: '', bay: 'Bay 4', startHour: '5 PM', endHour: '6 PM', brand: '', model: '', year: -1, status: '' },
        'Bay 5': { id: -1, service: '', bay: 'Bay 5', startHour: '5 PM', endHour: '6 PM', brand: '', model: '', year: -1, status: '' }
      }
    },
  }),
  getters: {
    getSchedule: (state) => state.schedule,
  },
  actions: {
    async initializeSchedule() {
      this.schedule = {
        '9 AM': {
          'Bay 1': { id: -1, service: '', bay: 'Bay 1', startHour: '9 AM', endHour: '10 AM', brand: '', model: '', year: -1, status: '' },
          'Bay 2': { id: -1, service: '', bay: 'Bay 2', startHour: '9 AM', endHour: '10 AM', brand: '', model: '', year: -1, status: '' },
          'Bay 3': { id: -1, service: '', bay: 'Bay 3', startHour: '9 AM', endHour: '10 AM', brand: '', model: '', year: -1, status: '' },
          'Bay 4': { id: -1, service: '', bay: 'Bay 4', startHour: '9 AM', endHour: '10 AM', brand: '', model: '', year: -1, status: '' },
          'Bay 5': { id: -1, service: '', bay: 'Bay 5', startHour: '9 AM', endHour: '10 AM', brand: '', model: '', year: -1, status: '' }
        },
        '10 AM': {
          'Bay 1': { id: -1, service: '', bay: 'Bay 1', startHour: '10 AM', endHour: '11 AM', brand: '', model: '', year: -1, status: '' },
          'Bay 2': { id: -1, service: '', bay: 'Bay 2', startHour: '10 AM', endHour: '11 AM', brand: '', model: '', year: -1, status: '' },
          'Bay 3': { id: -1, service: '', bay: 'Bay 3', startHour: '10 AM', endHour: '11 AM', brand: '', model: '', year: -1, status: '' },
          'Bay 4': { id: -1, service: '', bay: 'Bay 4', startHour: '10 AM', endHour: '11 AM', brand: '', model: '', year: -1, status: '' },
          'Bay 5': { id: -1, service: '', bay: 'Bay 5', startHour: '10 AM', endHour: '11 AM', brand: '', model: '', year: -1, status: '' }
        },
        '11 AM': {
          'Bay 1': { id: -1, service: '', bay: 'Bay 1', startHour: '11 AM', endHour: '12 PM', brand: '', model: '', year: -1, status: '' },
          'Bay 2': { id: -1, service: '', bay: 'Bay 2', startHour: '11 AM', endHour: '12 PM', brand: '', model: '', year: -1, status: '' },
          'Bay 3': { id: -1, service: '', bay: 'Bay 3', startHour: '11 AM', endHour: '12 PM', brand: '', model: '', year: -1, status: '' },
          'Bay 4': { id: -1, service: '', bay: 'Bay 4', startHour: '11 AM', endHour: '12 PM', brand: '', model: '', year: -1, status: '' },
          'Bay 5': { id: -1, service: '', bay: 'Bay 5', startHour: '11 AM', endHour: '12 PM', brand: '', model: '', year: -1, status: '' }
        },
        '12 PM': {
          'Bay 1': { id: -1, service: '', bay: 'Bay 1', startHour: '12 PM', endHour: '1 PM', brand: '', model: '', year: -1, status: '' },
          'Bay 2': { id: -1, service: '', bay: 'Bay 2', startHour: '12 PM', endHour: '1 PM', brand: '', model: '', year: -1, status: '' },
          'Bay 3': { id: -1, service: '', bay: 'Bay 3', startHour: '12 PM', endHour: '1 PM', brand: '', model: '', year: -1, status: '' },
          'Bay 4': { id: -1, service: '', bay: 'Bay 4', startHour: '12 PM', endHour: '1 PM', brand: '', model: '', year: -1, status: '' },
          'Bay 5': { id: -1, service: '', bay: 'Bay 5', startHour: '12 PM', endHour: '1 PM', brand: '', model: '', year: -1, status: '' }
        },
        '1 PM': {
          'Bay 1': { id: -1, service: '', bay: 'Bay 1', startHour: '1 PM', endHour: '2 PM', brand: '', model: '', year: -1, status: '' },
          'Bay 2': { id: -1, service: '', bay: 'Bay 2', startHour: '1 PM', endHour: '2 PM', brand: '', model: '', year: -1, status: '' },
          'Bay 3': { id: -1, service: '', bay: 'Bay 3', startHour: '1 PM', endHour: '2 PM', brand: '', model: '', year: -1, status: '' },
          'Bay 4': { id: -1, service: '', bay: 'Bay 4', startHour: '1 PM', endHour: '2 PM', brand: '', model: '', year: -1, status: '' },
          'Bay 5': { id: -1, service: '', bay: 'Bay 5', startHour: '1 PM', endHour: '2 PM', brand: '', model: '', year: -1, status: '' }
        },
        '2 PM': {
          'Bay 1': { id: -1, service: '', bay: 'Bay 1', startHour: '2 PM', endHour: '3 PM', brand: '', model: '', year: -1, status: '' },
          'Bay 2': { id: -1, service: '', bay: 'Bay 2', startHour: '2 PM', endHour: '3 PM', brand: '', model: '', year: -1, status: '' },
          'Bay 3': { id: -1, service: '', bay: 'Bay 3', startHour: '2 PM', endHour: '3 PM', brand: '', model: '', year: -1, status: '' },
          'Bay 4': { id: -1, service: '', bay: 'Bay 4', startHour: '2 PM', endHour: '3 PM', brand: '', model: '', year: -1, status: '' },
          'Bay 5': { id: -1, service: '', bay: 'Bay 5', startHour: '2 PM', endHour: '3 PM', brand: '', model: '', year: -1, status: '' }
        },
        '3 PM': {
          'Bay 1': { id: -1, service: '', bay: 'Bay 1', startHour: '3 PM', endHour: '4 PM', brand: '', model: '', year: -1, status: '' },
          'Bay 2': { id: -1, service: '', bay: 'Bay 2', startHour: '3 PM', endHour: '4 PM', brand: '', model: '', year: -1, status: '' },
          'Bay 3': { id: -1, service: '', bay: 'Bay 3', startHour: '3 PM', endHour: '4 PM', brand: '', model: '', year: -1, status: '' },
          'Bay 4': { id: -1, service: '', bay: 'Bay 4', startHour: '3 PM', endHour: '4 PM', brand: '', model: '', year: -1, status: '' },
          'Bay 5': { id: -1, service: '', bay: 'Bay 5', startHour: '3 PM', endHour: '4 PM', brand: '', model: '', year: -1, status: '' }
        },
        '4 PM': {
          'Bay 1': { id: -1, service: '', bay: 'Bay 1', startHour: '4 PM', endHour: '5 PM', brand: '', model: '', year: -1, status: '' },
          'Bay 2': { id: -1, service: '', bay: 'Bay 2', startHour: '4 PM', endHour: '5 PM', brand: '', model: '', year: -1, status: '' },
          'Bay 3': { id: -1, service: '', bay: 'Bay 3', startHour: '4 PM', endHour: '5 PM', brand: '', model: '', year: -1, status: '' },
          'Bay 4': { id: -1, service: '', bay: 'Bay 4', startHour: '4 PM', endHour: '5 PM', brand: '', model: '', year: -1, status: '' },
          'Bay 5': { id: -1, service: '', bay: 'Bay 5', startHour: '4 PM', endHour: '5 PM', brand: '', model: '', year: -1, status: '' }
        },
        '5 PM': {
          'Bay 1': { id: -1, service: '', bay: 'Bay 1', startHour: '5 PM', endHour: '6 PM', brand: '', model: '', year: -1, status: '' },
          'Bay 2': { id: -1, service: '', bay: 'Bay 2', startHour: '5 PM', endHour: '6 PM', brand: '', model: '', year: -1, status: '' },
          'Bay 3': { id: -1, service: '', bay: 'Bay 3', startHour: '5 PM', endHour: '6 PM', brand: '', model: '', year: -1, status: '' },
          'Bay 4': { id: -1, service: '', bay: 'Bay 4', startHour: '5 PM', endHour: '6 PM', brand: '', model: '', year: -1, status: '' },
          'Bay 5': { id: -1, service: '', bay: 'Bay 5', startHour: '5 PM', endHour: '6 PM', brand: '', model: '', year: -1, status: '' }
        },
      };
    },
  },
});
