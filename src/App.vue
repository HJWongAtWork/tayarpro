<template>
  <v-app>
    <div>
      <Disclaimer />
    </div>
    <Header />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import Disclaimer from '@/components/Disclaimer.vue';
</script>
