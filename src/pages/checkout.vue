<template>
  <v-container class="justify-center d-flex" max-width="1200">
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-item value="1">Select Payment Method</v-stepper-item>
        <v-divider></v-divider>
        <v-stepper-item value="2"> Set Appointment</v-stepper-item>
        <v-divider></v-divider>
        <v-stepper-item value="3">Confirmation</v-stepper-item>
      </v-stepper-header>

      <v-stepper-window>
        <v-stepper-window-item value="1">
          <v-card title="Select Payment Method" flat>
            <v-form>
              <v-radio-group
                v-model="paymentType"
                :rules="[rules.required]"
                @input="handleInput"
              >
                <v-radio
                  label="Credit Card"
                  value="CreditCard"
                  color="red"
                ></v-radio>
                <v-radio
                  label="Bank Transfer"
                  value="BankTransfer"
                  color="red"
                ></v-radio>
                <v-radio label="E Wallet" value="EWallet" color="red"></v-radio>
              </v-radio-group>
              <template v-if="paymentType === 'CreditCard'">
                <v-text-field
                  v-model="cardNumber"
                  label="Card Number"
                ></v-text-field>
                <v-text-field
                  v-model="cardExpiry"
                  label="Expiry Date"
                ></v-text-field>
                <v-text-field v-model="cardCVC" label="CVC"></v-text-field>
              </template>
              <template v-else-if="paymentType === 'BankTransfer'">
                <v-text-field
                  v-model="bankAccountNumber"
                  label="Bank Account Number"
                  :rules="[rules.required]"
                ></v-text-field>
                <v-text-field
                  v-model="bankName"
                  label="Bank Name"
                  :rules="[rules.required]"
                ></v-text-field>
              </template>
              <template v-else-if="paymentType === 'EWallet'">
                <v-text-field
                  v-model="eWalletType"
                  label="E-Wallet Type"
                  :rules="[rules.required]"
                ></v-text-field>
                <v-text-field
                  v-model="eWalletID"
                  label="E-Wallet Username/Phone Number"
                  :rules="[rules.required]"
                ></v-text-field>
              </template>
            </v-form>
          </v-card>
        </v-stepper-window-item>

        <v-stepper-window-item value="2">
          <v-card title="Set Appointment" flat>
            <v-container>
              <AddCarInSchedule />
              <v-row>
                <v-col cols="12">
                  <Schedule />
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-stepper-window-item>

        <v-stepper-window-item value="3">
          <v-card title="Details Confirmation" flat>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <div class="summary-table">
                    <v-table density="comfortable">
                      <tbody>
                        <tr>
                          <td class="table-cell-small">
                            <h3>Payment Details</h3>
                          </td>
                          <td class="table-cell-small"></td>
                        </tr>
                        <tr>
                          <td class="table-cell-small">Payment Method</td>
                          <td class="table-cell-small">{{ paymentType }}</td>
                        </tr>
                        <tr>
                          <td class="table-cell-small">Subtotal</td>
                          <td class="table-cell-small">
                            RM {{ subtotalDisplay }}
                          </td>
                        </tr>
                        <tr>
                          <td class="table-cell-small">SST Fee(8%)</td>
                          <td class="table-cell-small">RM {{ sstDisplay }}</td>
                        </tr>
                        <tr>
                          <td class="table-cell-small">Total</td>
                          <td class="table-cell-small">
                            RM {{ totalDisplay }}
                          </td>
                        </tr>
                        <tr>
                          <td class="table-cell-small">
                            <h3>Appointment Details</h3>
                          </td>
                          <td class="table-cell-small"></td>
                        </tr>
                        <!-- <tr>
                          <td class="table-cell-small">Appointment ID</td>
                          <td class="table-cell-small">
                            {{ newAppointment.id }}
                          </td>
                        </tr> -->
                        <tr>
                          <td class="table-cell-small">Date</td>
                          <td class="table-cell-small">
                            {{ formatDateToReadable(newAppointment.dateTime) }}
                          </td>
                        </tr>
                        <tr>
                          <td class="table-cell-small">Time</td>
                          <td class="table-cell-small">
                            {{ newAppointment.dateTime.toLocaleTimeString() }}
                          </td>
                        </tr>
                        <!-- <tr>
                          <td class="table-cell-small">Service</td>
                          <td class="table-cell-small">
                            {{ newAppointment.service }}
                          </td>
                        </tr> -->
                        <tr>
                          <td class="table-cell-small">Bay Number</td>
                          <td class="table-cell-small">
                            {{ newAppointment.bay }}
                          </td>
                        </tr>
                        <!-- <tr>
                          <td class="table-cell-small">Status</td>
                          <td class="table-cell-small">
                            {{ newAppointment.status }}
                          </td>
                        </tr> -->
                        <tr>
                          <td class="table-cell-small">Car Details</td>
                          <td class="table-cell-small">
                            Car ID: {{ selectedCar.carid }}
                            <!-- {{ newAppointment.brand }}
                            {{ newAppointment.model }} {{ newAppointment.year }} -->
                          </td>
                        </tr>
                      </tbody>
                    </v-table>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-stepper-window-item>
      </v-stepper-window>
      <v-row>
        <v-col cols="6">
          <v-btn
            v-if="step > 0"
            variant="text"
            @click="step--"
            style="margin: 10px"
          >
            <v-icon left>mdi-arrow-left</v-icon>
            Back
          </v-btn>
        </v-col>
        <v-col cols="6" class="text-end">
          <v-btn
            color="#FF6875"
            @click="proceedToNextStep"
            :loading="isLoading"
            :disabled="validateCurrentStep()"
            style="margin: 10px"
          >
            {{ step === 2 ? "Complete" : "Next" }}
            <v-icon right>mdi-arrow-right</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-stepper>
    <v-snackbar v-model="showError" color="error" timeout="1000">
      {{ errorMessage }}
    </v-snackbar>
  </v-container>
