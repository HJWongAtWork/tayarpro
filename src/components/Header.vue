<template>
  <div v-if="isLargeScreen">
    <v-app-bar class="px-3" color="red" height="80" width="100">
      <router-link to="/" @click.native="tab = 0" class="link">
        <img
          src="@/assets/logo_tayarpro_partial-removebg-preview.png"
          height="75"
        />
      </router-link>

      <v-spacer></v-spacer>
      <v-tabs v-model="tab">
        <v-tab style="display: none"></v-tab>
        <router-link to="/about-us" class="link"
          ><v-tab>About Us</v-tab></router-link
        >
        <router-link to="/products" class="link"
          ><v-tab>Tyres</v-tab></router-link
        >
        <router-link to="/services" class="link"
          ><v-tab>Services</v-tab></router-link
        >
        <router-link to="/location" class="link"
          ><v-tab
            ><v-icon>mdi mdi-map-marker</v-icon>Location</v-tab
          ></router-link
        >
        <router-link to="/contact-us" class="link"
          ><v-tab
            ><v-icon>mdi mdi-phone-incoming</v-icon>Contact Us</v-tab
          ></router-link
        >
      </v-tabs>
      <v-spacer></v-spacer>

      <div class="d-flex align-center">
        <router-link
          v-if="isLoggedIn"
          to="/your-profile"
          @click.native="tab = 0"
          class="link mr-4"
        >
          <v-icon size="30">mdi-account</v-icon>
        </router-link>
        <router-link to="/cart" @click.native="tab = 0" class="link ma-4">
          <v-badge
            v-if="isLoggedIn"
            :content="cartItemCount"
            color="white"
            overlap
          >
            <v-icon size="30">mdi-cart-variant</v-icon>
          </v-badge>
          <v-icon v-else size="30">mdi-cart-variant</v-icon>
        </router-link>
        <div v-if="!isLoggedIn">
          <router-link to="/login" @click.native="tab = 0" class="link ma-4">
            <v-icon size="30">mdi-login</v-icon>
          </router-link>
        </div>
        <div v-else>
          <router-link to="/login" @click.native="tab = 0" class="link ma-4">
            <v-icon size="30">mdi-logout</v-icon>
          </router-link>
        </div>
      </div>
    </v-app-bar>
  </div>

  <div v-else>
    <v-app-bar class="px-3" color="red" height="80" width="100">
      <v-icon
        @click="
          drawer = !drawer;
          tab = 0;
        "
        >mdi-menu</v-icon
      >
      <v-spacer></v-spacer>
      <router-link to="/" @click.native="tab = 0" class="link">
        <img
          src="@/assets/logo_tayarpro_partial-removebg-preview.png"
          height="75"
        />
      </router-link>
      <v-spacer></v-spacer>
      <router-link
        to="/cart"
        @click.native="tab = 0"
        class="link"
        style="margin-right: 12px"
      >
        <v-icon>mdi-cart-variant</v-icon>
      </router-link>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app temporary width="250" color="red">
      <v-list>
        <router-link to="/" @click.native="tab = 0" class="link">
          <v-list-item>
            <v-list-item-title>
              <v-icon>mdi-home</v-icon> Home
            </v-list-item-title>
          </v-list-item>
        </router-link>
        <router-link to="/about-us" @click.native="tab = 0" class="link">
          <v-list-item>
            <v-list-item-title>
              <v-icon>mdi-information</v-icon> About Us
            </v-list-item-title>
          </v-list-item>
        </router-link>
        <router-link to="/products" @click.native="tab = 0" class="link">
          <v-list-item>
            <v-list-item-title>
              <v-icon>mdi-tire</v-icon> Tyres
            </v-list-item-title>
          </v-list-item>
        </router-link>
        <router-link to="/services" @click.native="tab = 0" class="link">
          <v-list-item>
            <v-list-item-title>
              <v-icon>mdi-wrench</v-icon> Services
            </v-list-item-title>
          </v-list-item>
        </router-link>
        <router-link to="/location" @click.native="tab = 0" class="link">
          <v-list-item>
            <v-list-item-title>
              <v-icon>mdi-map-marker</v-icon> Locations
            </v-list-item-title>
          </v-list-item>
        </router-link>
        <router-link to="/contact-us" @click.native="tab = 0" class="link">
          <v-list-item>
            <v-list-item-title>
              <v-icon>mdi-phone-incoming</v-icon> Contact Us
            </v-list-item-title>
          </v-list-item>
        </router-link>
        <router-link
          v-if="isLoggedIn"
          to="/your-profile"
          @click.native="tab = 0"
          class="link"
        >
          <v-list-item>
            <v-list-item-title>
              <v-icon>mdi-account</v-icon> Your Profile
            </v-list-item-title>
          </v-list-item>
        </router-link>

        <router-link
          v-if="!isLoggedIn"
          to="/login"
          @click.native="tab = 0"
          class="link"
        >
          <v-list-item>
            <v-list-item-title>
              <v-icon>mdi-login</v-icon> Login
            </v-list-item-title>
          </v-list-item>
        </router-link>

        <router-link v-else to="/login" @click.native="tab = 0" class="link">
          <v-list-item>
            <v-list-item-title>
              <v-icon>mdi-logout</v-icon> Logout
            </v-list-item-title>
          </v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useCartStore } from "../stores/cartStore";
import { storeToRefs } from "pinia";

const isLargeScreen = ref(window.innerWidth >= 1000);
const drawer = ref(false);
const tab = ref(0);
const isLoggedIn = ref(localStorage.getItem("isLoggedIn") === "true");

const cartStore = useCartStore();
const { cartItemCount } = storeToRefs(cartStore);

const updateScreenSize = () => {
  const newScreenSize = window.innerWidth >= 1000;
  if (isLargeScreen.value !== newScreenSize) {
    isLargeScreen.value = newScreenSize;
  }
};

onMounted(() => {
  tab.value = 0;
  window.addEventListener("resize", updateScreenSize);

  if (localStorage.getItem("isLoggedIn") !== null) {
    isLoggedIn.value = localStorage.getItem("isLoggedIn") === "true";
  } else {
    localStorage.setItem("isLoggedIn", "false");
    isLoggedIn.value = false;
  }

  if (isLoggedIn.value) {
    cartStore.fetchCartItems();
  }
});

onUnmounted(() => {
  window.removeEventListener("resize", updateScreenSize);
});
</script>

<style scoped>
.link {
  color: white;
  text-decoration: none;
}
</style>

<style scoped>
.link {
  color: white;
  text-decoration: none;
}
</style>
