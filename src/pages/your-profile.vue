<template>
  <v-container max-width="1200">
    <v-row>
      <v-col cols="12" sm="12" md="12">
        <h1>Your Profile</h1>
      </v-col>
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
              <h6>User ID: {{ accountid }}</h6>
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
                      isChanged = true;
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
                  <v-list-item @click="pastAppointmentsDialog = true"
                    >Past Appointments</v-list-item
                  >
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
                      <v-list-item @click="pastAppointmentsDialog = true"
                        >Past Appointments</v-list-item
                      >
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
                  style="font-size: 24px"
                  v-model="email"
                  :isDisable="!isEdit"
                  :class="{ glow: inputs.email.hasChanged }"
                  @input="this.inputs.email.hasChanged = true"
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
                  :class="{ glow: inputs.firstName.hasChanged }"
                  @input="this.inputs.firstName.hasChanged = true"
                />
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <TextInput
                  labelNameUpper="Last Name"
                  style="font-size: 24px"
                  v-model="lastname"
                  :isDisable="!isEdit"
                  :class="{ glow: inputs.lastName.hasChanged }"
                  @input="this.inputs.lastName.hasChanged = true"
                />
              </v-col>
              <v-col cols="12">
                <TextInput
                  labelNameUpper="Contact No."
                  style="font-size: 24px"
                  v-model="phonenumber"
                  :isDisable="!isEdit"
                  :class="{ glow: inputs.phone.hasChanged }"
                  @input="this.inputs.phone.hasChanged = true"
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
        <v-card class="pa-4">
          <v-col cols="12" sm="12" md="12">
            <h1>Vehicles</h1>
          </v-col>
          <v-col cols="12" sm="12" md="12">
            <v-btn
              class="save-btn"
              @click="handleVehicleDialog(newCar, 'add', null)"
            >
              + Add Vehicle
            </v-btn>
          </v-col>
          <v-col
            v-for="car in displayedVehicles"
            :key="car.id"
            cols="12"
            sm="12"
            md="12"
          >
            <v-card class="pa-4">
              <v-card-title>{{ car.plateNumber }}</v-card-title>
              <v-card-subtitle
                >{{ car.brand }} {{ car.model }} ({{
                  car.year
                }})</v-card-subtitle
              >
              <v-card-actions
                class="d-flex justify-end"
                style="padding-top: 20px"
              >
                <v-icon
                  class="small-icon text-green glow-on-hover"
                  style="margin-right: 20px"
                  @click="handleVehicleDialog(car, 'edit', car.id)"
                >
                  mdi-pencil
                </v-icon>
                <v-icon
                  class="small-icon text-red glow-on-hover"
                  @click="handleVehicleDialog(car, 'delete', car.id)"
                  >mdi-delete</v-icon
                >
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
        <v-btn class="save-btn" @click="confirmLogout = false">Confirm</v-btn>
        <v-btn class="save-btn" @click="confirmLogout = false">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-model="confirmDeleteAccount" persistent width="500">
    <v-card style="text-align: center">
      <v-card-title>Account Deletion Confirmation</v-card-title>
      <v-card-text>
        <p class="f24-b20">Are you sure you want to delete your account?</p>
      </v-card-text>
      <v-card-actions class="d-flex justify-center align-center">
        <v-btn class="save-btn" @click="confirmDeleteAccount = false"
          >Confirm</v-btn
        >
        <v-btn class="save-btn" @click="confirmDeleteAccount = false"
          >Cancel</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-model="changePassword" max-width="500" persistent>
    <v-card>
      <v-card-title class="text-h5">Change Password</v-card-title>

      <v-card-text>
        <!-- Form for changing password -->
        <v-form ref="form" v-model="isValidCP">
          <v-text-field
            label="Current Password"
            v-model="currentPassword"
            type="text"
            :rules="[rules.required, rules.checkPwValid]"
            required
          ></v-text-field>

          <v-text-field
            label="New Password"
            v-model="newPassword"
            type="text"
            :rules="[rules.required]"
            required
          ></v-text-field>

          <v-text-field
            label="Confirm New Password"
            v-model="confirmPassword"
            type="text"
            :rules="[rules.required, rules.confirmPasswordRule]"
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

  <v-dialog v-model="pastAppointmentsDialog" max-width="2000px">
    <v-card>
      <v-card-title>Past Appointments</v-card-title>
      <v-card-text>
        <v-row>
          <v-col
            v-for="appt in pastAppointments.slice(0, 3)"
            :key="appt.id"
            cols="12"
            sm="12"
            md="3"
          >
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
            <v-card
              outlined
              class="d-flex align-center justify-center"
              height="100%"
            >
              <v-card-title class="text-center">
                <router-link
                  :to="{
                    path: '/appointments',
                    query: { tab: 'tab-complete' },
                  }"
                >
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
          <v-text-field
            label="Plate Number"
            v-model="plateNumberInput"
            :rules="[rules.required]"
            required
            :disabled="vehicleDialogAction === 'delete'"
          ></v-text-field>
          <v-text-field
            label="Brand"
            v-model="brandInput"
            :rules="[rules.required]"
            required
            :disabled="vehicleDialogAction === 'delete'"
          ></v-text-field>
          <v-text-field
            label="Model"
            v-model="modelInput"
            :rules="[rules.required]"
            required
            :disabled="vehicleDialogAction === 'delete'"
          ></v-text-field>
          <v-text-field
            label="Year"
            v-model="yearInput"
            type="number"
            :rules="[rules.required, rules.year]"
            required
            :disabled="vehicleDialogAction === 'delete'"
          ></v-text-field>
          <v-text-field
            label="Tyre Size (Optional)"
            v-model="tyreSizeInput"
            type="string"
            :disabled="vehicleDialogAction === 'delete'"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="vehicleDialog = false">Cancel</v-btn>
        <v-btn
          v-if="vehicleDialogAction === 'add'"
          class="save-btn"
          style="margin-right: 0px"
          :disabled="!isValidAddVehicle"
          @click="handleAddVehicleBtn"
          >Add</v-btn
        >
        <v-btn
          v-if="vehicleDialogAction === 'edit'"
          class="save-btn"
          style="margin-right: 0px"
          :disabled="!isValidAddVehicle"
          @click="handleEditVehicleBtn"
          >Save</v-btn
        >
        <v-btn
          v-if="vehicleDialogAction === 'delete'"
          class="save-btn"
          style="margin-right: 0px"
          :disabled="!isValidAddVehicle"
          @click="handleDeleteVehicleBtn"
          >Delete</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { useDateFormatter } from "@/composables/useDateFormatter";
