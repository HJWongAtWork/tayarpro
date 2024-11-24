<template>
  <Loader v-if="loading" height="300px" width="300px"/>
  <v-container v-else>
    <h2>Tire Shop Schedule</h2>
    <v-row>
      <v-col cols="12" sm="4" md="2" class="d-flex justify-center align-center">
        <v-btn 
          @click="previousDate()" 
          :disabled="dateSelected.toDateString() === new Date(Date.now() + 2*24 * 60 * 60 * 1000).toDateString() || newApptInScheduleFormat.id !== ''">
          <v-icon>mdi-chevron-left</v-icon>
          <v-icon>mdi-chevron-left</v-icon>
          <v-icon>mdi-chevron-left</v-icon>
          <!-- previous date -->
        </v-btn>
      </v-col>
      <v-col cols="12" sm="4" md="8" class="d-flex justify-center align-center">
        <DatePicker v-model="dateSelected" label="Date" :min="minDate" :disabled="newApptInScheduleFormat.id !== ''"/>
      </v-col>
      <v-col cols="12" sm="4" md="2" class="d-flex justify-center align-center">
        <v-btn @click="nextDate()" :disabled="newApptInScheduleFormat.id !== ''">
          <!-- next date -->
          <v-icon>mdi-chevron-right</v-icon>
          <v-icon>mdi-chevron-right</v-icon>
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <div class="table-responsive">
      <table class="schedule-table">
        <thead>
          <tr>
            <th></th>
            <th v-for="(hour, index) in hours" :key="'header-' + index" class="text-center">
              {{ hour }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(bay, bayIndex) in bays" :key="'bay-' + bayIndex">
            <td class="text-center"><strong>{{ bay }}</strong></td>
            <td v-for="(hour, hourIndex) in hours" :key="'bay-' + bayIndex + '-hour-' + hourIndex" class="slot-cell">
              <v-chip
                v-if="(schedule[hour][bay].status === 'Future' && userType === 'admin') || (newApptInScheduleFormat.bay === schedule[hour][bay].bay && newApptInScheduleFormat.startHour === schedule[hour][bay].startHour && userType === 'customer')"
                color="primary"
                outlined
                class="appointment-chip"
                @click="openDialog(bay, hour)"
              >
                <v-icon>mdi-eye</v-icon>
              </v-chip>
              <v-chip v-if="(schedule[hour][bay].status === 'Future' && userType === 'customer')" color="red lighten-2" outlined class="appointment-chip">
                NA
              </v-chip>
              <v-chip v-else-if="schedule[hour][bay].status === '' && newApptInScheduleFormat.status !== 'Future'" color="green lighten-2" outlined class="empty-slot-chip" @click="selectSlot(bay, hour)" :disabled="newApptInScheduleFormat.id !== ''">
                +
              </v-chip>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <h3 class="mt-5">Add New Appointment</h3>
    <v-form v-model="addFormValid" :disabled="userType === ''">
      <v-row>
        <v-col cols="12" sm="12" md="6">
          <v-select
            v-model="newBay"
            :items="filteredBays.map(bay => bay.text)"
            label="Select Bay"
            item-text="bay.text"
            item-value="bay.value"
            item-disabled="bay.disabled"
            outlined
            dense
            :rules="[rules.required]"
            :disabled="newApptInScheduleFormat.id !== ''"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="12" md="6">
          <v-select
            v-model="newStartHour"
            :items="filteredHours.map(hour => hour.text)"
            label="Select Start Hour"
            item-text="hour.text"
            item-value="hour.value"
            item-disabled="hour.disabled"
            outlined
            dense
            :rules="[rules.required]"
            :disabled="newBay === '' || newApptInScheduleFormat.id !== ''"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="d-flex justify-center">
          <v-btn color="primary" class="mt-3" @click="addAppointment" :disabled="!addFormValid">Confirm Appointment</v-btn>
        </v-col>
        <v-col cols="12" v-if="newApptInScheduleFormat.id !== ''" align="center">
          ppointment slot is on hold, please proceed OR press
          <v-btn @click="resetApptSlot" style="color: blue;">here</v-btn>
          to reset.
        </v-col>
        <v-col cols="12" v-else align="center">
          Please be make sure to confirm appointment first to hold the slot.
        </v-col>          
      </v-row>
    </v-form>

    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title class="text-h5">Appointment Details</v-card-title>
        <v-card-text>
          <p><strong>Bay:</strong> {{ selectedAppointment.bay }}</p>
          <p>
            <strong>Duration:</strong>
            {{ selectedAppointment.startHour }} - {{ selectedAppointment.endHour }}
          </p>
          <p><strong>Appointment ID:</strong> {{ selectedAppointment.id }}</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>

  <ToastNotification
    ref="toast"
    :default-color="'info'"
    :default-timeout="-1"
    :max-toasts="5"
  />

</template>

<script>
  import { scheduleComposable } from "@/composables/scheduleComposable";
  import DatePicker from "@/components/DatePicker.vue";
  import { appointmentComposable } from "@/composables/appointmentComposable";
  import axios from "axios";
  import ToastNotification from "../components/ToastNotification.vue";

  export default {
    data() {
      return {
        rules: {
          required: (v) => !!v || "This field is required",
        },
        addFormValid: false,
      };
    },
    components: {
      DatePicker,
    },
    setup() {
      const hours = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"];
      const hours2 = ref([
        { text: "9 AM", value: "9 AM", disabled: false },
        { text: "10 AM", value: "10 AM", disabled: false },
        { text: "11 AM", value: "11 AM", disabled: false },
        { text: "12 PM", value: "12 PM", disabled: false },
        { text: "1 PM", value: "1 PM", disabled: false },
        { text: "2 PM", value: "2 PM", disabled: false },
        { text: "3 PM", value: "3 PM", disabled: false },
        { text: "4 PM", value: "4 PM", disabled: false },
        { text: "5 PM", value: "5 PM", disabled: false },
      ]);
      const filteredHours = ref([]);
      const bays = ["Bay 1", "Bay 2", "Bay 3", "Bay 4", "Bay 5"];
      const bays2 = ref([
        { text: "Bay 1", value: "Bay 1", disabled: false },
        { text: "Bay 2", value: "Bay 2", disabled: false },
        { text: "Bay 3", value: "Bay 3", disabled: false },
        { text: "Bay 4", value: "Bay 4", disabled: false },
        { text: "Bay 5", value: "Bay 5", disabled: false },
      ]);
      const filteredBays = ref([]);

      let latestApptsId = null;
      const dialog = ref(false);

      const newBay = ref("");
      const newBayInt = ref(null);
      const newStartHour = ref("");
      const newEndHour = ref("");

      const selectedAppointment = {
        bay: "",
        startHour: "",
        endHour: "",
        id: "",
        carid: -1,
        status: "",
      };

      const { schedule, initializeSchedule } = scheduleComposable();

      const userType = ref("");

      const dateSelected = ref(new Date(Date.now() + 2 * 24 * 60 * 60 * 1000));
      const minDate = new Date(Date.now() + 0 * 24 * 60 * 60 * 1000);

      const newApptInScheduleFormat = ref({
        bay: "",
        startHour: "",
        endHour: "",
        id: "",
        carid: -1,
        status: "",
      });

      const { newAppointment, allAppointments, fetchAllAppointments } = appointmentComposable();

      const toast = ref(null);

      onMounted( async () => {
        await initializeData();
        transformToSchedule();
        isBaysfull();

        const userData = JSON.parse(localStorage.getItem("user"));

        if (userData && userData.isadmin === null) {
          userType.value = "customer";
        } else if (userData && userData.isadmin !== null) {
          userType.value = "admin";
        }
      });

      const loading = ref(true);
      const initializeData = async () => {
        loading.value = true;
        const delay = new Promise((resolve) => setTimeout(resolve, 1000));
        try {
          await Promise.all([
          fetchAllAppointments(),
            delay,
          ]);
        } catch (error) {
          console.error("Error during initialization:", error);
        } finally {
          loading.value = false;
        }
    };

      const transformToSchedule = () => {
        initializeSchedule();
        allAppointments.value.forEach((appt) => {
          // const date = new Date(`${appt.dateTime.getFullYear()}-${appt.dateTime.getMonth() + 1}-${appt.dateTime.getDate()}`);
          // const startHour = appt.dateTime.toLocaleTimeString([], { hour: "numeric", hour12: true });
          // const endHour = new Date(appt.dateTime.getTime() + 60 * 60 * 1000).toLocaleTimeString([], { hour: "numeric", hour12: true });

          const apptdate = new Date(appt.appointmentdate);

          const date = `${apptdate.getFullYear()}-${(apptdate.getMonth() + 1).toString().padStart(2, '0')}-${apptdate.getDate().toString().padStart(2, '0')}`;

          const startHour = apptdate.toLocaleTimeString([], { hour: "numeric", hour12: true });

          const endHour = new Date(apptdate.getTime() + 60 * 60 * 1000).toLocaleTimeString([], { hour: "numeric", hour12: true });

          const bayKey = `Bay ${appt.appointment_bay}`;
          //console.log("bayKey: " + bayKey);
          if (apptdate.getFullYear() === dateSelected.value.getFullYear() && apptdate.getMonth() === dateSelected.value.getMonth() 
          && apptdate.getDate() === dateSelected.value.getDate() && appt.status === "Future") {
            
            schedule.value[startHour][bayKey] = {
              id: appt.appointmentid,
              bay: bayKey,
              startHour: startHour,
              endHour: endHour,
              status: appt.status,
              carid: appt.carid,
            };
          }
        });
      };

      const isBaysfull = () => {
        bays2.value.forEach((bay) => (bay.disabled = false));
        bays.forEach((bay) => {
          const isFull = hours.every((hour) => schedule.value[hour][bay].id !== "");
          bays2.value.forEach((bay2) => {
            if (bay2.value === bay) {
              bay2.disabled = isFull;
            }
          });
        });
        filteredBays.value = bays2.value.filter((bay) => !bay.disabled);
      };

      function createDateTime(date, hour) {
        let [hourStr, period] = hour.split(" ");
        let hour24 = parseInt(hourStr, 10);
        if (period === "PM" && hour24 !== 12) {
          hour24 += 12;
        } else if (period === "AM" && hour24 === 12) {
          hour24 = 0;
        }
        let dateTime = new Date(date);
        dateTime.setHours(hour24, 0, 0, 0);
        return dateTime;
      }

      const addAppointment = () => {
        //setting values
        newBayInt.value = parseInt(newBay.value.match(/\d+/)[0]);
        if (newBayInt && newStartHour) {
          getNewEndHour();
          //getNextApptsId();
          let dateTime = createDateTime(dateSelected.value, newStartHour.value);
          //set new appt in schedule format for schedule update
          newApptInScheduleFormat.value = {
            id: "-1",
            bay: newBay.value,
            startHour: newStartHour.value,
            endHour: newEndHour.value,
            status: "Future",
          };
          //set new appt in appts store. so later can be use in api
          newAppointment.value = {
            //id: latestApptsId,
            dateTime: dateTime,
            bay: newBayInt.value,
          };
          // //add appointment to dummy data (to be removed. api is not here)
          // appts.push({
          //   id: latestApptsId,
          //   dateTime: dateTime,
          //   bay: newBayInt.value,
          //   status: "upcoming",
          //   carid: Math.floor(Math.random() * 100),
          // });
          //reset values
          newBay.value = "";
          newBayInt.value = null;
          newStartHour.value = "";
          newEndHour.value = "";
        }
        transformToSchedule();
        isBaysfull();
      };

      function getNewEndHour() {
        let sHour = newStartHour.value.match(/^(\d+)/)[1];
        let sHourInt = parseInt(sHour, 10);
        let eHour = sHourInt + 1;
        let eHourStr = "";
        if (eHour > 12) {
          eHour = eHour - 12;
          eHourStr = eHour + " PM";
        } else if (eHour < 12 && eHour > 8) {
          eHourStr = eHour + " AM";
        } else {
          eHourStr = eHour + " PM";
        }
        newEndHour.value = eHourStr;
      }

      const openDialog = (bay, startHour) => {
        const appointment = schedule.value[startHour][bay];
        if (appointment) {
          selectedAppointment.bay = bay;
          selectedAppointment.startHour = startHour;
          selectedAppointment.endHour = appointment.endHour;
          selectedAppointment.id = appointment.id;
          selectedAppointment.carid = appointment.carid;
          selectedAppointment.status = appointment.status;
          dialog.value = true;
        }
      };

      // const getNextApptsId = () => {
      //   if (appts.length > 0) {
      //     latestApptsId = appts[appts.length - 1].id + 1;
      //   } else {
      //     latestApptsId = 0;
      //   }
      // };

      const selectSlot = (bay, startHour) => {
        newBay.value = bay;
        newBayInt.value = parseInt(bay.match(/\d+/)[0]);
        newStartHour.value = startHour;
      };

      const nextDate = () => {
        dateSelected.value = new Date(dateSelected.value.setDate(dateSelected.value.getDate() + 1));
        transformToSchedule();
        isBaysfull();
      };

      const previousDate = () => {
        const newDate = new Date(dateSelected.value);
        newDate.setDate(newDate.getDate() - 1);
        if (newDate > minDate) {
          dateSelected.value = newDate;
        } else {
          dateSelected.value.setDate(Date.now() + 24 * 60 * 60 * 1000);
          const showDate = new Date(newDate);
          showDate.setDate(showDate.getDate() + 1);
          toast.value.addToast(`Cannot select a date before ${showDate.toDateString()}`, 2000);
        }
        transformToSchedule();
        isBaysfull();
      };

      return {
        //appts,
        hours,
        bays,
        newStartHour,
        newEndHour,
        newBay,
        dialog,
        selectedAppointment,
        addAppointment,
        openDialog,
        //getNextApptsId,
        selectSlot,
        schedule,
        transformToSchedule,
        createDateTime,
        hours2,
        filteredHours,
        userType,
        bays2,
        filteredBays,
        isBaysfull,
        dateSelected,
        nextDate,
        previousDate,
        newApptInScheduleFormat,
        newAppointment,
        minDate,
        toast,
        loading,
      };
    },
    watch: {
      newBay() {
        this.updateDisabledHours();
      },
      dateSelected() {
        this.transformToSchedule();
        this.isBaysfull();
      },
    },
    methods: {
      updateDisabledHours() {
        this.hours2.forEach((hour) => (hour.disabled = false));
        this.hours2.forEach((hour) => {
          if (this.newBay !== "") {
            hour.disabled = this.schedule[hour.value][this.newBay].id !== "";
          }
        });
        this.filteredHours = this.hours2.filter((hour) => hour.disabled === false);
      },

      resetApptSlot() {
        //reset new appt in schedule format for schedule update
        this.newApptInScheduleFormat.value = {
          id: "",
          bay: "",
          startHour: "",
          endHour: "",
          status: "",
          carid: -1,
        };
        //reset new appt in appts store. so later can be use in api
        this.newAppointment.value = {
          id: -1,
          dateTime: new Date(),
          bay: -1,
          carid: -1,
        };
        this.transformToSchedule();
        this.isBaysfull();
        window.location.reload();
      },
    },
  };
</script>

<style scoped>
  .schedule-table {
    width: 100%;
    border-collapse: collapse;
    text-align: center;
  }

  .schedule-table th,
  .schedule-table td {
    border: 1px solid #e0e0e0;
    padding: 10px;
  }

  .slot-cell {
    cursor: pointer;
    height: 80px;
  }

  .appointment-chip {
    font-size: 0.9rem;
  }

  .v-select .v-label {
    margin-top: 0;
    margin-left: 10px;
  }

  .table-responsive {
    width: 100%;
    overflow-x: auto;
  }
</style>
