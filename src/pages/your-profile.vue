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
              <h3>User ID: {{ userStore.accountid }}</h3>
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
              v-model="email"
              :isDisable="!isEdit"
              :class="{ glow: inputs.email.hasChanged }"
              @input="handleChange('email')"
            />
          </v-col>
          <v-col cols="12" sm="12" md="12">
            <TextInput
              labelNameUpper="Contact No."
              style="font-size: 24px"
              v-model="phonenumber"
              :isDisable="!isEdit"
              :class="{ glow: inputs.phone.hasChanged }"
              @input="handleChange('phone')"
            />
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <TextInput
              labelNameUpper="First Name"
              style="font-size: 24px"
              v-model="firstname"
              :isDisable="!isEdit"
              :class="{ glow: inputs.firstName.hasChanged }"
              @input="handleChange('firstName')"
            />
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <TextInput
              labelNameUpper="Last Name"
              style="font-size: 24px"
              v-model="lastname"
              :isDisable="!isEdit"
              :class="{ glow: inputs.lastName.hasChanged }"
              @input="handleChange('lastName')"
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
                  v-model="gender"
                  :disabled="!isEdit"
                  @change="handleChange('gender')"
                >
                  <v-radio label="Male" value="M"></v-radio>
                  <v-radio label="Female" value="F"></v-radio>
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
              v-model="dob"
              label="Date of Birth"
              :max="maxDate"
              :isDisable="!isEdit"
            />
          </v-col>

          <v-col cols="12" sm="12" md="12">
            <TextInput
              labelNameUpper="Address"
              style="font-size: 24px"
              v-model="address"
              :isDisable="!isEdit"
              :class="{ glow: inputs.address.hasChanged }"
              @input="handleChange('address')"
            />
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <TextInput
              labelNameUpper="Zip Code"
              style="font-size: 24px"
              v-model="zipcode"
              :isDisable="!isEdit"
              :class="{ glow: inputs.zipcode.hasChanged }"
              @input="handleChange('zipcode')"
            />
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <TextInput
              labelNameUpper="City"
              style="font-size: 24px"
              v-model="city"
              :isDisable="!isEdit"
              :class="{ glow: inputs.city.hasChanged }"
              @input="handleChange('city')"
            />
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <TextInput
              labelNameUpper="State"
              style="font-size: 24px"
              v-model="state"
              :isDisable="!isEdit"
              :class="{ glow: inputs.state.hasChanged }"
              @input="handleChange('state')"
            />
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <!-- <TextInput
              labelNameUpper="Country"
              style="font-size: 24px"
              v-model="countryInput"
              :isDisable="!isEdit"
              :class="{ glow: inputs.country.hasChanged }"
              @input="handleChange('country')"
            /> -->
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
            <v-btn class="save-btn"> + Add Vehicle </v-btn>
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
import { ref, onMounted } from "vue";
import DatePicker from "@/components/DatePicker.vue";
import TextInput from "@/components/TextInputComponent.vue";
import { useUserComposable } from "@/composables/userComposable";
import { useUserStore } from "@/stores/userStore";
import axios from "axios";

export default {
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
      gender,
      dob,
      address,
      city,
      state,
      zipcode,
      fullname,
      updateUserStore,
      resetToStoreValues,
    } = useUserComposable();

    const imageUrl = ref(null);
    const menu = ref(false);
    const isLargeScreen = ref(window.innerWidth >= 960);
    const file = ref(null);
    /* const maxDate = ref(new Date().toISOString().split("T")[0]); */
    const maxDate = ref(new Date());
    const isEdit = ref(false);
    const inputs = ref({
      email: { hasChanged: false },
      phone: { hasChanged: false },
      firstName: { hasChanged: false },
      lastName: { hasChanged: false },
      gender: { hasChanged: false },
      dateOfBirth: { hasChanged: false },
      address: { hasChanged: false },
      city: { hasChanged: false },
      state: { hasChanged: false },
      zipcode: { hasChanged: false },
    });

    onMounted(() => {
      window.addEventListener("resize", updateScreenSize);
      resetToStoreValues();
    });

    function updateScreenSize() {
      isLargeScreen.value = window.innerWidth >= 960;
    }

    function handleEditBtn() {
      menu.value = false;
      isEdit.value = true;
    }

    function handleChangeDOB() {
      inputs.value.dateOfBirth.hasChanged = true;
    }

    function triggerFileInput() {
      // Implement file input triggering logic
    }

    function cancelUpload() {
      imageUrl.value = null;
    }

    const accountId = computed(() => userStore.currentUser.accountid);
    async function handleSaveBtn() {
      isEdit.value = false;
      try {
        const response = await axios
          .put
          // `http://localhost:8000/user/${accountId.value}`,
          // {
          //   email: email.value,
          //   phonenumber: phonenumber.value,
          //   firstname: firstname.value,
          //   lastname: lastname.value,
          //   gender: gender.value,
          //   dob: dob.value,
          //   address: address.value,
          //   city: city.value,
          //   state: state.value,
          //   zipcode: zipcode.value,
          // }
          ();
        if (response.status === 200) {
          updateUserStore();
          alert("Profile updated successfully");
        }
      } catch (error) {
        console.error("Error updating profile:", error);
      }
      glowOff();
    }

    function handleCancelBtn() {
      isEdit.value = false;
      resetToStoreValues();
      glowOff();
    }

    function handleChange(field) {
      inputs.value[field].hasChanged = true;
    }

    function glowOff() {
      Object.keys(inputs.value).forEach((field) => {
        inputs.value[field].hasChanged = false;
      });
    }

    return {
      userStore,
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
      accountId,
      imageUrl,
      menu,
      isLargeScreen,
      file,
      maxDate,
      isEdit,
      inputs,
      updateUserStore,
      resetToStoreValues,
      updateScreenSize,
      handleEditBtn,
      handleChangeDOB,
      triggerFileInput,
      cancelUpload,
      handleSaveBtn,
      handleCancelBtn,
      handleChange,
      glowOff,
    };
  },
};
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
