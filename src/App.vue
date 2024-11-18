<template>
  <v-app>
    <div>
      <Disclaimer />
    </div>
    <Header />
    <v-main>
      <router-view />

      <!-- Chat Widget (always visible) -->
       <div class="chat-widget-wrapper">
        <ChatWidget />
       </div>
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
  overflow-x: hidden;
}

/* Add any global styles needed for the chat widget */

.v-carousel {
    overflow: hidden !important;
}

/* Prevent scroll jumping */
html {
    overflow-y: scroll;
    scroll-behavior: smooth;
}

/* Optional: Add a scrollbar width compensation */
body {
    width: calc(100vw - (100vw - 100%));
}

.chat-widget-wrapper {
  position: fixed;
  bottom: 20px; /* Adjust this value based on your footer height */
  right: 20px;
  z-index: 999;
  /* Add margin to prevent overlap with footer */
  transform: scale(0.9);
  transform-origin: bottom right;
}


/* Responsive adjustments */
@media (max-width: 960px) {
  .chat-widget-wrapper {
    bottom: 80px; /* Larger spacing for mobile */
    right: 10px;
    transform: scale(0.9);
    transform-origin: bottom right;
  }
}

@media (max-width: 600px) {
  .chat-widget-wrapper {
    bottom: 100px; /* Even larger spacing for smaller screens */
    right: 10px;
    /* Optional: make it slightly smaller on mobile */
    transform: scale(0.9);
    transform-origin: bottom right;
  }
}
</style>
