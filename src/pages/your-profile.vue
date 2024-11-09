<template>
  <v-container class="fill-height">
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
              <h3>User ID: TPA00000{{ idInput }}</h3>
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
                    @click="menu = false; isEdit = true;"
                    :disabled="isEdit"
                    >Edit Info Details</v-list-item
                  >
                  <v-list-item @click="changePasswordClicked"
                    >Change Password</v-list-item
                  >
                  <v-list-item @click="menu = false"
                    >Manage Appointments</v-list-item
                  >
                  <v-list-item @click="menu = false"
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
                        @click="menu = false; isEdit = true;"
                        :disabled="isEdit"
                        >Edit Info Details</v-list-item
                      >
                      <v-list-item @click="changePasswordClicked"
                        >Change Password</v-list-item
                      >
                      <v-list-item @click="menu = false"
                        >Manage Appointments</v-list-item
                      >
                      <v-list-item @click="menu = false"
                        >Past Appointments</v-list-item
                      >
                      <v-list-item
                        @click="menu = false; confirmLogout = true"
                        style="color: red"
                        >Log Out</v-list-item
                      >
                      <v-list-item
                        @click="menu = false; confirmDeleteAccount = true"
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
                  v-model="emailInput"
                  :isDisable="!isEdit"
                  :class="{ glow: inputs.email.hasChanged }"
                  @input="this.inputs.email.hasChanged = true;"
                  :rules="[rules.emailValid]"
                />
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <TextInput
                  labelNameUpper="Contact No."
                  style="font-size: 24px"
                  v-model="phoneInput"
                  :isDisable="!isEdit"
                  :class="{ glow: inputs.phone.hasChanged }"
                  @input="this.inputs.phone.hasChanged = true;"
                  :rules="[rules.numberOnly, rules.phoneLength]"
                />
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <TextInput
                  labelNameUpper="First Name"
                  style="font-size: 24px"
                  v-model="firstNameInput"
                  :isDisable="!isEdit"
                  :class="{ glow: inputs.firstName.hasChanged }"
                  @input="this.inputs.firstName.hasChanged = true;"
                />
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <TextInput
                  labelNameUpper="Last Name"
                  style="font-size: 24px"
                  v-model="lastNameInput"
                  :isDisable="!isEdit"
                  :class="{ glow: inputs.lastName.hasChanged }"
                  @input="this.inputs.lastName.hasChanged = true;"
                />
              </v-col>

              <v-col
                cols="12"
                sm="6"
                md="6"
                :class="{ glow: inputs.gender.hasChanged }"
              >
                <v-row>
                  <v-col cols="12" sm="4" md="4"> Gender: </v-col>
                  <v-col cols="12" sm="8" md="8">
                    <v-radio-group
                      v-model="genderInput"
                      :disabled="!isEdit"
                      @change="this.inputs.gender.hasChanged = true;"
                    >
                      <v-radio label="Male" value="m"></v-radio>
                      <v-radio label="Female" value="f"></v-radio>
                    </v-radio-group>
                  </v-col>
                </v-row>
              </v-col>

              <v-col
                cols="12"
                sm="6"
                md="6"
                :class="{ glow: inputs.dateOfBirth.hasChanged }"
              >
                <label style="font-size: 24px" class="italicBold">
                  Date of Birth
                </label>
                <DatePicker
                  v-model="dateOfBirthInput"
                  label="Date of Birth"
                  :max="maxDate"
                  :isDisable="!isEdit"
                />
              </v-col>

              <v-col cols="12" sm="12" md="12">
                <TextInput
                  labelNameUpper="Address"
                  style="font-size: 24px"
                  v-model="addressInput"
                  :isDisable="!isEdit"
                  :class="{ glow: inputs.address.hasChanged }"
                  @input="this.inputs.address.hasChanged = true;"
                />
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <TextInput
                  labelNameUpper="Postal Code"
                  style="font-size: 24px"
                  v-model="postalcodeInput"
                  :isDisable="!isEdit"
                  :class="{ glow: inputs.postalcode.hasChanged }"
                  @input="this.inputs.postalcode.hasChanged = true;"
                  :rules="[rules.numberOnly]"
                />
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <TextInput
                  labelNameUpper="City"
                  style="font-size: 24px"
                  v-model="cityInput"
                  :isDisable="!isEdit"
                  :class="{ glow: inputs.city.hasChanged }"
                  @input="this.inputs.city.hasChanged = true;"
                />
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <TextInput
                  labelNameUpper="State"
                  style="font-size: 24px"
                  v-model="stateInput"
                  :isDisable="!isEdit"
                  :class="{ glow: inputs.state.hasChanged }"
                  @input="this.inputs.state.hasChanged = true;"
                />
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <TextInput
                  labelNameUpper="Country"
                  style="font-size: 24px"
                  v-model="countryInput"
                  :isDisable="!isEdit"
                  :class="{ glow: inputs.country.hasChanged }"
                  @input="this.inputs.country.hasChanged = true;"
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
            <v-btn class="save-btn"> + Add Vehicle </v-btn>
          </v-col>
          <v-col
            v-for="car in vehicles"
            :key="car.id"
            cols="12"
            sm="12"
            md="12"
          >
            <v-card class="pa-4">
              <v-card-title>{{ car.plateNumber }}</v-card-title>
              <v-card-subtitle
                >{{ car.brand }} {{ car.model }} ({{ car.year
                }})</v-card-subtitle
              >
              <v-card-actions
                class="d-flex justify-end"
                style="padding-top: 20px"
              >
                <v-btn icon style="margin-right: 20px">
                  <v-icon class="small-icon">mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon class="save-btn" style="margin-right: 0px">
                  <v-icon class="small-icon">mdi-delete</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
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
          @click="cancelUpload(); confirmRemovePicture = false"
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
</template>

