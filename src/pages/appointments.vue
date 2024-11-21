<template>
    <v-container align="center" max-width="1200">
        <v-row>
            <v-col cols="12">
                <v-card min-width="350" max-width="800" class="ma-auto" color="#FFE2E5">
                    <v-row>
                        <v-col cols="12" class="mb-0 pb-0">
                            <v-card-title class="text-center text-h5 mb-0 pb-0 pb-auto">
                                Your Appointments
                            </v-card-title>
                        </v-col>
                    </v-row>
                    <v-divider class="ma-3 mb-0" thickness="2" opacity="0.3" />
                    <v-row>
                        <v-col cols="12">
                            <v-tabs v-model="activeTab" color="#FF3131" dark align-tabs="center">
                                <v-tab value="tab-future">Future</v-tab>
                                <v-tab value="tab-complete">Completed</v-tab>
                                <v-tab value="tab-cancelled">Cancelled</v-tab>
                            </v-tabs>
                            <v-card class="ma-0 pa-0 overflow-auto" max-height="800" color="#FFE2E5" elevation="0">
                                <v-tabs-window v-model="activeTab">
                                    <v-tabs-window-item value="tab-future">
                                        <template v-for="(appt, i) in appointments" :key="i">
                                            <v-card v-if="appt.status == 'future'" class="ma-3 pa-3">
                                                <v-row>
                                                    <v-col cols="12" sm="5">
                                                        <v-card max-width="300" min-height="225">
                                                            <v-card-subtitle
                                                                class="mt-3 mb-0 font-weight-medium text-subtitle-1">
                                                                Appointment {{ appt.appointment_id }}
                                                            </v-card-subtitle>
                                                            <v-card-text class="pa-0 pb-3">Service: {{ appt.service_type
                                                                }}</v-card-text>
                                                            <v-divider class="mx-3" thickness="2" opacity="0.3" />
                                                            <v-row class="ma-0 pa-0">
                                                                <v-col cols="6" class="pr-0 pb-0">
                                                                    <v-card-text class="pt-0 pr-0 text-left">
                                                                        <br>
                                                                        Date:<br>
                                                                        Time:<br>
                                                                    </v-card-text>
                                                                </v-col>
                                                                <v-col cols="6" class="pl-0 pb-0">
                                                                    <v-card-text class="pt-0 pl-0 text-right">
                                                                        <br>
                                                                        {{ appt.date }}<br>
                                                                        {{ appt.time }}<br>
                                                                    </v-card-text>
                                                                </v-col>
                                                                <v-col cols="12" align="center" class="mt-0 pt-0">
                                                                    <v-btn width="70" class="mr-2 my-1" color="#FFE2E5"
                                                                        @click="openDialog(i)">Modify</v-btn>
                                                                    <v-btn width="70" class="ml-2 my-1" color="#FF3131"
                                                                        @click="openDelete(i)">Delete</v-btn>
                                                                </v-col>
                                                            </v-row>
                                                        </v-card>
                                                    </v-col>
                                                    <v-col cols="12" sm="7">
                                                        <v-card min-height="225" justify="center" align="center">
                                                            <v-row class="pa-0 pt-9 mx-5">
                                                                <v-col cols="6" class="pa-0">
                                                                    <v-card-text class="pa-0">
                                                                        <p class="text-subtitle-2 text-grey-darken-1">
                                                                            Tyre
                                                                            Brand:
                                                                        </p>
                                                                        {{ appt.tyre_brand }}<br><br>
                                                                    </v-card-text>
                                                                </v-col>
                                                                <v-col cols="6" class="pa-0">
                                                                    <v-card-text class="pa-0">
                                                                        <p class="text-subtitle-2 text-grey-darken-1">
                                                                            Tyre Size:
                                                                        </p>
                                                                        {{ appt.size }}<br><br>
                                                                    </v-card-text>
                                                                </v-col>
                                                            </v-row>
                                                            <v-row class="pa-0 mx-5">
                                                                <v-col cols="6" class="pa-0">
                                                                    <v-card-text class="pa-0">
                                                                        <p class="text-subtitle-2 text-grey-darken-1">
                                                                            Tyre
                                                                            Model:
                                                                        </p>
                                                                        {{ appt.model }}<br><br>
                                                                    </v-card-text>
                                                                </v-col>
                                                                <v-col cols="6" class="pa-0">
                                                                    <v-card-text class="pa-0">
                                                                        <p class="text-subtitle-2 text-grey-darken-1">
                                                                            Load
                                                                            Index:
                                                                        </p>
                                                                        {{ appt.load_index }}<br><br>
                                                                    </v-card-text>
                                                                </v-col>
                                                            </v-row>
                                                            <v-row class="pa-0 mx-5">
                                                                <v-col cols="6" class="pa-0">
                                                                    <v-card-text class="pa-0">
                                                                        <p class="text-subtitle-2 text-grey-darken-1">
                                                                            Country:
                                                                        </p>
                                                                        {{ appt.country }}<br><br>
                                                                    </v-card-text>
                                                                </v-col>
                                                                <v-col cols="6" class="pa-0">
                                                                    <v-card-text class="pa-0">
                                                                        <p class="text-subtitle-2 text-grey-darken-1">
                                                                            Speed
                                                                            Index:
                                                                        </p>
                                                                        {{ appt.speed_index }}<br><br>
                                                                    </v-card-text>
                                                                </v-col>
                                                            </v-row>
                                                        </v-card>
                                                    </v-col>
                                                </v-row>
                                            </v-card>
                                        </template>
                                        <v-card-text>End of list.</v-card-text>
                                        <ModifyApptDialog v-model="dialogVisible" :input-object="selectedItem"
                                            @submit="handleSubmit" />
                                        <v-dialog id="deletionDialog" v-model="deleteVisible" align="center">
                                            <v-card class="px-3 py-5 ma-auto" max-width="300" align="center">
                                                <v-card-title class="text-h5 font-weight-bold">WARNING</v-card-title>
                                                <v-card-text>Are you sure you want to delete Appointment {{
                                                    selectedItem.appointment_id
                                                    }}?</v-card-text>
                                                <v-btn class="mx-auto" width="100" color="#FF3131"
                                                    @click="handleDelete(selectedItem)">Delete</v-btn>
                                            </v-card>
                                        </v-dialog>
                                    </v-tabs-window-item>
                                    <v-tabs-window-item value="tab-complete">
                                        <template v-for="(appt, i) in appointments" :key="i">
                                            <v-card v-if="appt.status == 'completed'" class="ma-3 pa-3">
                                                <v-row>
                                                    <v-col cols="12" sm="5">
                                                        <v-card max-width="300" min-height="225">
                                                            <v-card-subtitle
                                                                class="mt-3 mb-0 font-weight-medium text-subtitle-1">
                                                                Appointment {{ appt.appointment_id }}
                                                            </v-card-subtitle>
                                                            <v-card-text class="pa-0 pb-3">Service: {{ appt.service_type
                                                                }}</v-card-text>
                                                            <v-divider class="mx-3" thickness="2" opacity="0.3" />
                                                            <v-row class="ma-0 pa-0">
                                                                <v-col cols="6" class="pr-0 pb-0">
                                                                    <v-card-text class="pt-0 pr-0 text-left">
                                                                        <br>
                                                                        Date:<br>
                                                                        Time:<br>
                                                                    </v-card-text>
                                                                </v-col>
                                                                <v-col cols="6" class="pl-0 pb-0">
                                                                    <v-card-text class="pt-0 pl-0 text-right">
                                                                        <br>
                                                                        {{ appt.date }}<br>
                                                                        {{ appt.time }}<br>
                                                                    </v-card-text>
                                                                </v-col>
                                                                <v-col cols="12" align="center" class="mt-0 pt-0">
                                                                    <v-btn width="70" class="mr-2 my-1" color="#FFE2E5"
                                                                        disabled>Modify</v-btn>
                                                                    <v-btn width="70" class="ml-2 my-1" color="#FF3131"
                                                                        disabled>Delete</v-btn>
                                                                </v-col>
                                                            </v-row>
                                                        </v-card>
                                                    </v-col>
                                                    <v-col cols="12" sm="7">
                                                        <v-card min-height="225" justify="center" align="center">
                                                            <v-row class="pa-0 pt-9 mx-5">
                                                                <v-col cols="6" class="pa-0">
                                                                    <v-card-text class="pa-0">
                                                                        <p class="text-subtitle-2 text-grey-darken-1">
                                                                            Tyre
                                                                            Brand:
                                                                        </p>
                                                                        {{ appt.tyre_brand }}<br><br>
                                                                    </v-card-text>
                                                                </v-col>
                                                                <v-col cols="6" class="pa-0">
                                                                    <v-card-text class="pa-0">
                                                                        <p class="text-subtitle-2 text-grey-darken-1">
                                                                            Tyre Size:
                                                                        </p>
                                                                        {{ appt.size }}<br><br>
                                                                    </v-card-text>
                                                                </v-col>
                                                            </v-row>
                                                            <v-row class="pa-0 mx-5">
                                                                <v-col cols="6" class="pa-0">
                                                                    <v-card-text class="pa-0">
                                                                        <p class="text-subtitle-2 text-grey-darken-1">
                                                                            Tyre
                                                                            Model:
                                                                        </p>
                                                                        {{ appt.model }}<br><br>
                                                                    </v-card-text>
                                                                </v-col>
                                                                <v-col cols="6" class="pa-0">
                                                                    <v-card-text class="pa-0">
                                                                        <p class="text-subtitle-2 text-grey-darken-1">
                                                                            Load
                                                                            Index:
                                                                        </p>
                                                                        {{ appt.load_index }}<br><br>
                                                                    </v-card-text>
                                                                </v-col>
                                                            </v-row>
                                                            <v-row class="pa-0 mx-5">
                                                                <v-col cols="6" class="pa-0">
                                                                    <v-card-text class="pa-0">
                                                                        <p class="text-subtitle-2 text-grey-darken-1">
                                                                            Country:
                                                                        </p>
                                                                        {{ appt.country }}<br><br>
                                                                    </v-card-text>
                                                                </v-col>
                                                                <v-col cols="6" class="pa-0">
                                                                    <v-card-text class="pa-0">
                                                                        <p class="text-subtitle-2 text-grey-darken-1">
                                                                            Speed
                                                                            Index:
                                                                        </p>
                                                                        {{ appt.speed_index }}<br><br>
                                                                    </v-card-text>
                                                                </v-col>
                                                            </v-row>
                                                        </v-card>
                                                    </v-col>
                                                </v-row>
                                            </v-card>
                                        </template>
                                        <v-card-text>End of list.</v-card-text>
                                    </v-tabs-window-item>
                                    <v-tabs-window-item value="tab-cancelled">
                                        <template v-for="(appt, i) in appointments" :key="i">
                                            <v-card v-if="appt.status == 'cancelled'" class="ma-3 pa-3">
                                                <v-row>
                                                    <v-col cols="12" sm="5">
                                                        <v-card max-width="300" min-height="225">
                                                            <v-card-subtitle
                                                                class="mt-3 mb-0 font-weight-medium text-subtitle-1">
                                                                Appointment {{ appt.appointment_id }}
                                                            </v-card-subtitle>
                                                            <v-card-text class="pa-0 pb-3">Service: {{ appt.service_type
                                                                }}</v-card-text>
                                                            <v-divider class="mx-3" thickness="2" opacity="0.3" />
                                                            <v-row class="ma-0 pa-0">
                                                                <v-col cols="6" class="pr-0 pb-0">
                                                                    <v-card-text class="pt-0 pr-0 text-left">
                                                                        <br>
                                                                        Date:<br>
                                                                        Time:<br>
                                                                    </v-card-text>
                                                                </v-col>
                                                                <v-col cols="6" class="pl-0 pb-0">
                                                                    <v-card-text class="pt-0 pl-0 text-right">
                                                                        <br>
                                                                        {{ appt.date }}<br>
                                                                        {{ appt.time }}<br>
                                                                    </v-card-text>
                                                                </v-col>
                                                                <v-col cols="12" align="center" class="mt-0 pt-0">
                                                                    <v-btn width="70" class="mr-2 my-1" color="#FFE2E5"
                                                                        disabled>Modify</v-btn>
                                                                    <v-btn width="70" class="ml-2 my-1" color="#FF3131"
                                                                        disabled>Delete</v-btn>
                                                                </v-col>
                                                            </v-row>
                                                        </v-card>
                                                    </v-col>
                                                    <v-col cols="12" sm="7">
                                                        <v-card min-height="225" justify="center" align="center">
                                                            <v-row class="pa-0 pt-9 mx-5">
                                                                <v-col cols="6" class="pa-0">
                                                                    <v-card-text class="pa-0">
                                                                        <p class="text-subtitle-2 text-grey-darken-1">
                                                                            Tyre
                                                                            Brand:
                                                                        </p>
                                                                        {{ appt.tyre_brand }}<br><br>
                                                                    </v-card-text>
                                                                </v-col>
                                                                <v-col cols="6" class="pa-0">
                                                                    <v-card-text class="pa-0">
                                                                        <p class="text-subtitle-2 text-grey-darken-1">
                                                                            Tyre Size:
                                                                        </p>
                                                                        {{ appt.size }}<br><br>
                                                                    </v-card-text>
                                                                </v-col>
                                                            </v-row>
                                                            <v-row class="pa-0 mx-5">
                                                                <v-col cols="6" class="pa-0">
                                                                    <v-card-text class="pa-0">
                                                                        <p class="text-subtitle-2 text-grey-darken-1">
                                                                            Tyre
                                                                            Model:
                                                                        </p>
                                                                        {{ appt.model }}<br><br>
                                                                    </v-card-text>
                                                                </v-col>
                                                                <v-col cols="6" class="pa-0">
                                                                    <v-card-text class="pa-0">
                                                                        <p class="text-subtitle-2 text-grey-darken-1">
                                                                            Load
                                                                            Index:
                                                                        </p>
                                                                        {{ appt.load_index }}<br><br>
                                                                    </v-card-text>
                                                                </v-col>
                                                            </v-row>
                                                            <v-row class="pa-0 mx-5">
                                                                <v-col cols="6" class="pa-0">
                                                                    <v-card-text class="pa-0">
                                                                        <p class="text-subtitle-2 text-grey-darken-1">
                                                                            Country:
                                                                        </p>
                                                                        {{ appt.country }}<br><br>
                                                                    </v-card-text>
                                                                </v-col>
                                                                <v-col cols="6" class="pa-0">
                                                                    <v-card-text class="pa-0">
                                                                        <p class="text-subtitle-2 text-grey-darken-1">
                                                                            Speed
                                                                            Index:
                                                                        </p>
                                                                        {{ appt.speed_index }}<br><br>
                                                                    </v-card-text>
                                                                </v-col>
                                                            </v-row>
                                                        </v-card>
                                                    </v-col>
                                                </v-row>
                                            </v-card>
                                        </template>
                                        <v-card-text>End of list.</v-card-text>
                                    </v-tabs-window-item>
                                </v-tabs-window>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<style>
