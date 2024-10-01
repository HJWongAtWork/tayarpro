<template>
    <v-container>
        <!-- Row for the "OUR SERVICE" header -->
        <v-row justify="center">
            <v-col cols="12" class="text-center">
                <h2>
                    OUR
                    <span class="highlight-text">SERVICE</span>
                </h2>
            </v-col>
        </v-row>

        <!-- Row for services -->
        <v-row justify="center">
            <!-- Tyre Replacement -->
            <v-col cols="12" md="3" class="text-center pa-8" v-for="service in services" :key="index">
                <div class="container text-center">
                    <v-img src="/src/assets/images/home/lifter-car-repair-svgrepo-com.svg"
                        class="service-icon mx-auto"></v-img>
                    <h3 class="text-center mt-5">{{ service.title }}</h3>
                </div>

            </v-col>
        </v-row>

        <v-divider class="mb-8"></v-divider>

        <v-row justify="center">
            <v-col cols="12" class="text-center">
                <h2>
                    3 STEPS FOR CAR SERVICE
                </h2>
            </v-col>
        </v-row>

        <v-timeline>
            <v-timeline-item v-for="(step, index) in steps" :key="index" size="large">
                <template v-slot:icon>
                    <v-avatar>
                        <v-icon>{{ step.icon }}</v-icon>
                    </v-avatar>
                </template>
                <template v-slot:opposite>
                    <span>Step {{ index + 1 }}:</span>
                </template>
                <v-card class="elevation-2">
                    <v-card-title class="text-h5">
                        {{ step.title }}
                    </v-card-title>
                    <v-card-text>{{ step.description }}</v-card-text>
                </v-card>
            </v-timeline-item>
        </v-timeline>


    </v-container>
</template>

<script>
export default {
    data() {
        return {
            steps: [
                { title: "Choose your preferred car", description: "Select a car from our collection.", icon: "directions_car" },
                { title: "Confirm the Availability", description: "Ensure the car is available for your chosen date.", icon: "check_circle" },
                { title: "It's time to bring the car", description: "Pick up your car and enjoy your drive!", icon: "drive_eta" },
            ],

            services: []
        };
    },

    methods: {
        getServicesData() {
            fetch('http://localhost:5200/api/get_services')
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    this.services = data.services;
                    // Process the data as needed
                })
                .catch(error => {
                    console.error('Error fetching services:', error);
                });
        }

    },
    mounted() {
        this.getServicesData();
    }
};
</script>

<style scoped>
.timeline {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 20px;
}

.timeline-item {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.timeline-connector {
    width: 2px;
    background-color: #ccc;
    height: 60px;
    /* Adjust height as necessary */
}
</style>