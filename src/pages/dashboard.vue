<template>
    <v-app style="background-color: #F8F8FE;">


        <v-container>
            <v-row>
                <v-col cols="12" md="9">
                    <!-- Stats Cards -->
                    <v-row class="mt-2">
                        <v-col cols="12" md="4">
                            <v-card class="rounded-lg" elevation-10>
                                <v-card-text>
                                    <div class="d-flex justify-space-between">
                                        <div>
                                            <div class="text-subtitle-1">Revenue</div>
                                            <div class="text-h5">RM {{ cardRevenue }}</div>
                                            <div class="text-success">+3.16% from last month</div>
                                        </div>
                                        <v-icon icon="mdi-database" size="x-large"></v-icon>
                                    </div>
                                </v-card-text>
                            </v-card>
                        </v-col>

                        <v-col cols="12" md="4">
                            <v-card class="rounded-lg">
                                <v-card-text>
                                    <div class="d-flex justify-space-between">
                                        <div>
                                            <div class="text-subtitle-1">Number of Orders</div>
                                            <div class="text-h5">{{ cardOrders }}</div>
                                            <div class="text-success">+1.18% from last month</div>
                                            <!-- <div class="text-error">-1.18% from last month</div> -->
                                        </div>
                                        <v-icon icon="mdi-file-document" size="x-large"></v-icon>
                                    </div>
                                </v-card-text>
                            </v-card>
                        </v-col>

                        <v-col cols="12" md="4">
                            <v-card class="rounded-lg">
                                <v-card-text>
                                    <div class="d-flex justify-space-between">
                                        <div>
                                            <div class="text-subtitle-1">Number of Users</div>
                                            <div class="text-h5">{{ cardUsers }}</div>
                                            <div class="text-success">+2.42% from last month</div>
                                        </div>
                                        <v-icon icon="mdi-refresh" size="x-large"></v-icon>
                                    </div>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>

                    <v-row class="mt-2">
                        <v-col cols="12" md="8">
                            <v-card class="rounded-lg">
                                <v-card-title class="d-flex align-center">
                                    Revenue
                                    <v-spacer></v-spacer>
                                    <v-btn icon="mdi-dots-horizontal" variant="text"></v-btn>
                                </v-card-title>
                                <v-card-text>
                                    <div style="height: 400px">
                                        <SalesChart />
                                    </div>
                                </v-card-text>
                            </v-card>
                        </v-col>

                        <v-col cols="12" md="4">
                            <v-card class="rounded-lg">
                                <v-card-title class="d-flex align-center">
                                    Alerts
                                    <v-spacer></v-spacer>
                                    <v-btn icon="mdi-dots-horizontal" variant="text"></v-btn>
                                </v-card-title>
                                <v-card-text>
                                    <div style="height: 400px">
                                        <Timeline />
                                    </div>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>

                    <v-row class="mt-2">
                        <v-col cols="12">
                            <v-card class="rounded-lg">
                                <v-card-title class="d-flex align-center">
                                    All Users
                                </v-card-title>

                                <v-text-field v-model="searchUsers" label="Search for Users"
                                    placeholder="Search by name, email, etc." single-line hide-details clearable
                                    class="mt-3 mx-2 small-text-field rounded-pill" dense
                                    prepend-inner-icon="mdi-magnify" density="compact" outlined color="primary"
                                    variant="outlined"></v-text-field>

                                <v-data-table :headers="headersUsers" :search="searchUsers" :items="usersData" hover
                                    style="height: 400px;">

                                    <template v-slot:item.email="{ item }">
                                        {{ item.email }}
                                    </template>

                                    <template v-slot:item.action="{ item }">

                                        <v-btn v-if="item.isAdmin === 'Y'" color="error"
                                            @click="confirmationRevokeAdmin(item.accountid, item.email)" size="x-small"
                                            prepend-icon="mdi-close" variant="flat">
                                            Revoke Admin
                                        </v-btn>
                                        <v-btn v-else color="success"
                                            @click="confirmationAddAdmin(item.accountid, item.email)" size="x-small"
                                            prepend-icon="mdi-check" variant="flat">
                                            Add As Admin
                                        </v-btn>

                                    </template>
                                </v-data-table>
                            </v-card>
                        </v-col>

                        <v-col cols="12">
                            <v-card class="rounded-lg">
                                <v-card-title class="d-flex align-center">
                                    All Products

                                    <v-spacer></v-spacer>

                                    <v-btn @click="setAddState" prepend-icon="mdi-tire" class="mr-2" size="small"
                                        variant="outlined">Add
                                        Tyre</v-btn>



                                    <v-dialog max-width="500">
                                        <template v-slot:activator="{ props: activatorProps }">

                                            <v-btn v-bind="activatorProps" prepend-icon="mdi-cog" class="mr-2"
                                                size="small" variant="outlined">Add
                                                Services</v-btn>

                                        </template>

                                        <template v-slot:default="{ isActive }">
                                            <v-card title="Add Services">
                                                <v-card-text>
                                                    <v-row>
                                                        <!-- Service ID -->
                                                        <v-col cols="12" md="6">
                                                            <v-row>


                                                                <v-col cols="12">
                                                                    <v-text-field label="Service ID"
                                                                        placeholder="Enter service ID"
                                                                        variant="outlined" prefix="SVR"
                                                                        density="comfortable"
                                                                        v-model="serviceId"></v-text-field>
                                                                </v-col>
                                                            </v-row>
                                                        </v-col>

                                                        <!-- Type ID -->
                                                        <v-col cols="12" md="6">
                                                            <v-select label="Service Type" placeholder="Select Type ID"
                                                                variant="outlined" density="comfortable"
                                                                :items="['ADJSVR', 'ALGSVR', 'BLCSVR', 'BRKSVR', 'ENGOIL', 'FXWSVR', 'OTHSVR']"
                                                                v-model="serviceTypeId"></v-select>
                                                        </v-col>

                                                        <!-- Description -->
                                                        <v-col cols="12">
                                                            <v-text-field label="Description"
                                                                placeholder="Enter service description"
                                                                variant="outlined" density="comfortable" rows="3"
                                                                v-model="serviceDescription"></v-text-field>
                                                        </v-col>

                                                        <!-- Car Type -->
                                                        <v-col cols="12" md="6">
                                                            <v-select label="Car Type" placeholder="Select car type"
                                                                variant="outlined" density="comfortable"
                                                                :items="['Select Car Type', 'SUV', 'Passenger']"
                                                                v-model="serviceCarType"></v-select>
                                                        </v-col>

                                                        <!-- Price -->
                                                        <v-col cols="12" md="6">
                                                            <v-text-field label="Price" placeholder="Enter price"
                                                                variant="outlined" density="comfortable" prefix="RM"
                                                                type="number" v-model="servicePrice"></v-text-field>
                                                        </v-col>

                                                        <!-- Status -->
                                                        <v-col cols="12" md="6">
                                                            <v-select label="Status" placeholder="Select status"
                                                                variant="outlined" density="comfortable"
                                                                v-model="serviceStatus"
                                                                :items="['Active', 'Inactive']"></v-select>
                                                        </v-col>
                                                    </v-row>

                                                </v-card-text>

                                                <v-card-actions>
                                                    <v-spacer></v-spacer>
                                                    <v-btn color="error" variant="flat" @click="addTyre">Add
                                                        Service</v-btn>
                                                    <v-btn text="Close Dialog" @click="isActive.value = false"></v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </template>
                                    </v-dialog>


                                </v-card-title>
                                <v-text-field v-model="searchProducts" label="Search for Products"
                                    placeholder="Search by name, email, etc." single-line hide-details clearable
                                    class="mt-3 mx-2 small-text-field" dense prepend-inner-icon="mdi-magnify"
                                    density="compact" variant="outlined"></v-text-field>

                                <v-data-table :headers="headers" :search="searchProducts" :items="productsData" hover
                                    style="height: 400px;">

                                    <template v-slot:item.stock="{ item }">
                                        {{ item.stockunit }}
                                    </template>
                                    <template v-slot:item.price="{ item }">
                                        {{ item.unitprice }}
                                    </template>
                                    <template v-slot:item.action="{ item }">
                                        <v-btn icon @click="setUpdateState(item.itemid)" size="x-small">
                                            <v-icon>mdi-pencil</v-icon>
                                        </v-btn>
                                    </template>
                                </v-data-table>
                            </v-card>
                        </v-col>
                    </v-row>


                </v-col>

                <v-col cols="12" md="3">
                    <v-row class="mt-2">
                        <v-col cols="12" md="12">
                            <v-card>
                                <v-card-title class="d-flex align-center">
                                    Sales by Brands
                                    <v-spacer></v-spacer>
                                    <v-btn icon="mdi-dots-horizontal" variant="text"></v-btn>
                                </v-card-title>
                                <v-card-text>
                                    <div style="height: 250px">
                                        <PieChart />
                                    </div>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="12" md="12">
                            <v-card>
                                <v-card-title class="d-flex align-center">
                                    Orders by Months
                                    <v-spacer></v-spacer>
                                    <v-btn icon="mdi-dots-horizontal" variant="text"></v-btn>
                                </v-card-title>
                                <v-card-text>
                                    <div style="height: 250px">
                                        <OrderChart />
                                    </div>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="12" md="12">
                            <v-card>
                                <v-card-title class="d-flex align-center">
                                    User Growth
                                    <v-spacer></v-spacer>
                                    <v-btn icon="mdi-dots-horizontal" variant="text"></v-btn>
                                </v-card-title>
                                <v-card-text>
                                    <div style="height: 250px">


                                        <BarChart />
                                    </div>
                                </v-card-text>
                            </v-card>
                        </v-col>


                    </v-row>




                </v-col>
            </v-row>
        </v-container>
    </v-app>


    <v-dialog v-model="showConfirmDialog" max-width="400">
        <v-card>
            <v-card-title class="headline">Confirm Action</v-card-title>
            <v-card-text>
                <div v-if="addAdminState">
                    Are you sure you want to add {{ addToAdminEmail }} as an admin?
                </div>
                <div v-else>
                    Are you sure you want to remove {{ addToAdminEmail }} as an admin?
                </div>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>




                <v-btn color="green darken-1" text @click="showConfirmDialog = false">Cancel</v-btn>


                <v-btn v-if="addAdminState" variant="flat" color="green darken-1" text @click="addToAdmin">Add Admin
                    Access</v-btn>
                <v-btn v-else color="red darken-1" variant="flat" text @click="removeAdmin">Revoke Admin
                    Access</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog v-model="showAddTyreDialog" max-width="700">
        <v-card>
            <v-card-title class="headline">{{ tyreTitleDialog }}</v-card-title>
            <v-card-text>
                <v-row>
                    <!-- Item ID -->
                    <v-col cols="12" md="6">
                        <v-text-field label="Item ID" placeholder="Enter item ID" variant="outlined"
                            density="comfortable" v-model="tyreItemID" prefix="T"
                            :readonly="updateState"></v-text-field>
                    </v-col>

                    <!-- Brand ID -->
                    <v-col cols="12" md="6">
                        <v-select label="Brand ID" placeholder="Select Type ID" variant="outlined" density="comfortable"
                            :items="['MICH', 'BRIDG', 'GODY']" v-model="tyreBrandID"></v-select>
                    </v-col>

                    <!-- Description -->
                    <v-col cols="12">
                        <v-text-field label="Description" placeholder="Enter description" variant="outlined"
                            density="comfortable" rows="3" v-model="tyreDescription"></v-text-field>
                    </v-col>

                    <!-- Car Type -->
                    <v-col cols="12" md="6">
                        <v-select label="Car Type" placeholder="Select car type" variant="outlined"
                            density="comfortable" :items="['SUV', 'Passenger']" v-model="tyreCarType"></v-select>
                    </v-col>

                    <!-- Image Link -->
                    <v-col cols="12" md="6">
                        <v-text-field label="Image Link" placeholder="Enter image link" variant="outlined"
                            density="comfortable" v-model="tyreImageLink"></v-text-field>
                    </v-col>

                    <!-- Price -->
                    <v-col cols="12" md="6">
                        <v-text-field label="Price" placeholder="Enter price" variant="outlined" density="comfortable"
                            prefix="RM" type="number" v-model="tyrePrice"></v-text-field>
                    </v-col>

                    <!-- Tyre Size -->
                    <v-col cols="12" md="6">
                        <v-text-field label="Tyre Size" placeholder="Enter tyre size" variant="outlined"
                            density="comfortable" v-model="tyreSize"></v-text-field>
                    </v-col>

                    <!-- Speed Index -->
                    <v-col cols="12" md="6">
                        <v-text-field label="Speed Index" placeholder="Enter speed index" variant="outlined"
                            density="comfortable" v-model="tyreSpeedIndex"></v-text-field>
                    </v-col>

                    <!-- Load Index -->
                    <v-col cols="12" md="6">
                        <v-text-field label="Load Index" placeholder="Enter load index" variant="outlined"
                            density="comfortable" type="number" v-model="tyreLoadIndex"></v-text-field>
                    </v-col>

                    <!-- Stock Unit -->
                    <v-col cols="12" md="6">
                        <v-text-field label="Stock Unit" placeholder="Enter stock unit" variant="outlined"
                            density="comfortable" type="number" v-model="tyreStockUnit"></v-text-field>
                    </v-col>

                    <!-- Status -->
                    <v-col cols="12" md="6">
                        <v-select label="Status" placeholder="Status" variant="outlined" density="comfortable"
                            :items="['Active', 'Inactive']" v-model="tyreStatus"></v-select>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="error" variant="flat" @click="updateState ? updateTyre() : addTyre()">
                    {{ updateState ? 'Update Product' : 'Add Product' }}
                </v-btn>
                <v-btn text @click="showAddTyreDialog = false">Close Dialog</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>



    <v-snackbar v-model="snackbar" :color="snackbarColor" timeout="3000">
        {{ snackbarMessage }}
    </v-snackbar>

