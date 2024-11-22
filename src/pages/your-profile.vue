<template>
  <v-container max-width="1200">
    <v-row>
      <v-col cols="12" sm="12" md="12">
        <h1>Your Profile</h1>
      </v-col>
      <v-col cols="12" sm="12" md="3">
        <v-card class="pa-4">
          <v-row>
            <v-col cols="12" class="text-center fill-height d-flex flex-column align-center justify-center">
              <div id="image-container" class="d-flex justify-center align-center">
                <v-img v-if="imageUrl" :src="imageUrl" class="image-preview" />
                <v-icon v-else size="150">mdi-account-circle</v-icon>
              </div>
            </v-col>
            <v-col cols="12" class="text-center">
              <h6>User ID: {{ accountid }}</h6>
            </v-col>
            <v-col cols="12" class="text-center">
              <v-file-input v-model="file" accept=".jpg, .jpeg, .png" @change="handleFileChange" hide-input
                style="display: none" />
              <v-btn v-if="imageUrl" :disabled="!isEdit" height="40" width="200" @click="confirmRemovePicture = true">
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
                  <v-list-item @click="pastAppointmentsDialog = true">Past Appointments</v-list-item>
                  <v-list-item @click="confirmLogout = true" style="color: red">Log Out</v-list-item>
                  <v-list-item @click="confirmDeleteAccount = true" style="color: red">Delete Account</v-list-item>
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
                      <v-list-item @click="
                        menu = false;
                      isEdit = true;
                      " :disabled="isEdit">Edit Info Details</v-list-item>
                      <v-list-item @click="changePasswordClicked">Change Password</v-list-item>
                      <router-link to="/appointments" style="color: black; text-decoration: none">
                        <v-list-item @click="menu = false">Manage Appointments</v-list-item>
                      </router-link>
                      <v-list-item @click="pastAppointmentsDialog = true">Past Appointments</v-list-item>
                      <v-list-item @click="
                        menu = false;
                      confirmLogout = true;
                      " style="color: red">Log Out</v-list-item>
                      <v-list-item @click="
                        menu = false;
                      confirmDeleteAccount = true;
                      " style="color: red">Delete Account</v-list-item>
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
                  style="font-size: 24px"
                  v-model="email"
                  :isDisable="!isEdit"
                  :class="{ glow: inputs.email.hasChanged && isEdit }"
                  @input="
                    this.inputs.email.hasChanged = true;
                    checkForChanges();
                  "
                  :rules="[rules.emailValid]"
                />
              </v-col>
              <v-col cols="12" sm="12" md="12"> </v-col>
              <v-col cols="12" sm="6" md="6">
                <TextInput
                  labelNameUpper="First Name"
                  style="font-size: 24px"
                  v-model="firstname"
                  :isDisable="!isEdit"
                  :class="{ glow: inputs.firstName.hasChanged && isEdit }"
                  @input="
                    this.inputs.firstName.hasChanged = true;
                    checkForChanges();
                  "
                />
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <TextInput
                  labelNameUpper="Last Name"
                  style="font-size: 24px"
                  v-model="lastname"
                  :isDisable="!isEdit"
                  :class="{ glow: inputs.lastName.hasChanged && isEdit }"
                  @input="
                    this.inputs.lastName.hasChanged = true;
                    checkForChanges();
                  "
                />
              </v-col>
              <v-col cols="12">
                <TextInput
                  labelNameUpper="Contact No."
                  style="font-size: 24px"
                  v-model="phonenumber"
                  :isDisable="!isEdit"
                  :class="{ glow: inputs.phone.hasChanged && isEdit }"
                  @input="
                    this.inputs.phone.hasChanged = true;
                    checkForChanges();
                  "
                  :rules="[rules.numberOnly, rules.phoneLength]"
                />
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <!-- <div style="float: right" v-if="isEdit"> -->
                <v-card-actions class="d-flex justify-end" style="padding-top: 20px" v-if="isEdit">
                  <v-btn @click="handleSaveBtn()" :disabled="!isValidEdit" class="save-btn">Save</v-btn>
                  <v-btn @click="handleCancelBtn()">Cancel</v-btn>
                </v-card-actions>
                <!-- </div> -->
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>

      <v-col cols="12" sm="12" md="3">
        <v-card class="pa-4">
          <v-col cols="12" sm="12" md="12">
            <h1>Vehicles</h1>
          </v-col>
          <v-col cols="12" sm="12" md="12">
            <v-btn class="save-btn" @click="handleVehicleDialog(newCar, 'add', null)">
              + Add Vehicle
            </v-btn>
          </v-col>
          <v-col v-for="car in displayedVehicles" :key="car.id" cols="12" sm="12" md="12">
            <v-card class="pa-4">
              <v-card-title>{{ car.plateNumber }}</v-card-title>
              <v-card-subtitle>{{ car.brand }} {{ car.model }} ({{
                car.year
              }})</v-card-subtitle>
              <v-card-actions class="d-flex justify-end" style="padding-top: 20px">
                <v-icon class="small-icon text-green glow-on-hover" style="margin-right: 20px"
                  @click="handleVehicleDialog(car, 'edit', car.id)">
                  mdi-pencil
                </v-icon>
                <v-icon class="small-icon text-red glow-on-hover"
                  @click="handleVehicleDialog(car, 'delete', car.id)">mdi-delete</v-icon>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col v-if="vehicles.length > 3" cols="12" class="text-center mt-4">
            <v-btn text @click="this.showAll = !this.showAll">
              {{ showAll ? "Hide some..." : "Show more..." }}
            </v-btn>
          </v-col>
        </v-card>
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
        <v-btn class="save-btn" @click="
          cancelUpload();
        confirmRemovePicture = false;
        ">Confirm</v-btn>
        <v-btn class="save-btn" @click="confirmRemovePicture = false">Cancel</v-btn>
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
        <v-btn class="save-btn" @click="confirmLogout = false">
          Cancel
        </v-btn>
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
        <v-btn class="save-btn" color="error" @click="handleDeleteAccount" :loading="isDeleting">
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
          <v-text-field label="Current Password" v-model="currentPassword" type="text"
            :rules="[rules.required, rules.checkPwValid]" required></v-text-field>

          <v-text-field label="New Password" v-model="newPassword" type="text" :rules="[rules.required]"
            required></v-text-field>

          <v-text-field label="Confirm New Password" v-model="confirmPassword" type="text"
            :rules="[rules.required, rules.confirmPasswordRule]" required></v-text-field>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <!-- Cancel and Submit Buttons -->
        <v-spacer></v-spacer>
        <v-btn color="blue-grey" text @click="changePassword = false">Cancel</v-btn>
        <v-btn color="primary" :disabled="!isValidCP" @click="handleSubmitBtn">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-model="pastAppointmentsDialog" max-width="2000px">
    <v-card>
      <v-card-title>Past Appointments</v-card-title>
      <v-card-text>
        <v-row>
          <v-col v-for="appt in pastAppointments.slice(0, 3)" :key="appt.id" cols="12" sm="12" md="3">
            <v-card>
              <v-card-title>
                <p>ID: {{ appt.id }}</p>
              </v-card-title>
              <v-card-subtitle>
                <p>Date: {{ appt.dateTime.toLocaleDateString() }}</p>
                <p>
                  Time:
                  {{
                    appt.dateTime.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  }}
                </p>
              </v-card-subtitle>
              <v-card-text>
                <p>Service: {{ appt.service }}</p>
                <p>Bay: {{ appt.bay }}</p>
                <p>
                  Vehicle: {{ appt.brand }} {{ appt.model }} ({{ appt.year }})
                </p>
                <p>Status: {{ appt.status }}</p>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="12" md="3" v-if="pastAppointments.length > 3">
            <v-card outlined class="d-flex align-center justify-center" height="100%">
              <v-card-title class="text-center">
                <router-link :to="{
                  path: '/appointments',
                  query: { tab: 'tab-complete' },
                }">
                  Show more...
                </router-link>
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="pastAppointmentsDialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-model="vehicleDialog" max-width="500px">
    <v-card>
      <v-card-title class="text-h5">
        <span class="headline">
          <span v-if="vehicleDialogAction === 'add'">Add Vehicle</span>
          <span v-if="vehicleDialogAction === 'edit'">Edit Vehicle</span>
          <span v-if="vehicleDialogAction === 'delete'">Delete Vehicle</span>
        </span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="isValidAddVehicle">
          <v-text-field label="Plate Number" v-model="plateNumberInput" :rules="[rules.required]" required
            :disabled="vehicleDialogAction === 'delete'"></v-text-field>
          <v-text-field label="Brand" v-model="brandInput" :rules="[rules.required]" required
            :disabled="vehicleDialogAction === 'delete'"></v-text-field>
          <v-text-field label="Model" v-model="modelInput" :rules="[rules.required]" required
            :disabled="vehicleDialogAction === 'delete'"></v-text-field>
          <v-text-field label="Year" v-model="yearInput" type="number" :rules="[rules.required, rules.year]" required
            :disabled="vehicleDialogAction === 'delete'"></v-text-field>
          <v-text-field label="Tyre Size (Optional)" v-model="tyreSizeInput" type="string"
            :disabled="vehicleDialogAction === 'delete'"></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="vehicleDialog = false">Cancel</v-btn>
        <v-btn v-if="vehicleDialogAction === 'add'" class="save-btn" style="margin-right: 0px"
          :disabled="!isValidAddVehicle" @click="handleAddVehicleBtn">Add</v-btn>
        <v-btn v-if="vehicleDialogAction === 'edit'" class="save-btn" style="margin-right: 0px"
          :disabled="!isValidAddVehicle" @click="handleEditVehicleBtn">Save</v-btn>
        <v-btn v-if="vehicleDialogAction === 'delete'" class="save-btn" style="margin-right: 0px"
          :disabled="!isValidAddVehicle" @click="handleDeleteVehicleBtn">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useDateFormatter } from "@/composables/useDateFormatter";
