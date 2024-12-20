import { defineStore } from 'pinia';
import axios from 'axios';

interface ServiceDetail {
  typeid: string;
  serviceid: string;
  cartype: string;
  description: string;
  price: number;
  status: string;
}

export const useServiceStore = defineStore('serviceStore', {
  state: () => ({
    serviceDetails: [] as ServiceDetail[]
  }),
  actions: {
    async fetchServiceDetails() {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      try {
        const response = await axios.get<any[]>(`${baseUrl}/get_all_services`);
        const mappedData = response.data.map((service) => ({
          typeid: service.typeid,
          serviceid: service.serviceid,
          cartype: service.cartype,
          description: service.description,
          price: service.price,
          status: service.status,
        }));
        this.serviceDetails = mappedData;
      } catch (error) {
        console.error('Error fetching service details:', error);
        // Handle error appropriately
      }
    },
  },
});
    