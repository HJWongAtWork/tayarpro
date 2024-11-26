<template>
    <div class="chart-container">
        <Bar :data="chartData" :options="chartOptions" />
    </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
} from 'chart.js'
import { ref, onMounted } from 'vue'
import axios from 'axios'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    name: 'BarChart',
    components: {
        Bar
    },
    setup() {
        const months = ref(['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'])
        const numberOfUsers = ref([0, 0, 0, 0, 0, 0, 0])

        const getSalesOrderData = async () => {
            const token = localStorage.getItem('jwt');
            if (!token) {
                console.error('User is not logged in');
                return;
            }
            try {
                const response = await axios.post('https://tayar.pro/get_registered_users', {}, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                months.value = response.data.months;
                numberOfUsers.value = response.data.registered_users; // Update the value of the ref
                console.log("Number of Users", numberOfUsers.value);
                console.log(response.data);
                updateChartData();
            } catch (error) {
                console.error('Error fetching registered users:', error);
            }
        };

        const updateChartData = () => {
            chartData.value = {
                labels: months.value,
                datasets: [
                    {
                        label: 'Registered Users',
                        data: numberOfUsers.value,
                        borderColor: '#f87979', // Change border color to red
                        backgroundColor: 'RGB(244, 67, 54)', // Change background color to red with opacity
                        borderRadius: 5, // Add border radius to the bars
                        tension: 0.4,
                        fill: true
                    }
                ]
            }
        }

        const chartData = ref({
            labels: months.value,
            datasets: [
                {
                    label: 'Registered Users',
                    data: numberOfUsers.value,
                    borderColor: '#f87979', // Change border color to red
                    backgroundColor: 'RGB(244, 67, 54)', // Change background color to red with opacity
                    borderRadius: 5, // Add border radius to the bars
                    tension: 0.4,
                    fill: true
                }
            ]
        })

        const chartOptions = ref({
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    display: true,
                    grid: {
                        display: false // Remove the grid lines on the y-axis
                    },
                    title: {
                        display: true,
                        text: 'Registered Users',
                        font: {
                            size: 10 // Adjust the font size for the y-axis title
                        }
                    },
                    ticks: {
                        stepSize: 1, // Set the step size to 1 to display whole numbers
                        font: {
                            size: 10 // Adjust the font size for the y-axis labels
                        }
                    }
                },
                x: {
                    beginAtZero: true,
                    display: true,
                    grid: {
                        display: false // Remove the grid lines on the x-axis
                    },
                    title: {
                        display: true,
                        text: 'Month',
                        font: {
                            size: 10 // Adjust the font size for the x-axis title
                        }
                    },
                    ticks: {
                        font: {
                            size: 10 // Adjust the font size for the x-axis labels
                        }
                    }
                }
            },
            plugins: {
                title: {
                    display: false,
                    text: 'Registered Users'
                },
                legend: {
                    position: 'top',
                    align: 'end',
                    labels: {
                        font: {
                            size: 10 // Adjust the font size for the legend labels
                        }
                    },
                    boxWidth: 10, // Adjust the width of the legend box
                    boxHeight: 5 // Adjust the height of the legend box

                }
            },
            maintainAspectRatio: false
        })

        onMounted(() => {
            getSalesOrderData();
        })

        return {
            chartData,
            chartOptions,
            getSalesOrderData,
            updateChartData,
            months,
            numberOfUsers
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