v-card {
    box-sizing: border-box !important;
}
</style>

<script setup>
import { ref, computed } from 'vue';
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";
/* import axios from 'axios'; */
import ModifyApptDialog from '@/components/ModifyApptDialog.vue';

const activeTab = ref('tab-future');
const route = useRoute();

watch(
      () => route.query.tab,
      (newTab) => {
        if (newTab) {
          activeTab.value = newTab;
        }
      },
      { immediate: true }
    );

/* // Create an Axios instance with a base URL
const api = axios.create({
  baseURL: 'http://your-api-base-url.com/api', // Replace with your actual API base URL
  timeout: 10000, // Set a timeout for requests (optional)
  headers: {
    'Content-Type': 'application/json',
    // Add any other headers you need, such as authorization tokens
  }
}); */

/* const appointments = []; */
const appointments = ref([{
    appointment_id: 1,
    date: "2024-05-12",
    time: "09:00",
    service_type: "Install",
    payment_due: 4623.12,
    tyre_brand: "Continental",
    model: "Random model",
    country: "Germany",
    size: "260/85R15",
    load_index: 76,
    speed_index: "B",
    status: "completed"
},
{
    appointment_id: 2,
    date: "2024-05-20",
    time: "04:35",
    payment_due: 2135.31,
    service_type: "Tuning",
    tyre_brand: "Hankook",
    model: "Randomer model",
    country: "North Korea",
    size: "275/80R17",
    load_index: 85,
    speed_index: "A",
    status: "cancelled"
},
{
    appointment_id: 3,
    date: "2024-06-12",
    time: "21:00",
    payment_due: 2365.34,
    service_type: "Consult",
    tyre_brand: "Michelin",
    model: "Randomest model",
    country: "France",
    size: "285/75R16",
    load_index: 100,
    speed_index: "C",
    status: "completed"
},
{
    appointment_id: 4,
    date: "2025-11-13",
    time: "21:00",
    payment_due: 2250.22,
    service_type: "Install",
    tyre_brand: "Bridgestone",
    model: "More Random than Random",
    country: "UK",
    size: "280/74R13",
    load_index: 97,
    speed_index: "D",
    status: "future"
}
]);

