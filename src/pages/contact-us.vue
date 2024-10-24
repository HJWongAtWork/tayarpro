<template>
  <div>
    <v-container class="fill-height">
      <v-row>
        <v-col cols="12">
          <h1 class="text-h3 font-weight-bold mb-4">Contact Us</h1>
        </v-col>
        <v-col cols="12" sm="12" md="6">
          <TextInput
            labelNameUpper="Email"
            class="f24-b20"
            v-model="emailInput"
          />
          <TextInput
            labelNameUpper="Subject"
            class="f24-b20"
            v-model="subjectInput"
          />
          <TextAreaInput
            labelNameUpper="Content"
            class="f24-b20"
            v-model="contentInput"
          />
          <v-btn
            height="40"
            width="200"
            class="save-btn"
            :disabled="isDisable"
            @click="handleSendBtn"
            >Send</v-btn
          >
        </v-col>
        <v-col cols="12" sm="12" md="6">
          <div class="justify-center align-center" style="padding-left: 100px">
            <label class="italicBold f24-b20" style="display: flex">
              Other Channels
            </label>
            <label style="font-size: 18px; display: flex; margin-bottom: 20px"
              >General Tel No. : +60123456789</label
            >
            <a
              v-for="item in items"
              :key="item.title"
              :href="item.href"
              :title="item.title"
              class="d-inline-block mx-2"
            >
              <v-icon color="black" size="40" :icon="item.icon" />
            </a>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
  <v-dialog v-model="sendConfirm" persistent>
    <v-card style="text-align: center">
      <v-card-title>Your message has been sent!</v-card-title>
      <v-card-text>
        <p class="f24-b20">
          Thank you for your message. We will get back to you as soon as
          possible.
        </p>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="sendConfirm = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import TextAreaInput from '@/components/TextAreaInputComponent.vue';
  import TextInput from '@/components/TextInputComponent.vue';
  import { onMounted } from 'vue';
  import { messageComposable } from '@/composables/messageComposable';

  export default {
    setup() {
      const { messages, addMessage, emailInput, subjectInput, contentInput } = messageComposable();

      onMounted(() => {
        document.title = 'Contact Us';
      });

      return {
        messages,
        emailInput,
        subjectInput,
        contentInput,
        addMessage
      }
    },
    data() {
      return {
        items: [
          {
            title: 'TayarPro Facebook Messenger',
            icon: `mdi-facebook-messenger`,
            href: 'https://www.facebook.com/messages/t/103228679166389',
          },
          {
            title: 'TayarPro Facebook',
            icon: 'mdi-facebook',
            href: 'https://www.facebook.com/Ishowspeed/',
          },
          {
            title: 'TayarPro Twitter',
            icon: 'mdi-twitter',
            href: 'https://x.com/ishowspeed?lang=en',
          },
          {
            title: 'TayarPro Instagram',
            icon: `mdi-instagram`,
            href: 'https://www.instagram.com/ishowspeed/?hl=en',
          },
          {
            title: 'TayarPro WhatsApp',
            icon: `mdi-whatsapp`,
            href: 'https://api.whatsapp.com/message/7PUAZITKW6ORB1?autoload=1&app_absent=0',
          },
        ],
        isDisable: true,
        sendConfirm: false,
      };
    },
    watch: {
      emailInput() {
        this.checkInputs();
      },
      subjectInput() {
        this.checkInputs();
      },
      contentInput() {
        this.checkInputs();
      }
    },
    components: {
      TextAreaInput,
      TextInput
    },
    methods: {
      handleSendBtn() {
        this.addMessage();
        this.sendConfirm = true;
      },
      checkInputs() {
        this.isDisable = !(this.emailInput && this.subjectInput && this.contentInput);
     }
    }
  };
</script>

<style>
  .save-btn {
    background-color: red;
    color: white;
    float: right;
  }

  .f24-b20 {
    font-size: 24px;
    margin-bottom: 20px;
  }
</style>
