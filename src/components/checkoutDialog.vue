<template>
  <cartButton
    @click="handleCheckout"
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
      <v-card-title class="text-center">Order Dialog</v-card-title>
      <v-stepper
        :items="[
          'Select Payment Method',
          'Fill in Payment Details',
          'Confirm Total Amount',
          'Complete',
        ]"
      >
        <template v-slot:item.1>
          <v-card title="Select Payment Method" flat>
            <v-form ref="form1" lazy-validation>
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
                <v-radio label="E Wallet" value="EWallet" color="red"></v-radio>
              </v-radio-group>
            </v-form>
          </v-card>
        </template>

        <template v-slot:item.2>
          <v-card title="Fill in Payment Details" flat>
            <v-form ref="form2" lazy-validation>
              <template v-if="paymentType.includes('CreditCard')">
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
              <template v-else-if="paymentType.includes('BankTransfer')">
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
              <template v-else-if="paymentType.includes('EWallet')">
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
        </template>

        <template v-slot:item.3>
          <v-stepper-content step="3">
            <v-card title="Confirm Total Amount" flat>
              <v-form ref="form3" lazy-validation>
                <v-text-field
                  v-model="totalAmount"
                  label="Total Amount"
                  :rules="[required]"
                  >{{ this.subtotal }}</v-text-field
                >
              </v-form>
            </v-card>
          </v-stepper-content>
        </template>

        <template v-slot:item.4>
          <v-card title="Complete" flat>
            <v-alert type="success">Transaction Complete!</v-alert>
          </v-card>
        </template>
      </v-stepper>
    </v-card>
  </v-dialog>
</template>

<script>
import { required } from "@vuelidate/validators";
import cartButton from "../components/cartButton.vue";
import router from "@/router";

export default {
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

  data() {
    return {
      showOrderDialog: false,
      isLoggedIn: false,
      paymentType: [],
      step: 1,
      name: "",
      email: "",
      accound_ID: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      bankName: "",
      accountNumber: "",
      eWallet: "",
      eWalletNumber: "",
    };
  },
  mounted() {
    this.checkLoginStatus();
  },
  methods: {
    checkLoginStatus() {
      this.isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    },
    handleCheckout() {
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
    placeOrder() {
      // Call API to place order
      console.log("Order placed successfully!");
    },

    closeDialog() {
      this.showOrderDialog = false;
    },
    proceedToNextStep() {
      if (this.$refs.form1.validate()) {
        this.step++;
      } else {
        console.log("error");
      }
    },
  },
};
</script>

<style>
.red-dialog {
  color: #ff6875;
}
,
.v-card__title {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
