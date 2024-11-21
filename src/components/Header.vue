<template>
  <div v-if="isLargeScreen">
    <v-app-bar class="px-3" color="red" height="80" width="100">
      <router-link to="/" @click.native="tab = 0" class="link">
        <img src="@/assets/logo_tayarpro_partial-removebg-preview.png" height="75" />
      </router-link>

      <v-spacer></v-spacer>
      <v-tabs v-model="tab">
        <v-tab style="display: none;"></v-tab>
        <router-link to="/about-us" class="link"><v-tab>About Us</v-tab></router-link>
        <router-link to="/products" class="link"><v-tab>Tyres</v-tab></router-link>
        <router-link to="/services" class="link"><v-tab>Services</v-tab></router-link>
        <router-link to="/location" class="link"><v-tab><v-icon>mdi
              mdi-map-marker</v-icon>Location</v-tab></router-link>
        <router-link to="/contact-us" class="link"><v-tab><v-icon>mdi mdi-phone-incoming</v-icon>Contact
            Us</v-tab></router-link>
      </v-tabs>
      <v-spacer></v-spacer>

      <div class="d-flex align-center">
        <router-link v-if="isLoggedIn" to="/your-profile" @click.native="tab = 0" class="link mr-4">
          <v-icon size="30">mdi-account</v-icon>
        </router-link>
        <router-link to="/cart" @click.native="tab = 0" class="link ma-4">
          <v-icon size="30">mdi-cart-variant</v-icon>
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
      <v-icon @click="drawer = !drawer; tab = 0">mdi-menu</v-icon>
      <v-spacer></v-spacer>
      <router-link to="/" @click.native="tab = 0" class="link">
        <img src="@/assets/logo_tayarpro_partial-removebg-preview.png" height="75" />
      </router-link>
      <v-spacer></v-spacer>
      <router-link to="/cart" @click.native="tab = 0" class="link" style="margin-right: 12px">
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
        <router-link v-if="isLoggedIn" to="/your-profile" @click.native="tab = 0" class="link">
          <v-list-item>
            <v-list-item-title>
              <v-icon>mdi-account</v-icon> Your Profile
            </v-list-item-title>
          </v-list-item>
        </router-link>

        <router-link v-if="!isLoggedIn" to="/login" @click.native="tab = 0" class="link">
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

<script>
import { is } from '@babel/types';

export default {
  data() {
    return {
      isLargeScreen: window.innerWidth >= 1000,
      drawer: false,
      tab: 0,
      isLoggedIn: localStorage.getItem("isLoggedIn"),
    };
  },
  mounted() {
    this.tab = 0;
    window.addEventListener("resize", this.updateScreenSize);

    this.isLoggedIn = localStorage.getItem("isLoggedIn");
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateScreenSize);
  },
  methods: {
    updateScreenSize() {
      this.isLargeScreen = window.innerWidth >= 1000;
    },
  },
};
</script>

<style>
.link {
  color: white;
  text-decoration: none;
}
</style>
