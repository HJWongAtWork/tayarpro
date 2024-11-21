<template>
  <Vue3Lottie :animationData="loader1" 
  :style="{ height, width }"
     />
</template>

<script>
import { Vue3Lottie } from 'vue3-lottie';

import loader1 from '../assets/loader/loader1.json';

export default {
  components: {
    Vue3Lottie,
  },
  props: {
    height: {
      type: String,
      default: "500px", // Default height with units
    },
    width: {
      type: String,
      default: "500px",
    },
  },
  data() {
    return {
      loader1
    }
  },
}
</script>