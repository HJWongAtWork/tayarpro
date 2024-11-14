import { defineStore } from 'pinia';
import axios from 'axios';

interface TyreDetail {
  brandid: string;
  itemid: string;
  cartype: string;
  description: string;
  unitprice: number;
  status: string;
}

export const useTyreStore = defineStore('tyreStore', {
  state: () => ({
    tyreDetails: [] as TyreDetail[],
  }),
  actions: {
    async fetchTyreDetails() {
      try {
        const response = await axios.get<any[]>('http://127.0.0.1:8000/get_all_tyres');
        const mappedData = response.data.map((tyre) => ({
          brandid: tyre.brandid,
          itemid: tyre.itemid,
          cartype: tyre.cartype,
          description: tyre.description,
          unitprice: tyre.unitprice,
          status: tyre.status
        }));
        this.tyreDetails = mappedData;
      } catch (error) {
        console.error('Error fetching tyre details:', error);
        // Handle error appropriately
      }
    },
  },
});