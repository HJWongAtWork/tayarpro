import { defineStore } from "pinia";
import axios from "axios";

export interface TyreDetail {
  brandid: string;
  itemid: string;
  cartype: string;
  description: string;
  unitprice: number;
  status: string;
}

export const useTyreStore = defineStore("tyreStore", {
  state: () => ({
    tyreDetails: [] as TyreDetail[],
    randomDetails: [] as TyreDetail[],
  }),
  actions: {
    async fetchTyreDetails() {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      try {
        const response = await axios.get<any[]>(
          `${baseUrl}/get_all_tyres`
        );
        const mappedData = response.data.map((tyre) => ({
          brandid: tyre.brandid,
          itemid: tyre.itemid,
          cartype: tyre.cartype,
          description: tyre.description,
          unitprice: tyre.unitprice,
          status: tyre.status,
        }));
        this.tyreDetails = mappedData;
      } catch (error) {
        console.error("Error fetching tyre details:", error);
        // Handle error appropriately
      }
    },
    async generateRandomTyreDetails(count: number) {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      try {
        const response = await axios.get<any[]>(
          `${baseUrl}/get_all_tyres`
        );
        const mappedData = response.data.map((tyre) => ({
          brandid: tyre.brandid,
          itemid: tyre.itemid,
          cartype: tyre.cartype,
          description: tyre.description,
          unitprice: tyre.unitprice,
          status: tyre.status,
        }));

        const randomTyres = [];
        for (let i = 0; i < count; i++) {
          const randomIndex = Math.floor(Math.random() * mappedData.length);
          randomTyres.push(mappedData[randomIndex]);
        }

        this.randomDetails = randomTyres;
      } catch (error) {
        console.error("Error fetching random tyre details:", error);
        // Handle error appropriately
      }
    },
  },
});
