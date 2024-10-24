<template>
  <v-container class="fill-height">
    <v-row>
      <v-col cols="12" sm="12" md="12">
        <h1>Your Profile</h1>
      </v-col>
      <v-col cols="12" sm="12" md="3">
        <v-card class="pa-4">
          <v-row>
            <v-col cols="12" class="text-center">
              <v-img size="150" v-if="imageUrl" :src="imageUrl"></v-img>
              <v-icon size="150" v-else>mdi mdi-account-circle</v-icon>
            </v-col>
            <v-col cols="12" class="text-center">
              <h3>User ID: TPA00000{{ idInput }}</h3>
            </v-col>
            <v-col cols="12" class="text-center">
              <!-- <v-file-input 
              v-model="file" 
              accept=".jpg, .jpeg, .png" 
              @change="handleFileChange"
              hide-input 
              style="display: none;"
            ></v-file-input> -->
              <v-btn height="40" width="200" @click="triggerFileInput">
                <div class="text-h6 d-flex">Upload</div>
              </v-btn>
            </v-col>
            <v-col cols="12" class="text-center">
              <div v-if="isLargeScreen">
                <v-list>
                  <v-list-item @click="handleEditBtn()" :disabled="isEdit"
                    >Edit Info Details</v-list-item
                  >
                  <v-list-item @click="menu = false"
                    >Change Password</v-list-item
                  >
                  <v-list-item @click="menu = false"
                    >Manage Appointments</v-list-item
                  >
                  <v-list-item @click="menu = false"
                    >Past Appointments</v-list-item
                  >
                  <v-list-item @click="menu = false" style="color: red"
                    >Log Out</v-list-item
                  >
                  <v-list-item @click="menu = false" style="color: red"
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
                      <v-list-item @click="handleEditBtn()" :disabled="isEdit"
                        >Edit Info Details</v-list-item
                      >
                      <v-list-item @click="menu = false"
                        >Change Password</v-list-item
                      >
                      <v-list-item @click="menu = false"
                        >Manage Appointments</v-list-item
                      >
                      <v-list-item @click="menu = false"
                        >Past Appointments</v-list-item
                      >
                      <v-list-item @click="menu = false" style="color: red"
                        >Log Out</v-list-item
                      >
                      <v-list-item @click="menu = false" style="color: red"
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
        <v-row>
          <v-col cols="12" sm="12" md="12">
            <TextInput
              labelNameUpper="Email"
              style="font-size: 24px"
              v-model="emailInput"
              :isDisable="!isEdit"
              :class="{ glow: inputs.email.hasChanged }" 
              @input="handleChange('email')"
            />
          </v-col>
          <v-col cols="12" sm="12" md="12">
            <TextInput
              labelNameUpper="Contact No."
              style="font-size: 24px"
              v-model="phoneInput"
              :isDisable="!isEdit"
              :class="{ glow: inputs.phone.hasChanged }" 
              @input="handleChange('phone')"
            />
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <TextInput
              labelNameUpper="First Name"
              style="font-size: 24px"
              v-model="firstNameInput"
              :isDisable="!isEdit"
              :class="{ glow: inputs.firstName.hasChanged }" 
              @input="handleChange('firstName')"
            />
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <TextInput
              labelNameUpper="Last Name"
              style="font-size: 24px"
              v-model="lastNameInput"
              :isDisable="!isEdit"
              :class="{ glow: inputs.lastName.hasChanged }" 
              @input="handleChange('lastName')"
            />
          </v-col>

          <v-col cols="12" sm="6" md="6" :class="{ glow: inputs.gender.hasChanged }">
            <v-row>
              <v-col cols="12" sm="4" md="4"> Gender: </v-col>
              <v-col cols="12" sm="8" md="8">
                <v-radio-group 
                  v-model="genderInput" 
                  :disabled="!isEdit" 
                  @change="handleChange('gender')"
                >
                  <v-radio label="Male" value="m"></v-radio>
                  <v-radio label="Female" value="f"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
          </v-col>
          
          <!-- <v-col cols="12" sm="2" md="2"> Gender: </v-col>
          <v-col cols="12" sm="4" md="4">
            <v-radio-group 
              v-model="genderInput" 
              :disabled="!isEdit" 
              :class="{ glow: inputs.gender.hasChanged }" 
              @change="handleChange('gender')"
            >
              <v-radio label="Male" value="m"></v-radio>
              <v-radio label="Female" value="f"></v-radio>
            </v-radio-group>
          </v-col> -->

          <v-col cols="12" sm="6" md="6" :class="{ glow: inputs.dateOfBirth.hasChanged }">
            <label 
              style="font-size: 24px" 
              class="italicBold"
            >
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
              @input="handleChange('address')"
            />
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <TextInput
              labelNameUpper="Postal Code"
              style="font-size: 24px"
              v-model="postalcodeInput"
              :isDisable="!isEdit"
              :class="{ glow: inputs.postalcode.hasChanged }" 
              @input="handleChange('postalcode')"
            />
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <TextInput
              labelNameUpper="City"
              style="font-size: 24px"
              v-model="cityInput"
              :isDisable="!isEdit"
              :class="{ glow: inputs.city.hasChanged }" 
              @input="handleChange('city')"
            />
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <TextInput
              labelNameUpper="State"
              style="font-size: 24px"
              v-model="stateInput"
              :isDisable="!isEdit"
              :class="{ glow: inputs.state.hasChanged }" 
              @input="handleChange('state')"
            />
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <TextInput
              labelNameUpper="Country"
              style="font-size: 24px"
              v-model="countryInput"
              :isDisable="!isEdit"
              :class="{ glow: inputs.country.hasChanged }" 
              @input="handleChange('country')"
            />
          </v-col>
          <v-col cols="12" sm="12" md="12">
            <div style="float: right" v-if="isEdit">
              <v-btn
                @click="handleSaveBtn()"
                :disabled="!isEdit"
                class="save-btn"
                >Save</v-btn
              >
              <v-btn @click="handleCancelBtn()" :disabled="!isEdit"
                >Cancel</v-btn
              >
            </div>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" sm="12" md="3">
        <v-card class="pa-4">
          <v-col cols="12" sm="12" md="12">
            <h1>Vehicles</h1>
          </v-col>
          <v-col cols="12" sm="12" md="12">
            <v-btn class="save-btn">
              + Add Vehicle
            </v-btn>
          </v-col>
          <v-col cols="12" sm="12" md="12">
            <v-card class="pa-4">
              <h1>VBX 8403</h1>
            </v-card>
          </v-col>  
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { useDateFormatter } from '@/composables/useDateFormatter';
  import DatePicker from '@/components/DatePicker.vue';
  import TextInput from '@/components/TextInputComponent.vue';
  import { userComposable } from '@/composables/userComposable';
  import { onMounted } from 'vue';
