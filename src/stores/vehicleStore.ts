import { defineStore } from "pinia";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const useVehicleStore = defineStore("vehicleStore", {
  state: () => ({
    vehicles: [] as {
      id: number;
      plateNumber: string;
      brand: string;
      model: string;
      year: number;
      tyreSize: string;
      type: string;
    }[],
    cars: [] as {
      caryear: number;
      carid: number;
      carbrand: string;
      tyresize: string;
      createdat: string;
      accountid: string;
      carmodel: string;
      platenumber: string;
      cartype: string;
    }[],
    selectedCar: null as {
      carid: number;
      //carid: -1;
      carbrand: string;
      carmodel: string;
      caryear: number;
      //caryear:-1;
      platenumber: string;
      createdat: string;
      tyresize: string;
      cartype: string;
      accountid: string;
    } | null,
  }),
  getters: {
    getVehicles: (state) => state.vehicles,
    getCars: (state) => state.cars,
    // kai
    getCarOptions: (state) =>
      state.cars.map((car) => ({
        text: `${car.carbrand} ${car.carmodel} ${car.platenumber}`,
        value: car.carid,
      })),
  },
  actions: {
    async fetchVehicles() {
      this.vehicles.splice(0, this.vehicles.length);
      const token = localStorage.getItem("jwt");
      if (!token) {
        this.cars = [];
        this.selectedCar = null;
        return;
      }
      //console.log("token from car store: " + (token !== null));
      try {
        const response = await axios.post(
          `${baseUrl}/view_car`,
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
          type: car.cartype,
        }));
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    },
    setSelectedCar(carId: number | string | null) {
      if (carId === null || carId === "all") {
        this.selectedCar = null;
      } else {
        const foundCar = this.cars.find((car) => car.carid === carId);
        this.selectedCar = foundCar ? { ...foundCar } : null;
      }
    },
  },
});
