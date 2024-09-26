<template>
    <v-carousel id="carousel" show-arrows="hover" cycle hide-delimiter-background height="auto">
        <v-carousel-item v-for="image in images" :key="image.alt" :src="image.src" :alt="image.alt">
        </v-carousel-item>
    </v-carousel>
</template>

<script>
export default {
    props: {
        images: {
            type: Array,
            /* Arrays and Objects must return factory functions instead of
            literal values. You can't do `default: []`, you have to do
            `default: function() { return []; }`... what I wrote was the 
            short-hand for how to do it with ES6 fat-arrow functions */
            default: () => ([]),
            required: true
        }
    }
}
</script>