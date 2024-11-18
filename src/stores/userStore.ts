import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const currentUser = ref({
    accountid: null as number | null,
    firstname: null as string | null,
    lastname: null as string | null,
    phonenumber: null as string | null,
    email: null as string | null,
    fulladdress: {
      address: null as string | null,
      city: null as string | null,
      state: null as string | null,
      zipcode: null as string | null,
    },
    fullname: null as string | null,
    isLoggedIn: false,
    isadmin: null as boolean | null,
    gender: null as string | null,
    dob: null as string | null,
  });

  const selectedCar = ref({
    carid: null as number | null,
    carbrand: null as string | null,
    carmodel: null as string | null,
    platenumber: null as string | null,
    displayText: null as string | null,
    tyresize: null as string | null,
  });

  function setUser(userData: {
    accountid: number;
    firstname: string;
    lastname: string;
    phonenumber: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zipcode: string;
    fullname: string;
    isadmin: boolean;
    gender: string;
    dob: string;
  }) {
    currentUser.value = {
      ...userData,
      fulladdress: {
        address: userData.address,
        city: userData.city,
        state: userData.state,
        zipcode: userData.zipcode,
      },
      isLoggedIn: true,
    };
    localStorage.setItem("user", JSON.stringify(userData));
  }

  function setSelectedCar(car: {
    carid: number | null;
    carbrand: string | null;
    carmodel: string | null;
    platenumber: string | null;
    displayText: string | null;
    tyresize: string | null;
  }) {
    selectedCar.value = car;
    localStorage.setItem("selectedCar", JSON.stringify(car));
  }

  function clearUser() {
    currentUser.value = {
      accountid: null,
      firstname: null,
      lastname: null,
      phonenumber: null,
      email: null,
      fulladdress: {
        address: null,
        city: null,
        state: null,
        zipcode: null,
      },
      fullname: null,
      isLoggedIn: false,
      isadmin: null,
      gender: null,
      dob: null,
    };
    selectedCar.value = {
      carid: null,
      carbrand: null,
      carmodel: null,
      platenumber: null,
      displayText: null,
      tyresize: null,
    };
    localStorage.removeItem("user");
    localStorage.removeItem("selectedCar");
  }

  function initializeFromLocalStorage() {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        console.error("Error parsing stored user data:", error);
      }
    }

    const storedCar = localStorage.getItem("selectedCar");
    if (storedCar) {
      try {
        selectedCar.value = JSON.parse(storedCar);
      } catch (error) {
        console.error("Error parsing stored car data:", error);
      }
    }
  }

  return {
    currentUser,
    selectedCar,
    setUser,
    clearUser,
    initializeFromLocalStorage,
    setSelectedCar,
  };
});
