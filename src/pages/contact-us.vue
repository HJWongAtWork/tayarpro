<template>
  <div>
      <v-container class="fill-height">
          <v-row>
              <v-col cols="12">
                  <h1 class="text-h3 font-weight-bold mb-4">Contact Us</h1>
              </v-col>
              <v-col cols="12" sm="12" md="6">
                  <TextInput labelName="Email"/>
                  <TextInput labelName="Subject"/>
                  <TextAreaInput labelName="Content"/>
              </v-col>
              <v-col cols="12" sm="12" md="6">
                  <div class="justify-center align-center" style="padding-left: 100px;">
                      <label class="italicBold" style="font-size: 24px; display: flex; margin-bottom: 20px;"> Other Channels </label>
                      <label style="font-size: 18px; display: flex; margin-bottom: 20px;">General Tel No. : +60123456789</label>

                      <a
                          v-for="item in items"
                          :key="item.title"
                          :href="item.href"
                          :title="item.title"
                          class="d-inline-block mx-2"
                      >
                          <v-icon color="black" size="40"
                              :icon="item.icon"
                          />
                      </a>

                  </div>
              </v-col>
          </v-row>
      </v-container>
  </div>
</template>

<script>
import TextInput from '@/components/TextInput.vue';

export default {
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
    };
  },
  mounted() {
  document.title = 'Contact Us';
},
}

</script>