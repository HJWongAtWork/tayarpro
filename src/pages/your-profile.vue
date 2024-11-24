<template>
  <div class="title-page">
    <div class="line"></div>
    <h2 class="no-background text-center">
      <span><strong>YOUR PROFILE</strong></span>
    </h2>
    <div class="line"></div>
  </div>
  <Loader v-if="loading" height="300px" width="300px" />
  <v-container v-else max-width="1200">
    <v-row>
      <v-col cols="12" sm="12" md="3">
        <v-card class="pa-4">
          <v-row>
            <v-col
              cols="12"
              class="text-center fill-height d-flex flex-column align-center justify-center"
            >
              <div
                id="image-container"
                class="d-flex justify-center align-center"
              >
                <v-img v-if="imageUrl" :src="imageUrl" class="image-preview" />
                <v-icon v-else size="150">mdi-account-circle</v-icon>
              </div>
            </v-col>
            <v-col cols="12" class="text-center">
              <div class="d-flex flex-column align-center">
                <h5>User ID:</h5>
                <h5>{{ accountId }}</h5>
              </div>
            </v-col>
            <v-col cols="12" class="text-center">
              <v-file-input
                v-model="file"
                accept=".jpg, .jpeg, .png"
                @change="handleFileChange"
                hide-input
                style="display: none"
              />
              <v-btn
                v-if="imageUrl"
                :disabled="!isEdit"
                height="40"
                width="200"
                @click="confirmRemovePicture = true"
              >
                <div class="text-h6 d-flex">
                  <v-icon left size="30"> mdi-cancel </v-icon>
                  Remove Picture
                </div>
              </v-btn>
              <v-btn v-else height="40" width="200" @click="triggerFileInput">
                <div class="text-h6 d-flex">Upload</div>
              </v-btn>
            </v-col>
            <v-col cols="12" class="text-center">
              <div v-if="isLargeScreen">
                <v-list>
                  <v-list-item
                    @click="
                      menu = false;
                      isEdit = true;

                      storeOriginalValues();
                    "
                    :disabled="isEdit"
                    >Edit Info Details</v-list-item
                  >
                  <v-list-item @click="changePasswordClicked"
                    >Change Password</v-list-item
                  >
                  <router-link
                    to="/appointments"
                    style="color: black; text-decoration: none"
                  >
                    <v-list-item @click="menu = false"
                      >Manage Appointments</v-list-item
                    >
                  </router-link>
                  <!-- <v-list-item @click="pastAppointmentsDialog = true"
                    >Past Appointments</v-list-item
                  > -->
                  <v-list-item @click="confirmLogout = true" style="color: red"
                    >Log Out</v-list-item
                  >
                  <v-list-item
                    @click="confirmDeleteAccount = true"
                    style="color: red"
                    >Delete Account</v-list-item
                  >
                </v-list>
              </div>

              <div v-else>
                <v-btn @click="menu = true">More Settings</v-btn>
              </div>
              <v-dialog v-model="menu">
                <v-card>
                  <v-card-title>More Settings</v-card-title>
                  <v-card-text>
                    <v-list>
                      <v-list-item
                        @click="
                          menu = false;
                          isEdit = true;
                        "
                        :disabled="isEdit"
                        >Edit Info Details</v-list-item
                      >
                      <v-list-item @click="changePasswordClicked"
                        >Change Password</v-list-item
                      >
                      <router-link
                        to="/appointments"
                        style="color: black; text-decoration: none"
                      >
                        <v-list-item @click="menu = false"
                          >Manage Appointments</v-list-item
                        >
                      </router-link>
                      <!-- <v-list-item @click="pastAppointmentsDialog = true"
                        >Past Appointments</v-list-item
                      > -->
                      <v-list-item
                        @click="
                          menu = false;
                          confirmLogout = true;
                        "
                        style="color: red"
                        >Log Out</v-list-item
                      >
                      <v-list-item
                        @click="
                          menu = false;
                          confirmDeleteAccount = true;
                        "
                        style="color: red"
                        >Delete Account</v-list-item
                      >
                    </v-list>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn @click="menu = false">Close</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <v-col cols="12" sm="12" md="6">
        <v-card class="pa-4">
          <v-form ref="form" v-model="isValidEdit">
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <TextInput
                  labelNameUpper="Email"
                  v-model="email"
                  :isDisable="!isEdit"
                  :class="{ glow: inputs.email.hasChanged && isEdit }"
                  @input="handleInputChange('email')"
                  :rules="[rules.emailValid]"
                />
              </v-col>
              <v-col cols="12" sm="12" md="12"> </v-col>
              <v-col cols="12" sm="6" md="6">
                <TextInput
                  labelNameUpper="First Name"
                  v-model="firstname"
                  :isDisable="!isEdit"
                  :class="{ glow: inputs.firstName.hasChanged && isEdit }"
                  @input="handleInputChange('firstName')"
                />
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <TextInput
                  labelNameUpper="Last Name"
                  v-model="lastname"
                  :isDisable="!isEdit"
                  :class="{ glow: inputs.lastName.hasChanged && isEdit }"
                  @input="handleInputChange('lastName')"
                />
              </v-col>
              <v-col cols="12">
                <TextInput
                  labelNameUpper="Contact No."
                  v-model="phonenumber"
                  :isDisable="!isEdit"
                  :class="{ glow: inputs.phone.hasChanged && isEdit }"
                  @input="handleInputChange('phone')"
                  :rules="[rules.numberOnly, rules.phoneLength]"
                />
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <!-- <div style="float: right" v-if="isEdit"> -->
                <v-card-actions
                  class="d-flex justify-end"
                  style="padding-top: 20px"
                  v-if="isEdit"
                >
                  <v-btn
                    @click="handleSaveBtn()"
                    :disabled="!isValidEdit"
                    class="save-btn"
                    >Save</v-btn
                  >
                  <v-btn @click="handleCancelBtn()">Cancel</v-btn>
                </v-card-actions>
                <!-- </div> -->
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>

      <v-col cols="12" sm="12" md="3">
        <VehicleInProfile />
      </v-col>
    </v-row>
  </v-container>

  <v-dialog v-model="confirmRemovePicture" persistent width="500">
    <v-card style="text-align: center">
      <v-card-title>Profile Picture Removal Confirmation</v-card-title>
      <v-card-text>
        <p class="f24-b20">
          Are you sure you want to remove your profile picture?
        </p>
      </v-card-text>
      <v-card-actions class="d-flex justify-center align-center">
        <v-btn
          class="save-btn"
          @click="
            cancelUpload();
            confirmRemovePicture = false;
          "
          >Confirm</v-btn
        >
        <v-btn class="save-btn" @click="confirmRemovePicture = false"
          >Cancel</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-model="confirmLogout" persistent width="500">
    <v-card style="text-align: center">
      <v-card-title>Logout Confirmation</v-card-title>
      <v-card-text>
        <p class="f24-b20">Are you sure you want to logout?</p>
      </v-card-text>
      <v-card-actions class="d-flex justify-center align-center">
        <v-btn class="save-btn" @click="handleLogout" :loading="isLoggingOut">
          Confirm
        </v-btn>
        <v-btn class="save-btn" @click="confirmLogout = false"> Cancel </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-model="confirmDeleteAccount" persistent width="500">
    <v-card style="text-align: center">
      <v-card-title>Account Deletion Confirmation</v-card-title>
      <v-card-text>
        <p class="f24-b20">Are you sure you want to delete your account?</p>
        <p class="text-red">This action cannot be undone.</p>
      </v-card-text>
      <v-card-actions class="d-flex justify-center align-center">
        <v-btn
          class="save-btn"
          color="error"
          @click="handleDeleteAccount"
          :loading="isDeleting"
        >
          Delete Account
        </v-btn>
        <v-btn class="save-btn" @click="confirmDeleteAccount = false">
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-model="changePassword" max-width="500" persistent>
    <v-card>
      <v-card-title class="text-h5">Change Password</v-card-title>

      <v-card-text>
        <!-- Form for changing password -->
        <v-form ref="form" v-model="isValidCP">
          <!-- <v-text-field label="Current Password" v-model="currentPassword" type="text"
            :rules="[rules.required, rules.checkPwValid]" required></v-text-field> -->

          <v-text-field
            label="New Password"
            v-model="newPassword"
            :type="showPassword ? 'text' : 'password'"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            :rules="[rules.required, rules.passwordStrength]"
            required
          ></v-text-field>

          <v-text-field
            label="Confirm New Password"
            v-model="confirmPassword"
            :type="showConfirmPassword ? 'text' : 'password'"
            :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showConfirmPassword = !showConfirmPassword"
            :rules="[rules.required, confirmPasswordRule]"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <!-- Cancel and Submit Buttons -->
        <v-spacer></v-spacer>
        <v-btn color="blue-grey" text @click="changePassword = false"
          >Cancel</v-btn
        >
        <v-btn color="primary" :disabled="!isValidCP" @click="handleSubmitBtn"
          >Submit</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, reactive } from "vue";
