<template>
  <v-container>
    <h2>Tire Shop Schedule</h2>

    <v-row>
      <v-col cols="12" sm="12" md="6">
        <DatePicker v-model="dateSelected" label="Date" />
      </v-col>

      <v-col cols="4" sm="4" md="2" class="d-flex justify-center">
        <v-btn @click="previousDate()">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-col>

      <v-col cols="4" sm="4" md="2" class="d-flex justify-center">
        <v-btn @click="todayDate()"> today </v-btn>
      </v-col>

      <v-col cols="4" sm="4" md="2" class="d-flex justify-center">
        <v-btn @click="nextDate()">
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
                v-if="(schedule[hour][bay].year !== -1 && userType === 'admin') || (schedule[hour][bay].id === newApptInScheduleFormat.id && userType === 'customer')"
                color="primary"
                outlined
                class="appointment-chip"
                @click="openDialog(bay, hour)"
              >
                id: {{ schedule[hour][bay].id }}
              </v-chip>
              <v-chip v-if="(schedule[hour][bay].year !== -1 && userType === 'customer') && schedule[hour][bay].id !== newApptInScheduleFormat.id" color="red lighten-2" outlined class="appointment-chip">
                NA
              </v-chip>
              <v-chip v-else-if="schedule[hour][bay].year === -1" color="green lighten-2" outlined class="empty-slot-chip" @click="selectSlot(bay, hour)" :disabled="newApptInScheduleFormat.year !== -1">
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
            :items="filteredBays.map(bay => bay.text)"
            label="Select Bay"
            item-text="bay.text"
            item-value="bay.value"
            item-disabled="bay.disabled"
            outlined
            dense
            :rules="[rules.required]"
            :disabled="newApptInScheduleFormat.year !== -1"
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
            :disabled="newBay === '' || newApptInScheduleFormat.year !== -1"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="12" md="4">
          <v-select v-model="selectedCarStr" :items="formattedCarText" label="Select Car" outlined dense :rules="[rules.required]" :disabled="newApptInScheduleFormat.year !== -1"> </v-select>
        </v-col>
        <v-row v-if="selectedCarStr === 'Add New Car'">
          <v-col cols="12" sm="12" md="4">
            <v-text-field label="Plate Number" v-model="newNumberPlate" :rules="[rules.required]" required></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="4">
            <v-select v-model="newBrand" :items="brandSelections" label="Select Brand" outlined dense :rules="[rules.required]" required></v-select>
          </v-col>
          <v-col cols="12" sm="12" md="4">
            <v-select v-model="newModel" :items="modelSelections" label="Select Model" outlined dense :rules="[rules.required]" required></v-select>
          </v-col>
          <v-col cols="12" sm="12" md="4">
            <v-select v-model="newYear" :items="yearSelections" label="Select Car Year" outlined dense :rules="[rules.required, rules.year, rules.numberOnly]" required></v-select>
          </v-col>
          <v-col cols="12" sm="12" md="4">
            <v-select v-model="newTyreSize" :items="tyreSizeSelections" label="Select Tyre Size" outlined dense :rules="[rules.required]" required></v-select>
          </v-col>
          <v-col cols="12" sm="12" md="4">
            <v-select v-model="newType" :items="typeSelections" label="Select Car Type" outlined dense :rules="[rules.required]" required></v-select>
          </v-col>
        </v-row>
      </v-row>
      <v-row>
        <v-col cols="12" class="d-flex justify-center">
          <v-btn color="primary" class="mt-3" @click="addAppointment" :disabled="!addFormValid">Confirm Appointment</v-btn>
        </v-col>
        <v-col cols="12" v-if="newApptInScheduleFormat.year !== -1" align="center">
          appointment slot is on hold, press complete to proceed OR press
          <a @click="resetApptSlot" style="color: blue;">here</a>
          to reset.
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
  import { scheduleComposable } from "@/composables/scheduleComposable";
  import DatePicker from "@/components/DatePicker.vue";
  import { vehicleComposable } from "@/composables/vehicleComposable";
  import { appointmentComposable } from "@/composables/appointmentComposable";
  import axios from "axios";

  export default {
    data() {
      return {
        rules: {
          required: (v) => !!v || "This field is required",
          numberOnly: (v) => /^\d+$/.test(v) || "Must contain digits only",
          year: (value) => (value >= 1900 && value <= new Date().getFullYear()) || "Invalid year. Year must be more than 1900.",
          tyreFormat: (value) => !value || /^[0-9]{3}\/[0-9]{2}R[0-9]{2}$/.test(value) || "Invalid tire size format. Use 215/65R15.",
        },
        addFormValid: false,
        brandSelections: [],
        modelSelections: [],
        tyreSizeSelections: [],
        typeSelections: ["Unsure", "SUV", "Passenger"],
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

      const appts = [
        { id: 1, dateTime: new Date("2024-10-01T09:00:00"), service: "Oil Change", bay: 1, brand: "Honda", model: "Civic", year: 2021, status: "upcoming" },
        { id: 2, dateTime: new Date("2024-10-01T10:00:00"), service: "Tire Change", bay: 2, brand: "Ford", model: "Focus", year: 2019, status: "upcoming" },
        { id: 3, dateTime: new Date("2024-10-01T11:00:00"), service: "Brake Inspection", bay: 3, brand: "Chevrolet", model: "Malibu", year: 2020, status: "upcoming" },
        { id: 4, dateTime: new Date("2024-10-01T12:00:00"), service: "Repair", bay: 1, brand: "Toyota", model: "Camry", year: 2022, status: "upcoming" },
        { id: 5, dateTime: new Date("2024-10-01T13:00:00"), service: "Alignment", bay: 4, brand: "Nissan", model: "Altima", year: 2018, status: "upcoming" },
        { id: 6, dateTime: new Date("2024-10-01T14:00:00"), service: "Battery Check", bay: 2, brand: "Kia", model: "Soul", year: 2023, status: "upcoming" },
        { id: 7, dateTime: new Date("2024-10-01T15:00:00"), service: "Transmission Check", bay: 5, brand: "Volkswagen", model: "Jetta", year: 2020, status: "upcoming" },
        { id: 8, dateTime: new Date("2024-10-01T16:00:00"), service: "Suspension Check", bay: 3, brand: "Hyundai", model: "Elantra", year: 2022, status: "upcoming" },
        { id: 9, dateTime: new Date("2024-10-01T17:00:00"), service: "Tire Rotation", bay: 1, brand: "Mazda", model: "CX-5", year: 2021, status: "upcoming" },
        { id: 10, dateTime: new Date("2024-10-01T15:00:00"), service: "Engine Tune-Up", bay: 2, brand: "Subaru", model: "Forester", year: 2021, status: "upcoming" },
        { id: 11, dateTime: new Date("2024-10-01T10:00:00"), service: "Oil Change", bay: 1, brand: "Honda", model: "Civic", year: 2021, status: "upcoming" },
        { id: 12, dateTime: new Date("2024-10-01T11:00:00"), service: "Tire Change", bay: 1, brand: "Ford", model: "Focus", year: 2019, status: "upcoming" },
        { id: 13, dateTime: new Date("2024-10-01T13:00:00"), service: "Brake Inspection", bay: 1, brand: "Chevrolet", model: "Malibu", year: 2020, status: "upcoming" },
        { id: 14, dateTime: new Date("2024-10-01T14:00:00"), service: "Repair", bay: 1, brand: "Toyota", model: "Camry", year: 2022, status: "upcoming" },
        { id: 15, dateTime: new Date("2024-10-01T15:00:00"), service: "Alignment", bay: 1, brand: "Nissan", model: "Altima", year: 2018, status: "upcoming" },
        { id: 16, dateTime: new Date("2024-10-01T16:00:00"), service: "Battery Check", bay: 1, brand: "Kia", model: "Soul", year: 2023, status: "upcoming" },
        { id: 17, dateTime: new Date("2024-10-01T09:00:00"), service: "Transmission Check", bay: 4, brand: "Volkswagen", model: "Jetta", year: 2020, status: "upcoming" },
        { id: 18, dateTime: new Date("2024-10-01T10:00:00"), service: "Suspension Check", bay: 4, brand: "Hyundai", model: "Elantra", year: 2022, status: "upcoming" },
        { id: 19, dateTime: new Date("2024-10-01T11:00:00"), service: "Tire Rotation", bay: 4, brand: "Mazda", model: "CX-5", year: 2021, status: "upcoming" },
        { id: 20, dateTime: new Date("2024-10-01T12:00:00"), service: "Engine Tune-Up", bay: 4, brand: "Subaru", model: "Forester", year: 2021, status: "upcoming" },
        { id: 21, dateTime: new Date("2024-10-01T14:00:00"), service: "Oil Change", bay: 4, brand: "Honda", model: "Civic", year: 2021, status: "upcoming" },
        { id: 22, dateTime: new Date("2024-10-01T15:00:00"), service: "Tire Change", bay: 4, brand: "Ford", model: "Focus", year: 2019, status: "upcoming" },
        { id: 23, dateTime: new Date("2024-10-01T16:00:00"), service: "Brake Inspection", bay: 4, brand: "Chevrolet", model: "Malibu", year: 2020, status: "upcoming" },
        { id: 24, dateTime: new Date("2024-10-01T17:00:00"), service: "Repair", bay: 4, brand: "Toyota", model: "Camry", year: 2022, status: "upcoming" },
      ];
      let latestApptsId = null;
      const dialog = ref(false);

      const newBay = ref("");
      const newBayInt = ref(null);
      const newStartHour = ref("");
      const newEndHour = ref("");
      const newBrand = ref("");
      const newModel = ref("");
      const newYear = ref(null);
      const newTyreSize = ref("");
      const newNumberPlate = ref("");
      const newType = ref("");

      const selectedAppointment = {
        bay: "",
        startHour: "",
        endHour: "",
        id: "",
        service: "",
      };

      const { schedule, initializeSchedule } = scheduleComposable();

      const userType = ref("admin");

      const dateSelected = ref(new Date("2024-10-01"));

      const { vehicles, plateNumberInput, brandInput, modelInput, yearInput, tyreSizeInput,
        typeInput, fetchVehicles, getLatestVehicleId, addVehicle } = vehicleComposable();
      const selectedCarStr = ref("");
      const selectedCarObj = computed(() => {
        return vehicles.value.find((vehicle) => vehicle.plateNumber === plateNumberOfSelectedCar(selectedCarStr.value));
      });

      const newApptInScheduleFormat = ref({
        id: -2,
        bay: "",
        startHour: "",
        endHour: "",
        service: "",
        status: "",
        brand: "",
        model: "",
        year: -1,
      });

      const { newAppointment } = appointmentComposable();

      const formattedCarText = ref([]);

      onMounted(() => {
        transformToSchedule();
        isBaysfull();
        fetchVehicles();

        //for testing only
        //later need to be removed
        localStorage.setItem("userType", "customer");

        userType.value = localStorage.getItem("userType");
      });

      function plateNumberOfSelectedCar(str) {
        let match = str.match(/\(([^)]+)\)/); // Match content inside the parentheses
        if (match) {
          return match[1]; // Return the first captured group (content inside parentheses)
        } else {
          return "";
        }
      }

      const transformToSchedule = () => {
        initializeSchedule();
        appts.forEach((appt) => {
          const date = new Date(`${appt.dateTime.getFullYear()}-${appt.dateTime.getMonth() + 1}-${appt.dateTime.getDate()}`);
          const startHour = appt.dateTime.toLocaleTimeString([], { hour: "numeric", hour12: true });
          const endHour = new Date(appt.dateTime.getTime() + 60 * 60 * 1000).toLocaleTimeString([], { hour: "numeric", hour12: true });
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
              status: appt.status,
            };
          }
        });
      };

      const isBaysfull = () => {
        bays2.value.forEach((bay) => (bay.disabled = false));
        bays.forEach((bay) => {
          const isFull = hours.every((hour) => schedule.value[hour][bay].id !== -1);
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
          getNextApptsId();
          let dateTime = createDateTime(dateSelected.value, newStartHour.value);
          if (!newBrand.value && !newModel.value && !newYear.value && !newNumberPlate.value && selectedCarObj.value) {
            newBrand.value = selectedCarObj.value.brand;
            newModel.value = selectedCarObj.value.model;
            newYear.value = selectedCarObj.value.year;
            newNumberPlate.value = selectedCarObj.value.plateNumber;
            newTyreSize.value = selectedCarObj.value.tyreSize;
          } else if (newBrand.value && newModel.value && newYear.value && newNumberPlate.value) {
            //adding new vehicle
            plateNumberInput.value = newNumberPlate.value;
            brandInput.value = newBrand.value;
            modelInput.value = newModel.value;
            yearInput.value = newYear.value;
            tyreSizeInput.value = newTyreSize.value;
            typeInput.value = newType.value;
            addVehicle();
          }
          //set new appt in schedule format for schedule update
          newApptInScheduleFormat.value = {
            id: latestApptsId,
            bay: newBay.value,
            startHour: newStartHour.value,
            endHour: newEndHour.value,
            //later, service must get from database
            service: "Services",
            status: "upcoming",
            brand: newBrand.value,
            model: newModel.value,
            year: newYear.value,
          };
          //set new appt in appts store. so later can be use in api
          newAppointment.value = {
            id: latestApptsId,
            dateTime: dateTime,
            //later, service must get from database
            service: "Services",
            bay: newBayInt.value,
            brand: newBrand.value,
            model: newModel.value,
            year: newYear.value,
            status: "upcoming",
          };
          //add appointment to dummy data
          appts.push({
            id: latestApptsId,
            dateTime: dateTime,
            //later, service must get from database
            service: "Services",
            bay: newBayInt.value,
            brand: newBrand.value,
            model: newModel.value,
            year: newYear.value,
            status: "upcoming",
          });
          //reset values
          newBay.value = "";
          newBayInt.value = null;
          newStartHour.value = "";
          newEndHour.value = "";
          newBrand.value = "";
          newModel.value = "";
          newYear.value = null;
          newNumberPlate.value = "";
          newTyreSize.value = "";
          selectedCarStr.value = "";
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
          selectedAppointment.service = appointment.service;
          selectedAppointment.id = appointment.id;
          dialog.value = true;
        }
      };

      const getNextApptsId = () => {
        if (appts.length > 0) {
          latestApptsId = appts[appts.length - 1].id + 1;
        } else {
          latestApptsId = 0;
        }
      };

      const selectSlot = (bay, startHour) => {
        newBay.value = bay;
        newBayInt.value = parseInt(bay.match(/\d+/)[0]);
        newStartHour.value = startHour;
      };

      const todayDate = () => {
        dateSelected.value = new Date();
        transformToSchedule();
        isBaysfull();
      };

      const nextDate = () => {
        dateSelected.value = new Date(dateSelected.value.setDate(dateSelected.value.getDate() + 1));
        transformToSchedule();
        isBaysfull();
      };

      const previousDate = () => {
        dateSelected.value = new Date(dateSelected.value.setDate(dateSelected.value.getDate() - 1));
        transformToSchedule();
        isBaysfull();
      };

      return {
        appts,
        hours,
        bays,
        newStartHour,
        newEndHour,
        newBay,
        newBrand,
        newModel,
        newYear,
        newType,
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
        userType,
        bays2,
        filteredBays,
        isBaysfull,
        dateSelected,
        todayDate,
        nextDate,
        previousDate,
        vehicles,
        plateNumberInput,
        brandInput,
        modelInput,
        yearInput,
        tyreSizeInput,
        typeInput,
        fetchVehicles,
        addVehicle,
        selectedCarStr,
        selectedCarObj,
        newNumberPlate,
        newTyreSize,
        newApptInScheduleFormat,
        newAppointment,
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
      newBrand() {
        this.brandInput = this.newBrand;
      },
      brandInput() {
        this.getModelSelections();
      },
    },
    computed: {
      formattedCarText() {
        const vehicleTexts = this.vehicles.map((vehicle) => `${vehicle.brand} ${vehicle.model} ${vehicle.year} (${vehicle.plateNumber})`);
        return [...vehicleTexts, "Add New Car"]; // Append "Add New Car" to the array
      },
      yearSelections() {
        const startYear = 1990;
        const currentYear = new Date().getFullYear();
        const yearSelections = [];
        for (let year = startYear; year <= currentYear; year++) {
          yearSelections.push(year);
        }
        return yearSelections;
      },
    },
    mounted() {
      this.getBrandSelections();
      this.getTyreSizeSelections();
    },
    methods: {
      updateDisabledHours() {
        this.hours2.forEach((hour) => (hour.disabled = false));
        this.hours2.forEach((hour) => {
          if (this.newBay !== "") {
            hour.disabled = this.schedule[hour.value][this.newBay].id !== -1;
          }
        });
        this.filteredHours = this.hours2.filter((hour) => hour.disabled === false);
      },

      resetApptSlot() {
        //reset new appt in schedule format for schedule update
        this.newApptInScheduleFormat.value = {
          id: -2,
          bay: "",
          startHour: "",
          endHour: "",
          service: "",
          status: "",
          brand: "",
          model: "",
          year: -1,
        };
        //reset new appt in appts store. so later can be use in api
        this.newAppointment.value = {
          id: -1,
          dateTime: new Date(),
          service: "",
          bay: -1,
          brand: "",
          model: "",
          year: -1,
          status: "",
        };
        //delete appointment to dummy data
        this.appts.pop();
        this.transformToSchedule();
        this.isBaysfull();
        window.location.reload();
      },
      async getBrandSelections() {
        try {
          const response = await axios.get(
            "/api/car_brands",
            {
              headers: {
                Accept: "application/json",
              },
            }
          );
          this.brandSelections = response.data.car_brands;
          this.brandSelections = this.brandSelections.map((brand) => brand.toUpperCase());
        } catch (error) {
          if (axios.isAxiosError(error)) {
            // Axios-specific error
            console.error("Axios error:", error.message); 
            console.error("Response data:", error.response?.data); // Log the server's response if available
            console.error("Status code:", error.response?.status); // Log HTTP status code
          } else {
            // Non-Axios error
            console.error("Unknown error occurred:", error);
          }
        }
      },
      async getModelSelections() {
        try {
          const response = await axios.get(
            `/api/car_models/${this.brandInput.toLowerCase()}`,
            {
              headers: {
                Accept: "application/json",
              },
            }
          );
          this.modelSelections = response.data.car_models;
          this.modelSelections = this.modelSelections.map((brand) => brand.toUpperCase());
        } catch (error) {
          if (axios.isAxiosError(error)) {
            // Axios-specific error
            console.error("Axios error:", error.message); 
            console.error("Response data:", error.response?.data); // Log the server's response if available
            console.error("Status code:", error.response?.status); // Log HTTP status code
          } else {
            // Non-Axios error
            console.error("Unknown error occurred:", error);
          }
        }
      },
      async getTyreSizeSelections() {
        try {
          const response = await axios.get(
            `/api/tyre_sizes`,
            {
              headers: {
                Accept: "application/json",
              },
            }
          );
          this.tyreSizeSelections = response.data.tyre_sizes;
          this.tyreSizeSelections = ["Unsure", ...this.tyreSizeSelections];
          //this.tyreSizeSelections = this.tyreSizeSelections.map((brand) => brand.toUpperCase());
        } catch (error) {
          if (axios.isAxiosError(error)) {
            // Axios-specific error
            console.error("Axios error:", error.message); 
            console.error("Response data:", error.response?.data); // Log the server's response if available
            console.error("Status code:", error.response?.status); // Log HTTP status code
          } else {
            // Non-Axios error
            console.error("Unknown error occurred:", error);
          }
        }
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
