/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins, then mounts the App.
 */

import { registerPlugins } from "@/plugins";
import App from "./App.vue";
import { createApp } from "vue";

// Import Firebase functions
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { getAuth } from "firebase/auth"; // Import Authentication

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
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

const vueApp = createApp(App);

// Register all plugins in one place
registerPlugins(vueApp);

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

vueApp.mount("#app");

export { db, auth };