import { useRouter } from "vue-router";
import { useDateFormatter } from "@/composables/useDateFormatter";
import TextInput from "@/components/TextInputComponent.vue";
import { useUserComposable } from "@/composables/userComposable";
import { vehicleComposable } from "@/composables/vehicleComposable";
// import { appointmentComposable } from "@/composables/appointmentComposable";
import { useUserStore } from "@/stores/userStore";
import axios from "axios";

// Constants
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const userStore = useUserStore();
const router = useRouter();

// Composables
const {
  email,
  phonenumber,
  firstname,
  lastname,
  updateUserStore,
  resetToStoreValues,
} = useUserComposable();

const { accountid } = vehicleComposable();

// const { pastAppointments } = appointmentComposable();

// Refs
const form = ref(null);
const originalValues = ref({
  email: "",
  firstname: "",
  lastname: "",
  phonenumber: "",
});

const menu = ref(false);
const isLargeScreen = ref(window.innerWidth >= 960);
const isEdit = ref(false);
const isChanged = ref(false);
const file = ref(null);
const imageUrl = ref(null);
const confirmRemovePicture = ref(false);
const confirmLogout = ref(false);
const confirmDeleteAccount = ref(false);
const changePassword = ref(false);
const isValidCP = ref(false);
const isValidEdit = ref(false);
// const isValidAddVehicle = ref(false);
const currentPassword = ref("");
const newPassword = ref("");
const confirmPassword = ref("");
const showPassword = ref(false);
const showConfirmPassword = ref(false);
// const pastAppointmentsDialog = ref(false);
const showAll = ref(false);
// const vehicleDialog = ref(false);
// const vehicleDialogAction = ref("");
// const selectedVehicleId = ref(null);
const passwordInput = ref("");
const isLoggingOut = ref(false);
const isDeleting = ref(false);
const accountId = computed(() => userStore.currentUser.accountid);

