<template>
    <v-container>
        <v-card class="border-sm main-card pa-5">
            <v-row>
                <v-col cols="12" md="6" class="d-flex justify-center align-center">
                    <v-img cover
                        src="https://s3-ap-southeast-2.amazonaws.com/mytyresite-images/news/Py7NnOUnpW_unnamed.jpg"
                        contain class="grey lighten-2" style="height: 100%;">
                        <template v-slot:placeholder>
                            <v-row class="fill-height ma-0" align="center" justify="center">
                                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                            </v-row>
                        </template>
                    </v-img>
                </v-col>

                <v-col cols="12" md="6">
                    <v-card flat>
                        <v-card-title class="text-h5 font-weight-bold pa-0 mb-2">
                            TYRE ALIGNMENT
                        </v-card-title>

                        <v-card-text class="pa-0 mb-4">
                            <p class="body-2">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
                                voluptatibus, corporis, quam nisi qui animi, ipsa in aspernatur
                                unde quis veniam. Incidunt atque eum repudiandae hic saepe ab
                                nostrum ea.
                            </p>

                            <v-chip color="green lighten-4" label small class="mt-2 mb-4">Service</v-chip>

                            <p class="text-h4 font-weight-bold mb-4">MYR50.92 - RM201.00</p>

                            <v-divider></v-divider>
                            <p>Vehicle Type</p>
                            <v-btn-toggle v-model="vehicleType" mandatory class="mb-4 pa-1">
                                <v-btn variant="outlined" class="ma-2" value="passenger" text>Passenger Car</v-btn>
                                <v-btn variant="outlined" class="ma-2" value="suv" text>SUV or 4X4</v-btn>
                            </v-btn-toggle>
                            <v-divider></v-divider>

                            <p>Quantity</p>
                            <v-btn-toggle v-model="rimSize" mandatory class="mb-4 pa-1">
                                <v-btn v-for="size in rimSizes" :key="size" :value="size" variant="outlined"
                                    class="ma-2" text>{{ size
                                    }}</v-btn>
                            </v-btn-toggle>

                            <v-divider></v-divider>
                            <p>Quantity</p>
                            <div class="d-flex" style="max-width: 130px;">
                                <v-btn icon small class="mr-2" @click="decrementQuantity">
                                    <span class="text-body-1">−</span>
                                </v-btn>
                                <v-card-text class="text-center pa-0 flex-grow-1 mt-3">
                                    <span class="text-body-1">{{ quantity }}</span>
                                </v-card-text>
                                <v-btn icon small class="ml-2" @click="incrementQuantity">
                                    <span class="text-body-1">+</span>
                                </v-btn>
                            </div>

                            <v-btn color="black" dark x-large block class="mt-4" @click="addToCart">
                                ADD TO CART
                            </v-btn>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-card>





    </v-container>
</template>

<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

export default {
    setup() {
        const route = useRoute();
        const vehicleType = ref('passenger');
        const rimSize = ref(12);
        const rimSizes = ['12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23 RUN FLAT'];
        const quantity = ref(1);
        const serviceId = ref(route.params.serviceId);

        const addToCart = () => {
            // Add to cart logic here
        };

        const incrementQuantity = () => {
            quantity.value++;
        };

        const decrementQuantity = () => {
            if (quantity.value > 1) {
                quantity.value--;
            }
        };

        return {
            vehicleType,
            rimSize,
            rimSizes,
            quantity,
            serviceId,
            addToCart,
            incrementQuantity,
            decrementQuantity,
        };
    },
};
</script>

<style scoped>
@media (max-width: 600px) {
    .main-card {
        margin-top: 50px !important;
    }
}

@media (min-width: 601px) and (max-width: 960px) {
    .main-card {
        margin-top: 75px !important;
    }
}

@media (min-width: 961px) {
    .main-card {
        margin-top: 100px !important;
    }
}
</style>