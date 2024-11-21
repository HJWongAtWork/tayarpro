import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const currentUser = ref({
    accountid: "",
    firstname: "",
    lastname: "",
    phonenumber: "",
    email: "",
    // fulladdress: {
    //   address: "",
    //   city: "",
    //   state: "",
    //   zipcode: "",
    // },
    // fullname: "",
    isLoggedIn: false,
    isadmin: null as boolean | null,
    // gender: "",
    // dob: "",
  });
  function setUser(userData: {
    accountid: string;
    firstname: string;
    lastname: string;
    phonenumber: string;
    email: string;
    // address: string;
    // city: string;
    // state: string;
    // zipcode: string;
    // fullname: string;
    isadmin: boolean;
    // gender: string;
    // dob: string;
  }) {
    currentUser.value = {
      // fulladdress: {
      //   address: userData.address,
      //   city: userData.city,
      //   state: userData.state,
      //   zipcode: userData.zipcode,
      // },

      ...currentUser.value,
      ...userData,
      isLoggedIn: true,
    };
    localStorage.setItem("user", JSON.stringify(currentUser.value));
    localStorage.setItem("isLoggedIn", "true");
  }

  // function setSelectedCar(car: {
  //   carid: number | null;
  //   carbrand: string | null;
  //   carmodel: string | null;
  //   platenumber: string | null;
  //   displayText: string | null;
  //   tyresize: string | null;
  // }) {
  //   selectedCar.value = car;
  //   localStorage.setItem("selectedCar", JSON.stringify(car));
  // }

  function clearUser() {
    currentUser.value = {
      accountid: "",
      firstname: "",
      lastname: "",
      phonenumber: "",
      email: "",
      // fulladdress: {
      //   address: "",
      //   city: "",
      //   state: "",
      //   zipcode: "",
      // },
      // fullname: "",
      isLoggedIn: false,
      isadmin: null,
      // gender: "",
      // dob: "",
    };
    // selectedCar.value = {
    //   carid: null,
    //   carbrand: null,
    //   carmodel: null,
    //   platenumber: null,
    //   displayText: null,
    //   tyresize: null,
    // };
    localStorage.removeItem("user");
    localStorage.removeItem("username");
    localStorage.removeItem("user-state");
    // localStorage.removeItem("selectedCar");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("jwt");
  }

  function initializeFromLocalStorage() {
    const storedUser = localStorage.getItem("user");
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    if (storedUser && storedIsLoggedIn === "true") {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        console.error("Error parsing stored user data:", error);
      }
    }

    // const storedCar = localStorage.getItem("selectedCar");
    // if (storedCar) {
    //   try {
    //     selectedCar.value = JSON.parse(storedCar);
    //   } catch (error) {
    //     console.error("Error parsing stored car data:", error);
    //   }
    // }
  }

  return {
    currentUser,
    // selectedCar,
    setUser,
    clearUser,
    initializeFromLocalStorage,
    // setSelectedCar,
  };
});
