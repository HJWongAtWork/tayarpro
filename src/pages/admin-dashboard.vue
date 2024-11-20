<template>
    <v-container fill-height align="center" justify="center" max-width="1400">
        <v-row>
            <v-col cols="12" sm="6">
                <v-card>
                    <v-card-title>Total Customers</v-card-title>
                    <v-card-text>{{ dashboardStore.totalCustomers }}</v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6">
                <v-card>
                    <v-card-title>Male:Female Customers</v-card-title>
                    <v-card-text>{{ dashboardStore.maleToFemaleRatio }}</v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-card class="px-5">
                    <v-card-title>Customers</v-card-title>
                    <v-data-table :items="dashboardStore.allCustomers" height="300px" :search="search">
                        <template v-slot:top>
                            <v-text-field v-model="search" label="Search" hide-details append-inner-icon="mdi-magnify"></v-text-field>
                            <v-btn @click="downloadCustomerCSV">Download CSV</v-btn>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { useDashboardStore } from '@/stores/useDashboardStore.js';
import { ref, onMounted, computed } from 'vue';

export default {
    setup() {
        const dashboardStore = useDashboardStore();
        const search = ref('');

        const convertToCSV = (objArray) => {
            const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
            let str = `${Object.keys(array[0]).map(value => `"${value}"`).join(",")}` + '\r\n';
            for (let i = 0; i < array.length; i++) {
                let line = '';
                for (let index in array[i]) {
                    if (line !== '') line += ',';
                    line += `"${array[i][index]}"`;
                }
                str += line + '\r\n';
            }
            return str;
        };

        const downloadCustomerCSV = () => {
            const filteredItems = dashboardStore.allCustomers.filter((customer) =>
                Object.values(customer).some((val) =>
                    String(val).toLowerCase().includes(search.value.toLowerCase())
                )
            );

            const csv = convertToCSV(filteredItems);
            const link = document.createElement("a");
            link.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
            link.target = '_blank';
            link.download = 'customers.csv';
            link.click();
        };

        // Fetch data on component mount
        onMounted(() => {
            dashboardStore.fetchData();
        });

        return {
            dashboardStore,
            search,
            downloadCustomerCSV
        };
    },
};
</script>