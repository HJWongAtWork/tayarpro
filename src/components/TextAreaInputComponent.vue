<template>
  <div style="margin-bottom: 20px;">
    <label class="italicBold"> {{ labelNameUpper }} </label>
    <textarea
      v-model="inputValue"
      :label="labelName"
      :disabled="isDisable"
      :rules="rules"
      @input="$emit('update:modelValue', inputValue)"
      style="
        border: 1px solid black;
        display: flex; 
        width: 100%;
        border-radius: 5px;
        height: 320px;"
    >
    </textarea>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TextAreaInput',
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