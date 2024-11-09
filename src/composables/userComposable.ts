import { userStore } from "@/stores/userStore";

export const userComposable = () => {
  const user_store = userStore();
  const { users } = toRefs(user_store);
  const idInput = ref(0);
  const emailInput = ref("");
  const phoneInput = ref("");
  const firstNameInput = ref("");
  const lastNameInput = ref("");
  const genderInput = ref("");
  const dateOfBirthInput = ref(new Date());
  //const dateOfBirthInput = ref("");
  const addressInput = ref("");
  const postalcodeInput = ref("");
  const cityInput = ref("");
  const stateInput = ref("");
  const countryInput = ref("");
  const passwordInput = ref("");

  const fetchUser = async () => {
    await user_store.fetchUser();
  };

  const editUserData = () => {
    users.value[0].email = emailInput.value;
    users.value[0].phone = phoneInput.value;
    users.value[0].firstName = firstNameInput.value;
    users.value[0].lastName = lastNameInput.value;
    users.value[0].gender = genderInput.value;
    users.value[0].dateOfBirth = dateOfBirthInput.value;
    users.value[0].address = addressInput.value;
    users.value[0].postalcode = postalcodeInput.value;
    users.value[0].city = cityInput.value;
    users.value[0].state = stateInput.value;
    users.value[0].country = countryInput.value;
    users.value[0].password = passwordInput.value;
    console.log(users.value[0]);
  };

  const setInputToUserData = () => {
    idInput.value = users.value[0].id;
    emailInput.value = users.value[0].email;
    phoneInput.value = users.value[0].phone;
    firstNameInput.value = users.value[0].firstName;
    lastNameInput.value = users.value[0].lastName;
    genderInput.value = users.value[0].gender;
    dateOfBirthInput.value = users.value[0].dateOfBirth;
    addressInput.value = users.value[0].address;
    postalcodeInput.value = users.value[0].postalcode;
    cityInput.value = users.value[0].city;
    stateInput.value = users.value[0].state;
    countryInput.value = users.value[0].country;
    passwordInput.value = users.value[0].password;
  };

  return {
    users,
    fetchUser,
    editUserData,
    setInputToUserData,
    idInput,
    emailInput,
    phoneInput,
    firstNameInput,
    lastNameInput,
    genderInput,
    dateOfBirthInput,
    addressInput,
    postalcodeInput,
    cityInput,
    stateInput,
    countryInput,
    passwordInput
  };
}