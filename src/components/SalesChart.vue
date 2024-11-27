<template>
    <Line :data="chartData" :options="chartOptions" />
</template>

<script>
import { Line } from 'vue-chartjs'
import axios from 'axios'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js'
import { ref } from 'vue'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
)

export default {
    components: {
        Line
    },
    setup() {

        const months = ref(['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'])
        const revenue = ref([0, 0, 0, 0, 0, 0, 0])

        const chartData = ref({
            labels: months.value,
            datasets: [
                {
                    label: 'Revenue',
                    data: revenue.value,
                    borderColor: '#7C3AED',
                    backgroundColor: 'rgba(124, 58, 237, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        })

        const chartOptions = ref({
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    align: 'end'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        display: true,
                        drawBorder: false
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        })

        const updateChartData = () => {
            chartData.value = {
                labels: months.value,
                datasets: [
                    {
                        label: 'Revenue',
                        data: revenue.value,
                        borderColor: 'RGB(244, 67, 54)',
                        backgroundColor: 'RGB(244, 67, 54, 0.1)',
                        tension: 0.4,
                        fill: true
                    }
                ]
            }

            chartOptions.value = {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'top',
                        align: 'end'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            display: true,
                            drawBorder: false
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        }

        const getSalesOrderData = async () => {
            const token = localStorage.getItem('jwt');
            if (!token) {
                isLoggedIn.value = false;
            }
            try {
                const response = await axios.post('https://tayarpro-service-1082564059873.us-central1.run.app/get_sales_and_orders_data', {}, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                months.value = response.data.months;
                revenue.value = response.data.sales;
                console.log(response.data);
                updateChartData();

                // 

            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };


        onMounted(() => {
            getSalesOrderData();
        });
        return {
            chartData,
            chartOptions,
            months,
            revenue,
            getSalesOrderData
        }
    }
}
</script>