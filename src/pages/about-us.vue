<template>
  <v-container max-width="1200">
    <v-container class="my-12">
      <v-row class="d-flex align-stretch">
        <!-- Image Column -->
        <v-col cols="12" sm="12" md="5">
          <v-img
            src="https://t3.ftcdn.net/jpg/08/01/05/86/360_F_801058688_GOSu2veqaKIlo1RG5REMlCOiN9PZobk9.jpg"
            height="100%"
            cover
          ></v-img>
        </v-col>

        <!-- Text Column -->
        <v-col cols="12" sm="12" md="7">
          <p
            style="
              font-size: 35px;
              font-family: system-ui, -apple-system, BlinkMacSystemFont,
                'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
                'Helvetica Neue', sans-serif;
              margin-bottom: 20px;
            "
          >
            Our <span class="highlight">Company Overview</span>
          </p>
          <p style="font-size: 20px">
            Welcome to TayarPro, your trusted partner for all things tyres! At
            TayarPro, we pride ourselves on delivering exceptional service,
            quality products, and expert advice to ensure your vehicle runs
            smoothly and safely. With a wide selection of tyres from top brands
            and a team of skilled professionals, we are dedicated to meeting all
            your tyre needs, from purchasing new tyres to routine maintenance
            and emergency repairs. Our commitment to customer satisfaction
            drives everything we do, making TayarPro the go-to destination for
            drivers who value safety, reliability, and top-notch service.
            Whether you're hitting the road for a long journey or navigating
            daily commutes, trust TayarPro to keep you rolling confidently.
          </p>
        </v-col>
      </v-row>
    </v-container>
    <v-divider></v-divider>
    <v-container>
      <h1 class="text-center mb-12">
        Our
        <span style="border-bottom: 3px solid red; padding-bottom: 5px"
          >Partners</span
        >
      </h1>
      <v-carousel
        v-model="currentSlide"
        hide-delimiters
        height="200"
        show-arrows="hover"
      >
        <v-carousel-item v-for="(chunk, index) in chunkedLogos" :key="index">
          <v-row align="center" justify="space-between">
            <v-col
              v-for="(logo, i) in chunk"
              :key="i"
              cols="3"
              class="d-flex justify-center"
            >
              <v-img
                :src="logo.src"
                :alt="logo.alt"
                contain
                max-height="100"
                class="logo-image"
              ></v-img>
            </v-col>
          </v-row>
        </v-carousel-item>
      </v-carousel>
    </v-container>
    <v-divider></v-divider>
    <v-container fluid class="stats-container pa-0">
      <v-row class="text-white stats-background">
        <v-col
          v-for="(stat, index) in stats"
          :key="index"
          cols="12"
          sm="3"
          class="d-flex align-center justify-center py-8"
        >
          <div class="text-center">
            <v-icon
              :icon="stat.icon"
              size="x-large"
              color="white"
              class="mb-2"
            ></v-icon>

            <div class="text-h3 font-weight-bold mb-1">
              <span :id="'stat-' + index">{{ animatedValues[index] }}</span>
            </div>

            <div class="text-subtitle-1">
              {{ stat.label }}
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import anime from "animejs";

export default {
  setup() {
    const logos = [
      {
        src: "https://autohaus.my/wp-content/uploads/2018/04/Logo-Website-03-300x300.png",
        alt: "Logo 1",
      },
      {
        src: "https://autohaus.my/wp-content/uploads/2018/04/Logo-Website-11-300x300.png",
        alt: "Logo 2",
      },
      {
        src: "https://autohaus.my/wp-content/uploads/2018/04/Logo-Website-03-300x300.png",
        alt: "Logo 3",
      },
      {
        src: "https://autohaus.my/wp-content/uploads/2018/04/Logo-Website-15-300x300.png",
        alt: "Logo 4",
      },
      {
        src: "https://autohaus.my/wp-content/uploads/2018/04/Logo-Website-03-300x300.png",
        alt: "Logo 5",
      },
      {
        src: "https://autohaus.my/wp-content/uploads/2018/04/Logo-Website-11-300x300.png",
        alt: "Logo 6",
      },
      {
        src: "https://autohaus.my/wp-content/uploads/2018/04/Logo-Website-03-300x300.png",
        alt: "Logo 7",
      },
      {
        src: "https://autohaus.my/wp-content/uploads/2018/04/Logo-Website-15-300x300.png",
        alt: "Logo 8",
      },
    ];

    const stats = [
      { icon: "mdi-account", value: 1000, label: "Users" },
      { icon: "mdi-star", value: 500, label: "Reviews" },
      { icon: "mdi-heart", value: 300, label: "Likes" },
      { icon: "mdi-share", value: 200, label: "Shares" },
    ];

    const currentSlide = ref(0);
    const animatedValues = ref(stats.map(() => 0));

    const chunkedLogos = computed(() => {
      const chunkSize = 4;
      const chunks = [];
      for (let i = 0; i < logos.length; i += chunkSize) {
        chunks.push(logos.slice(i, i + chunkSize));
      }
      return chunks;
    });

    onMounted(() => {
      document.title = "About Us";
      stats.forEach((stat, index) => {
        anime({
          targets: `#stat-${index}`,
          innerHTML: [0, stat.value],
          easing: "linear",
          round: 1,
          duration: 2000,
          update: (anim) => {
            animatedValues.value[index] = anim.animations[0].currentValue;
          },
        });
      });
    });

    return {
      logos,
      stats,
      currentSlide,
      chunkedLogos,
      animatedValues,
    };
  },
};
</script>

<style scoped>
.logo-image {
  max-height: 100px;
}

.no-arrows .v-carousel__controls {
  display: none !important;
}

.stats-background {
  background: url("https://t3.ftcdn.net/jpg/08/01/05/86/360_F_801058688_GOSu2veqaKIlo1RG5REMlCOiN9PZobk9.jpg")
    no-repeat center center;
  background-size: cover;
}

.highlight {
  border-bottom: 3px solid red;
  padding-bottom: 5px;
  font-weight: bold;
}
</style>
