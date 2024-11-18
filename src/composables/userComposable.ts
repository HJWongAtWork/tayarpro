import { useUserStore } from "@/stores/userStore";
import { ref, computed } from "vue";

// Define an interface for the user data structure
interface UserData {
  accountid: number;
  firstname: string;
  lastname: string;
  phonenumber: string;
  email: string;
  fulladdress: {
    address: string;
    city: string;
    state: string;
    zipcode: string;
  };
  fullname: string;
  isadmin: boolean;
  gender: string;
  dob: string;
}

export function useUserComposable(
  isAdmin = false,
  editUserId: number | null = null
) {
  const userStore = useUserStore();

  const email = ref(userStore.currentUser.email || "");
  const phonenumber = ref(userStore.currentUser.phonenumber || "");
  const firstname = ref(userStore.currentUser.firstname || "");
  const lastname = ref(userStore.currentUser.lastname || "");
  const gender = ref(userStore.currentUser.gender || "");
  const dob = ref(userStore.currentUser.dob || "");
  const address = ref(userStore.currentUser.fulladdress.address || "");
  const city = ref(userStore.currentUser.fulladdress.city || "");
  const state = ref(userStore.currentUser.fulladdress.state || "");
  const zipcode = ref(userStore.currentUser.fulladdress.zipcode || "");

  const fullname = computed(() => `${firstname.value} ${lastname.value}`);

  function loadUserData() {
    if (isAdmin && editUserId) {
      // In a real application, you would fetch the user data for the given editUserId
      // For now, we'll just use the current user's data as a placeholder
      setFormData(userStore.currentUser);
    } else {
      setFormData(userStore.currentUser);
    }
  }

  function setFormData(userData: typeof userStore.currentUser) {
    email.value = userData.email || "";
    phonenumber.value = userData.phonenumber || "";
    firstname.value = userData.firstname || "";
    lastname.value = userData.lastname || "";
    gender.value = userData.gender || "";
    dob.value = userData.dob || "";
    address.value = userData.fulladdress.address || "";
    city.value = userData.fulladdress.city || "";
    state.value = userData.fulladdress.state || "";
    zipcode.value = userData.fulladdress.zipcode || "";
  }

  function updateUserStore() {
    const updatedUserData = {
      accountid:
        isAdmin && editUserId
          ? editUserId
          : (userStore.currentUser.accountid as number),
      firstname: firstname.value,
      lastname: lastname.value,
      phonenumber: phonenumber.value,
      email: email.value,
      address: address.value,
      city: city.value,
      state: state.value,
      zipcode: zipcode.value,
      fullname: fullname.value,
      isadmin: userStore.currentUser.isadmin as boolean,
      gender: gender.value,
      dob: dob.value,
    };

    if (isAdmin && editUserId) {
      // In a real application, you would update the user data for the given editUserId
      // For now, we'll just log the updated data
      console.log("Admin updating user:", updatedUserData);
    } else {
      userStore.setUser(updatedUserData);
    }
  }

  function resetToStoreValues() {
    loadUserData();
  }

  // Load user data when the composable is created
  loadUserData();

  return {
    email,
    phonenumber,
    firstname,
    lastname,
    gender,
    dob,
    address,
    city,
    state,
    zipcode,
    fullname,
    updateUserStore,
    resetToStoreValues,
  };
}