const dialogVisible = ref(false);
const deleteVisible = ref(false);
const selectedIndex = ref(null);
const isLoading = ref(false);

const selectedItem = computed(() => {
    return selectedIndex.value !== null ? { ...appointments.value[selectedIndex.value] } : {};
});

const openDialog = (index) => {
    selectedIndex.value = index;
    dialogVisible.value = true;
};

const openDelete = (index) => {
    selectedIndex.value = index;
    deleteVisible.value = true;
};

const handleSubmit = async (updatedData) => {
    if (selectedIndex.value !== null) {
        isLoading.value = true;
        try {
            const appointmentId = appointments.value[selectedIndex.value].appointment_id;

            /* Temp */
            appointments.value[selectedIndex.value].date = updatedData.date;
            appointments.value[selectedIndex.value].time = updatedData.time;

            /* // Update the database using Axios
            const response = await api.put(`/appointments/${appointmentId}`, updatedData);
            
            // Check if the request was successful
            if (response.status === 200 || response.status === 204) {
              // Update the local appointments array with the response from the server
              appointments.value[selectedIndex.value] = response.data;
      
              console.log('Appointment updated successfully');
            } else {
              throw new Error('Failed to update appointment');
            } */
        } catch (error) {
            console.error('Error updating appointment:', error);
            // Handle error (e.g., show an error message to the user)
        } finally {
            // Reset selection and close dialog
            isLoading.value = false;
            selectedIndex.value = null;
            dialogVisible.value = false;
        }
    }
};

