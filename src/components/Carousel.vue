<template>
    <v-carousel 
        id="carousel" 
        show-arrows="hover" 
        cycle 
        hide-delimiter-background 
        :height="carouselHeight"
        :autofocus="false"
        hide-delimiters
        class="carousel-container"
        interval="6000"
    >
        <v-carousel-item 
            v-for="image in images" 
            :key="image.alt" 
            class="carousel-item"
        >
            <div class="image-wrapper">
                <v-img
                    :src="image.src"
                    :alt="image.alt"
                    :height="carouselHeight"
                    contain
                    class="carousel-image"
                >
                    <template v-slot:placeholder>
                        <v-row
                            class="fill-height ma-0"
                            align="center"
                            justify="center"
                        >
                            <v-progress-circular
                                indeterminate
                                color="grey-lighten-5"
                            ></v-progress-circular>
                        </v-row>
                    </template>
                </v-img>
            </div>
        </v-carousel-item>
    </v-carousel>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

defineProps<{
    images: Array<{
        src: string;
        alt: string;
    }>;
}>();

const carouselHeight = ref(500);

const updateCarouselHeight = () => {
    const width = window.innerWidth;
    if (width < 600) {
        carouselHeight.value = 250; // Mobile
    } else if (width < 960) {
        carouselHeight.value = 400; // Tablet
    } else {
        carouselHeight.value = 500; // Desktop
    }
};

onMounted(() => {
    updateCarouselHeight();
    window.addEventListener('resize', updateCarouselHeight);
});

onUnmounted(() => {
    window.removeEventListener('resize', updateCarouselHeight);
});
</script>

<style scoped>
.carousel-container {
    position: relative;
    overflow: hidden;
    width: 100%;
    background-color: black;
}

.carousel-item {
    display: flex;
    align-items: center;
    justify-content: center;
}

.image-wrapper {
    width: 100%;
    height: 100%;
    animation: fadeIn 1s ease-in;
}

.carousel-image {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
}

:deep(.v-carousel__controls) {
    background: none;
}

:deep(.v-carousel__controls button) {
    outline: none !important;
}

:deep(*:focus) {
    outline: none !important;
    box-shadow: none !important;
}

:deep(.v-img__img) {
    object-fit: contain !important;
    animation: scaleIn 0.8s ease-out;
}

/* Animations */
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes scaleIn {
    from {
        transform: scale(0.95);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
}

/* Slide transitions */
:deep(.v-window__container) {
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

:deep(.v-window-item--active) {
    animation: slideIn 0.6s ease-out;
}

@keyframes slideIn {
    from {
        transform: translateX(50px);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

/* Responsive styles */
@media (max-width: 600px) {
    .carousel-container {
        max-height: 250px;
    }
    :deep(.v-img__img) {
        max-height: 250px;
    }
}

@media (min-width: 601px) and (max-width: 960px) {
    .carousel-container {
        max-height: 400px;
    }
    :deep(.v-img__img) {
        max-height: 400px;
    }
}

@media (min-width: 961px) {
    .carousel-container {
        max-height: 500px;
    }
    :deep(.v-img__img) {
        max-height: 500px;
    }
}

/* Style the arrows */
:deep(.v-btn--icon) {
    background: rgba(255, 255, 255, 0.15) !important;
    margin: 0 1rem;
    transition: all 0.3s ease;
}

:deep(.v-btn--icon:hover) {
    background: rgba(255, 255, 255, 0.3) !important;
    transform: scale(1.1);
}

:deep(.v-btn--icon .v-icon) {
    color: white !important;
    opacity: 0.8;
    transition: opacity 0.3s ease;
}

:deep(.v-btn--icon:hover .v-icon) {
    opacity: 1;
}

/* Optional: Add a subtle gradient overlay */
.carousel-container::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.2) 0%,
        rgba(0, 0, 0, 0) 20%,
        rgba(0, 0, 0, 0) 80%,
        rgba(0, 0, 0, 0.2) 100%
    );
    pointer-events: none;
}
</style>