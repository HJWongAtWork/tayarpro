<template>
    <div class="timeline-container">
        <v-timeline side="end" align="start">
            <v-timeline-item v-for="(activity, index) in activities" :key="index" :dot-color="activity.color"
                :icon="activity.icon" size="x-small" style="font-size: 10px;">
                <div class="font-weight-bold">{{ activity.title }}</div>
                <div>{{ activity.description }}</div>

                <div class="text-subtitle-4 grey--text" style="font-size: 8px; color: gray;">{{
                    activity.time }}</div>
            </v-timeline-item>
        </v-timeline>
        <v-snackbar v-model="snackbar" timeout="3000" :color="snackbarColor">
            New alerts
        </v-snackbar>
    </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted, onUnmounted } from "vue";

export default {
    setup() {
        const baseUrl = 'https://tayarpro-service-1082564059873.us-central1.run.app';

        const activities = ref([]);
        const constantActivity = ref([]);
        const snackbar = ref(false);
        const snackbarColor = 'error';

        const getActivities = async () => {
            const jwt = localStorage.getItem('jwt');
            try {
                const response = await axios.post(baseUrl + '/get_notifications', {}, {
                    headers: {
                        'Authorization': `Bearer ${jwt}`
                    }
                });
                console.log('Activities:', response.data);

                if (JSON.stringify(constantActivity.value) !== JSON.stringify(response.data)) {
                    constantActivity.value = response.data;

                    activities.value = response.data.map(activity => ({
                        title: activity.category === 'Order' ? 'New order placed!' :
                            activity.category === 'User' ? 'New registered user!' :
                                activity.category === 'Stock' ? 'Uhoh stock is running low!' :
                                    activity.title,
                        description: activity.message,
                        time: new Date(activity.createdat).toLocaleString(),
                        color: activity.category === 'Order' ? 'green' :
                            activity.category === 'User' ? 'purple' :
                                activity.category === 'Stock' ? 'orange' :
                                    'blue',
                        icon: activity.category === 'Order' ? 'mdi-cart' :
                            activity.category === 'User' ? 'mdi-account' :
                                activity.category === 'Stock' ? 'mdi-alert' :
                                    'mdi-file-document',
                    }));

                    // Show snackbar message
                    snackbar.value = true;
                }

            } catch (error) {
                console.error(error);
            }
        };

        onMounted(() => {
            getActivities();
            const interval = setInterval(getActivities, 1000);

            onUnmounted(() => {
                clearInterval(interval);
            });
        });

        return {
            activities,
            snackbar,
            snackbarColor,
        };
    },
};
</script>

<style scoped>
.font-weight-bold {
    font-weight: bold;
}

.timeline-container {
    height: 400px;
    /* Set the desired height */
    overflow-y: auto;
    /* Enable vertical scrolling */
    padding-right: 16px;
    /* Optional: Add padding to avoid scrollbar overlap */
}

.v-timeline-item__icon {
    margin: 8px;
    /* Adjust the margin as needed */
    font-size: 16px;
    /* Adjust the font size to make the icon smaller */
}

.v-timeline-divider__inner-dot {
    padding: 10px;
}
</style>