import TextInput from "@/components/TextInputComponent.vue";
import { useUserComposable } from "@/composables/userComposable";
import { vehicleComposable } from "@/composables/vehicleComposable";
import { appointmentComposable } from "@/composables/appointmentComposable";
import { useUserStore } from "@/stores/userStore";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const userStore = useUserStore();

// Refs
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
const currentPassword = ref("");
const newPassword = ref("");
const confirmPassword = ref("");
const pastAppointmentsDialog = ref(false);
const showAll = ref(false);
const vehicleDialog = ref(false);
const isValidAddVehicle = ref(false);
const vehicleDialogAction = ref("");
const selectedVehicleId = ref(null);
const passwordInput = ref("");
const isLoggingOut = ref(false);
const isDeleting = ref(false);
const router = useRouter();

const inputs = ref({
  email: { hasChanged: false },
  phone: { hasChanged: false },
  firstName: { hasChanged: false },
  lastName: { hasChanged: false },
  gender: { hasChanged: false },
});

const rules = {
  required: (v) => !!v || "This field is required",
  confirmPasswordRule: (value) => value === newPassword.value || "Password does not match",
  checkPwValid: (value) => value === passwordInput.value || "Password is not correct",
  emailValid: (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
  numberOnly: (v) => /^\d+$/.test(v) || "Must contain digits only",
  phoneLength: (v) => (v.length >= 10 && v.length <= 15) || "Phone number must be 10-15 digits",
  year: (value) => (value >= 1900 && value <= new Date().getFullYear()) || "Invalid year. Year must be more than 1900.",
  bay: (value) => value > 0 || "Bay number must be greater than zero.",
};

// Composables
const {
  email,
  phonenumber,
  firstname,
  lastname,
  updateUserStore,
  resetToStoreValues,
} = useUserComposable();

const {
  accountid,
  vehicles,
  plateNumberInput,
  brandInput,
  modelInput,
  yearInput,
  tyreSizeInput,
  fetchVehicles,
  getLatestVehicleId,
  addVehicle,
  editVehicle,
  deleteVehicle,
} = vehicleComposable();

const { pastAppointments, fetchPastAppointments } = appointmentComposable();

// Computed
const displayedVehicles = computed(() => {
  return showAll.value ? vehicles.value : vehicles.value.slice(0, 3);
});

const user = computed(() => userStore.currentUser);

// Methods
const handleLogout = async () => {
  isLoggingOut.value = true;
  try {
    const token = localStorage.getItem("jwt");

    // Clear local storage
    localStorage.removeItem("jwt");

    // Clear user store
    userStore.clearUser();

    // Close the dialog
    confirmLogout.value = false;

    // Redirect to login page
    router.push("/login");

  } catch (error) {
    console.error("Logout error:", error);
    alert("Error during logout. Please try again.");
  } finally {
    isLoggingOut.value = false;
  }
};

// Add this to your existing methods
const handleDeleteAccount = async () => {
  isDeleting.value = true;
  try {
    const token = localStorage.getItem("jwt");

    // Call delete account endpoint
    await axios.post(
      `${baseUrl}/delete_account`,
      {},  // no parameters needed
      {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "application/json",
        },
      }
    );

    // Clear user data using existing store function
    userStore.clearUser();

    // Close the dialog
    confirmDeleteAccount.value = false;

    // Redirect to login page
    router.push("/login");

    // Show success message
    alert("Account successfully deleted");

  } catch (error) {
    console.error("Account deletion error:", error);
    alert("Error deleting account. Please try again.");
  } finally {
    isDeleting.value = false;
  }
};

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

  if (this.isEdit && this.$refs.form) {
    this.$refs.form.validate();
  };
};

