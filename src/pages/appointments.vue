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
          <Loader v-if="loading" height="300px" width="300px" />
          <v-row v-else>
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
                      :key="appt.appointment.appointmentid"
                    >
                      <v-card
                        v-if="appt.appointment.status == 'Future'"
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
                                        appt.appointment.appointmentdate
                                      ).toLocaleDateString()
                                    }}<br />
                                    {{
                                      new Date(
                                        appt.appointment.appointmentdate
                                      ).toLocaleTimeString()
                                    }}<br />
                                    {{ appt.appointment.appointment_bay }}<br />
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
                                  <!-- <v-btn
                                    width="70"
                                    class="mr-2 my-1"
                                    color="#FFE2E5"
                                    @click="handleModify(appt.appointmentid)"
                                    >Modify</v-btn
                                  > -->
                                  <v-btn
                                    width="70"
                                    class="ml-2 my-1"
                                    color="#FF3131"
                                    @click="openDelete(i)"
                                    >Cancel</v-btn
                                  >
                                </v-col>
                              </v-row>
                            </v-card>
                          </v-col>
                          <v-col cols="12" sm="7">
                            <v-card max-width="300" min-height="225">
                              <v-card-subtitle
                                class="mt-3 mb-0 font-weight-medium text-subtitle-1"
                                >Order Details
                              </v-card-subtitle>
                              <v-divider
                                class="mx-3"
                                thickness="2"
                                opacity="0.3"
                              />
                              <v-row class="ma-0 pa-0">
                                <v-col cols="12" class="plateNumber"style="padding: 10px 0px 0px 0px;">
                                            Car: {{ appt.order_details[0].car.carbrand }}
                                            {{ appt.order_details[0].car.carmodel }} ({{
                                              appt.order_details[0].car.platenumber
                                            }})
                                </v-col>
                                <v-list>
                                  <div
                                    v-for="(item, index) in appt.order_details"
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
                                        {{ getItemDescription(item) }}
                                      </v-list-item-title>

                                      <v-list-item-subtitle>
                                        <v-row no-gutters>
                                          <!-- <v-col cols="12" class="plateNumber">
                                            Car: {{ item.car.carbrand }}
                                            {{ item.car.carmodel }} ({{
                                              item.car.platenumber
                                            }})
                                          </v-col> -->
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
                          >Confirm</v-btn
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
                        v-if="appt.appointment.status == 'Completed'"
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
                                        appt.appointment.appointmentdate
                                      ).toLocaleDateString()
                                    }}<br />
                                    {{
                                      new Date(
                                        appt.appointment.appointmentdate
                                      ).toLocaleTimeString()
                                    }}<br />
                                    {{ appt.appointment.appointment_bay }}<br />
                                  </v-card-text>
                                </v-col>
                              </v-row>
                            </v-card>
                          </v-col>
                          <v-col cols="12" sm="7">
                            <v-card max-width="300" min-height="225">
                              <v-card-subtitle
                                class="mt-3 mb-0 font-weight-medium text-subtitle-1"
                                >Order Details
                              </v-card-subtitle>
                              <v-divider
                                class="mx-3"
                                thickness="2"
                                opacity="0.3"
                              />
                              <v-row class="ma-0 pa-0">
                                <v-col cols="12" class="plateNumber"style="padding: 10px 0px 0px 0px;">
                                            Car: {{ appt.order_details[0].car.carbrand }}
                                            {{ appt.order_details[0].car.carmodel }} ({{
                                              appt.order_details[0].car.platenumber
                                            }})
                                </v-col>
                                <v-list>
                                  <div
                                    v-for="(item, index) in appt.order_details"
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
                                        {{ getItemDescription(item) }}
                                      </v-list-item-title>

                                      <v-list-item-subtitle>
                                        <v-row no-gutters>
                                          <!-- <v-col cols="12" class="plateNumber">
                                            Car: {{ item.car.carbrand }}
                                            {{ item.car.carmodel }} ({{
                                              item.car.platenumber
                                            }})
                                          </v-col> -->
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
                                              color="#FFE2E5"
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
                  </v-tabs-window-item>
                  <v-tabs-window-item value="tab-cancelled">
                    <template
                      v-for="(appt, i) in appointments"
                      :key="appt.appointment.appointmentid"
                    >
                      <v-card
                        v-if="appt.appointment.status == 'Cancelled'"
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
                                        appt.appointment.appointmentdate
                                      ).toLocaleDateString()
                                    }}<br />
                                    {{
                                      new Date(
                                        appt.appointment.appointmentdate
                                      ).toLocaleTimeString()
                                    }}<br />
                                    {{ appt.appointment.appointment_bay }}<br />
                                  </v-card-text>
                                </v-col>
                              </v-row>
                            </v-card>
                          </v-col>
                          <v-col cols="12" sm="7">
                            <v-card max-width="300" min-height="225">
                              <v-card-subtitle
                                class="mt-3 mb-0 font-weight-medium text-subtitle-1"
                                >Order Details
                              </v-card-subtitle>
                              <v-divider
                                class="mx-3"
                                thickness="2"
                                opacity="0.3"
                              />
                              <v-row class="ma-0 pa-0">
                                <v-col cols="12" class="plateNumber"style="padding: 10px 0px 0px 0px;">
                                            Car: {{ appt.order_details[0].car.carbrand }}
                                            {{ appt.order_details[0].car.carmodel }} ({{
                                              appt.order_details[0].car.platenumber
                                            }})
                                </v-col>
                                <v-list>
                                  <div
                                    v-for="(item, index) in appt.order_details"
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
                                        {{ getItemDescription(item) }}
                                      </v-list-item-title>

                                      <v-list-item-subtitle>
                                        <v-row no-gutters>
                                          <!-- <v-col cols="12" class="plateNumber">
                                            Car: {{ item.car.carbrand }}
                                            {{ item.car.carmodel }} ({{
                                              item.car.platenumber
                                            }})
                                          </v-col> -->
                                          <v-col cols="12" class="mt-1">
                                            <v-chip
                                              size="small"
                                              color="#FFE2E5"
                                              class="mr-2 text-black"
                                            >
                                              Qty: {{ item.quantity }}
                                            </v-chip>
                                            <v-chip
                                              size="small"
                                              color="#FFE2E5"
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
                  </v-tabs-window-item>
                </v-tabs-window>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <!-- <v-dialog v-model="modifyDialog" max-width="500px" background-color="white">
    <v-card>
      <v-card-title>Modify Appointment</v-card-title>
      <v-container>
              <AddCarInSchedule />
              <v-row>
                <v-col cols="12">
                  <Schedule />
                </v-col>
              </v-row>
            </v-container>
    </v-card>
    <AddCarInSchedule />
    <Schedule />
  </v-dialog> -->
