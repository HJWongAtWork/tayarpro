<template>
    <v-container fill-height align="center">
        <v-row>
            <v-col cols="12">
                <v-card min-width="350" max-width="800" class="ma-auto" color="#FFE2E5">
                    <v-row>
                        <v-col cols="12" class="mb-0 pb-0">
                            <v-card-title class="text-center text-h5 mb-1 pb-auto">
                                Your Appointments
                            </v-card-title>
                        </v-col>
                    </v-row>
                    <v-divider class="mx-3" thickness="2" opacity="0.3" />
                    <v-row>
                        <v-col cols="12">
                            <v-card v-for="(appt, i) in appointments" :index="i" class="ma-3 pa-3">
                                <v-row>
                                    <v-col cols="12" sm="5">
                                        <v-card max-width="300" min-height="225">
                                            <v-card-subtitle class="my-3 font-weight-medium text-subtitle-1">
                                                Appointment {{ appt.appointment_id }}
                                            </v-card-subtitle>
                                            <v-divider class="mx-3" thickness="2" opacity="0.3" />
                                            <v-row class="ma-0 pa-0">
                                                <v-col cols="6" class="pr-0 pb-0">
                                                    <v-card-text class="pt-3 pr-0 text-left">
                                                        Date:<br>
                                                        Time:<br>
                                                        Service:<br>
                                                        Due (MYR):<br>
                                                    </v-card-text>
                                                </v-col>
                                                <v-col cols="6" class="pl-0 pb-0">
                                                    <v-card-text class="pt-3 pl-0 text-right">
                                                        {{ appt.date }}<br>
                                                        {{ appt.time }}<br>
                                                        {{ appt.service_type }}<br>
                                                        {{ appt.payment_due }}<br>
                                                    </v-card-text>
                                                </v-col>
                                                <v-col cols="12" align="center" class="mt-0 pt-0">
                                                    <v-btn width="70" class="mr-2 my-1" color="#FFE2E5">Modify</v-btn>
                                                    <v-btn width="70" class="ml-2 my-1" color="#FF3131">Delete</v-btn>
                                                </v-col>
                                            </v-row>
                                        </v-card>
                                    </v-col>
                                    <v-col cols="12" sm="7">
                                        <v-card min-height="225" max-height="225" justify="center" align="center">
                                            <v-row>
                                                <v-col cols="6">
                                                    <v-card-text>
                                                        <p class="text-subtitle-2 text-grey-darken-1">Tyre Brand: </p>
                                                        {{ appt.tyre_brand }}<br><br>
                                                        <p class="text-subtitle-2 text-grey-darken-1">Tyre Model: </p>
                                                        {{ appt.model }}<br><br>
                                                        <p class="text-subtitle-2 text-grey-darken-1">Country: </p>
                                                        {{ appt.country }}
                                                    </v-card-text>
                                                </v-col>
                                                <v-col cols="6">
                                                    <v-card-text>
                                                        <p class="text-subtitle-2 text-grey-darken-1">Tyre Size: </p>
                                                        {{ appt.size }}<br><br>
                                                        <p class="text-subtitle-2 text-grey-darken-1">Load Index: </p>
                                                        {{ appt.load_index }}<br><br>
                                                        <p class="text-subtitle-2 text-grey-darken-1">Speed Index: </p>
                                                        {{ appt.speed_index }}
                                                    </v-card-text>
                                                </v-col>
                                            </v-row>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<style>
v-card {
    box-sizing: border-box !important;
}
</style>

<script>
export default {
    setup() {
        const _appointments = [
            {
                appointment_id: 1,
                date: "2024-05-12",
                time: "09:00",
                service_type: "Install",
                payment_due: 4623.12,
                tyre_brand: "Continental",
                model: "Random model",
                country: "Germany",
                size: "260/85R15",
                load_index: 76,
                speed_index: "B"
            },
            {
                appointment_id: 2,
                date: "2024-05-20",
                time: "04:35",
                payment_due: 2135.31,
                service_type: "Tuning",
                tyre_brand: "Hankook",
                model: "Randomer model",
                country: "North Korea",
                size: "275/80R17",
                load_index: 85,
                speed_index: "A"
            },
            {
                appointment_id: 3,
                date: "2024-06-12",
                time: "21:00",
                payment_due: 2365.34,
                service_type: "Consult",
                tyre_brand: "Michelin",
                model: "Randomest model",
                country: "France",
                size: "285/75R16",
                load_index: 100,
                speed_index: "C"
            }
        ];

        return {
            appointments: _appointments
        }
    }
};
</script>