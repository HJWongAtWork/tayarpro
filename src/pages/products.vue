<template>
    <h2 class="no-background text-center mt-2">
        <span><strong>Tyres</strong></span>
    </h2>

    <v-responsive width="100%" class="mt-2">
        <v-row>
            <v-col cols="3">
                <v-container>
                    <v-row>
                        <v-col cols="12" class="pa-0">
                            <div class="text-center"><strong>Product Categories</strong></div>
                            <div>
                                <v-list class="text-left ma-5 pa-0">
                                    <v-list-item v-for="(item, index) in TyreList" :key="index">
                                        <div class="d-flex align-center">
                                            <v-list-item-title class="flex-grow-1 text-body-2 mr-2">{{
                                                item.title
                                                }}</v-list-item-title>
                                            <v-checkbox class="ma-0 pa-0" hide-details v-model="selectedTyres"
                                                :value="item"></v-checkbox>
                                        </div>
                                    </v-list-item>
                                </v-list>
                            </div>
                        </v-col>
                    </v-row>
                </v-container>
            </v-col>
            <v-col cols="9">
                <v-container>
                    <v-row>
                        <v-col cols="8">
                            <v-text-field prepend-icon="mdi-magnify" hide-details single-line
                                v-model="searchText"></v-text-field>
                        </v-col>
                        <v-col cols="4" class="text-right">
                            <v-menu open-on-hover>
                                <template v-slot:activator="{ props }">
                                    <v-btn color="#ffffff" v-bind="props" height="50" width="150">Filter</v-btn>
                                </template>
                                <v-list>
                                    <v-list-item v-for="(item, index) in filterMenu" :key="index"
                                        @click="handleSortingCheck(item)">
                                        <div class="d-flex">
                                            <v-btn variant="text"><v-list-item-title>{{
                                                item.title
                                                    }}</v-list-item-title></v-btn>
                                            <v-spacer />
                                            <v-icon>{{ item.icon }}</v-icon>
                                        </div>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col v-for="tyre in filteredTyres" :key="tyre.itemId" cols="3">
                            <v-card height="400">
                                <v-img height="200" :src="tyrePic" :alt="tyre.description"></v-img>
                                <v-card-title class="text-h7 text-wrap">{{
                                    tyre.description
                                    }}</v-card-title>
                                <v-card-text>
                                    <div>{{ tyre.cartype }}</div>
                                    <div class="text-h6 mt-2">RM {{ tyre.unitprice.toFixed(2) }}</div>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-col>
        </v-row>
    </v-responsive>
</template>

<style>
h2.no-background {
    position: relative;
    overflow: hidden;

    span {
        display: inline-block;
        vertical-align: baseline;
        zoom: 1;
        display: inline;
        vertical-align: auto;
        position: relative;
        padding: 0 20px;

        &:before,
        &:after {
            content: "";
            display: block;
            width: 1000px;
            position: absolute;
            top: 0.73em;
            border-top: 1px solid red;
        }

        &:before {
            right: 100%;
        }

        &:after {
            left: 100%;
        }
    }
}
</style>

<script>
import tyrepic from '@/assets/tyre.jpg';
import { ref, computed, onMounted } from 'vue';
import { useTyreStore } from '@/stores/useTyreStore';

export default {
    setup() {
        const tyreStore = useTyreStore();

        const tyrePic = tyrepic;

        onMounted(() => {
            tyreStore.fetchTyreDetails();
        });

        const TyreList = [
            { id: "CONT", title: "Continental" },
            { id: "BRID", title: "Bridgestone" },
            { id: "MICH", title: "Michelin" },
            { id: "GODY", title: "Goodyear" },
        ];

        const searchText = ref('');
        const currentSort = ref('none');

        const filterMenu = [
            {
                title: 'Price Ascending',
                icon: 'mdi-arrow-up-bold',
                sort: 'priceAsc',
            },
            {
                title: 'Price Descending',
                icon: 'mdi-arrow-down-bold',
                sort: 'priceDesc',
            },
            { title: 'Rating Ascending' }, // Consider removing if no rating data
            { title: 'Rating Descending' }, // Consider removing if no rating data
        ];

        const selectedTyres = ref([]);

        const filteredTyres = computed(() => {
            let result = tyreStore.tyreDetails.filter((tyre) => {
                const matchesCategory =
                    selectedTyres.value.length === 0 ||
                    selectedTyres.value.some((selected) => selected.id === tyre.brandid);
                const matchesSearch = tyre.description
                    .toLowerCase()
                    .includes(searchText.value.toLowerCase());
                const isActive = tyre.status === "Active";
                return matchesCategory && matchesSearch && isActive;
            });

            if (currentSort.value === 'priceAsc') {
                result.sort((a, b) => a.unitprice - b.unitprice);
            } else if (currentSort.value === 'priceDesc') {
                result.sort((a, b) => b.unitprice - a.unitprice);
            }
            return result;
        });

        const handleSortingCheck = (item) => {
            currentSort.value = item.sort;
        };

        return {
            searchText,
            filterMenu,
            selectedTyres,
            filteredTyres,
            handleSortingCheck,
            tyrePic,
            TyreList
        };
    },
};
</script>