</template>

<script>
import { useRouter } from "vue-router";
import cartButton from "../components/cartButton.vue";
import { appointmentComposable } from "@/composables/appointmentComposable";
import { useDateFormatter } from "@/composables/useDateFormatter";
import axios from "axios";
import { useCheckoutStore } from "@/stores/checkout";
import { vehicleComposable } from "@/composables/vehicleComposable";

export default {
  setup() {
    const router = useRouter();
    const { newAppointment } = appointmentComposable();
    const { formatDateToReadable } = useDateFormatter();
    const checkoutStore = useCheckoutStore();
    const { selectedCar } = vehicleComposable();

    return {
      router,
      newAppointment,
      formatDateToReadable,
      checkoutStore,
      selectedCar,
    };
  },
  components: { cartButton },
  computed: {
    //Get this from Pinia Store
    Subtotal() {
      return this.checkoutStore.checkoutData.Subtotal;
    },
    SST() {
      return this.checkoutStore.checkoutData.SST;
    },
    Total() {
      return this.checkoutStore.checkoutData.Total;
    },
    subtotalDisplay() {
      return this.Subtotal.toFixed(2);
    },
    sstDisplay() {
      return this.SST.toFixed(2);
    },
    totalDisplay() {
      return this.Total.toFixed(2);
    },
    minDate() {
      const today = new Date();
      today.setDate(today.getDate() + 1);
      return today.toISOString().substring(0, 10);
    },
    maxDate() {
      const today = new Date();
      today.setDate(today.getDate() + 30);
      return today.toISOString().substring(0, 10);
    },
  },

  data() {
    return {
      isLoading: false,
      showOrderDialog: false,
      showError: false,
      errorMessage: "",
      isLoggedIn: false,
      paymentType: null,
      step: 0,
      name: "",
      email: "",
      accound_ID: "",
      cardNumber: "",
      cardExpiry: "",
      cardCVC: "",
      bankName: "",
      bankAccountNumber: "",
      eWalletID: "",
      eWalletType: "",
      appointmentDate: null,
      appointmentTime: "",
      appointmentNotes: "",
      isAppointmentConfirmed: false,
      timeSlots: [
        "09:00",
        "10:00",
        "11:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
      ],
      subtotal: 0,
      rules: {
        required: (v) => !!v || "This field is required",
      },
    };
  },
  mounted() {
    this.checkLoginStatus();
  },
  methods: {
    displayError(message) {
      this.errorMessage = message;
      this.showError = true;
    },
    handleClose() {
      this.$nextTick(() => {
        //this.showOrderDialog = false;
        this.paymentType = null;
        this.step = 0;
        this.resetForm();
        this.newAppointment = {
          id: -1,
          dateTime: new Date(),
          service: "",
          bay: -1,
          brand: "",
          model: "",
          year: -1,
          status: "",
        };
        this.checkoutStore.hasService = false;
        this.checkoutStore.hasProduct = false;
        this.router.push("/appointments");
      });
    },
    resetForm() {
      this.step = 0;
      this.paymentType = null;
      this.cardNumber = "";
      this.cardExpiry = "";
      this.cardCVC = "";
      this.bankAccountNumber = "";
      this.bankName = "";
      this.eWalletType = "";
      this.eWalletID = "";
      this.appointmentDate = null;
      this.appointmentTime = null;
      this.appointmentNotes = "";
      this.isAppointmentConfirmed = false;
    },
    checkLoginStatus() {
      this.isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    },
    handleLogout() {
      this.checkLoginStatus();

      if (!this.isLoggedIn) {
        // 3. Store the return path
        localStorage.setItem("checkoutRedirect", "/cart");

        // 4. Redirect to login page
        router.push("/login");

        // 5. Stop the method here
        return;
      }
      this.showOrderDialog = true;
    },
    handleInput(value) {
      //console.log("Input changed: ", value);
    },
    async placeOrder() {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      this.isLoading = true;

      const checkoutData = {
        car_id: this.selectedCar.carid.toString(),
        appointment_date: this.newAppointment.dateTime
          .toISOString()
          .split("T")[0],

        appointment_time: this.newAppointment.dateTime
          .toISOString()
          .split("T")[1]
          .substring(0, 8),

        appointment_bay: this.newAppointment.bay,
      };
      //console.log(checkoutData.appointment_bay);
      //console.log(checkoutData.appointment_date);
      //console.log(checkoutData.appointment_time);
      //console.log(checkoutData);

      const response = await axios.post(
        `${baseUrl}/checkout`,
        checkoutData,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      //console.log(response);
      const data = await response.data;

      if (data.message) {
        //console.log("Order placed successfully!");
        this.displayError("Order placed successfully!"); // Show success message
        setTimeout(() => {
          this.handleClose(); // Close dialog after success
        }, 1000);
      } else {
        this.displayError("Error placing order: " + data.message);
      }

      this.isLoading = false;
    },

    validateCurrentStep() {
      switch (this.step) {
        case 0:
          if (!this.paymentType) {
            return true;
          }
          // if (this.paymentType === "CreditCard") {
          //   if (this.cardNumber || this.cardExpiry || this.cardCVC) {
          //     return true;
          //   }
          // } else if (this.paymentType === "BankTransfer") {
          //   if (!this.bankAccountNumber || !this.bankName) {
          //     return true;
          //   }
          // } else if (this.paymentType === "EWallet") {
          //   if (!this.eWalletType || !this.eWalletID) {
          //     return true;
          //   }
          // }
          return false;

        case 1: // Payment Details
          if (this.newAppointment.id === -1 || this.selectedCar.carid === -1) {
            return true;
          }
          return false;
        case 2:
          return false;
        default:
          return false;
      }
    },

    proceedToNextStep() {
      if (!this.validateCurrentStep()) {
        if (this.step < 2) {
          this.step++;
        } else {
          this.placeOrder();
        }
      }
    },
  },
};
</script>

<style scoped>
.v-date-picker {
  width: 100%;
  max-width: 360px;
  margin: 0 auto;
}

.v-stepper-window {
  margin-bottom: 16px;
}

.v-stepper-window-item {
  max-height: calc(100vh - 300px); /* Adjust this value as needed */
  overflow-y: auto;
}

.v-container {
  max-width: 1200px;
  margin: 0 auto;
}
.dialog-header {
  padding: 16px;
}

.title-content {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: space-between;
}

.dialog-title {
  font-size: 1.5rem;
  font-weight: 600;
}

.close-button {
  color: rgba(0, 0, 0, 0.7);
}

.close-button:hover {
  color: rgba(0, 0, 0, 0.9);
}

.red-dialog {
  color: #ff6875;
}

.v-card-actions {
  position: sticky;
  bottom: 0;
  background-color: #ffe2e5;
  padding: 16px;
  margin-top: auto;
  z-index: 1;
}
</style>
