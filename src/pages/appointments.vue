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
              <v-tabs
                v-model="activeTab"
                color="#FF3131"
                dark
                align-tabs="center"
              >
                <v-tab value="tab-future">Future</v-tab>
                <v-tab value="tab-complete">Completed</v-tab>
                <v-tab value="tab-cancelled">Cancelled</v-tab>
              </v-tabs>
              <v-card
                class="ma-0 pa-0 overflow-auto"
                max-height="800"
                color="#FFE2E5"
                elevation="0"
              >
                <v-tabs-window v-model="activeTab">
                  <v-tabs-window-item value="tab-future">
                    <template
                      v-for="(appt, i) in appointments"
                      :key="appt.appointmentid"
                    >
                      <v-card v-if="appt.status == 'Future'" class="ma-3 pa-3">
                        <v-row>
                          <v-col cols="12" sm="5">
                            <v-card max-width="300" min-height="225">
                              <v-card-subtitle
                                class="mt-3 mb-0 font-weight-medium text-subtitle-1"
                              >
                                Appointment
                              </v-card-subtitle>

                              <v-divider
                                class="mx-3"
                                thickness="2"
                                opacity="0.3"
                              />
                              <v-row class="ma-0 pa-0">
                                <v-col cols="6" class="pr-0 pb-0">
                                  <v-card-text class="pt-0 pr-0 text-left">
                                    <br />
                                    Date:<br />
                                    Time:<br />
                                    Bay:<br />
                                  </v-card-text>
                                </v-col>
                                <v-col cols="6" class="pl-0 pb-0">
                                  <v-card-text class="pt-0 pl-0 text-right">
                                    <br />
                                    {{
                                      new Date(
                                        appt.appointmentdate
                                      ).toLocaleDateString()
                                    }}<br />
                                    {{
                                      new Date(
                                        appt.appointmentdate
                                      ).toLocaleTimeString()
                                    }}<br />
                                    {{ appt.appointment_bay }}<br />
                                  </v-card-text>
                                </v-col>
                                <v-col
                                  cols="12"
                                  align="center"
                                  class="mt-0 pt-0"
                                >
                                  <v-btn
                                    width="70"
                                    class="mr-2 my-1"
                                    color="#FFE2E5"
                                    @click="openDialog(i)"
                                    >Modify</v-btn
                                  >
                                  <v-btn
                                    width="70"
                                    class="ml-2 my-1"
                                    color="#FF3131"
                                    @click="openDelete(i)"
                                    >Delete</v-btn
                                  >
                                </v-col>
                              </v-row>
                            </v-card>
                          </v-col>
                          <v-col cols="12" sm="7">
                            <v-card max-width="300" min-height="225">
                              <v-card-subtitle
                                class="mt-3 mb-0 font-weight-medium text-subtitle-1"
                                >Order Detial
                              </v-card-subtitle>
                              <v-divider
                                class="mx-3"
                                thickness="2"
                                opacity="0.3"
                              />
                              <v-row class="ma-0 pa-0">
                                <v-list>
                                  <div
                                    v-for="(item, index) in appt.order_detail"
                                    :key="item.productid"
                                  >
                                    <v-list-item>
                                      <template v-slot:prepend>
                                        <v-avatar color="#FFE2E5" size="40">
                                          {{ index + 1 }}
                                        </v-avatar>
                                      </template>

                                      <v-list-item-title
                                        class="font-weight-medium"
                                      >
                                        {{ item.productid }}
                                      </v-list-item-title>

                                      <v-list-item-subtitle>
                                        <v-row no-gutters>
                                          <v-col cols="12">
                                            Car ID: {{ item.carid }}
                                          </v-col>
                                          <v-col cols="12" class="mt-1">
                                            <v-chip
                                              size="small"
                                              color="#FFD1D1"
                                              class="mr-2 text-black"
                                            >
                                              Qty: {{ item.quantity }}
                                            </v-chip>
                                            <v-chip
                                              size="small"
                                              color="#FFD1D1"
                                              class="mr-2 text-black"
                                            >
                                              Unit: RM {{ item.unitprice }}
                                            </v-chip>
                                            <v-chip
                                              size="small"
                                              color="#FF3131"
                                              class="white--text"
                                            >
                                              Total: RM {{ item.totalprice }}
                                            </v-chip>
                                          </v-col>
                                        </v-row>
                                      </v-list-item-subtitle>
                                    </v-list-item>
                                  </div>
                                </v-list>
                              </v-row>
                            </v-card>
                          </v-col>
                        </v-row>
                      </v-card>
                    </template>
                    <v-card-text>End of list.</v-card-text>
                    <ModifyApptDialog
                      v-model="dialogVisible"
                      :input-object="selectedItem"
                      @submit="handleSubmit"
                    />
                    <v-dialog
                      id="deletionDialog"
                      v-model="deleteVisible"
                      align="center"
                    >
                      <v-card
                        class="px-3 py-5 ma-auto"
                        max-width="300"
                        align="center"
                      >
                        <v-card-title class="text-h5 font-weight-bold"
                          >WARNING</v-card-title
                        >
                        <v-card-text
                          >Are you sure you want to cancel your Appointment
                          {{ selectedItem.appointmentid }}?</v-card-text
                        >
                        <v-btn
                          class="mx-auto"
                          width="100"
                          color="#FF3131"
                          @click="handleCancel(selectedItem)"
                          >Cancel</v-btn
                        >
                      </v-card>
                    </v-dialog>
                  </v-tabs-window-item>
                  <v-tabs-window-item value="tab-complete">
                    <template
                      v-for="(appt, i) in appointments"
                      :key="appt.appointmentid"
                    >
                      <v-card
                        v-if="appt.status == 'Completed'"
                        class="ma-3 pa-3"
                      >
                        <v-row>
                          <v-col cols="12" sm="5">
                            <v-card max-width="300" min-height="225">
                              <v-card-subtitle
                                class="mt-3 mb-0 font-weight-medium text-subtitle-1"
                              >
                                Appointment
                              </v-card-subtitle>

                              <v-divider
                                class="mx-3"
                                thickness="2"
                                opacity="0.3"
                              />
                              <v-row class="ma-0 pa-0">
                                <v-col cols="6" class="pr-0 pb-0">
                                  <v-card-text class="pt-0 pr-0 text-left">
                                    <br />
                                    Date:<br />
                                    Time:<br />
                                  </v-card-text>
                                </v-col>
                                <v-col cols="6" class="pl-0 pb-0">
                                  <v-card-text class="pt-0 pl-0 text-right">
                                    <br />
                                    {{
                                      new Date(
                                        appt.appointmentdate
                                      ).toLocaleDateString()
                                    }}<br />
                                    {{
                                      new Date(
                                        appt.appointmentdate
                                      ).toLocaleTimeString()
                                    }}<br />
                                  </v-card-text>
                                </v-col>
                              </v-row>
                            </v-card>
                          </v-col>
                          <v-col cols="12" sm="7">
                            <v-card max-width="300" min-height="225">
                              <v-card-subtitle
                                class="mt-3 mb-0 font-weight-medium text-subtitle-1"
                                >Order Detial
                              </v-card-subtitle>
                              <v-divider
                                class="mx-3"
                                thickness="2"
                                opacity="0.3"
                              />
                              <v-row class="ma-0 pa-0">
                                <v-list>
                                  <div
                                    v-for="(item, index) in appt.order_detail"
                                    :key="item.productid"
                                  >
                                    <v-list-item>
                                      <template v-slot:prepend>
                                        <v-avatar color="#FFE2E5" size="40">
                                          {{ index + 1 }}
                                        </v-avatar>
                                      </template>

                                      <v-list-item-title
                                        class="font-weight-medium"
                                      >
                                        {{ item.productid }}
                                      </v-list-item-title>

                                      <v-list-item-subtitle>
                                        <v-row no-gutters>
                                          <v-col cols="12">
                                            Car ID: {{ item.carid }}
                                          </v-col>
                                          <v-col cols="12" class="mt-1">
                                            <v-chip
                                              size="small"
                                              color="#FFE2E5"
                                              class="mr-2"
                                            >
                                              Qty: {{ item.quantity }}
                                            </v-chip>
                                            <v-chip
                                              size="small"
                                              color="#FFE2E5"
                                              class="mr-2"
                                            >
                                              Unit: RM {{ item.unitprice }}
                                            </v-chip>
                                            <v-chip
                                              size="small"
                                              color="#FF3131"
                                              class="white--text"
                                            >
                                              Total: RM {{ item.totalprice }}
                                            </v-chip>
                                          </v-col>
                                        </v-row>
                                      </v-list-item-subtitle>
                                    </v-list-item>
                                  </div>
                                </v-list>
                              </v-row>
                            </v-card>
                          </v-col>
                        </v-row>
                      </v-card>
                    </template>
                    <v-card-text>End of list.</v-card-text>
                  </v-tabs-window-item>
                  <v-tabs-window-item value="tab-cancelled">
                    <template
                      v-for="(appt, i) in appointments"
                      :key="appt.appointmentid"
                    >
                      <v-card
                        v-if="appt.status == 'Cancelled'"
                        class="ma-3 pa-3"
                      >
                        <v-row>
                          <v-col cols="12" sm="5">
                            <v-card max-width="300" min-height="225">
                              <v-card-subtitle
                                class="mt-3 mb-0 font-weight-medium text-subtitle-1"
                              >
                                Appointment
                              </v-card-subtitle>

                              <v-divider
                                class="mx-3"
                                thickness="2"
                                opacity="0.3"
                              />
                              <v-row class="ma-0 pa-0">
                                <v-col cols="6" class="pr-0 pb-0">
                                  <v-card-text class="pt-0 pr-0 text-left">
                                    <br />
                                    Date:<br />
                                    Time:<br />
                                    Bay:<br />
                                  </v-card-text>
                                </v-col>
                                <v-col cols="6" class="pl-0 pb-0">
                                  <v-card-text class="pt-0 pl-0 text-right">
                                    <br />
                                    {{
                                      new Date(
                                        appt.appointmentdate
                                      ).toLocaleDateString()
                                    }}<br />
                                    {{
                                      new Date(
                                        appt.appointmentdate
                                      ).toLocaleTimeString()
                                    }}<br />
                                    {{ appt.appointment_bay }}<br />
                                  </v-card-text>
                                </v-col>
                              </v-row>
                            </v-card>
                          </v-col>
                          <v-col cols="12" sm="7">
                            <v-card max-width="300" min-height="225">
                              <v-card-subtitle
                                class="mt-3 mb-0 font-weight-medium text-subtitle-1"
                                >Order Detail
                              </v-card-subtitle>
                              <v-divider
                                class="mx-3"
                                thickness="2"
                                opacity="0.3"
                              />
                              <v-row class="ma-0 pa-0">
                                <v-list>
                                  <div
                                    v-for="(item, index) in appt.order_detail"
                                    :key="item.productid"
                                  >
                                    <v-list-item>
                                      <template v-slot:prepend>
                                        <v-avatar color="#FFE2E5" size="40">
                                          {{ index + 1 }}
                                        </v-avatar>
                                      </template>

                                      <v-list-item-title
                                        class="font-weight-medium"
                                      >
                                        {{ item.productid }}
                                      </v-list-item-title>

                                      <v-list-item-subtitle>
                                        <v-row no-gutters>
                                          <v-col cols="12">
                                            Car ID: {{ item.carid }}
                                          </v-col>
                                          <v-col cols="12" class="mt-1">
                                            <v-chip
                                              size="small"
                                              color="#FFE2E5"
                                              class="mr-2"
                                            >
                                              Qty: {{ item.quantity }}
                                            </v-chip>
                                            <v-chip
                                              size="small"
                                              color="#FFE2E5"
                                              class="mr-2"
                                            >
                                              Unit: RM {{ item.unitprice }}
                                            </v-chip>
                                            <v-chip
                                              size="small"
                                              color="#FF3131"
                                              class="white--text"
                                            >
                                              Total: RM {{ item.totalprice }}
                                            </v-chip>
                                          </v-col>
                                        </v-row>
                                      </v-list-item-subtitle>
                                    </v-list-item>
                                  </div>
                                </v-list>
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

