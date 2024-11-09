<template>
  <div>
    <label class="italicBold"> {{ labelNameUpper }} </label>
    <v-text-field
      v-model="inputValue"
      :label="labelName"
      :rules="rules"
      color="primary"
      @input="$emit('update:modelValue', inputValue)"
      :disabled="isDisable"
    >
    </v-text-field>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TextInput',
  props: {
    labelName: {
      type: String,
      default: ''
    },
    labelNameUpper: {
      type: String,
      default: ''
    },
    isDisable: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: String,
      default: ""
    },
    rules: {
      type: Array as PropType<((v: any) => boolean | string)[]>,
      default: () => [],
    },
  },
  watch: {
    modelValue(newValue) {
      this.inputValue = newValue;
    },
  },
  data() {
    return {
      inputValue: this.modelValue,
    };
  },
});
</script>

<style scoped>
  .italicBold {
    font-style: italic;
    font-weight: bold;
  }
</style>