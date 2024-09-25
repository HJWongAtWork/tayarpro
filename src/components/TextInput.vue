<template>
  <div style="margin-bottom: 20px;">
    <label class="italicBold" style="font-size: 24px;"> {{ labelName }} </label>
    <input 
      type="text"
      v-model="inputValue"
      :label="labelName"
      style="
        border: 1px solid black;
        display: flex; 
        width: 100%;
        border-radius: 5px;
        height: 52px;
        font-size: 24px;">
  </div>
</template>

<script>
  export default {
    props: {
      labelName: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        inputValue: '',
      };
    },
  };
</script>

<style>
  .italicBold {
    font-style: italic;
    font-weight: bold;
  }
</style>