const inputs = reactive({
  email: { hasChanged: false },
  phone: { hasChanged: false },
  firstName: { hasChanged: false },
  lastName: { hasChanged: false },
  gender: { hasChanged: false },
});

// Validation Rules
const rules = {
  required: (v) => !!v || "This field is required",
  confirmPasswordRule: (value) =>
    (value === newPassword.value && rules.passwordStrength(v) === true) ||
    "Passwords must match and meet the strength requirements",
  checkPwValid: (value) =>
    value === passwordInput.value || "Password is not correct",
  emailValid: (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
  numberOnly: (v) => /^\d+$/.test(v) || "Must contain digits only",
  phoneLength: (v) =>
    (v.length >= 10 && v.length <= 15) || "Phone number must be 10-15 digits",
  year: (value) =>
    (value >= 1900 && value <= new Date().getFullYear()) || "Invalid year",
  bay: (value) => value > 0 || "Bay number must be greater than zero",
  passwordStrength: (v) => {
    const regex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{10,}$/;
    return (
      regex.test(v) ||
      "Password must be at least 10 characters long and include at least one capital letter, one number, and one symbol"
    );
  },
};

const confirmPasswordRule = (v) =>
  v === newPassword.value || "Passwords must match";

// Computed Properties
// const displayedVehicles = computed(() => {
//   return showAll.value ? vehicles.value : vehicles.value.slice(0, 3);
// });

const user = computed(() => userStore.currentUser);

// Methods
const updateScreenSize = () => {
  isLargeScreen.value = window.innerWidth >= 960;
};

const storeOriginalValues = () => {
  originalValues.value = {
    email: email.value,
    firstname: firstname.value,
    lastname: lastname.value,
    phonenumber: phonenumber.value,
  };
};

const checkForChanges = () => {
  isChanged.value =
    email.value !== originalValues.value.email ||
    firstname.value !== originalValues.value.firstname ||
    lastname.value !== originalValues.value.lastname ||
    phonenumber.value !== originalValues.value.phonenumber;

  if (isEdit.value && form.value) {
    form.value.validate();
  }
};

const handleInputChange = (field) => {
  inputs[field].hasChanged = true;
  checkForChanges();
};

const removeCssClasses = () => {
  Object.keys(inputs).forEach((key) => (inputs[key].hasChanged = false));
};

const handleFileChange = () => {
  if (imageUrl.value) {
    URL.revokeObjectURL(imageUrl.value);
    imageUrl.value = null;
  }

  if (file.value) {
    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.value.type)) {
      alert("Please select a valid image file (JPEG or PNG).");
      file.value = null;
      return;
    }
    imageUrl.value = URL.createObjectURL(file.value);
  }
};

const triggerFileInput = () => {
  document.querySelector('input[type="file"]').click();
};

const cancelUpload = () => {
  file.value = null;
  imageUrl.value = null;
};