<style scoped>
v-card {
  box-sizing: border-box !important;
}
</style>

<script setup>
import { ref, computed } from "vue";
import axios from "axios";
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import ModifyApptDialog from "@/components/ModifyApptDialog.vue";

const activeTab = ref("tab-future");
const route = useRoute();
const baseUrl = import.meta.env.VITE_API_BASE_URL;

watch(
  () => route.query.tab,
  async (newTab) => {
    if (newTab) {
      activeTab.value = newTab;
      isLoading.value = true;
      try {
        await fetchAppointments();
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        isLoading.value = false;
      }
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
const appointments = ref([]);
const dialogVisible = ref(false);
const deleteVisible = ref(false);
const selectedIndex = ref(null);
const isLoading = ref(false);

const selectedItem = computed(() => {
  return selectedIndex.value !== null
    ? { ...appointments.value[selectedIndex.value] }
    : {};
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
      const appointmentId =
        appointments.value[selectedIndex.value].appointment_id;

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
      console.error("Error updating appointment:", error);
      // Handle error (e.g., show an error message to the user)
    } finally {
      // Reset selection and close dialog
      isLoading.value = false;
      selectedIndex.value = null;
      dialogVisible.value = false;
    }
  }
};

const handleCancel = async () => {
  if (selectedIndex.value !== null) {
    isLoading.value = true;
    try {
      const appointmentId =
        appointments.value[selectedIndex.value].appointmentid;

      const response = await axios.put(
        `${baseUrl}/cancel_appointment?appointment_id=${appointmentId}`,
        null,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );

      if (selectedIndex.value > -1) {
        appointments.value.splice(selectedIndex.value, 1);
      }
      if (response.status === 200 || response.status === 204) {
        console.log("Appointment deleted successfully");
        fetchAppointments();
      } else {
        throw new Error("Failed to delete appointment");
      }
    } catch (error) {
      console.error("Error deleting appointment:", error);
    } finally {
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
    const response = await axios.post(`${baseUrl}/get_appointment`, "", {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    appointments.value = response.data;
    console.log("Appointments fetched:", appointments.value);
    console.log("Appointments data:", response.data);
    /* const response = await api.get('/appointments');
        appointments.value = response.data; */
  } catch (error) {
    console.error("Error fetching appointments:", error);
    // Handle error (e.g., show an error message to the user)
  } finally {
    isLoading.value = false;
  }
};

// Call fetchAppointments when the component is created
fetchAppointments();
</script>
