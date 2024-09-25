<template>
  <v-app-bar class="px-3" color="red" height="80" width="100">
    <div>
      <img
        src="../assets/logo_tayarpro_partial-removebg-preview.png"
        height="100"
      />
    </div>

    <v-spacer></v-spacer>
    <v-tabs>
      <router-link to="/about-us" class="link"
        ><v-tab>About Us</v-tab></router-link
      >
      <router-link to="/tyres" class="link"><v-tab>Tyres</v-tab></router-link>
      <router-link to="/services" class="link"
        ><v-tab>Services</v-tab></router-link
      >
      <router-link to="/location" class="link"
        ><v-tab><v-icon>mdi mdi-map-marker</v-icon>Location</v-tab></router-link
      >
      <router-link to="/contactus" class="link"
        ><v-tab
          ><v-icon>mdi mdi-phone-incoming</v-icon>Contact Us</v-tab
        ></router-link
      >
      <!-- <div>
          <router-link to="/account" class="link"><v-tab><v-icon>mdi mdi-account</v-icon></v-tab></router-link>
          <router-link to="" class="link"><v-tab><v-icon>mdi mdi-cart-variant</v-icon></v-tab></router-link>
        </div>   -->
    </v-tabs>
    <v-spacer></v-spacer>

    <!-- <router-link to="/account" class="link"><v-tab><v-icon>mdi mdi-account</v-icon></v-tab></router-link>
        <v-tab value="1002"><v-icon>mdi mdi-cart-variant</v-icon></v-tab> -->
    <div class="d-flex align-center">
      <router-link to="/account" class="link mr-4"
        ><v-icon size="30">mdi-account</v-icon></router-link
      >
      <router-link to="" class="link ma-4"
        ><v-icon size="30">mdi-cart-variant</v-icon></router-link
      >
    </div>
  </v-app-bar>
</template>

<style>
.link {
  color: white;
  text-decoration: none;
}
</style>
