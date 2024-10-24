<template>
    <v-container>
        <v-btn color="primary" @click="showDialog">Add Car</v-btn>
        <AddModifyVehicle v-model="dialog" />
    </v-container>
</template>

<script>
import { ref } from 'vue';
import AddModifyVehicle from '@/components/AddModifyVehicle.vue'; // Assuming CarInfoDialog.vue is in the same directory

export default {
    components: {
        AddModifyVehicle,
    },
    setup() {
        const dialog = ref(false);

        const showDialog = () => {
            dialog.value = true;
        };

        return {
            dialog,
            showDialog,
        };
    },
};
</script>