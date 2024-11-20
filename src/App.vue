<template>
  <component :is="layout">
    <v-app>
      <v-main>
        <router-view />
      </v-main>
    </v-app>
  </component>
</template>

<script lang="ts" setup>
  import { useRoute } from "vue-router";
  import DefaultLayout from "@/layouts/DefaultLayout.vue";

  const route = useRoute();

  // Dynamically set the layout component based on the route's meta
  const layout = computed(() => route.meta.layoutComponent || DefaultLayout); // DefaultLayout as fallback

</script>
