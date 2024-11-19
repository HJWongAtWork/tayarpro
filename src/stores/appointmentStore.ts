import { defineStore } from 'pinia';

export const appointmentStore = defineStore('appointmentStore', {
  state: () => ({
    pastAppointments: [] as {
      id: number,
      dateTime: Date,
      service: string,
      bay: number,
      brand: string,
      model: string,
      year: number,
      status: string
    }[],
    nextAppointments: [] as {
      id: number,
      dateTime: Date,
      service: string,
      bay: number,
      brand: string,
      model: string,
      year: number,
      status: string
    }[],
    canceledAppointments: [] as {
      id: number,
      dateTime: Date,
      service: string,
      bay: number,
      brand: string,
      model: string,
      year: number,
      status: string
    }[],
    newAppointment: {
      id: -1,
      dateTime: new Date(),
      service: "",
      bay: -1,
      brand: "",
      model: "",
      year: -1,
      status: "",
    },
  }),
  getters: {
    getPastAppointments: (state) => state.pastAppointments,
    getNextAppointments: (state) => state.nextAppointments,
    getCanceledAppointments: (state) => state.canceledAppointments
  },
  actions: {
    async fetchPastAppointments() {
      this.pastAppointments = [];
      //dummy data
      const appointmentData1 = {
        id: 1, 
        dateTime: new Date('2024-10-01T12:00:00'),
        service: 'Repair',
        bay: 1,
        brand: 'Toyota',
        model: 'Camry',
        year: 2022,
        status: 'Completed'
      };
      const appointmentData2 = {
        id: 2, 
        dateTime: new Date('2024-10-01T12:00:00'),
        service: 'Repair',
        bay: 1,
        brand: 'Toyota',
        model: 'Camry',
        year: 2022,
        status: 'Completed'
      };
      this.pastAppointments.push(appointmentData1);
      this.pastAppointments.push(appointmentData2);
      this.pastAppointments.push(appointmentData1);
      this.pastAppointments.push(appointmentData2);
    },
    async fetchNextAppointments() {
      this.nextAppointments = [];
      //dummy data
      const appointmentData3 = {
        id: 3, 
        dateTime: new Date('2024-10-01T12:00:00'),
        service: 'Repair',
        bay: 1,
        brand: 'Toyota',
        model: 'Camry',
        year: 2022,
        status: 'next'
      };
      const appointmentData4 = {
        id: 4, 
        dateTime: new Date('2024-10-01T12:00:00'),
        service: 'Repair',
        bay: 1,
        brand: 'Toyota',
        model: 'Camry',
        year: 2022,
        status: 'next'
      };
      this.nextAppointments.push(appointmentData3);
      this.nextAppointments.push(appointmentData4);
    },
    async fetchCanceledAppointments() {
      this.canceledAppointments = [];
      //dummy data
      const appointmentData5 = {
        id: 5, 
        dateTime: new Date('2024-10-01T12:00:00'),
        service: 'Repair',
        bay: 1,
        brand: 'Toyota',
        model: 'Camry',
        year: 2022,
        status: 'cancelled'
      };
      const appointmentData6 = {
        id: 6, 
        dateTime: new Date('2024-10-01T12:00:00'),
        service: 'Repair',
        bay: 1,
        brand: 'Toyota',
        model: 'Camry',
        year: 2022,
        status: 'cancelled'
      };
      this.canceledAppointments.push(appointmentData5);
      this.canceledAppointments.push(appointmentData6);
    },
  },
});