const removeCssClasses = () => {
  Object.keys(inputs.value).forEach(
    (key) => (inputs.value[key].hasChanged = false)
  );
};

const handleFileChange = () => {
  // First, revoke the previous object URL if it exists
  if (imageUrl.value) {
    URL.revokeObjectURL(imageUrl.value);
    imageUrl.value = null;
  }

  if (file.value) {
    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.value.type)) {
      alert("Please select a valid image file (JPEG or PNG).");
      file.value = null; // Clear the invalid file
      return;
    }
    imageUrl.value = URL.createObjectURL(file.value);
  }
};

const triggerFileInput = () => {
  document.querySelector('input[type="file"]').click();
};

const cancelUpload = () => {
  if (imageUrl.value) {
    URL.revokeObjectURL(imageUrl.value);
  }
  file.value = null;
  imageUrl.value = null;
};

const handleCancelBtn = () => {
  email.value = originalValues.value.email;
  firstname.value = originalValues.value.firstname;
  lastname.value = originalValues.value.lastname;
  phonenumber.value = originalValues.value.phonenumber;
  isEdit.value = false;
  isChanged.value = false;

  this.removeCssClasses();
  
  if (this.$refs.form) {
    this.$refs.form.resetValidation();
  }
  this.isValidEdit = false;
};

