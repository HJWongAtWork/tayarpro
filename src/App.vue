<template>
  <v-app>
    <div>
      <Disclaimer />
    </div>
    <Header />
    <v-main>
      <router-view />

      <!-- Chat Widget (always visible) -->
      <ChatWidget />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import Disclaimer from '@/components/Disclaimer.vue';
import ChatWidget from '@/components/ChatWidget.vue'
</script>

<style>
.v-application {
  position: relative;
}

/* Add any global styles needed for the chat widget */
</style>