const handleDelete = async () => {
    if (selectedIndex.value !== null) {
        isLoading.value = true;
        try {
            const appointmentId = appointments.value[selectedIndex.value].appointment_id;

            /* Temp */
            if (selectedIndex.value > -1) {
                appointments.value.splice(selectedIndex.value, 1);
            }

            /* // Update the database using Axios
            const response = await api.delete(`/appointments/${appointmentId}`);
            
            // Check if the request was successful
            if (response.status === 200 || response.status === 204) {
              // Update the local appointments array with the response from the server
              appointments.value[deleteIndex] = response.data;
      
              console.log('Appointment deleted successfully');
            } else {
              throw new Error('Failed to update appointment');
            } */
        } catch (error) {
            console.error('Error deleting appointment:', error);
            // Handle error (e.g., show an error message to the user)
        } finally {
            // Reset selection and close dialog
            isLoading.value = false;
            selectedIndex.value = null;
            deleteVisible.value = false;
        }
    }
};

// Function to fetch appointments from the server
const fetchAppointments = async () => {
    isLoading.value = true;
    try {
        /* const response = await api.get('/appointments');
        appointments.value = response.data; */
    } catch (error) {
        console.error('Error fetching appointments:', error);
        // Handle error (e.g., show an error message to the user)
    } finally {
        isLoading.value = false;
    }
};

// Call fetchAppointments when the component is created
fetchAppointments();
</script>