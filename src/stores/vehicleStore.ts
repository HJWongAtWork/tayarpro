import { defineStore } from 'pinia';
import axios from "axios";

export const vehicleStore = defineStore('vehicleStore', {
  state: () => ({
    vehicles: [] as {
      id: number,
      plateNumber: string,
      brand: string,
      model: string,
      year: number,
      tyreSize: string,
      type: string
    }[],
    cars: [] as {
      caryear: number,
      carid: number,
      carbrand: string,
      tyresize: string,
      createdat: string,
      accountid: string,
      carmodel: string,
      platenumber: string,
      cartype: string
    }[],
    selectedCar: {
      carid: -1,
      carbrand: "",
      carmodel: "",
      caryear: -1,
      platenumber: "",
      tyresize: "",
      cartype: ""
    }
  }),
  getters: {
    getVehicles: (state) => state.vehicles,
    getCars: (state) => state.cars
  },
  actions: {
    async fetchVehicles() {
      this.vehicles.splice(0, this.vehicles.length);
      const token = localStorage.getItem("jwt");
      //console.log("token from car store: " + (token !== null));
      try {
        const response = await axios.post(
          "/api/view_car",
          "", // Empty string as data
          {
            headers: {
              Authorization: `Bearer ${token}`,
              accept: "application/json",
            },
          }
        );
        this.cars = response.data.map((car: any) => ({
          ...car,
        }));
        this.vehicles = this.cars.map((car) => ({
          id: car.carid,
          plateNumber: car.platenumber,
          brand: car.carbrand,
          model: car.carmodel,
          year: car.caryear,
          tyreSize: car.tyresize,
          type: car.cartype
        }));
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      };
    },
  },
});