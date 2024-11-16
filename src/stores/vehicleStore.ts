import { defineStore } from 'pinia';

export const vehicleStore = defineStore('vehicleStore', {
  state: () => ({
    vehicles: [] as {
      id: number,
      plateNumber: string,
      brand: string,
      model: string,
      year: number,
      tyreSize: string
    }[]
  }),
  getters: {
    getVehicles: (state) => state.vehicles,
  },
  actions: {
    async fetchVehicles() {
      this.vehicles.splice(0, this.vehicles.length);
      //dummy data
      const vehicleData1 = {
        id: 1, 
        plateNumber: 'ABC123',
        brand: 'Toyota',
        model: 'Camry', 
        year: 2022,
        tyreSize: '275/35'
      };
      this.vehicles.push(vehicleData1);
      const vehicleData2 = {
        id: 2, 
        plateNumber: 'DEF456',
        brand: 'Honda',
        model: 'Civic',
        year: 2021,
        tyreSize: '275/35'
      };
      this.vehicles.push(vehicleData2);
      const vehicleData3 = {
        id: 3, 
        plateNumber: 'GHI789',
        brand: 'Proton',
        model: 'Exora',
        year: 2020,
        tyreSize: '275/35'
      };
      this.vehicles.push(vehicleData3);
      // this.vehicles.push(vehicleData1);
      // this.vehicles.push(vehicleData2);
      // this.vehicles.push(vehicleData3);
    },
  },
});