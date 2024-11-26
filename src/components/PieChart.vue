<template>
    <div class="chart-container">
        <Pie :options="chartOptions" :data="chartData" />
    </div>
</template>

<script>
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default {
    name: 'PieChart',
    components: { Pie },
    data() {
        return {
            chartData: {
                labels: ['Michelin', 'Bridgestone', 'Goodyear', 'Continental'],
                datasets: [
                    {
                        label: 'Expenses',
                        backgroundColor: ['#FF5722', '#FFC107', '#FF9800', '#F44336'],
                        data: [320, 250, 180, 100]
                    }
                ]
            },
            chartOptions: {
                responsive: true,
                plugins: {
                    title: {
                        display: false,
                        text: 'Market Share of Tyre',
                        font: {
                            size: 10 // Adjust the font size for the title
                        }
                    },
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            font: {
                                size: 10 // Adjust the font size for the legend labels
                            }
                        }
                    }
                }
            }
        }
    }
}
</script>

<style scoped>
.chart-container {
    width: 100%;
    height: 250px;
    /* Adjust the height as needed */
}
</style>