</template>

<style scoped>
v-card {
  box-sizing: border-box !important;
}
.plateNumber {
  text-transform: uppercase;
}
</style>

<script setup>
import { ref, computed } from "vue";
import axios from "axios";
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import ModifyApptDialog from "@/components/ModifyApptDialog.vue";
import { appointmentComposable } from "@/composables/appointmentComposable";
import { vehicleComposable } from "@/composables/vehicleComposable";

const { newAppointment } = appointmentComposable();
const { selectedCar } = vehicleComposable();

const activeTab = ref("tab-future");
const route = useRoute();
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const getItemDescription = (item) => {
  if (item.service && item.service.description) {
    return item.service.description;
  } else if (item.tyre && item.tyre.description) {
    return item.tyre.description;
  } else {
    return "Unknown Item";
  }
};

// const modifyDialog = ref(false);
// const handleModify = (apptID) => {
//   modifyDialog.value = true;
// };

onMounted(async () => {
  document.title = "Appointments";

  await initializeData();
});

watch(
  () => route.query.tab,
  async (newTab) => {
    if (newTab) {
      activeTab.value = newTab;
      loading.value = true;
      try {
        await fetchAppointments();
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        loading.value = false;
        await initializeData();
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
// const isLoading = ref(false);

const selectedItem = computed(() => {
  return selectedIndex.value !== null
    ? { ...appointments.value[selectedIndex.value] }
    : {};
});

const openDialog = (index) => {
  selectedIndex.value = index;
  dialogVisible.value = true;
  selectedCar.value = {
    carid: -1,
    carbrand: "",
    carmodel: "",
    caryear: -1,
    platenumber: "",
    createdat: "",
    tyresize: "",
    cartype: "",
    accountid: "",
  };
  newAppointment.value = {
    id: -1,
    dateTime: new Date(),
    bay: -1,
    carid: -1,
  };
};

const openDelete = (index) => {
  selectedIndex.value = index;
  deleteVisible.value = true;
};

const handleSubmit = async (updatedData) => {
  if (selectedIndex.value !== null) {
    loading.value = true;
    try {
      const appointmentId =
        appointments.value[selectedIndex.value].appointment.appointmentid;

      //updatedData.appointment_id = appointmentId;
      // updatedData = {
      //   appointment_id: appointmentId,
      //   appointment_date: newAppointment.value.dateTime
      //     .toISOString()
      //     .split("T")[0],
      //     appointment_time: newAppointment.value.dateTime.toLocaleTimeString(),
      //     car_id: selectedCar.value.carid,
      // }
      //console.log("newAppointment.value: " + newAppointment.value.dateTime);
      // Get hours, minutes, and seconds in local time
      const hours = newAppointment.value.dateTime
        .getHours()
        .toString()
        .padStart(2, "0");
      const minutes = newAppointment.value.dateTime
        .getMinutes()
        .toString()
        .padStart(2, "0");
      const seconds = newAppointment.value.dateTime
        .getSeconds()
        .toString()
        .padStart(2, "0");
      // Combine to get the time in "HH:MM:SS" format
      const timeString = `${hours}:${minutes}:${seconds}.00Z`;

      // console.log("selectedIndex: " + selectedIndex.value);
      // console.log("appointment: " + appointments.value);
      // console.log("appointmentId: " + appointmentId);
      // console.log("timeString: " + timeString);
      // console.log("date" + newAppointment.value.dateTime.toISOString().split("T")[0]);
      // console.log("bay: " + newAppointment.value.bay);

      const response = await axios.put(
        `${baseUrl}/update_appointment`,
        {
          appointment_id: appointmentId,
          appointment_date: newAppointment.value.dateTime.toISOString().split("T")[0],
          appointment_time: timeString,
          //car_id: selectedCar.value.carid,
          appointment_bay: newAppointment.value.bay,
          //updatedData
        },
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (selectedIndex.value > -1) {
        appointments.value.splice(selectedIndex.value, 1);
      }
      if (response.status === 200 || response.status === 204) {
        console.log("Appointment updated successfully");
        fetchAppointments();
      } else {
        throw new Error("Failed to updated appointment");
      }
    } catch (error) {
      /* Temp */
      // appointments.value[selectedIndex.value].date = updatedData.date;
      // appointments.value[selectedIndex.value].time = updatedData.time;

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
      console.error("Error updating appointment:", error);
      // Handle error (e.g., show an error message to the user)
    } finally {
      // Reset selection and close dialog
      loading.value = false;
      selectedIndex.value = null;
      dialogVisible.value = false;
      // selectedCar.value = {
      //   carid: -1,
      //   carbrand: "",
      //   carmodel: "",
      //   caryear: -1,
      //   platenumber: "",
      //   createdat: "",
      //   tyresize: "",
      //   cartype: "",
      //   accountid: "",
      // };
      newAppointment.value = {
        id: -1,
        dateTime: new Date(),
        bay: -1,
        carid: -1,
      };
      await initializeData();
    }
  }
};

const handleCancel = async () => {
  console.log("siD: " + selectedIndex.value);
  if (selectedIndex.value !== null) {
    loading.value = true;
    try {
      const appointmentId =
        appointments.value[selectedIndex.value].appointment.appointmentid;
      console.log("appointmentId: " + appointmentId);

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
      loading.value = false;
      selectedIndex.value = null;
      deleteVisible.value = false;
      await initializeData();
    }
  }
};

// Function to fetch appointments from the server
const fetchAppointments = async () => {
  loading.value = true;
  try {
    const response = await axios.post(
      `${baseUrl}/get_appointment_details`,
      "",
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );
    appointments.value = response.data;
    //console.log("Appointments fetched:", appointments.value);
    // const appt_car = {
    //   carbrand: "KIA",
    //   carmodel: "STINGER",
    //   platenumber: "WYD1234",
    // };
    appointments.value.forEach((appointment) => {
      if (appointment.order_details && Array.isArray(appointment.order_details)) {
        appointment.order_details.forEach((detail) => {
          if (detail.carid === null) {
            appointment.appointment.carid = 520;
            detail.carid = 520;
            detail.car = {
              carid: 520,
              carbrand: "KIA",
              carmodel: "STINGER",
              platenumber: "WYD1234",
            };
          }
        });
      }
    });
    // console.log("Appointments fetched:", appointments.value);
    // console.log("Appointments data:", response.data);
    /* const response = await api.get('/appointments');
        appointments.value = response.data; */
  } catch (error) {
    console.error("Error fetching appointments:", error);
    // Handle error (e.g., show an error message to the user)
  } finally {
    loading.value = false;
  }
};

const loading = ref(true);
const initializeData = async () => {
  loading.value = true;
  const delay = new Promise((resolve) => setTimeout(resolve, 1000));
  try {
    await Promise.all([fetchAppointments(), delay]);
  } catch (error) {
    console.error("Error during initialization:", error);
  } finally {
    loading.value = false;
  }
};

// Call fetchAppointments when the component is created
//fetchAppointments();
</script>
