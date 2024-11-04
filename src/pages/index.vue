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
          <h1 class="font-weight-black text-capitalize">Your One Stop Tyre Service Center</h1>
          <p class="text-grey font-weight-bold font-italic text-subtitle-1 text-capitalize">Automotive tyre services and
            maintenance that keeps your vehicle driving</p>
        </div>
      </v-col>
      <v-col cols="9" class="ma-0 px-0 d-none d-md-flex">
        <div>
          <h1 class="font-weight-black text-capitalize">Your One Stop Tyre Service Center</h1>
          <p class="text-grey font-weight-bold font-italic text-subtitle-1 text-capitalize">Automotive tyre services and
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
        <h2 class="font-weight-bold text-capitalize">A Selection of Tyres</h2>
      </v-col>
      <v-col cols="8" class="ma-0 px-0 d-none d-sm-flex">
        <h2 class="font-weight-bold text-capitalize">A Selection of Tyres</h2>
      </v-col>
      <v-col cols="3" class="ma-0 px-0 d-none d-sm-flex">
        <v-spacer />
        <RouterLink to="/tyres"><v-btn color="#ff3131">More Tyres ></v-btn></RouterLink>
      </v-col>
    </v-row>
    <v-row align="center" class="px-8">
      <v-col cols="12">
        <v-slide-group show-arrows>
          <v-slide-item v-for="(item, i) in tyreDetailList" :key="i">
            <v-card height="400" width="250" class="mx-2" variant="outlined">
              <v-img height="200" :src="item.image" :alt="item.title"></v-img>
              <v-card-title class="text-h7 text-wrap">{{
                item.title
                }}</v-card-title>
              <v-card-text>
                <div>{{ item.description }}</div>
                <div class="text-h6 mt-2">RM {{ item.price.toFixed(2) }}</div>
              </v-card-text>
            </v-card>
          </v-slide-item>
        </v-slide-group>
      </v-col>
    </v-row>
    <v-row class="d-flex d-sm-none">
      <v-col cols="12" align="center">
        <RouterLink to="/tyres"><v-btn color="#ff3131">More Tyres ></v-btn></RouterLink>
      </v-col>
    </v-row>
    <v-divider class="mx-5 my-7 border-md border-opacity-50 rounded-sm"></v-divider>
    <v-row class="mt-0 px-8" justify="space-between">
      <v-col cols="12" class="ma-0 px-0 d-flex d-sm-none">
        <h2 class="font-weight-bold text-capitalize">Tyre Services</h2>
      </v-col>
      <v-col cols="7" class="ma-0 px-0 d-none d-sm-flex">
        <h2 class="font-weight-bold text-capitalize">Tyre Services</h2>
      </v-col>
      <v-col cols="4" class="ma-0 px-0 d-none d-sm-flex">
        <v-spacer />
        <RouterLink to="/services"><v-btn color="#ff3131">More Services ></v-btn></RouterLink>
      </v-col>
    </v-row>
    <v-row align="center" justify="center" class="px-8">
      <v-col v-for="(cardData, index) in cardDataList" :key="index" cols="12" md="4" align="center">
        <v-card class="mx-auto" color="surface-variant" :image="cardData.imageSrc" height="350"
          :elevation="cardData.elevation" max-width="450" align="center" justify="center"
          v-click-to-expand="{ cardData: cardData }">
          <div class="imageContainer">
            <Transition name="fade">
              <div key="1" v-if="cardData.showAdditionalText">
                <div class="imageOpacity">
                  <v-row>
                    <v-col>
                      <div class="imageContainerTitle">{{ cardData.title }}</div>
                      <div class="mx-5">{{ cardData.additionalText }}</div>
                    </v-col>
                  </v-row>
                </div>
              </div>
              <div key="2" v-else class="mx-3">
                <div class="imageContainerTitle">{{ cardData.title }}</div>
              </div>
            </Transition>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="d-flex d-sm-none">
      <v-col cols="12" align="center">
        <RouterLink to="/services"><v-btn color="#ff3131">More Services ></v-btn></RouterLink>
      </v-col>
    </v-row>
    <v-divider class="mx-5 my-7 border-md border-opacity-50 rounded-sm"></v-divider>
    <v-row class="mt-0 px-8" justify="space-between">
      <v-col cols="12" class="ma-0 px-0">
        <h2 class="font-weight-bold text-capitalize">Why Choose Us</h2>
      </v-col>
    </v-row>
    <v-row align="center" justify="center" class="px-8">
      <v-col align="center" v-for="(item, i) in tayarProStrengths" cols="12" sm="6" md="3" class="ma-0 px-0">
        <v-card align="center" class="border-0 mx-3" elevation="0" max-width="350" min-width="200" height="450">
          <v-img :src="item.src" height="200" class="ma-3"></v-img>
          <v-divider class="mx-2 my-3 border-sm border-opacity-50"></v-divider>
          <v-card-title class="mx-3">{{ item.title }}</v-card-title>
          <v-card-text class="mx-3 pb-0">{{ item.desc }}</v-card-text>
          <v-card-text v-if="item.cert.length > 0" class="text-grey font-italic mx-3">{{ item.cert }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-divider class="mx-5 my-7 border-md border-opacity-50 rounded-sm"></v-divider>
    <v-row class="my-5 px-8" justify="space-between">
      <v-col cols="12" md="6" class="ma-0 px-0" align="left">
        <h2 class="font-weight-bold text-capitalize">Reach Out To Us!</h2>
      </v-col>
      <v-col cols="12" md="6" class="ma-0 px-0" align="center">
        <RouterLink to="/location"><v-btn color="#ff3131" class="ma-2" width="200"><v-icon
              class="mr-1">mdi-map-marker</v-icon>
            Location ></v-btn>
        </RouterLink>
        <RouterLink to="/contact-us"><v-btn color="#ff3131" class="ma-2" width="200"><v-icon
              class="mr-1">mdi-phone-incoming</v-icon>
            Contact Us
            ></v-btn></RouterLink>
      </v-col>
    </v-row>
    <v-divider class="mx-5 my-7 border-md border-opacity-50 rounded-sm"></v-divider>
    <v-row>
      <v-col>
        <v-img src="@/assets/original_logo_dark.png"></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.fade-enter-active {
  transition: opacity 0.5s ease;
}

.fade-leave-active {
  opacity: 0;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.imageContainer {
  display: flex;
  height: 350px;
  color: rgb(225, 225, 225);
  text-shadow: 1px 1px 2px black;
  justify-content: center;
  align-items: center;
}

.imageOpacity {
  display: flex;
  height: 350px;
  width: auto;
  color: rgb(225, 225, 225);
  justify-content: center;
  align-items: center;
  background-color: #FF3131;
  opacity: 0.8;
}

.imageContainerTitle {
  color: white;
  font-size: 30px;
  font-weight: 450;
}
</style>

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
        { src: 'http://tayar.pro:5200/static/images/tayarpro/home-banner-01.webp', alt: 'Elegant TayarPro banner with general description and opening times.' },
        { src: 'http://tayar.pro:5200/static/images/tayarpro/home-banner-02.webp', alt: 'TayarPro banner promoting services and showing addresses.' }
      ],
      cardDataList: [
        {
          imageSrc: "http://tayar.pro:5200/static/images/tayarpro/services-tyre-install-01.jpg",
          title: "Tyre Installation",
          elevation: 2,
          showAdditionalText: false,
          additionalText: "Tyre installation services involve professionally fitting new tires onto a vehicle's wheels. This includes removing old tires, cleaning wheels, mounting new tires, balancing them, and checking torque. These services are crucial for vehicle safety, performance, and tire longevity.",
        },
        {
          imageSrc: "http://tayar.pro:5200/static/images/tayarpro/services-tyre-tuning-01.jpg",
          title: "Tyre Tuning",
          elevation: 2,
          showAdditionalText: false,
          additionalText: "Tyre tuning services involve optimizing a vehicle's tires for performance and efficiency. This can include adjusting tire pressure, alignment, and rotation. By ensuring that tires are properly tuned, drivers can improve fuel economy, enhance handling, and extend tire life.",
        },
        {
          imageSrc: "http://tayar.pro:5200/static/images/tayarpro/services-tyre-consult-01.jpg",
          title: "Tyre Consulting",
          elevation: 2,
          showAdditionalText: false,
          additionalText: "Tyre consultation services offer expert advice on tire selection, maintenance, and performance. Experienced professionals can help customers choose the right tires for their specific needs, provide guidance on tire care and maintenance practices, and offer recommendations for improving tire performance and fuel efficiency.",
        }
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
        },
        {
          id: "Pir",
          itemId: "Pir3",
          title: "Pirelli Cinturato P7 All Season Plus Seal Inside",
          description: "Sport",
          price: 2399.99,
          image: tyre_image,
        },
        {
          id: "God",
          itemId: "God3",
          title: "Goodyear Eagle F1 Asymmetric 3 ROF K1",
          description: "Sport",
          price: 2499.99,
          image: tyre_image,
        },
        {
          id: "Dun",
          itemId: "Dun3",
          title: "Dunlop Direzza DZ102 K1",
          description: "Sport",
          price: 2599.99,
          image: tyre_image,
        },
        {
          id: "Con",
          itemId: "Con4",
          title: "Continental ContiSportContact 5P K1",
          description: "Sport",
          price: 2699.99,
          image: tyre_image,
        }],
      /* https://www.svgrepo.com/ */
      tayarProStrengths: [
        {
          src: "http://tayar.pro:5200/static/images/tayarpro/why-us-certificate-svgrepo-com.svg",
          title: "Certified",
          desc: "Tires are guaranteed to meet or exceed industry standards.",
          cert: ''
        },
        {
          src: "http://tayar.pro:5200/static/images/tayarpro/why-us-warranty-security-ecommerce-svgrepo-com.svg",
          title: "5-Year Warranty",
          desc: "Enjoy peace of mind with a comprehensive warranty.",
          cert: ''
        },
        {
          src: "http://tayar.pro:5200/static/images/tayarpro/why-us-lifter-car-repair-svgrepo-com.svg",
          title: "Quality Service",
          desc: "Receive expert care and attention from our skilled technicians.",
          cert: 'ISO 9001:2015 (Pending)'
        },
        {
          src: "http://tayar.pro:5200/static/images/tayarpro/why-us-robot-futurist-svgrepo-com.svg",
          title: "AI Assistant",
          desc: "Benefit from cutting-edge and secure technology to streamline your tire servicing experience.",
          cert: 'ISO 27001:2013 (Pending)'
        }
      ]
    }
  }
}

</script>