import { da } from 'vuetify/locale';

  export default {
    data() {
      return {
        imageUrl: null,
        menu: false,
        isLargeScreen: window.innerWidth >= 960,
        file: null,
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
      } = userComposable();

      onMounted(() => {
        document.title = 'Your Profile';

        fetchUser();
        setInputToUserData();

        //window.addEventListener('resize', this.updateScreenSize);
      });

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
      };
    },
    mounted() {
      // document.title = 'Your Profile';
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
      handleFileChange(event) {
        const file = event.target.files[0];
        this.imageUrl = URL.createObjectURL(file);
      },
      triggerFileInput() {
        this.$refs.fileInput.click();
      },
      cancelUpload() {
        this.imageUrl = null;
      },
      updateScreenSize() {
        this.isLargeScreen = window.innerWidth >= 960;
      },
      handleEditBtn() {
        this.menu = false;
        this.isEdit = true;
      },
      handleSaveBtn() {
        this.isEdit = false;
        this.editUserData();
        this.glowOff();
      },
      handleCancelBtn() {
        this.isEdit = false;
        this.setInputToUserData();
        this.initialDOB = this.dateOfBirthInput;
        this.glowOff();

      },
      handleChange(id) {
        this.inputs[id].hasChanged = true;
      },
      glowOff() {
        this.inputs.email.hasChanged = false;
        this.inputs.phone.hasChanged = false;
        this.inputs.firstName.hasChanged = false;
        this.inputs.lastName.hasChanged = false;
        this.inputs.gender.hasChanged = false;
        this.inputs.dateOfBirth.hasChanged = false;
        this.inputs.address.hasChanged = false;
        this.inputs.city.hasChanged = false;
        this.inputs.state.hasChanged = false;
        this.inputs.postalcode.hasChanged = false;
        this.inputs.country.hasChanged = false;
      },
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
</style>
