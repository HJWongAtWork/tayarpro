<template>
    <v-snackbar
      v-for="(toast, index) in toasts"
      :key="index"
      :model-value="toast.visible"
      :color="toast.color"
      :timeout="toast.timeout"
      @update:model-value="closeToast(index)"
      :style="{'margin-bottom':calcMargin(index)}"
      style="margin-right: 100px;"
    >
      {{ toast.message }}
      <v-icon @click="closeToast(index)" style="position: absolute; right: 16px;">mdi-close</v-icon>
    </v-snackbar>
</template>

<script>
export default {
  name: "ToastNotification",
  props: {
    defaultColor: {
      type: String,
      default: "success",
    },
    defaultTimeout: {
      type: Number,
      default: -1,
    },
    maxToasts: {
      type: Number,
      default: 5,
    },
  },
  data() {
    return {
      toasts: ref([]),
    };
  },
  methods: {
    addToast(message, timeout = this.defaultTimeout, color = this.defaultColor) {
      if (this.toasts.length >= this.maxToasts) {
        this.toasts.shift();
      }
      this.toasts.push({
        message,
        color,
        timeout,
        visible: true,
      });
    },
    closeToast(index) {
      this.toasts[index].visible = false;
      setTimeout(() => {
        this.toasts.splice(index, 1);
      }, 300); 
    },
    calcMargin(i) {
      return (i*50) + 'px'
    },
  },
};
</script>

<style scoped>
.v-snackbar {
  justify-content: right !important;
}
</style>
