<template>
  <cartButton
    @click="showOrderDialog = true"
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
      <v-card-title class="text-center">Order dialog</v-card-title>
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
              <v-radio-group v-model="paymentType">
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
          <v-card title="Confirm Total Amount" flat>
            <v-form ref="form3" lazy-validation>
              <v-text-field
                v-model="totalAmount"
                label="Total Amount"
                :rules="[required]"
              ></v-text-field>
              <v-btn color="primary" @click="proceedToNextStep">Next</v-btn>
            </v-form>
          </v-card>
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

export default {
  components: { cartButton },
  data() {
    return {
      showOrderDialog: false,
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
  methods: {
    placeOrder() {
      // Call API to place order
      console.log("Order placed successfully!");
    },
    closeDialog() {
      this.showOrderDialog = false;
    },
    proceedToNextStep() {
      if (this.step < 1) {
        this.step++;
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
