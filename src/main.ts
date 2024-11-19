/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App
 */

// Plugins
import { registerPlugins } from "@/plugins";

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";

// Import Firebase functions
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { getAuth } from "firebase/auth"; // Import Authentication

// Additional for chat-related stores
import { createPinia } from 'pinia'
import { piniaPluginPersist } from './plugins/piniaPluginPersist'
import router from './router'
import vuetify from './plugins/vuetify'

const pinia = createPinia()
pinia.use(piniaPluginPersist)

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6FnHjsH8aM21IzgRA5lzGOGv2hEeWCH8",
  authDomain: "gaia-capstone04-prd.firebaseapp.com",
  projectId: "gaia-capstone04-prd",
  storageBucket: "gaia-capstone04-prd.appspot.com",
  messagingSenderId: "1082564059873",
  appId: "1:1082564059873:web:fc5a9835d2710f88194da0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Authentication
const auth = getAuth(app);

const vueApp = createApp(App);

// Additional for chat-related stores
vueApp.use(pinia)
vueApp.use(router)
vueApp.use(vuetify)

vueApp.directive("click-to-expand", {
  mounted(el, binding) {
    const cardData = binding.value.cardData; // Get the card data from the binding

    el.addEventListener("click", () => {
      cardData.showAdditionalText = !cardData.showAdditionalText;
      cardData.elevation = cardData.showAdditionalText ? 8 : 2;
    });

    document.addEventListener("click", (event) => {
      if (!el.contains(event.target)) {
        cardData.showAdditionalText = false;
        cardData.elevation = 2;
      }
    });
  },
});

registerPlugins(vueApp);

vueApp.mount("#app");

export { db, auth };