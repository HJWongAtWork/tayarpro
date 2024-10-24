import { defineStore } from "pinia";
import axios from "axios";

export const useDashboardStore = defineStore("dashboard", {
  state: () => ({
    userData: [],
  }),
  actions: {
    async fetchData() {
      try {
        const response = await axios.get("/api/users");
        const data = response.data;

        this.userData = data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },
  getters: {
    allCustomers() {
      return this.userData.filter((item) => { return !item.is_admin }).map((item) => { return {
        "username": item["username"],
        "email": item["email"],
        "gender": item["gender"],
        "city": item["city"],
        "state": item["state"],
        "created At": item["created_at"],
      } })
    },
    allAdmins() {
      return this.userData.filter((item) => { return item.is_admin }).map((item) => { return {
        "username": item["username"],
        "email": item["email"],
        "gender": item["gender"],
        "city": item["city"],
        "state": item["state"],
        "created At": item["created_at"],
      } })
    },
    totalCustomers() {
      return this.userData.reduce((sum, i) => sum + 1, 0);
    },
    maleToFemaleRatio() {
        const m = this.userData.reduce((sum, i) => i.gender === "male" ? sum + 1 : sum, 0);
        return `${m} : ${this.totalCustomers - m}`;
    }
  },
});
