<template>
  <v-container fluid class="ma-0 pa-0">
    <v-row max-width="600">
      <v-col cols="12" class="ma-0 px-0">
        <Carousel :images="homeImages" />
      </v-col>
    </v-row>
    <v-divider class="mx-5 my-7 border-md border-opacity-50 rounded-sm"></v-divider>
    <v-row class="mt-0 px-8" justify="space-between">
      <v-col cols="12" class="ma-0 px-0 d-flex d-md-none">
        <div>
        <h2 class="font-weight-black text-capitalize">Your One Stop Tyre Service Center</h2>
        <p class="text-grey font-weight-bold font-italic text-subtitle-2 text-capitalize">Automotive tyre services and
          maintenance that keeps your vehicle driving</p>
        </div>
      </v-col>
      <v-col cols="9" class="ma-0 px-0 d-none d-md-flex">
        <div>
        <h2 class="font-weight-black text-capitalize">Your One Stop Tyre Service Center</h2>
        <p class="text-grey font-weight-bold font-italic text-subtitle-2 text-capitalize">Automotive tyre services and
          maintenance that keeps your vehicle driving</p>
        </div>
      </v-col>
      <v-col cols="2" class="ma-0 px-0 d-none d-md-flex">
        <v-spacer />
        <RouterLink to="/about-us"><v-btn color="#ff3131">Know More ></v-btn></RouterLink>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col cols="12" sm="6" md="5">
        <v-img src="@/assets/images/home/home-placeholder-01.jpg"></v-img>
        <div class="d-none d-sm-flex d-md-none justify-center align-center mt-9">
        <RouterLink to="/about-us"><v-btn color="#ff3131">Know More ></v-btn></RouterLink>
      </div>
      </v-col>
      <v-col cols="12" sm="6" md="7">
        <div class="intro-text text-justify px-8">
          <b>TayarPro</b>, a reputable tire shop in Petaling Jaya, Selangor, offers a comprehensive range of tire
          services including sales, installation, repair, alignment, and balancing. With their commitment to quality and
          customer satisfaction, <b>TayarPro</b> is a reliable choice for all your tire-related needs.<br><br>

          <b>TayarPro</b> is more than just a tire shop; it's your partner in ensuring a safe and comfortable driving
          experience. Our team of skilled technicians is dedicated to providing top-notch service and personalized
          advice. Visit us today to discover the <b>TayarPro</b> difference and experience the peace of mind that comes
          with well-maintained tires.
        </div>
        <div class="d-flex d-sm-none justify-center align-center mt-5">
        <RouterLink to="/about-us"><v-btn color="#ff3131">Know More ></v-btn></RouterLink>
      </div>
      </v-col>
    </v-row>
    <v-divider class="mx-5 my-7 border-md border-opacity-50 rounded-sm"></v-divider>
    <v-row class="mt-0 px-8" justify="space-between">
      <v-col cols="12" class="ma-0 px-0 d-flex d-sm-none">
        <h3 class="font-weight-bold text-capitalize">A Selection of Tyres</h3>
      </v-col>
      <v-col cols="8" class="ma-0 px-0 d-none d-sm-flex">
        <h3 class="font-weight-bold text-capitalize">A Selection of Tyres</h3>
      </v-col>
      <v-col cols="3" class="ma-0 px-0 d-none d-sm-flex">
        <v-spacer />
        <RouterLink to="/tyres"><v-btn color="#ff3131">More Tyres ></v-btn></RouterLink>
      </v-col>
    </v-row>
    <v-row align="center" class="px-8">
      <v-col v-for="tyre in tyreDetailList" :key="tyre.itemId" cols="12" sm="6" md="4">
        <!-- Need to make a component for these -->
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
    <v-row class="d-flex d-sm-none">
      <v-col cols="12" align="center">
        <RouterLink to="/tyres"><v-btn color="#ff3131">More Tyres ></v-btn></RouterLink>
      </v-col>
    </v-row>
    <v-divider class="mx-5 my-7 border-md border-opacity-50 rounded-sm"></v-divider>
  </v-container>
</template>

<script>
import Carousel from '@/components/Carousel.vue';
import tyre_image from '@/assets/tyre.jpg'

export default {
  components: {
    Carousel
  },
  data() {
    return {
      homeImages: [
        { src: 'src/assets/images/home/home-banner-01.png', alt: 'Elegant TayarPro banner with general description and opening times.' },
        { src: 'src/assets/images/home/home-banner-02.png', alt: 'TayarPro banner promoting services and showing addresses.' }
      ],
      tyreDetailList: [
        {
          id: "Con",
          itemId: "Con1",
          title: "Continental Eco",
          description: "Sport",
          price: 999.99,
          image: tyre_image,
        },
        {
          id: "Han",
          itemId: "Han1",
          title: "Hankook",
          description: "Sport",
          price: 999.99,
          image: tyre_image,
        },
        {
          id: "Mic",
          itemId: "Mic1",
          title: "Michelin Pilot Sport 4",
          description: "Sport",
          price: 1099.99,
          image: tyre_image,
        }]
    }
  }
}

</script>
