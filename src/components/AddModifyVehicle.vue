<template>
    <v-dialog v-model="dialog" width="450">
      <v-card>
        <v-card-title>Car Information</v-card-title>
        <v-card-text>
          <v-text-field label="Car Model" v-model="carModel" :error="v$.carModel.$invalid" />
          <v-select label="Make Year" v-model="makeYear" :items="years" :error="v$.makeYear.$invalid" />
          <v-text-field label="License Plate Number" v-model="licensePlate" :error="v$.licensePlate.$invalid" />
          <div v-if="v$.carModel.$error || v$.makeYear.$invalid || v$.licensePlate.$invalid">
            <p v-for="error in v$.carModel.$errors" :key="error.rule">{{ error.message }}</p>
            <p v-for="error in v$.makeYear.$errors" :key="error.rule">{{ error.message }}</p>
            <p v-for="error in v$.licensePlate.$errors" :key="error.rule">{{ error.message }}</p>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#FF3131" text @click="dialog = false">Close</v-btn>
          <v-btn variant="elevated" color="#FF3131" text @click="submitCarInfo">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useVuelidate } from '@vuelidate/core';
  import { required, minLength, maxLength, integer, maxValue } from '@vuelidate/validators';
  import axios from 'axios';
  
  export default {
    setup() {
      const dialog = ref(false);
      const carModel = ref('');
      const makeYear = ref('');
      const licensePlate = ref('');
      const currentDate = ref(new Date);
      const currentYear = ref(currentDate.value.getFullYear());
  
      const years = Array.from({ length: 40 }, (_, i) => new Date().getFullYear() - i);

      const rules = {
        carModel: {
          required,
          minLength: 2,
          maxLength: 50,
        },
        makeYear: {
          required,
          integer,
          maxValue: currentYear,
          $each: (v) => v >= 1900,
        },
        licensePlate: {
          required,
          minLength: 6,
          maxLength: 10,
        },
      };
  
      const v$ = useVuelidate(rules, { carModel, makeYear, licensePlate });
  
      const submitCarInfo = async () => {
        if (v$.value.$invalid) {
          return;
        }
  
        try {
          /* const response = await axios.post('/api/cars', {
            carModel: carModel.value,
            makeYear: makeYear.value,
            licensePlate: licensePlate.value,
          }); */
          const response = {
            carModel: carModel.value,
            makeYear: makeYear.value,
            licensePlate: licensePlate.value,
          }
          // Handle successful submission (e.g., show a confirmation message, close the dialog)
          console.log('Car information submitted successfully:', response);
        } catch (error) {
          // Handle errors (e.g., display an error message)
          console.error('Error submitting car information:', error);
        }
      };
  
      return {
        dialog,
        carModel,
        makeYear,
        licensePlate,
        currentYear,
        years,
        v$,
        submitCarInfo,
      };
    },
  };
  </script>