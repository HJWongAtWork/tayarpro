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
                      <v-checkbox
                        class="ma-0 pa-0"
                        hide-details
                        v-model="selectedTyres"
                        :value="item"
                      ></v-checkbox>
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
              <v-text-field
                prepend-icon="mdi-magnify"
                hide-details
                single-line
                v-model="searchText"
              ></v-text-field>
            </v-col>
            <v-col cols="4" class="text-right">
              <v-menu open-on-hover>
                <template v-slot:activator="{ props }">
                  <v-btn color="#ffffff" v-bind="props" height="50" width="150"
                    >Filter</v-btn
                  >
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, index) in filterMenu"
                    :key="index"
                    @click="handleSortingCheck(item)"
                  >
                    <div class="d-flex">
                      <v-btn variant="text"
                        ><v-list-item-title>{{
                          item.title
                        }}</v-list-item-title></v-btn
                      >
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
                <v-img height="200" :src="tyre.image" :alt="tyre.title"></v-img>
                <v-card-title class="text-h7 text-wrap">{{
                  tyre.title
                }}</v-card-title>
                <v-card-text>
                  <div>{{ tyre.description }}</div>
                  <div class="text-h6 mt-2">RM {{ tyre.price.toFixed(2) }}</div>
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
import tyre from "@/assets/tyre.jpg";

