<template>
  <cartButton
    @click="handleLogout"
    min="260px"
    height="55px"
    color="#FF6875"
    display="flex"
    width="-webkit-fill-available"
  >
    Checkout
  </cartButton>
  <v-dialog
    v-model="showOrderDialog"
    max-width="800"
    persistent
    class="red-dialog"
  >
    <v-card color="#FFE2E5">
      <v-card-title class="dialog-header">
        <div class="title-content">
          <span class="dialog-title">Order Dialog</span>
          <v-btn
            icon="mdi-close"
            size="small"
            @click="handleClose"
            class="close-button"
          ></v-btn>
        </div>
      </v-card-title>
      <v-stepper v-model="step">
        <v-stepper-header>
          <v-stepper-item value="0">Select Payment Method</v-stepper-item>
          <v-divider></v-divider>
          <v-stepper-item value="1">Payment Details</v-stepper-item>
          <v-divider></v-divider>
          <v-stepper-item value="2">Confirm Amount</v-stepper-item>
          <v-divider></v-divider>
          <v-stepper-item value="3">Appointment</v-stepper-item>
        </v-stepper-header>

        <v-stepper-window>
          <v-stepper-window-item value="0">
            <v-card title="Select Payment Method" flat>
              <v-form>
                <v-radio-group
                  v-model="paymentType"
                  :rules="[required]"
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
                  <v-radio
                    label="E Wallet"
                    value="EWallet"
                    color="red"
                  ></v-radio>
                </v-radio-group>
              </v-form>
            </v-card>
          </v-stepper-window-item>

          <v-stepper-window-item value="1">
            <v-card title="Fill in Payment Details" flat>
              <v-form>
                <template v-if="paymentType === 'CreditCard'">
                  <v-text-field
                    v-model="cardNumber"
                    label="Card Number"
                    :rules="[required]"
                  ></v-text-field>
                  <v-text-field
                    v-model="cardExpiry"
                    label="Expiry Date"
                    :rules="[required]"
                  ></v-text-field>
                  <v-text-field
                    v-model="cardCVC"
                    label="CVC"
                    :rules="[required]"
                  ></v-text-field>
                </template>
                <template v-else-if="paymentType === 'BankTransfer'">
                  <v-text-field
                    v-model="bankAccountNumber"
                    label="Bank Account Number"
                    :rules="[required]"
                  ></v-text-field>
                  <v-text-field
                    v-model="bankName"
                    label="Bank Name"
                    :rules="[required]"
                  ></v-text-field>
                  <v-text-field
                    v-model="bankBranch"
                    label="Bank Branch"
                    :rules="[required]"
                  ></v-text-field>
                </template>
                <template v-else-if="paymentType === 'EWallet'">
                  <v-text-field
                    v-model="eWalletAccountNumber"
                    label="E-Wallet Account Number"
                    :rules="[required]"
                  ></v-text-field>
                  <v-text-field
                    v-model="eWalletPassword"
                    label="E-Wallet Password"
                    :rules="[required]"
                  ></v-text-field>
                </template>
              </v-form>
            </v-card>
          </v-stepper-window-item>

          <v-stepper-window-item value="2">
            <v-card title="Confirm Total Amount" flat>
              <v-form>
                <v-text-field
                  v-model="subtotalDisplay"
                  label="SubTotal"
                  :rules="[required]"
                  readonly
                  prefix="RM"
                >
                </v-text-field>
                <v-text-field
                  v-model="sstDisplay"
                  label="SST (8%)"
                  :rules="[required]"
                  readonly
                  prefix="RM"
                >
                </v-text-field>
                <v-text-field
                  v-model="totalDisplay"
                  label="Total Amount"
                  :rules="[required]"
                  readonly
                  prefix="RM"
                >
                </v-text-field>
              </v-form>
            </v-card>
          </v-stepper-window-item>

          <v-stepper-window-item value="3">
            <v-card title="Make Appointment" flat>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <Schedule />
                  </v-col>
                </v-row>
                <v-row>
                  <!-- <v-col cols="12" md="6">
                    <v-date-picker
                      v-model="appointmentDate"
                      :min="minDate"
                      :max="maxDate"
                      :rules="[required]"
                      class="mb-4"
                    ></v-date-picker>
                  </v-col> -->
                  <!-- <v-col cols="12" md="6"> -->
                    <!-- <v-select
                      v-model="appointmentTime"
                      :items="timeSlots"
                      label="Select Time"
                      :disabled="!appointmentDate"
                      :hint="
                        !appointmentDate ? 'Please select a date first' : ''
                      "
                      persistent-hint
                      class="mb-4"
                    ></v-select>

                    <v-textarea
                      v-model="appointmentNotes"
                      label="Additional Notes"
                      class="mb-4"
                      rows="3"
                    ></v-textarea> -->

                    <!-- <v-checkbox
                      v-model="isAppointmentConfirmed"
                      label="Confirm Appointment"
                      class="mb-4"
                    ></v-checkbox>
                  </v-col> -->
                </v-row>
              </v-container>
            </v-card>
          </v-stepper-window-item>
        </v-stepper-window>
        <v-card-actions>
          <v-btn v-if="step > 0" variant="text" @click="step--"> Back </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="#FF6875"
            @click="proceedToNextStep"
            :loading="isLoading"
          >
            {{ step === 3 ? "Complete" : "Next" }}
          </v-btn>
        </v-card-actions>
      </v-stepper>
    </v-card>
  </v-dialog>
  <v-snackbar v-model="showError" color="error" timeout="3000">
    {{ errorMessage }}
  </v-snackbar>