</template>

<script>

import { ref } from 'vue'
import axios from 'axios'
import SalesChart from '@/components/SalesChart.vue'
import PieChart from '@/components/PieChart.vue'
import Timeline from '@/components/Timeline.vue'
import OrderChart from '@/components/OrderChart.vue'
import BarChart from '@/components/BarChart.vue'

export default {
    setup() {
        const username = ref('')
        const searchUsers = ref('')
        const searchProducts = ref('')

        const cardRevenue = ref(0)
        const cardOrders = ref(0)
        const cardUsers = ref(0)
        const cardAvgOrder = ref(0)

        const cardPercentRevenue = ref(0)
        const cardPercentOrders = ref(0)
        const cardPercentUsers = ref(0)


        const addToAdminAccountID = ref('')
        const addToAdminEmail = ref('')

        const editTyre = ref(false)
        const editService = ref(false)

        const tyreItemID = ref('030')
        const tyreBrandID = ref('Choose Brand ID')
        const tyreDescription = ref('Michelin T030 Pro')
        const tyreCarType = ref('Choose Car Type')
        const tyreImageLink = ref('https://limtayar.com.my/wp-content/uploads/2020/03/MICHELIN-PRIMACY-4-ST.jpg')
        const tyrePrice = ref(234.50)
        const tyreSize = ref('205/55R16')
        const tyreSpeedIndex = ref('H')
        const tyreLoadIndex = ref('91')
        const tyreStockUnit = ref('1000')
        const tyreStatus = ref('Choose Status')

        const serviceId = ref(' ')
        const serviceTypeId = ref('Choose Service Type')
        const serviceDescription = ref('')
        const serviceCarType = ref('Choose Car Type')
        const servicePrice = ref('')
        const serviceStatus = ref('Choose Status')
        const updateState = ref(false)
        const addAdminState = ref(false)



        const showConfirmDialog = ref(false)
        const showAddTyreDialog = ref(false)
        const tyreTitleDialog = ref('Add Tyre')
        const snackbar = ref(false)
        const snackbarMessage = ref('')
        const snackbarColor = ref('')

        const baseUrl = 'https://tayarpro-service-1082564059873.us-central1.run.app'


        const confirmationAddAdmin = async (accountid, email) => {
            addToAdminAccountID.value = accountid
            addToAdminEmail.value = email

            showConfirmDialog.value = true
            addAdminState.value = true

        }

        const confirmationRevokeAdmin = async (accountid, email) => {
            addToAdminAccountID.value = accountid
            addToAdminEmail.value = email
            addAdminState.value = false
            showConfirmDialog.value = true
            console.log(accountid)
        }

        const removeAdmin = async () => {
            const jwt = localStorage.getItem('jwt')
            try {
                const response = await axios.post(baseUrl + `/remove_admin_rights?accountid=${addToAdminAccountID.value}`, {
                    accountid: addToAdminAccountID.value
                }, {
                    headers: {
                        'Authorization': `Bearer ${jwt}`
                    }
                });
                console.log(response.data)
                showConfirmDialog.value = false
                snackbarMessage.value = `${addToAdminEmail.value} has been removed as an admin`
                snackbarColor.value = 'success'
                snackbar.value = true

                getUsers()
            } catch (error) {
                console.error(error)
            }
        }


        const addToAdmin = async () => {
            const jwt = localStorage.getItem('jwt')
            console.log(addToAdminAccountID.value)
            try {
                const response = await axios.post(baseUrl + `/give_admin_rights?accountid=${addToAdminAccountID.value}`, {
                    accountid: addToAdminAccountID.value
                }, {
                    headers: {
                        'Authorization': `Bearer ${jwt}`
                    }
                });
                console.log(response.data)
                showConfirmDialog.value = false
                snackbarMessage.value = `${addToAdminEmail.value} has been added as an admin`
                snackbarColor.value = 'success'
                snackbar.value = true

                getUsers()
            } catch (error) {
                console.error(error)
            }
        }


        const headers = ref([
            { title: 'Product ID', key: 'itemid' },
            { title: 'Product', key: 'description' },
            { title: 'Stock', key: 'stock' },
            { title: 'Price', key: 'price' },
            { title: 'Action', key: 'action', sortable: false }
        ])

        const headersUsers = ref([
            { title: 'Name', key: 'fullname' },
            { title: 'Email', key: 'email' },
            { title: 'Action', key: 'action', sortable: false }
        ])

        const productsData = ref([])

        const usersData = ref([])


        const getUsers = async () => {
            const jwt = localStorage.getItem('jwt')
            try {
                const response = await axios.post(baseUrl + '/all_users', {}, {
                    headers: {
                        'Authorization': `Bearer ${jwt}`
                    }
                });
                console.log(response.data)
                usersData.value = response.data
                usersData.value = usersData.value.map(user => ({
                    ...user,
                    fullname: `${user.firstname} ${user.lastname}`
                }))
            } catch (error) {
                console.error(error)
            }
        }

        const getProducts = async () => {
            const jwt = localStorage.getItem('jwt')
            try {
                const response = await axios.get(baseUrl + '/get_all_tyres', {
                    headers: {
                        'Authorization': `Bearer ${jwt}`
                    }
                });
                console.log(response.data)
                productsData.value = response.data
            } catch (error) {
                console.error(error)
            }
        }

        const setAddState = () => {
            showAddTyreDialog.value = true
            updateState.value = false
            tyreTitleDialog.value = 'Add Tyre'
            tyreItemID.value = ' '
            tyreBrandID.value = 'Choose Brand ID'
            tyreDescription.value = ''
            tyreCarType.value = 'Choose Car Type'
            tyreImageLink.value = ''
            tyrePrice.value = 0
            tyreSize.value = ''
            tyreSpeedIndex.value = ''
            tyreLoadIndex.value = ''
            tyreStockUnit.value = ''
            tyreStatus.value = 'Choose Status'
        }

        const addTyre = async () => {
            const jwt = localStorage.getItem('jwt')

            if (tyreBrandID.value === 'Choose Brand ID' || tyreCarType.value === 'Choose Car Type' || tyreStatus.value === 'Choose Status') {
                snackbarMessage.value = 'Please fill in all fields'
                snackbarColor.value = 'error'
                snackbar.value = true
                return
            }

            const payload = {

                itemid: 'T' + tyreItemID.value.trim(),
                brandid: tyreBrandID.value,
                description: tyreDescription.value,
                cartype: tyreCarType.value,
                image_link: tyreImageLink.value,
                price: parseFloat(tyrePrice.value),
                tyresize: tyreSize.value,
                speedindex: tyreSpeedIndex.value,
                loadindex: parseInt(tyreLoadIndex.value),
                stockunit: parseInt(tyreStockUnit.value),
                status: tyreStatus.value
            }


            console.log(payload)

            try {
                const response = await axios.post(baseUrl + '/add_tyre', payload, {
                    headers: {
                        'Authorization': `Bearer ${jwt}`
                    }
                })
                console.log(response.data)
                snackbarMessage.value = 'Tyre added successfully!'
                snackbarColor.value = 'success'
                snackbar.value = true
                showAddTyreDialog.value = false

                getProducts()
            } catch (error) {
                console.error(error)
                snackbarMessage.value = 'Failed to add tyre.'
                snackbarColor.value = 'error'
                snackbar.value = true
            }
        }

        const updateTyre = async () => {
            const jwt = localStorage.getItem('jwt')

            if (tyreBrandID.value === 'Choose Brand ID' || tyreCarType.value === 'Choose Car Type' || tyreStatus.value === 'Choose Status') {
                snackbarMessage.value = 'Please fill in all fields'
                snackbarColor.value = 'error'
                snackbar.value = true
                return
            }

            const payload = {
                itemid: 'T' + tyreItemID.value,
                brandid: tyreBrandID.value,
                description: tyreDescription.value,
                cartype: tyreCarType.value,
                image_link: tyreImageLink.value,
                price: parseFloat(tyrePrice.value),
                tyresize: tyreSize.value,
                speedindex: tyreSpeedIndex.value,
                loadindex: parseInt(tyreLoadIndex.value),
                stockunit: parseInt(tyreStockUnit.value),
                status: tyreStatus.value
            }


            console.log(payload)

            try {
                const response = await axios.post(baseUrl + '/update_tyre', payload, {
                    headers: {
                        'Authorization': `Bearer ${jwt}`
                    }
                })
                console.log(response.data)
                snackbarMessage.value = 'Tyre added successfully!'
                snackbarColor.value = 'success'
                snackbar.value = true
                showAddTyreDialog.value = false

                getProducts()
            } catch (error) {
                console.error(error)
                snackbarMessage.value = 'Failed to add tyre.'
                snackbarColor.value = 'error'
                snackbar.value = true
            }
        }


        const getCardData = async () => {
            const jwt = localStorage.getItem('jwt')
            try {
                const response = await axios.post(baseUrl + '/data_dashboard', {}, {
                    headers: {
                        'Authorization': `Bearer ${jwt}`
                    }
                });
                console.log(response.data)
                cardRevenue.value = response.data.total_revenue
                cardRevenue.value = response.data.total_revenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                cardOrders.value = response.data.num_orders
                cardUsers.value = response.data.this_month_user
                cardAvgOrder.value = response.data.avg_order
                cardPercentRevenue.value = response.data.percent_revenue
                cardPercentOrders.value = response.data.percent_orders
                cardPercentUsers.value = response.data.percent_users
            } catch (error) {
                console.error(error)
            }
        }

        const setUpdateState = (itemid) => {

            showAddTyreDialog.value = true
            updateState.value = true
            tyreTitleDialog.value = 'Update Tyre'
            const tyre = productsData.value.find(tyre => tyre.itemid === itemid)
            tyreItemID.value = tyre.itemid.replace('T', '')
            tyreBrandID.value = tyre.brandid
            tyreDescription.value = tyre.description
            tyreCarType.value = tyre.cartype
            tyreImageLink.value = tyre.image_link
            tyrePrice.value = tyre.unitprice
            tyreSize.value = tyre.tyresize
            tyreSpeedIndex.value = tyre.speedindex
            tyreLoadIndex.value = tyre.loadindex
            tyreStockUnit.value = tyre.stockunit
            tyreStatus.value = tyre.status
        }


        onMounted(() => {
            getUsers();
            getProducts();
            getCardData();
        })

        return {
            username,
            headers,
            productsData,
            headersUsers,
            usersData,
            searchUsers,
            searchProducts,
            getUsers,
            getProducts,
            tyreItemID,
            tyreBrandID,
            tyreDescription,
            tyreCarType,
            tyreImageLink,
            tyrePrice,
            tyreSize,
            tyreSpeedIndex,
            tyreLoadIndex,
            tyreStockUnit,
            tyreStatus,
            serviceId,
            serviceTypeId,
            serviceDescription,
            serviceCarType,
            servicePrice,
            serviceStatus,
            addTyre,
            cardOrders,
            cardRevenue,
            cardUsers,
            cardAvgOrder,
            cardPercentRevenue,
            cardPercentOrders,
            cardPercentUsers,
            confirmationAddAdmin,
            showConfirmDialog,
            addToAdmin,
            addToAdminEmail,
            snackbar,
            snackbarMessage,
            snackbarColor,
            showAddTyreDialog,
            setUpdateState,
            tyreTitleDialog,
            updateState,
            setAddState,
            updateTyre,
            addAdminState,
            confirmationRevokeAdmin,
            removeAdmin

        }

    }
}




</script>

<style>
.text-success {
    color: #0c520f !important;
    font-weight: bold;
}

.text-error {
    color: #c01313;
    font-weight: bold
}

.small-icon {
    font-size: 16px;
}

.v-label {
    font-size: 12px;
}
</style>