const changePasswordClicked = () => {
  currentPassword.value = "";
  newPassword.value = "";
  confirmPassword.value = "";
  changePassword.value = true;
};

const handleSaveBtn = async () => {
  if (isChanged.value && isValidEdit.value) {
    const token = localStorage.getItem("jwt");
    const updatedUserData = {
      email: email.value,
      firstname: firstname.value,
      lastname: lastname.value,
      phone_number: phonenumber.value.toString(),
    };
  },
  mounted() {
    window.addEventListener("resize", this.updateScreenSize);
    this.storeOriginalValues();
    // this.initialDOB = this.dateOfBirthInput;
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateScreenSize);
  },
  // watch: {
  //   dateOfBirthInput(newValue) {
  //     this.handleChangeDOB();
  //     this.initialDOB = this.dateOfBirthInput;
  //   },
  // },
  methods: {
    storeOriginalValues() {
      this.originalValues = {
        email: this.email,
        firstname: this.firstname,
        lastname: this.lastname,
        phonenumber: this.phonenumber,
      };
    },
    checkForChanges() {
      this.isChanged =
        this.email !== this.originalValues.email ||
        this.firstname !== this.originalValues.firstname ||
        this.lastname !== this.originalValues.lastname ||
        this.phonenumber !== this.originalValues.phonenumber;

      if (this.isEdit && this.$refs.form) {
        this.$refs.form.validate();
      }
    },

    async handleSaveBtn() {
      console.log(this.email);
      console.log(this.firstname);
      console.log(this.lastname);
      console.log(this.phonenumber);
      if (this.isChanged && this.isValidEdit) {
        const token = localStorage.getItem("jwt");
        const updatedUserData = {
          email: this.email,
          firstname: this.firstname,
          lastname: this.lastname,
          phone_number: this.phonenumber.toString(),
        };
        const response = await axios.put(
          `https://tayar.pro/update_user`,
          updatedUserData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = response.data;
        this.updateUserStore({
          email: result.email,
          firstname: result.firstname,
          lastname: result.lastname,
          phonenumber: result.phonenumber,
        });
        this.isEdit = false;
        this.storeOriginalValues();
        this.isChanged = false;

        this.removeCssClasses();

        alert("Profile updated successfully");
      }
    },
    handleChangeDOB() {
      if (this.initialDOB !== this.dateOfBirthInput) {
        this.inputs.dateOfBirth.hasChanged = true;
      }
    },
    updateScreenSize() {
      this.isLargeScreen = window.innerWidth >= 960;
    },
    // handleSaveBtn() {
    //   this.updateUserStore();
    //   this.isEdit = false;
    //   Object.keys(this.inputs).forEach(
    //     (key) => (this.inputs[key].hasChanged = false)
    //   );
    // },

    removeCssClasses() {
      Object.keys(this.inputs).forEach(
        (key) => (this.inputs[key].hasChanged = false)
      );
    },
    handleCancelBtn() {
      this.email = this.originalValues.email;
      this.firstname = this.originalValues.firstname;
      this.lastname = this.originalValues.lastname;
      this.phonenumber = this.originalValues.phonenumber;
      this.isEdit = false;
      this.isChanged = false;

      this.removeCssClasses();

      if (this.$refs.form) {
        this.$refs.form.resetValidation();
      }
      this.isValidEdit = false;
    },
    changePasswordClicked() {
      this.currentPassword = "";
      this.newPassword = "";
      this.confirmPassword = "";
      this.changePassword = true;
    },
    handleSubmitBtn() {
      if (this.isValidCP) {
        try {
          const token = localStorage.getItem("jwt");
          const response = axios.put(
            `https://tayar.pro/update_password`,
            {
              password: this.newPassword,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          alert("Password changed successfully");
          this.changePassword = false;
          this.currentPassword = "";
          this.newPassword = "";
          this.confirmPassword = "";
        } catch (error) {
          console.log(error);
        }
      );
      alert("Password changed successfully");
      changePassword.value = false;
      currentPassword.value = "";
      newPassword.value = "";
      confirmPassword.value = "";
    } catch (error) {
      console.error(error);
    }
  }
  passwordInput.value = newPassword.value;
  changePassword.value = false;
};

const handleVehicleDialog = (car, action, id) => {
  vehicleDialog.value = true;
  vehicleDialogAction.value = action;
  selectedVehicleId.value = id;
  if (action === "add") {
    plateNumberInput.value = "";
    brandInput.value = "";
    modelInput.value = "";
    yearInput.value = "";
    tyreSizeInput.value = "";
  } else {
    plateNumberInput.value = car.plateNumber;
    brandInput.value = car.brand;
    modelInput.value = car.model;
    yearInput.value = car.year;
    tyreSizeInput.value = car.tyreSize;
  }
};

const handleAddVehicleBtn = () => {
  if (isValidAddVehicle.value) {
    addVehicle();
    vehicleDialog.value = false;
    vehicleDialogAction.value = "";
  }
};

const handleEditVehicleBtn = () => {
  if (isValidAddVehicle.value) {
    editVehicle(selectedVehicleId.value);
    vehicleDialog.value = false;
    vehicleDialogAction.value = "";
    selectedVehicleId.value = null;
  }
};

const handleDeleteVehicleBtn = () => {
  deleteVehicle(selectedVehicleId.value);
  vehicleDialog.value = false;
  vehicleDialogAction.value = "";
  selectedVehicleId.value = null;
};

// Lifecycle hooks
onMounted(() => {
  document.title = "Your Profile";
  resetToStoreValues();
  fetchVehicles();
  fetchPastAppointments();
  window.addEventListener("resize", updateScreenSize);
  storeOriginalValues();
});

onBeforeUnmount(() => {
  // Clean up the object URL when the component is destroyed
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

.small-icon {
  font-size: 1.25rem;
  /* Adjust the size to 50% smaller (about 1.25rem) */
}

.glow-on-hover:hover {
  box-shadow: 0 0 15px grey, 0 0 30px grey;
}
</style>
