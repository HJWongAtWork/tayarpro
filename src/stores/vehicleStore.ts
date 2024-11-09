import { defineStore } from 'pinia';

export const vehicleStore = defineStore('vehicleStore', {
  state: () => ({
    vehicles: [] as {
      id: number,
      plateNumber: string,
      brand: string,
      model: string,
      year: number
    }[]
  }),
  getters: {
    getUsers: (state) => state.vehicles,
  },
  actions: {
    async fetchVehicles() {
      //dummy data
      const vehicleData1 = {
        id: 1, 
        plateNumber: 'ABC123',
        brand: 'Toyota',
        model: 'Camry', 
        year: 2022
      };
      this.vehicles.push(vehicleData1);
      const vehicleData2 = {
        id: 2, 
        plateNumber: 'DEF456',
        brand: 'Honda',
        model: 'Civic',
        year: 2021
      };
      this.vehicles.push(vehicleData2);
      const vehicleData3 = {
        id: 3, 
        plateNumber: 'GHI789',
        brand: 'Proton',
        model: 'Exora',
        year: 2020
      };
      this.vehicles.push(vehicleData3);
    },
  },
});