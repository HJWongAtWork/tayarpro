<template>
  <v-container class="fill-height">

    <div id="image-container" class="d-flex justify-center align-center">
      <v-img v-if="imageUrl" :src="imageUrl" class="image-preview" />
      <v-icon v-else size="150">mdi-account-circle</v-icon>
    </div>

    <v-file-input
      v-model="file"
      accept=".jpg, .jpeg, .png"
      @change="handleFileChange"
      hide-input
      style="display: none"
    />

    <v-btn v-if="imageUrl" height="40" width="200" @click="cancelUpload">
      <div class="text-h6 d-flex">
        <v-icon left size="30"> mdi-cancel </v-icon>
        Remove Picture
      </div>
    </v-btn>

    <v-btn v-else height="40" width="200" @click="triggerFileInput">
      <div class="text-h6 d-flex">Upload</div>
    </v-btn>

  </v-container>
</template>

<script>

  export default {
    setup() {
      const file = ref(null);
      const imageUrl = ref(null);

      const handleFileChange = () => {
        if (file.value) {
          const allowedTypes = ['image/jpeg', 'image/png'];
          if (!allowedTypes.includes(file.value.type)) {
            alert('Please select a valid image file (JPEG or PNG).');
            return;
          }
          imageUrl.value = URL.createObjectURL(file.value);
        }
      };

      const triggerFileInput = () => {
        document.querySelector('input[type="file"]').click();
      };

      const cancelUpload = () => {
        file.value = null;
        imageUrl.value = null;
      };

      return {
        file,
        imageUrl,
        handleFileChange,
        triggerFileInput,
        cancelUpload,
      };
    },

  };
</script>


<style scoped>
/* Container for the image */
#image-container {
  width: 200px; /* Fixed width */
  height: 200px; /* Fixed height */
  border: 2px dashed #ccc; /* Dashed border for visual effect */
  background-color: #f5f5f5; /* Light background color */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; /* Hide overflow to contain image */
}

/* Styling for the image */
.image-preview {
  max-width: 100%; /* Ensure the image does not exceed the container's width */
  max-height: 100%; /* Ensure the image does not exceed the container's height */
  object-fit: cover; /* Cover the container while maintaining aspect ratio */
}
</style>