<script>
  import { useDateFormatter } from '@/composables/useDateFormatter';
  import DatePicker from '@/components/DatePicker.vue';
  import TextInput from '@/components/TextInputComponent.vue';
  import { userComposable } from '@/composables/userComposable';
  import { onMounted } from 'vue';
  import { vehicleComposable } from '@/composables/vehicleComposable';


  export default {
    data() {
      return {
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
          dateOfBirth: { hasChanged: false },
          address: { hasChanged: false },
          city: { hasChanged: false },
          state: { hasChanged: false },
          postalcode: { hasChanged: false },
          country: { hasChanged: false },
        },
        initialDOB: null,
        confirmRemovePicture: false,
        confirmLogout: false,
        confirmDeleteAccount: false,
        changePassword: false,
        isValidCP: false,
        isValidEdit: false,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        rules: {
          required: (v) => !!v || 'This field is required',  // Required rule
          confirmPasswordRule: (value) => {
            if (value !== this.newPassword) {
              return 'Password does not match';
            }
            return true;
          },
          checkPwValid: (value) => {
            if (value !== this.passwordInput) {
              return 'Password is not correct';
            }
            return true;
          },
          emailValid: v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
          numberOnly: v => /^\d+$/.test(v) || 'Must contain digits only',
          phoneLength: v => v.length >= 10 && v.length <= 15 || 'Phone number must be 10-15 digits',
        },
      }
    },
    components: {
      TextInput,
      DatePicker
    },
    setup() {
      const {
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
        cityInput,
        stateInput,
        postalcodeInput,
        countryInput,
        passwordInput,
      } = userComposable();

      const {
        vehicles,
        fetchVehicles,
      } = vehicleComposable();

      const file = ref(null);
      const imageUrl = ref(null);

      onMounted(() => {
        document.title = 'Your Profile';
        fetchUser();
        setInputToUserData();
        fetchVehicles();
      });

      const handleFileChange = () => {
        if (file.value) {
          const allowedTypes = ['image/jpeg', 'image/png'];
          if (!allowedTypes.includes(file.value.type)) {
            alert('Please select a valid image file (JPEG or PNG).');
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
        cityInput,
        stateInput,
        postalcodeInput,
        countryInput,
        passwordInput,
        handleFileChange,
        triggerFileInput,
        cancelUpload,
        file,
        imageUrl,
        vehicles,
        fetchVehicles,
      };
    },
    mounted() {
      window.addEventListener('resize', this.updateScreenSize);
      this.initialDOB = this.dateOfBirthInput;
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.updateScreenSize);
    },
    watch: {
      dateOfBirthInput(newValue) {
        this.handleChangeDOB();
        this.initialDOB = this.dateOfBirthInput;
      }
    },
    methods: {
      handleChangeDOB() {
        if (this.initialDOB !== this.dateOfBirthInput) {
          this.inputs.dateOfBirth.hasChanged = true;
        }
      },
      updateScreenSize() {
        this.isLargeScreen = window.innerWidth >= 960;
      },
      handleSaveBtn() {
        this.isEdit = false;
        this.editUserData();
        Object.keys(this.inputs).forEach((key) => (this.inputs[key].hasChanged = false));
      },
      handleCancelBtn() {
        this.isEdit = false;
        this.setInputToUserData();
        this.initialDOB = this.dateOfBirthInput;
        Object.keys(this.inputs).forEach((key) => (this.inputs[key].hasChanged = false));
      },
      changePasswordClicked() {
        this.currentPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
        this.changePassword = true;
      },
      handleSubmitBtn() {
        this.passwordInput = this.newPassword;
        this.editUserData();
        this.changePassword = false;
      }
    }
  }
</script>

<style>
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
</style>
