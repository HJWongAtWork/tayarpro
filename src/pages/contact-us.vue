<template>
  <div class="title-page">
    <div class="line"></div>
    <h2 class="no-background text-center">
      <span><strong>CONTACT US</strong></span>
    </h2>
    <div class="line"></div>
  </div>
  <v-container class="mt-2" max-width="1200">
    <v-row>
      <!-- <v-col cols="12">
        <h1 class="text-h3 font-weight-bold mb-8 text-center">
          <v-icon icon="mdi-phone" color="red" size="large" class="ml-2"></v-icon>
          Contact Us
        </h1>
      </v-col> -->

      <v-col cols="12" md="6">
        <v-card class="pa-6 elevation-3">
          <v-card-title class="mb-3">Currently for registered users only:</v-card-title>
          <v-form ref="form" v-model="valid" @submit.prevent="handleSendBtn">
            <v-text-field
              v-model="emailInput"
              label="Email"
              variant="outlined"
              :rules="[rules.emailValid, rules.required]"
              prepend-inner-icon="mdi-email"
              class="mb-4"
            ></v-text-field>

            <v-text-field
              v-model="subjectInput"
              label="Subject"
              variant="outlined"
              :rules="[rules.required]"
              prepend-inner-icon="mdi-format-title"
              class="mb-4"
            ></v-text-field>

            <v-textarea
              v-model="contentInput"
              label="Message"
              variant="outlined"
              :rules="[rules.required]"
              prepend-inner-icon="mdi-message-text"
              rows="5"
              class="mb-6"
            ></v-textarea>

            <v-btn
              type="submit"
              color="red"
              size="large"
              block
              :disabled="!formValid"
              :loading="loading"
            >
              Send Message
              <v-icon end icon="mdi-send" class="ml-2"></v-icon>
            </v-btn>
          </v-form>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="pa-6 elevation-3 h-100">
          <div class="d-flex flex-column align-center text-center h-100">
            <v-card-title class="text-h5 font-weight-bold mb-6">
              Other Channels
            </v-card-title>

            <v-card class="mb-6 pa-4 bg-grey-lighten-4 w-100">
              <v-icon
                icon="mdi-phone"
                size="large"
                color="red"
                class="mb-2"
              ></v-icon>
              <div class="text-body-1">General Tel No.</div>
              <div class="text-h6">+60123456789</div>
            </v-card>

            <v-card-title class="text-h6 mb-4">Follow Us</v-card-title>
            <v-row justify="center" class="mx-auto">
              <v-col v-for="item in items" :key="item.title" cols="auto">
                <v-btn
                  :href="item.href"
                  :title="item.title"
                  icon
                  variant="text"
                  size="x-large"
                  color="red"
                >
                  <v-icon :icon="item.icon" size="32"></v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <!-- Success Dialog -->
  <v-dialog v-model="sendConfirm" max-width="500" persistent>
    <v-card>
      <v-card-title class="text-h5 pa-6 bg-red text-white">
        Message Sent Successfully!
      </v-card-title>

      <v-card-text class="pa-6">
        <v-icon
          icon="mdi-check-circle"
          color="success"
          size="64"
          class="mb-4"
        ></v-icon>
        <p class="text-body-1">
          Thank you for your message. We will get back to you as soon as
          possible.
        </p>
      </v-card-text>

      <v-card-actions class="pa-6">
        <v-spacer></v-spacer>
        <v-btn color="red" variant="elevated" @click="sendConfirm = false">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue"; // Added watch import
import { messageComposable } from "@/composables/messageComposable";

const { messages, addMessage, emailInput, subjectInput, contentInput } =
  messageComposable();

const form = ref(null);
const valid = ref(false);
const contentValid = ref(false);
const sendConfirm = ref(false);
const loading = ref(false);
const errorMessage = ref(""); // Proper error message handling

const rules = {
  required: (v) => !!v || "This field is required",
  emailValid: (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
};

const items = [
  {
    title: "TayarPro Facebook Messenger",
    icon: "mdi-facebook-messenger",
    href: "",
  },
  {
    title: "TayarPro Facebook",
    icon: "mdi-facebook",
    href: "",
  },
  {
    title: "TayarPro Twitter",
    icon: "mdi-twitter",
    href: "",
  },
  {
    title: "TayarPro Instagram",
    icon: "mdi-instagram",
    href: "",
  },
  {
    title: "TayarPro WhatsApp",
    icon: "mdi-whatsapp",
    href: "",
  },
];

const formValid = computed(() => {
  return valid.value && contentValid.value;
});

const handleSendBtn = async () => {
  loading.value = true;
  const success = await addMessage();

  loading.value = false;
  if (success) {
    emailInput.value = "";
    subjectInput.value = "";
    contentInput.value = "";
    sendConfirm.value = true;
    if (form.value) {
      form.value.reset();
    }
    valid.value = false;
    contentValid.value = false;
  } else {
    errorMessage.value = "Failed to send message. Please try again.";
  }
};

watch(contentInput, (newValue) => {
  contentValid.value = newValue && newValue.trim() !== "";
});

onMounted(() => {
  document.title = "Contact Us";
});
</script>

<style scoped>
.title-page {
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 2rem auto;
}

.title-page .line {
  height: 3px;
  flex: 1;
  background-color: #000;
}

.title-page h2 {
  padding: 0 2rem;
}
.v-overlay__content {
  align-items: center;
}
</style>
