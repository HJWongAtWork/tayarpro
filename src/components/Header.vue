<template>
    <v-app-bar class="px-3 text-center" color="red" height="80">
      <div><img src="../assets/logo_tayarpro_partial-removebg-preview.png" height="100"></div>
      <v-tabs>
        <v-tab value="1">Home</v-tab>
        <v-tab value="2">Tyre</v-tab>
        <v-tab><router-link to="/services" class="link">Services</router-link></v-tab>
        <v-tab><router-link to="/location" class="link"><v-icon>mdi mdi-map-marker</v-icon>Location</router-link></v-tab>
        <v-tab value="5"><v-icon>mdi mdi-phone-incoming</v-icon>Contact Us</v-tab>       
        <v-spacer class="border-lg"></v-spacer>    
        <v-tab>
          <router-link to="/account" class="link">
            <v-icon>mdi mdi-account</v-icon>
          </router-link>
        </v-tab>
        <v-tab value="1002"><v-icon>mdi mdi-cart-variant</v-icon></v-tab>
      </v-tabs>
    </v-app-bar>
  </template>

<style>
.link{
  color:white;
  text-decoration: none;
}
</style>