// Add these methods in your script setup
const handleSubmitBtn = async () => {
  if (isValidCP.value) {
    try {
      const token = localStorage.getItem("jwt");
      const response = await axios.put(
        `${baseUrl}/update_password?password=${newPassword.value}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("Password changed successfully");
        changePassword.value = false;
        // Reset form values
        currentPassword.value = "";
        newPassword.value = "";
        confirmPassword.value = "";
      }
    } catch (error) {
      console.error("Error changing password:", error);
      alert(
        "Error changing password. Please check your current password and try again."
      );
    } finally {
      await initializeData();
    }
  }
};

const changePasswordClicked = () => {
  menu.value = false;
  changePassword.value = true;
  // Reset form values
  currentPassword.value = "";
  newPassword.value = "";
  confirmPassword.value = "";
  if (form.value) {
    form.value.resetValidation();
  }
};

const handleSaveBtn = async () => {
  // console.log("Saving...");
  // console.log(isChanged.value);
  // console.log(isValidEdit.value);
  if (isChanged.value && isValidEdit.value) {
    try {
      const token = localStorage.getItem("jwt");
      const updatedUserData = {
        email: email.value,
        firstname: firstname.value,
        lastname: lastname.value,
        phone_number: phonenumber.value.toString(),
      };

      const response = await axios.put(
        `${baseUrl}/update_user`,
        updatedUserData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = response.data;
      updateUserStore({
        email: result.email,
        firstname: result.firstname,
        lastname: result.lastname,
        phonenumber: result.phonenumber,
      });

      isEdit.value = false;
      storeOriginalValues();
      isChanged.value = false;
      removeCssClasses();

      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile");
    } finally {
      await initializeData();
    }
  } else if (isValidEdit.value) {
    isEdit.value = false;
    storeOriginalValues();
    isChanged.value = false;
    removeCssClasses();
  }
};

const handleLogout = async () => {
  isLoggingOut.value = true;
  try {
    localStorage.removeItem("jwt");
    userStore.clearUser();
    confirmLogout.value = false;
    router.push("/login");
  } catch (error) {
    console.error("Logout error:", error);
    alert("Error during logout. Please try again.");
  } finally {
    isLoggingOut.value = false;
  }
};

const handleDeleteAccount = async () => {
  isDeleting.value = true;
  try {
    const token = localStorage.getItem("jwt");
    await axios.post(
      `${baseUrl}/delete_account`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "application/json",
        },
      }
    );

    userStore.clearUser();
    confirmDeleteAccount.value = false;
    router.push("/login");
    alert("Account successfully deleted");
  } catch (error) {
    console.error("Account deletion error:", error);
    alert("Error deleting account. Please try again.");
  } finally {
    isDeleting.value = false;
  }
};

const handleCancelBtn = () => {
  // Reset form values to original values
  email.value = originalValues.value.email;
  firstname.value = originalValues.value.firstname;
  lastname.value = originalValues.value.lastname;
  phonenumber.value = originalValues.value.phonenumber;

  // Reset edit mode and changes
  isEdit.value = false;
  isChanged.value = false;

  // Remove CSS classes
  removeCssClasses();

  // Reset form validation
  if (form.value) {
    form.value.resetValidation();
  }
};

const loading = ref(true);
const initializeData = async () => {
  loading.value = true;
  const delay = new Promise((resolve) => setTimeout(resolve, 1000));
  try {
    await Promise.all([resetToStoreValues(), storeOriginalValues(), delay]);
  } catch (error) {
    console.error("Error during initialization:", error);
  } finally {
    loading.value = false;
  }
};

// Lifecycle Hooks
onMounted(async () => {
  document.title = "Your Profile";

  //resetToStoreValues();
  //fetchPastAppointments();
  window.addEventListener("resize", updateScreenSize);
  // storeOriginalValues();

  await initializeData();
});

onBeforeUnmount(() => {
  if (imageUrl.value) {
    URL.revokeObjectURL(imageUrl.value);
    imageUrl.value = null;
  }
  window.removeEventListener("resize", updateScreenSize);
});
</script>

<style scoped>
.save-btn {
  margin-right: 50px;
  background-color: red;
  color: white;
}

.italicBold {
  font-style: italic;
  font-weight: bold;
}

.glow {
  box-shadow: 0 0 10px 2px rgba(0, 255, 0, 0.8) !important;
  /* green glowing effect */
}

#image-container {
  width: 200px;
  /* Fixed width */
  height: 200px;
  /* Fixed height */
  border: 2px dashed #ccc;
  /* Dashed border for visual effect */
  background-color: #f5f5f5;
  /* Light background color */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  /* Hide overflow to contain image */
  border-radius: 50%;
}

.image-preview {
  max-width: 100%;
  /* Ensure the image does not exceed the container's width */
  max-height: 100%;
  /* Ensure the image does not exceed the container's height */
  object-fit: cover;
  /* Cover the container while maintaining aspect ratio */
}

.title-page .line {
  height: 3px;
  flex: 1;
  background-color: #000;
}
.title-page {
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 2rem auto;
}
.title-page h2 {
  padding: 0 2rem;
}
</style>