export default {
  computed: {
    filteredTyres() {
      let result = this.TyreDetailList.filter((tyre) => {
        const matchesCategory =
          this.selectedTyres.length === 0 ||
          this.selectedTyres.some((selected) => selected.id === tyre.id);
        const matchesSearch = tyre.title
          .toLowerCase()
          .includes(this.searchText.toLowerCase());
        return matchesCategory && matchesSearch;
      });

      if (this.currentSort === "priceAsc") {
        result.sort((a, b) => a.price - b.price);
      } else if (this.currentSort === "priceDesc") {
        result.sort((a, b) => b.price - a.price);
      }
      return result;
    },
  },
  methods: {
    handleSortingCheck(item) {
      this.currentSort = item.sort;
    },
  },
  data() {
    return {
      searchText: "", // added here
      currentSort: "none",

      filterMenu: [
        {
          title: "Price Ascending",
          icon: "mdi-arrow-up-bold",
          sort: "priceAsc",
        },
        {
          title: "Price Descending",
          icon: "mdi-arrow-down-bold",
          sort: "priceDesc",
        },
        { title: "Rating Ascending" },
        { title: "Rating Descending" },
      ],
      TyreList: [
        { id: "Con", title: "Continental" },
        { id: "Han", title: "Hankook" },
        { id: "Mic", title: "Michelin" },
        { id: "Pir", title: "Pirelli" },
        { id: "God", title: "Goodyear" },
        { id: "Dun", title: "Dunloop" },
      ],
      selectedTyres: [],
      TyreDetailList: [
        {
          id: "Con",
          itemId: "Con1",
          title: "Continental Eco",
          description: "Sport",
          price: 999.99,
          image: tyre,
        },
        {
          id: "Han",
          itemId: "Han1",
          title: "Hankook",
          description: "Sport",
          price: 999.99,
          image: tyre,
        },
        {
          id: "Mic",
          itemId: "Mic1",
          title: "Michelin Pilot Sport 4",
          description: "Sport",
          price: 1099.99,
          image: tyre,
        },
        {
          id: "Pir",
          itemId: "Pir1",
          title: "Pirelli P Zero",
          description: "Sport",
          price: 1199.99,
          image: tyre,
        },
        {
          id: "God",
          itemId: "God1",
          title: "Goodyear Eagle F1 Asymmetric 3",
          description: "Sport",
          price: 1299.99,
          image: tyre,
        },
        {
          id: "Dun",
          itemId: "Dun1",
          title: "Dunlop SP Sport Maxx GT",
          description: "Sport",
          price: 1399.99,
          image: tyre,
        },
        {
          id: "Con",
          itemId: "Con2",
          title: "Continental ContiSportContact 5",
          description: "Sport",
          price: 1499.99,
          image: tyre,
        },
        {
          id: "Han",
          itemId: "Han2",
          title: "Hankook Ventus S1 evo3",
          description: "Sport",
          price: 1599.99,
          image: tyre,
        },
        {
          id: "Mic",
          itemId: "Mic2",
          title: "Michelin Pilot Sport 4 S",
          description: "Sport",
          price: 1699.99,
          image: tyre,
        },
        {
          id: "Pir",
          itemId: "Pir2",
          title: "Pirelli Cinturato P7 All Season Plus",
          description: "Sport",
          price: 1799.99,
          image: tyre,
        },
        {
          id: "God",
          itemId: "God2",
          title: "Goodyear Eagle F1 Asymmetric 3 ROF",
          description: "Sport",
          price: 1899.99,
          image: tyre,
        },
        {
          id: "Dun",
          itemId: "Dun2",
          title: "Dunlop Direzza DZ102",
          description: "Sport",
          price: 1999.99,
          image: tyre,
        },
        {
          id: "Con",
          itemId: "Con3",
          title: "Continental ContiSportContact 5P",
          description: "Sport",
          price: 2099.99,
          image: tyre,
        },
        {
          id: "Han",
          itemId: "Han3",
          title: "Hankook Ventus S1 evo3 K110",
          description: "Sport",
          price: 2199.99,
          image: tyre,
        },
        {
          id: "Mic",
          itemId: "Mic3",
          title: "Michelin Pilot Sport 4 S K1",
          description: "Sport",
          price: 2299.99,
          image: tyre,
        },
        {
          id: "Pir",
          itemId: "Pir3",
          title: "Pirelli Cinturato P7 All Season Plus Seal Inside",
          description: "Sport",
          price: 2399.99,
          image: tyre,
        },
        {
          id: "God",
          itemId: "God3",
          title: "Goodyear Eagle F1 Asymmetric 3 ROF K1",
          description: "Sport",
          price: 2499.99,
          image: tyre,
        },
        {
          id: "Dun",
          itemId: "Dun3",
          title: "Dunlop Direzza DZ102 K1",
          description: "Sport",
          price: 2599.99,
          image: tyre,
        },
        {
          id: "Con",
          itemId: "Con4",
          title: "Continental ContiSportContact 5P K1",
          description: "Sport",
          price: 2699.99,
          image: tyre,
        },
        {
          id: "Han",
          itemId: "Han4",
          title: "Hankook Ventus S1 evo3 K110 Seal Inside",
          description: "Sport",
          price: 2799.99,
          image: tyre,
        },
        {
          id: "Mic",
          itemId: "Mic4",
          title: "Michelin Pilot Sport 4 S K1 Seal Inside",
          description: "Sport",
          price: 2899.99,
          image: tyre,
        },
        {
          id: "Pir",
          itemId: "Pir4",
          title: "Pirelli Cinturato P7 All Season Plus Seal Inside K1",
          description: "Sport",
          price: 2999.99,
          image: tyre,
        },
        {
          id: "God",
          itemId: "God4",
          title: "Goodyear Eagle F1 Asymmetric 3 ROF K1 Seal Inside",
          description: "Sport",
          price: 3099.99,
          image: tyre,
        },
        {
          id: "Dun",
          itemId: "Dun4",
          title: "Dunlop Direzza DZ102 K1 Seal Inside",
          description: "Sport",
          price: 3199.99,
          image: tyre,
        },
        {
          id: "Con",
          itemId: "Con5",
          title: "Continental ContiSportContact 5P K1 Seal Inside",
          description: "Sport",
          price: 3299.99,
          image: tyre,
        },
        {
          id: "Han",
          itemId: "Han5",
          title: "Hankook Ventus S1 evo3 K110 Seal Inside K1",
          description: "Sport",
          price: 3399.99,
          image: tyre,
        },
        {
          id: "Mic",
          itemId: "Mic5",
          title: "Michelin Pilot Sport 4 S K1 Seal Inside K1",
          description: "Sport",
          price: 3499.99,
          image: tyre,
        },
        {
          id: "Pir",
          itemId: "Pir5",
          title: "Pirelli Cinturato P7 All Season Plus Seal Inside K1 K2",
          description: "Sport",
          price: 3599.99,
          image: tyre,
        },
        {
          id: "God",
          itemId: "God5",
          title: "Goodyear Eagle F1 Asymmetric 3 ROF K1 Seal Inside K1 K2",
          description: "Sport",
          price: 3699.99,
          image: tyre,
        },
        {
          id: "Dun",
          itemId: "Dun5",
          title: "Dunlop Direzza DZ102 K1 Seal Inside K1 K2",
          description: "Sport",
          price: 3799.99,
          image: tyre,
        },
        {
          id: "Con",
          itemId: "Con6",
          title: "Continental ContiSportContact 5P K1 Seal Inside K1 K2",
          description: "Sport",
          price: 3899.99,
          image: tyre,
        },
      ],
    };
  },
};
</script>
