<template>
    <v-dialog v-model="dialog" max-width="700px" min-width="400px">
        <v-card class="pa-auto py-5">
            <v-row>
                <v-col cols="12">
                    <v-card-title class="text-center py-0">
                        <span class="text-h6">Edit Appointment</span>
                    </v-card-title>
                </v-col>
            </v-row>
            <!-- <v-card-text class="py-0">
                <v-container>
                    <v-row>
                        <v-col cols="12" class="py-0" align="center">
                            <v-card-subtitle class="my-3 font-weight-medium text-subtitle-1">Appointment {{
                                formData['appointment_id'] }}</v-card-subtitle>
                            <v-text-field :min="minDate" v-model="formData['date']"
                                :label="'date'.charAt(0).toUpperCase() + 'date'.slice(1)" type="date" onkeydown="return false"></v-text-field>
                            <v-time-picker class="mx-0 px-0 text-center" align="center" justify="center" v-model="formData['time']" :allowed-minutes="allowedMinutes" format="ampm" ampm-in-title
                                min="07:59" max="22:01" scrollable></v-time-picker>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text> -->
            <v-container>
              <AddCarInSchedule />
              <v-row>
                <v-col cols="12">
                  <Schedule />
                </v-col>
              </v-row>
            </v-container>

            <v-card-actions class="px-5">
                <v-spacer></v-spacer>
                <v-btn width="100" color="#FF3131" variant="outlined" @click="closeDialog">
                    Cancel
                </v-btn>
                <v-btn width="100" color="#FF3131" variant="elevated" @click="saveChanges" :disabled="newAppointment.id === -1 || selectedCar.carid === -1">
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue';
import { appointmentComposable } from '@/composables/appointmentComposable';
import { vehicleComposable } from '@/composables/vehicleComposable';

const { newAppointment } = appointmentComposable();
const { selectedCar } = vehicleComposable();

/* const minDate = ref(new Date().toISOString().split("T")[0]); */

const nowDate = ref(new Date)
const minDate = ref(new Date(nowDate.value.getTime() + 24 * 60 * 60 * 1000).toISOString().split("T")[0])

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false,
    },
    inputObject: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits(['update:modelValue', 'submit']);

const dialog = ref(props.modelValue);
const formData = reactive({});

watch(() => props.modelValue, (newValue) => {
    dialog.value = newValue;
});

watch(dialog, (newValue) => {
    emit('update:modelValue', newValue);
});

watch(() => props.inputObject, (newValue) => {
    Object.assign(formData, newValue);
}, { immediate: true });

const closeDialog = () => {
    dialog.value = false;
};

const allowedMinutes = (v) => {
    return v % 15 === 0;
};

const saveChanges = () => {
    // Here you would typically send the formData to your database
    const formData = {
        appointment_id: "string",
        appointment_date: newAppointment.value.dateTime
          .toISOString()
          .split("T")[0],

        appointment_time: newAppointment.value.dateTime.toLocaleTimeString(),
        car_id: selectedCar.value.carid.toString(),
        //appointment_bay: newAppointment.value.bay,
    }


    // For this example, we'll just emit the data
    emit('submit', formData);
    closeDialog();
};
</script>