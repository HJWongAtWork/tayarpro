<template>
  <v-container>
    <h2>Tire Shop Schedule</h2>

    <v-row>

      <v-col cols="12">
        <v-select
          v-model="userType"
          :items="user"
          label="Select User Type"
        ></v-select>
      </v-col>

      <v-col cols="12" sm="12" md="6" class="d-flex justify-center">
        {{ formattedDate }}
      </v-col>

      <v-col cols="12" sm="12" md="3">
        <DatePicker
          v-model="dateSelected"
          label="Date"
        />
      </v-col>

      <v-col cols="4" sm="4" md="1" class="d-flex justify-center">
        <v-btn @click="previousDate()">
          &lt;
        </v-btn>
      </v-col>
        
      <v-col cols="4" sm="4" md="1" class="d-flex justify-center">
        <v-btn @click="todayDate()">
          today
        </v-btn>
      </v-col>

      <v-col cols="4" sm="4" md="1" class="d-flex justify-center">
        <v-btn @click="nextDate()">
          &gt;
        </v-btn>
      </v-col>

    </v-row>

    <div class="table-responsive">
    <table class="schedule-table">
      <thead>
        <tr>
          <th></th>
          <th
            v-for="(hour, index) in hours"
            :key="'header-' + index"
            class="text-center"
          >
            {{ hour }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(bay, bayIndex) in bays" :key="'bay-' + bayIndex">
          <td class="text-center"><strong>{{ bay }}</strong></td>
          <td
            v-for="(hour, hourIndex) in hours"
            :key="'bay-' + bayIndex + '-hour-' + hourIndex"
            class="slot-cell"
          >
            <v-chip
              v-if="schedule[hour][bay].year !== -1 && userType === 'admin'"
              color="primary"
              outlined
              class="appointment-chip"
              @click="openDialog(bay, hour)"
            >
              id: {{ schedule[hour][bay].id }}
            </v-chip>
            <v-chip
              v-if="schedule[hour][bay].year !== -1 && userType === 'customer'"
              color="red lighten-2"
              outlined
              class="appointment-chip"
            >
              NA
            </v-chip>
            <v-chip
              v-else-if="schedule[hour][bay].year === -1 && (userType === 'admin' || userType === 'customer')"
              color="green lighten-2"
              outlined
              class="empty-slot-chip"
              @click="selectSlot(bay, hour)"
            >
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
        <v-col cols="12" sm="12" md="4">
          <v-select
            v-model="newBay"
            :items="bays2.map(bay => bay.text)"
            label="Select Bay"
            item-text="bay.text"
            item-value="bay.value"
            item-disabled="bay.disabled"
            outlined
            dense
            :rules="[rules.required]"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="12" md="4">
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
            :disabled="newBay === ''"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="12" md="4">
          <v-select
            v-model="newService"
            :items="services"
            label="Select Service"
            outlined
            dense
            :rules="[rules.required]"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="12" md="4">
          <v-text-field
            v-model="newBrand"
            label="Enter Car Brand"
            outlined
            dense
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="12" md="4">
          <v-text-field
            v-model="newModel"
            label="Enter Car Model"
            outlined
            dense
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="12" md="4">
          <v-text-field
            type="number"
            v-model="newYear"
            label="Enter Car Year"
            outlined
            dense
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="d-flex justify-center">
          <v-btn
            color="primary"
            class="mt-3"
            @click="addAppointment"
            :disabled="!addFormValid"
            >Add Appointment</v-btn
          >
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
            {{ selectedAppointment.startHour }} - {{ selectedAppointment.endHour
            }}
          </p>
          <p><strong>Service:</strong> {{ selectedAppointment.service }}</p>
          <p><strong>Appointment ID:</strong> {{ selectedAppointment.id }}</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import { scheduleComposable } from '@/composables/scheduleComposable';
  import DatePicker from '@/components/DatePicker.vue';

    export default {
      data() {
        return {
          rules: {
            required: (v) => !!v || 'This field is required',
          },
          addFormValid: false,
        }
      },
      components: {
        DatePicker
      },
      setup() {
        const hours = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"];
        const hours2 = ref([
          { text: '9 AM', value: '9 AM', disabled: false },
          { text: '10 AM', value: '10 AM', disabled: false },
          { text: '11 AM', value: '11 AM', disabled: false },
          { text: '12 PM', value: '12 PM', disabled: false },
          { text: '1 PM', value: '1 PM', disabled: false },
          { text: '2 PM', value: '2 PM', disabled: false },
          { text: '3 PM', value: '3 PM', disabled: false },
          { text: '4 PM', value: '4 PM', disabled: false },
          { text: '5 PM', value: '5 PM', disabled: false },
        ]);
        const filteredHours = ref([]);
        const bays = ["Bay 1", "Bay 2", "Bay 3", "Bay 4", "Bay 5"];
        const bays2 = ref([
          { text: 'Bay 1', value: 'Bay 1', disabled: false },
          { text: 'Bay 2', value: 'Bay 2', disabled: false },
          { text: 'Bay 3', value: 'Bay 3', disabled: false },
          { text: 'Bay 4', value: 'Bay 4', disabled: false },
          { text: 'Bay 5', value: 'Bay 5', disabled: false },
        ]);
        const services = [
          "Oil Change",
          "Tire Change",
          "Brake Inspection",
          "Repair",
          "Alignment",
          "Battery Check",
          "Transmission Check",
          "Suspension Check",
          "Tire Rotation",
          "Engine Tune-Up"
        ]

        const appts = [
          { id: 1, dateTime: new Date('2024-10-01T09:00:00'), service: 'Oil Change', bay: 1, brand: 'Honda', model: 'Civic', year: 2021, status: 'upcoming' },
          { id: 2, dateTime: new Date('2024-10-01T10:00:00'), service: 'Tire Change', bay: 2, brand: 'Ford', model: 'Focus', year: 2019, status: 'upcoming' },
          { id: 3, dateTime: new Date('2024-10-01T11:00:00'), service: 'Brake Inspection', bay: 3, brand: 'Chevrolet', model: 'Malibu', year: 2020, status: 'upcoming' },
          { id: 4, dateTime: new Date('2024-10-01T12:00:00'), service: 'Repair', bay: 1, brand: 'Toyota', model: 'Camry', year: 2022, status: 'upcoming' },
          { id: 5, dateTime: new Date('2024-10-01T13:00:00'), service: 'Alignment', bay: 4, brand: 'Nissan', model: 'Altima', year: 2018, status: 'upcoming' },
          { id: 6, dateTime: new Date('2024-10-01T14:00:00'), service: 'Battery Check', bay: 2, brand: 'Kia', model: 'Soul', year: 2023, status: 'upcoming' },
          { id: 7, dateTime: new Date('2024-10-01T15:00:00'), service: 'Transmission Check', bay: 5, brand: 'Volkswagen', model: 'Jetta', year: 2020, status: 'upcoming' },
          { id: 8, dateTime: new Date('2024-10-01T16:00:00'), service: 'Suspension Check', bay: 3, brand: 'Hyundai', model: 'Elantra', year: 2022, status: 'upcoming' },
          { id: 9, dateTime: new Date('2024-10-01T17:00:00'), service: 'Tire Rotation', bay: 1, brand: 'Mazda', model: 'CX-5', year: 2021, status: 'upcoming' },
          { id: 10, dateTime: new Date('2024-10-01T15:00:00'), service: 'Engine Tune-Up', bay: 2, brand: 'Subaru', model: 'Forester', year: 2021, status: 'upcoming' },
          { id: 11, dateTime: new Date('2024-10-01T10:00:00'), service: 'Oil Change', bay: 1, brand: 'Honda', model: 'Civic', year: 2021, status: 'upcoming' },
          { id: 12, dateTime: new Date('2024-10-01T11:00:00'), service: 'Tire Change', bay: 1, brand: 'Ford', model: 'Focus', year: 2019, status: 'upcoming' },
          { id: 13, dateTime: new Date('2024-10-01T13:00:00'), service: 'Brake Inspection', bay: 1, brand: 'Chevrolet', model: 'Malibu', year: 2020, status: 'upcoming' },
          { id: 14, dateTime: new Date('2024-10-01T14:00:00'), service: 'Repair', bay: 1, brand: 'Toyota', model: 'Camry', year: 2022, status: 'upcoming' },
          { id: 15, dateTime: new Date('2024-10-01T15:00:00'), service: 'Alignment', bay: 1, brand: 'Nissan', model: 'Altima', year: 2018, status: 'upcoming' },
          { id: 16, dateTime: new Date('2024-10-01T16:00:00'), service: 'Battery Check', bay: 1, brand: 'Kia', model: 'Soul', year: 2023, status: 'upcoming' },
          { id: 17, dateTime: new Date('2024-10-01T09:00:00'), service: 'Transmission Check', bay: 4, brand: 'Volkswagen', model: 'Jetta', year: 2020, status: 'upcoming' },
          { id: 18, dateTime: new Date('2024-10-01T10:00:00'), service: 'Suspension Check', bay: 4, brand: 'Hyundai', model: 'Elantra', year: 2022, status: 'upcoming' },
          { id: 19, dateTime: new Date('2024-10-01T11:00:00'), service: 'Tire Rotation', bay: 4, brand: 'Mazda', model: 'CX-5', year: 2021, status: 'upcoming' },
          { id: 20, dateTime: new Date('2024-10-01T12:00:00'), service: 'Engine Tune-Up', bay: 4, brand: 'Subaru', model: 'Forester', year: 2021, status: 'upcoming' },
          { id: 21, dateTime: new Date('2024-10-01T14:00:00'), service: 'Oil Change', bay: 4, brand: 'Honda', model: 'Civic', year: 2021, status: 'upcoming' },
          { id: 22, dateTime: new Date('2024-10-01T15:00:00'), service: 'Tire Change', bay: 4, brand: 'Ford', model: 'Focus', year: 2019, status: 'upcoming' },
          { id: 23, dateTime: new Date('2024-10-01T16:00:00'), service: 'Brake Inspection', bay: 4, brand: 'Chevrolet', model: 'Malibu', year: 2020, status: 'upcoming' },
          { id: 24, dateTime: new Date('2024-10-01T17:00:00'), service: 'Repair', bay: 4, brand: 'Toyota', model: 'Camry', year: 2022, status: 'upcoming' },
        ];
        let latestApptsId = null;
        const dialog = ref(false);

        const newBay = ref("");
        const newBayInt = ref(null);
        const newStartHour = ref("");
        const newEndHour = ref("");
        const newService = ref("");
        const newBrand = ref("");
        const newModel = ref("");
        const newYear = ref(null);

        const selectedAppointment = ({
          bay: "",
          startHour: "",
          endHour: "",
          id: "",
          service: ""
        });

        const {
          schedule,
          initializeSchedule
        } = scheduleComposable();

        const user = ["customer", "admin", ""];
        const userType = ref("admin");

        const dateSelected = ref(new Date('2024-10-01'));
        const formattedDate = computed(() => {
          const dayname = dateSelected.value.toLocaleString('default', { weekday: 'long' });
          const day = dateSelected.value.getDate();
          const month = dateSelected.value.toLocaleString('default', { month: 'long' });
          const year = dateSelected.value.getFullYear();
          return `${dayname.toUpperCase()}, ${day} ${month.toUpperCase()} ${year}`;
        });

        onMounted(() => {
          //localStorage.setItem("username", username.value);
          transformToSchedule();
          isBaysfull();
        });

        const transformToSchedule = () => {
          initializeSchedule();
          appts.forEach(appt => {
            const date = new Date(`${appt.dateTime.getFullYear()}-${appt.dateTime.getMonth()+1}-${appt.dateTime.getDate()}`);
            const startHour = appt.dateTime.toLocaleTimeString([], { hour: 'numeric', hour12: true });
            const endHour = new Date(appt.dateTime.getTime() + 60 * 60 * 1000).toLocaleTimeString([], { hour: 'numeric', hour12: true });
            const bayKey = `Bay ${appt.bay}`;
            if (date.getFullYear() === dateSelected.value.getFullYear() && date.getMonth() === dateSelected.value.getMonth() && date.getDate() === dateSelected.value.getDate()) {
              schedule.value[startHour][bayKey] = {
                id: appt.id,
                service: appt.service,
                bay: bayKey,
                startHour: startHour,
                endHour: endHour,
                brand: appt.brand,
                model: appt.model,
                year: appt.year,
                status: appt.status
              };
            };
          });
        };

        const isBaysfull = () => {
          bays.forEach(bay => {
            const isFull = hours.every(hour => schedule.value[hour][bay].id !== -1);
            bays2.value.forEach(bay2 => {
              if (bay2.value === bay) {
                bay2.disabled = isFull;
              }
            });
          });
          bays2.value = bays2.value.filter(bay => !bay.disabled);
        };

        function createDateTime(date, hour) {
          let [hourStr, period] = hour.split(" ");
          let hour24 = parseInt(hourStr, 10);
          if (period === "PM" && hour24 !== 12) {
            hour24 += 12;
          } else if (period === "AM" && hour24 === 12) {
            hour24 = 0;
          }
          let dateTimeStr = `${date}T${String(hour24).padStart(2, '0')}:00:00`;
          let dateTime = new Date(dateTimeStr);
          return dateTime;
        }

        const addAppointment = () => {
          newBayInt.value = parseInt(newBay.value.match(/\d+/)[0]);
          if (newBayInt && newStartHour && newService && newBrand && newModel && newYear) {
            let sHour = newStartHour.value.match(/^(\d+)/)[1];
            let sHourInt = parseInt(sHour, 10);
            let eHour = sHourInt + 1;
            let eHourStr = "";
            if (eHour > 12) {
              eHour = eHour - 12;
              eHourStr = eHour + " PM";
            }
            else if(eHour < 12 && eHour > 8) {
              eHourStr = eHour + " AM";
            }
            else {
              eHourStr = eHour + " PM";
            }
            newEndHour.value = eHourStr;
            getNextApptsId();
            let dateTime = createDateTime("2024-10-01", newStartHour.value);
            appts.push({
              id: latestApptsId,
              dateTime: dateTime,
              service: newService.value,
              bay: newBayInt.value,
              brand: newBrand.value,
              model: newModel.value,
              year: newYear.value,
              status: "upcoming"
            });
            newBay.value = "";
            newBayInt.value = null;
            newStartHour.value = "";
            newEndHour.value = "";
            newService.value = "";
            newBrand.value = "";
            newModel.value = "";
            newYear.value = null;
          }
          transformToSchedule();
          isBaysfull();
        }

        const openDialog = (bay, startHour) => {
          const appointment = schedule.value[startHour][bay];
          if (appointment) {
            selectedAppointment.bay = bay;
            selectedAppointment.startHour = startHour;
            selectedAppointment.endHour = appointment.endHour;
            selectedAppointment.service = appointment.service;
            selectedAppointment.id = appointment.id;
            dialog.value = true;
          }
        }

        const getNextApptsId = () => {
          if (appts.length > 0) {
            latestApptsId = appts[appts.length - 1].id + 1;
          }
          else {
            latestApptsId = 0;
          }
        }

        const selectSlot = (bay, startHour) => {
          newBay.value = bay;
          newBayInt.value = parseInt(bay.match(/\d+/)[0]);
          newStartHour.value = startHour;
        };

        const todayDate = () => {
          dateSelected.value = new Date();
          transformToSchedule();
          isBaysfull();
        }

        const nextDate = () => {
          dateSelected.value = new Date(dateSelected.value.setDate(dateSelected.value.getDate() + 1));
          transformToSchedule();
          isBaysfull();
        }

        const previousDate = () => {
          dateSelected.value = new Date(dateSelected.value.setDate(dateSelected.value.getDate() - 1));
          transformToSchedule();
          isBaysfull();
        }

        return {
          appts,
          hours,
          services,
          bays,
          newStartHour,
          newEndHour,
          newService,
          newBay,
          newBrand,
          newModel,
          newYear,
          dialog,
          selectedAppointment,
          addAppointment,
          openDialog,
          getNextApptsId,
          selectSlot,
          schedule,
          transformToSchedule,
          createDateTime,
          hours2,
          filteredHours,
          user,
          userType,
          bays2,
          isBaysfull,
          dateSelected,
          formattedDate,
          todayDate,
          nextDate, 
          previousDate
        };
      },
      watch: {
        newBay() {
          this.updateDisabledHours();
        },
        dateSelected() {
          this.transformToSchedule();
          this.isBaysfull();
        }
      },
      methods: {
        updateDisabledHours() {
          this.hours2.forEach(hour => {
            if (this.newBay !== '') {
              hour.disabled = this.schedule[hour.value][this.newBay].id !== -1;
            }
          });
          this.filteredHours = this.hours2.filter(hour => hour.disabled === false);
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
    border: 1px solid #E0E0E0;
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