</template>

<script>
import { useRouter } from "vue-router";
import { required } from "@vuelidate/validators";
import cartButton from "../components/cartButton.vue";
import axios from "axios";

export default {
  setup() {
    const router = useRouter();
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    return { router, baseUrl };
  },

  validation: {
    paymentType: { required },
  },
  props: {
    subtotal: {
      type: Number,
      required: true,
    },
  },
  components: { cartButton },
  computed: {
    subtotalDisplay() {
      return this.subtotal.toFixed(2);
    },
    sstDisplay() {
      return (this.subtotal * 0.08).toFixed(2);
    },
    totalDisplay() {
      return (this.subtotal + this.subtotal * 0.08).toFixed(2);
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
      bankBranch: "",
      eWalletPassword: "",
      eWalletAccountNumber: "",
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
        this.showOrderDialog = false;
        this.paymentType = null;
        this.step = 0;
        this.resetForm();
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
      this.bankBranch = "";
      this.eWalletAccountNumber = "";
      this.eWalletPassword = "";
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
      console.log("Input changed: ", value);
    },
    async placeOrder() {
      try {
        this.isLoading = true;
        const token = localStorage.getItem("jwt");

        if (!token) {
          this.displayError("Please login to place order");
          return;
        }

        // Prepare checkout data
        const checkoutData = {
          payment_method: this.paymentType,
          appointment_date: this.appointmentDate,
          appointment_time: this.appointmentTime,
          notes: this.appointmentNotes || "",
          card_number: this.cardNumber,
          card_expiry: this.cardExpiry,
          card_cvc: this.cardCVC,
          bank_account_number: this.bankAccountNumber,
          bank_name: this.bankName,
          bank_branch: this.bankBranch,
          e_wallet_account_number: this.eWalletAccountNumber,
          e_wallet_password: this.eWalletPassword,
          car_id: this.car_id,
        };

        console.log("Sending checkout data:", checkoutData);

        // Send to checkout endpoint
        const response = await axios.post(
          `${this.baseUrl}/checkout`,
          checkoutData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Checkout response:", response.data);

        if (response.data) {
          // Show success message
          this.displayError("Order placed successfully!");

          // Close dialog and refresh cart
          setTimeout(() => {
            this.handleClose();
            this.$emit("order-completed");
            this.router.push("/"); // Redirect to home or order confirmation
          }, 1500);
        }
      } catch (error) {
        console.error("Checkout error:", error);
        this.displayError(
          error.response?.data?.message ||
            "Failed to place order. Please try again."
        );
      } finally {
        this.isLoading = false;
      }
    },
    validateCurrentStep() {
      switch (this.step) {
        case 0: // Payment Method
          if (!this.paymentType) {
            this.displayError("Please select a payment method");
            return false;
          }
          return true;

        case 1: // Payment Details
          // Add your payment details validation
          if (this.paymentType === "CreditCard") {
            return this.cardNumber && this.cardExpiry && this.cardCVC;
          } else if (this.paymentType === "BankTransfer") {
            return this.bankAccountNumber && this.bankName && this.bankBranch;
          } else if (this.paymentType === "EWallet") {
            return this.eWalletAccountNumber && this.eWalletPassword;
          }
          return false;
        case 2: // Amount Confirmation
          // Add amount confirmation validation if needed
          return true;

        case 3: // Appointment
          if (!this.appointmentDate) {
            this.displayError("Please select an appointment date");
            return false;
          }
          if (!this.appointmentTime) {
            this.displayError("Please select an appointment time");
            return false;
          }
          if (!this.isAppointmentConfirmed) {
            this.displayError("Please confirm your appointment");
            return false;
          }
          return true;

        default:
          return true;
      }
    },

    proceedToNextStep() {
      if (this.validateCurrentStep()) {
        if (this.step < 3) {
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
