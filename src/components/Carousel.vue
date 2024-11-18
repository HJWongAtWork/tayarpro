<template>
    <v-carousel 
        id="carousel" 
        show-arrows="hover" 
        cycle 
        hide-delimiter-background 
        :height="400"
        :autofocus="false"
        hide-delimiters
        class="carousel-container"
    >
        <v-carousel-item 
            v-for="image in images" 
            :key="image.alt" 
            :src="image.src" 
            :alt="image.alt"
            cover
        >
        </v-carousel-item>
    </v-carousel>
</template>

<script setup lang="ts">
defineProps<{
    images: Array<{
        src: string;
        alt: string;
    }>;
}>();
</script>

<style scoped>
.carousel-container {
    position: relative;
    overflow: hidden;
}

.carousel-container :deep(.v-carousel__controls) {
    background: none;
}

/* Prevent focus outline */
.carousel-container :deep(.v-carousel__controls button) {
    outline: none !important;
}

/* Remove focus rings */
.carousel-container :deep(*:focus) {
    outline: none !important;
    box-shadow: none !important;
}

/* Fix height issues */
.carousel-container :deep(.v-window__container) {
    height: 400px !important;
}

.carousel-container :deep(.v-carousel__item) {
    height: 400px !important;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

/* Optional: Add transition for smoother image changes */
.carousel-container :deep(.v-carousel__item) {
    transition: opacity 0.5s ease-in-out;
}
</style>