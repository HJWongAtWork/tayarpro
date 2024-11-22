<template>
    <div v-if="showDisclaimer" class="disclaimer-dialog">
        <v-card class="ma-5" max-width="600">
            <v-row align="center">
                <v-col cols="12" align="center" class="mx-auto my-5" style="box-sizing: border-box !important;">
                    <v-card-title class="font-weight-black mx-5">
                        Disclaimer
                    </v-card-title>
                    <v-card-text class="mx-5">
                        The company, products, services, and information depicted on this website are fictional and intended for illustrative purposes only. Any resemblance to real persons, entities, or events is purely coincidental. We do not claim any affiliation with or endorsement by any real-world companies or individuals. All information provided is for entertainment and educational purposes and should not be taken as fact or advice.
                    </v-card-text>
                    <v-btn @click="acceptDisclaimer" class="mx-5">I Understand This Disclaimer</v-btn>
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>

<script>
export default {
    name: 'Disclaimer',
    data() {
        return {
            showDisclaimer: true,
            dateSalt: (Date.now() / 86400000).toFixed(0)
        };
    },
    methods: {
        acceptDisclaimer() {
            this.showDisclaimer = false;
            localStorage.setItem(`disclaimerAcceptedTayarPro${this.dateSalt}`, true);
        },
    },
    mounted() {
        if (localStorage.getItem(`disclaimerAcceptedTayarPro${this.dateSalt}`)) {
            this.showDisclaimer = false;
        }
    },
};
</script>

<style>
.disclaimer-dialog {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.disclaimer-dialog p {
    color: white;
    text-align: center;
}

.disclaimer-dialog button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
}
</style>