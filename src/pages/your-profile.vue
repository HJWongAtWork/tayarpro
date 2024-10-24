<template>
  <v-container class="fill-height">
      <v-form fast-fail @submit.prevent class="pa-4">
        <v-card class="mx-auto pa-2 border-lg" width="auto">
          <v-card-title class="text-center">
            Registration Page
          </v-card-title>
          <v-card-subtitle class="text-center">
            asdasdadaad
          </v-card-subtitle>-
          <br>
          <v-row>
            <v-col cols="4">
              <v-row>
                <v-col cols="12" class="text-center">
                  <v-img size="150" v-if="imageUrl" :src="imageUrl">
                  </v-img>
                  <v-icon size="150" v-else>
                    mdi mdi-account-circle
                  </v-icon>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" class="text-center">
                  <v-file-input v-model="file" accept=".jpg, .jpeg, .png" @change="handleFileChange"
                  hide-input style="display: none;">
                  </v-file-input>
                  <v-btn height="40" width="200" @click="triggerFileInput">
                    <div class="text-h6 d-flex">
                      Upload
                    </div>
                  </v-btn>
                </v-col>
                <v-col cols="12" class="text-center">
                  <v-btn height="40" width="200" @click="cancelUpload">
                    <v-icon left size="30">
                      mdi-cancel
                    </v-icon>
                    Cancel
                  </v-btn>
                </v-col>
                <v-col cols="12">
                  <div class="text-center">
                    placeholder
                  </div>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="8">
              <v-row>
                <v-col cols="12">
                  <div>
                    Email
                  </div>
                  <v-text-field label="Email" prepend-inner-icon="mdi-email" type="email">
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <div>
                    Contact
                    <v-text-field label="Phone" prepend-inner-icon="mdi-cellphone">
                    </v-text-field>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <div>
                    First Name
                  </div>
                  <v-text-field label="firtsname" prepend-inner-icon="mdi-account">
                  </v-text-field>
                </v-col>
                <v-col cols="6">
                  <div>
                    Last Name
                  </div>
                  <v-text-field label="last name" prepend-inner-icon="mdi-account">
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <div>
                    Gender
                  </div>
                  <div class="d-flex">
                    <v-checkbox label="Male" v-model="gender" value="male">
                    </v-checkbox>
                    <v-checkbox label="Female" v-model="gender" value="female">
                    </v-checkbox>
                  </div>
                </v-col>
                <v-col cols="8">
                  <div>
                    Date of Birth
                  </div>
                  <v-text-field prepend-inner-icon="mdi-calendar-account-outline" type="date">
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <div>
                    Address
                  </div>
                  <v-text-field label="Stree Address" prepend-inner-icon="mdi-map-marker">
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3">
                  <v-text-field label="City" prepend-inner-icon="mdi-map-marker">
                  </v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field label="State" prepend-inner-icon="mdi-map-marker">
                  </v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field label="Country" prepend-inner-icon="mdi-map-marker">
                  </v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field label="Zip Code" prepend-inner-icon="mdi-map-marker">
                  </v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-form>
  </v-container>
</template>

<script>

  export default {
    data() {
      return {
        gender: null,
        file: null,
        imageUrl: null,
        isUploading: false,
        tab: null
      };
    },

    setup() {
      const file = ref(null);
      const imageUrl = ref(null);
      const isUploading = ref(false);

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
        console.log("cancel")
      };

      return {
        file,
        imageUrl,
        isUploading,
        handleFileChange,
        triggerFileInput,
        cancelUpload,
      };
    },

  };
</script>