import DatePicker from "@/components/DatePicker.vue";
import TextInput from "@/components/TextInputComponent.vue";
import { useUserComposable } from "@/composables/userComposable";
import { onMounted } from "vue";
import { vehicleComposable } from "@/composables/vehicleComposable";
import { appointmentComposable } from "@/composables/appointmentComposable";
import { useUserStore } from "@/stores/userStore";
import axios from "axios";

export default {
  data() {
    return {
      originalValues: {
        email: "",
        firstname: "",
        lastname: "",
        phonenumber: "",
      },
      isChanged: false,
      menu: false,
      isLargeScreen: window.innerWidth >= 960,
      maxDate: new Date(),
      isEdit: false,
      inputs: {
        email: { hasChanged: false },
        phone: { hasChanged: false },
        firstName: { hasChanged: false },
        lastName: { hasChanged: false },
        gender: { hasChanged: false },
        // dateOfBirth: { hasChanged: false },
        // address: { hasChanged: false },
        // city: { hasChanged: false },
        // state: { hasChanged: false },
        // postalcode: { hasChanged: false },
        // country: { hasChanged: false },
      },
      // initialDOB: null,
      confirmRemovePicture: false,
      confirmLogout: false,
      confirmDeleteAccount: false,
      changePassword: false,
      isValidCP: false,
      isValidEdit: false,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      rules: {
        required: (v) => !!v || "This field is required", // Required rule
        confirmPasswordRule: (value) => {
          if (value !== this.newPassword) {
            return "Password does not match";
          }
          return true;
        },
        checkPwValid: (value) => {
          if (value !== this.passwordInput) {
            return "Password is not correct";
          }
          return true;
        },
        emailValid: (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
        numberOnly: (v) => /^\d+$/.test(v) || "Must contain digits only",
        phoneLength: (v) =>
          (v.length >= 10 && v.length <= 15) ||
          "Phone number must be 10-15 digits",
        year: (value) =>
          (value >= 1900 && value <= new Date().getFullYear()) ||
          "Invalid year. Year must be more than 1900.",
        bay: (value) => value > 0 || "Bay number must be greater than zero.",
      },
      pastAppointmentsDialog: false,
      showAll: false,
      vehicleDialog: false,
      isValidAddVehicle: false,
      vehicleDialogAction: "",
      selectedVehicleId: null,
    };
  },
  computed: {
    displayedVehicles() {
      return this.showAll ? this.vehicles : this.vehicles.slice(0, 3);
    },
  },
  components: {
    TextInput,
    DatePicker,
  },
  setup() {
    const userStore = useUserStore();
    const {
      email,
      phonenumber,
      firstname,
      lastname,
      // gender,
      // dob,
      // address,
      // city,
      // state,
      // zipcode,
      // fullname,
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

    const file = ref(null);
    const imageUrl = ref(null);

    const user = computed(() => userStore.currentUser);

    onMounted(() => {
      document.title = "Your Profile";
      resetToStoreValues();
      //setInputToUserData();
      fetchVehicles();
      fetchPastAppointments();
    });

    const handleFileChange = () => {
      if (file.value) {
        const allowedTypes = ["image/jpeg", "image/png"];
        if (!allowedTypes.includes(file.value.type)) {
          alert("Please select a valid image file (JPEG or PNG).");
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

    return {
      user,
      resetToStoreValues,
      email,
      accountid,
      firstname,
      lastname,
      updateUserStore,
      handleFileChange,
      triggerFileInput,
      cancelUpload,
      file,
      imageUrl,
      phonenumber,
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
      pastAppointments,
      fetchPastAppointments,
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
      }
      this.passwordInput = this.newPassword;

      this.changePassword = false;
    },
    handleVehicleDialog(car, action, id) {
      this.vehicleDialog = true;
      this.vehicleDialogAction = action;
      this.selectedVehicleId = id;
      if (action === "add") {
        this.plateNumberInput = "";
        this.brandInput = "";
        this.modelInput = "";
        this.yearInput = "";
        this.tyreSizeInput = "";
      } else {
        this.plateNumberInput = car.plateNumber;
        this.brandInput = car.brand;
        this.modelInput = car.model;
        this.yearInput = car.year;
        this.tyreSizeInput = car.tyreSize;
      }
    },
    handleAddVehicleBtn() {
      if (this.isValidAddVehicle) {
        this.addVehicle();
        this.vehicleDialog = false;
        this.vehicleDialogAction = "";
      }
    },
    handleEditVehicleBtn() {
      if (this.isValidAddVehicle) {
        this.editVehicle(this.selectedVehicleId);
        this.vehicleDialog = false;
        this.vehicleDialogAction = "";
        this.selectedVehicleId = null;
      }
    },
    handleDeleteVehicleBtn() {
      this.deleteVehicle(this.selectedVehicleId);
      this.vehicleDialog = false;
      this.vehicleDialogAction = "";
      this.selectedVehicleId = null;
    },
  },
};
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
  box-shadow: 0 0 10px 2px rgba(0, 255, 0, 0.8); /* green glowing effect */
}

#image-container {
  width: 200px; /* Fixed width */
  height: 200px; /* Fixed height */
  border: 2px dashed #ccc; /* Dashed border for visual effect */
  background-color: #f5f5f5; /* Light background color */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; /* Hide overflow to contain image */
  border-radius: 50%;
}

.image-preview {
  max-width: 100%; /* Ensure the image does not exceed the container's width */
  max-height: 100%; /* Ensure the image does not exceed the container's height */
  object-fit: cover; /* Cover the container while maintaining aspect ratio */
}
.small-icon {
  font-size: 1.25rem; /* Adjust the size to 50% smaller (about 1.25rem) */
}

.glow-on-hover:hover {
  box-shadow: 0 0 15px grey, 0 0 30px grey;
}
</style>
