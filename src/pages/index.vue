<template>
  <v-container fluid class="ma-auto pa-5" max-width="1000">
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
        <RouterLink to="/products"><v-btn color="#ff3131">More Tyres ></v-btn></RouterLink>
      </v-col>
    </v-row>
    <v-row align="center" class="px-0">
      <v-col cols="12">
        <v-slide-group ref="slideGroup" show-arrows :selected-class="''" class="slide-group" :touch="{
          start: true,
          end: true,
          left: true,
          right: true
        }" :mobile-breakpoint="0" @touchmove.prevent="preventParentScroll">
          <v-slide-item v-for="tyre in tyreItems" :key="tyre.itemid">
            <div class="my-2">
              <TyreItem :tyre="tyre" @flip-card="flipTyreCard" />
            </div>
          </v-slide-item>
        </v-slide-group>
      </v-col>
    </v-row>
    <v-row class="d-flex d-sm-none">
      <v-col cols="12" align="center">
        <RouterLink to="/products"><v-btn color="#ff3131">More Tyres ></v-btn></RouterLink>
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
        <v-card class="mx-auto card-hover" color="surface-variant" :image="cardData.imageSrc" height="350"
          :elevation="cardData.elevation" max-width="450" align="center" justify="center"
          @click="toggleAdditionalText(index)">
          <div class="imageContainer">
            <Transition name="fade">
              <div key="1" v-if="cardData.showAdditionalText">
                <div class="imageOpacity">
                  <v-row>
                    <v-col>
                      <div class="imageContainerTitle">{{ cardData.title }}</div>
                      <div class="mx-5 additional-text">{{ cardData.additionalText }}</div>
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
      <v-col align="center" v-for="(item, i) in tayarProStrengths" :key="i" cols="12" sm="6" md="3" class="ma-0 px-0">
        <v-card align="center" class="border-0 mx-3" elevation="0" max-width="350" min-width="200" height="400">
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
        <v-img :src="logoImage"></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
/* Consolidated slide group styles */
:deep(.v-slide-group__prev),
:deep(.v-slide-group__next) {
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1) !important;
  }
}

:deep(.v-slide-group__container) {
  scroll-behavior: smooth;
  scroll-snap-type: x proximity;
  overflow-x: auto !important;
  scrollbar-width: none;
  -ms-overflow-style: none;
  cursor: grab;
  -webkit-user-select: none;
  user-select: none;
  -webkit-overflow-scrolling: touch;
  transition: cursor 0.2s ease;

  &:active {
    cursor: grabbing;
  }

  &::-webkit-scrollbar {
    display: none;
  }
}

:deep(.v-slide-group__content) {
  gap: 16px;
  display: flex;
  flex-wrap: nowrap;
  transition: transform 0.2s ease-in-out;
  touch-action: pan-x pan-y;
}

:deep(.v-slide-item) {
  flex: 0 0 auto;
  width: 300px;
  user-select: none;
  scroll-snap-align: start;
  pointer-events: none;

  &>* {
    pointer-events: auto;
  }
}

/* Transition effects */
.fade-enter-active {
  transition: opacity 0.5s ease;
}

.fade-leave-active,
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Image container styles */
.imageContainer {
  display: flex;
  height: 350px;
  color: rgb(225, 225, 225);
  text-shadow: 1px 1px 2px black;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.imageOpacity {
  @extend .imageContainer;
  width: 100%;
  background-color: rgba(255, 49, 49, 0.9);
  transition: all 0.3s ease;
}

.imageContainerTitle {
  color: white;
  font-size: 30px;
  font-weight: 450;
  margin-bottom: 16px;
}

.additional-text {
  font-size: 16px;
  line-height: 1.5;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

/* Card hover effect */
.card-hover {
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    cursor: pointer;
  }
}

/* Carousel control */
.v-carousel__controls {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: none;
  pointer-events: none;
}
</style>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue'
import Carousel from '@/components/Carousel.vue'
import TyreItem from '@/components/TyreItem.vue'
import homeBanner01 from '@/assets/images/home/home-banner-01.png'
import homeBanner02 from '@/assets/images/home/home-banner-02.png'
import tyreInstall from '@/assets/images/home/tyre-install-01.jpg'
import tyreTuning from '@/assets/images/home/tyre-tuning-01.jpg'
import tyreConsult from '@/assets/images/home/tyre-consult-01.jpg'
import certificateIcon from '@/assets/images/home/certificate-svgrepo-com.svg'
import warrantyIcon from '@/assets/images/home/warranty-security-ecommerce-svgrepo-com.svg'
import lifterIcon from '@/assets/images/home/lifter-car-repair-svgrepo-com.svg'
import robotIcon from '@/assets/images/home/robot-futurist-svgrepo-com.svg'
import logoImage from '@/assets/original_logo_dark.png'
import axios from 'axios'

// Types
interface HomeImage {
  src: string
  alt: string
}

interface CardData {
  imageSrc: string
  title: string
  elevation: number
  showAdditionalText: boolean
  additionalText: string
}

interface TayarProStrength {
  src: string
  title: string
  desc: string
  cert: string
}

interface Tyre {
  itemid: number
  tyreid: number
  description: string
  unitprice: number
  cartype: string
  tyresize: string
  speedindex: string
  loadindex: string
  flipped: boolean
  productid?: number
  brandid?: number
}

// Constants
const SCROLL_CONFIG = {
  sensitivity: 0.8,
  smoothing: 0.15,
  maxSpeed: 10,
  threshold: 3,
  arrowScrollAmount: 1500,
}

// Refs
const slideGroup = ref<any>(null)
const slideGroupRef = ref<HTMLElement | null>(null)

const tyreItems = ref<Tyre[]>([])
const homeImages = ref<HomeImage[]>([
  {
    src: homeBanner01,
    alt: 'Elegant TayarPro banner with general description and opening times.'
  },
  {
    src: homeBanner02,
    alt: 'TayarPro banner promoting services and showing addresses.'
  }
])

const cardDataList = ref<CardData[]>([
  {
    imageSrc: tyreInstall,
    title: "Tyre Installation",
    elevation: 2,
    showAdditionalText: false,
    additionalText: "Tyre installation services involve professionally fitting new tires onto a vehicle's wheels. This includes removing old tires, cleaning wheels, mounting new tires, balancing them, and checking torque. These services are crucial for vehicle safety, performance, and tire longevity.",
  },
  {
    imageSrc: tyreTuning,
    title: "Tyre Tuning",
    elevation: 2,
    showAdditionalText: false,
    additionalText: "Tyre tuning services involve optimizing a vehicle's tires for performance and efficiency. This can include adjusting tire pressure, alignment, and rotation. By ensuring that tires are properly tuned, drivers can improve fuel economy, enhance handling, and extend tire life.",
  },
  {
    imageSrc: tyreConsult,
    title: "Tyre Consulting",
    elevation: 2,
    showAdditionalText: false,
    additionalText: "Tyre consultation services offer expert advice on tire selection, maintenance, and performance. Experienced professionals can help customers choose the right tires for their specific needs, provide guidance on tire care and maintenance practices, and offer recommendations for improving tire performance and fuel efficiency.",
  }
])

const tayarProStrengths = ref<TayarProStrength[]>([
  {
    src: certificateIcon,
    title: "Certified",
    desc: "Tires are guaranteed to meet or exceed industry standards.",
    cert: ''
  },
  {
    src: warrantyIcon,
    title: "5-Year Warranty",
    desc: "Enjoy peace of mind with a comprehensive warranty.",
    cert: ''
  },
  {
    src: lifterIcon,
    title: "Quality Service",
    desc: "Receive expert care and attention from our skilled technicians.",
    cert: 'ISO 9001:2015 (Pending)'
  },
  {
    src: robotIcon,
    title: "AI Assistant",
    desc: "Benefit from cutting-edge and secure technology to streamline your tire servicing experience.",
    cert: 'ISO 27001:2013 (Pending)'
  }
])

// State
const dragState = reactive({
  isDragging: false,
  startX: 0,
  scrollLeft: 0,
  lastX: 0,
})
// Animation Frame ID for scroll handling
let animationFrameId: number | null = null;

// Scroll and Slide Control Functions
const customizeArrowScroll = () => {
  if (!slideGroup.value) return;

  const container = slideGroup.value.$el.querySelector('.v-slide-group__container');
  const prevButton = slideGroup.value.$el.querySelector('.v-slide-group__prev');
  const nextButton = slideGroup.value.$el.querySelector('.v-slide-group__next');

  if (prevButton && nextButton && container) {
    const clone1 = prevButton.cloneNode(true);
    const clone2 = nextButton.cloneNode(true);
    prevButton.parentNode?.replaceChild(clone1, prevButton);
    nextButton.parentNode?.replaceChild(clone2, nextButton);

    clone1.addEventListener('click', () => {
      container.scrollTo({
        left: container.scrollLeft - SCROLL_CONFIG.arrowScrollAmount,
        behavior: 'smooth'
      });
    });

    clone2.addEventListener('click', () => {
      container.scrollTo({
        left: container.scrollLeft + SCROLL_CONFIG.arrowScrollAmount,
        behavior: 'smooth'
      });
    });
  }
};

// Mouse Event Handlers
const handleMouseDown = (e: MouseEvent) => {
  if (!slideGroupRef.value) return;

  dragState.isDragging = true;
  dragState.startX = e.pageX;
  dragState.lastX = e.pageX;
  dragState.scrollLeft = slideGroupRef.value.scrollLeft;

  slideGroupRef.value.style.cursor = 'grabbing';
  slideGroupRef.value.style.userSelect = 'none';

  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
  }
};

const handleMouseMove = (e: MouseEvent) => {
  if (!dragState.isDragging || !slideGroupRef.value) return;

  e.preventDefault();
  const currentX = e.pageX;
  const movementX = currentX - dragState.lastX;
  dragState.lastX = currentX;

  if (Math.abs(movementX) > SCROLL_CONFIG.threshold) {
    const scrollDelta = -movementX * SCROLL_CONFIG.sensitivity;
    const limitedDelta = Math.min(
      Math.max(scrollDelta, -SCROLL_CONFIG.maxSpeed),
      SCROLL_CONFIG.maxSpeed
    );

    const smoothScroll = () => {
      if (!slideGroupRef.value || !dragState.isDragging) return;

      const currentScroll = slideGroupRef.value.scrollLeft;
      const targetScroll = currentScroll + limitedDelta;
      const newScroll = currentScroll + (targetScroll - currentScroll) * SCROLL_CONFIG.smoothing;

      slideGroupRef.value.scrollLeft = newScroll;

      if (dragState.isDragging) {
        animationFrameId = requestAnimationFrame(smoothScroll);
      }
    };

    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
    }
    animationFrameId = requestAnimationFrame(smoothScroll);
  }
};

const handleMouseUp = () => {
  dragState.isDragging = false;
  if (slideGroupRef.value) {
    slideGroupRef.value.style.cursor = 'grab';
    slideGroupRef.value.style.removeProperty('user-select');
  }

  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
};

const handleMouseLeave = () => {
  if (dragState.isDragging) {
    handleMouseUp();
  }
};

// Tyre-related Functions
const flipTyreCard = (tyre: Tyre) => {
  const index = tyreItems.value.findIndex(
    (item: Tyre) => item.itemid === tyre.itemid
  );
  if (index !== -1) {
    tyreItems.value[index].flipped = !tyreItems.value[index].flipped;
  }
};

const fetchRandomTyres = async () => {
  try {
    const response = await axios.get('/api/get_all_tyres');
    const allTyres = response.data;
    const randomTyres = allTyres
      .sort(() => 0.5 - Math.random())
      .slice(0, 7)
      .map((tyre: Tyre) => ({
        ...tyre,
        flipped: false
      }));
    tyreItems.value = randomTyres;
  } catch (error) {
    console.error('Error fetching tyre data:', error);
  }
};

// Utility Functions
const preventParentScroll = (event: TouchEvent) => {
  event.stopPropagation();
};

const toggleAdditionalText = (index: number) => {
  cardDataList.value[index].showAdditionalText = !cardDataList.value[index].showAdditionalText;
};

// Lifecycle Hooks
onMounted(async () => {
  await fetchRandomTyres();
  await nextTick();

  slideGroupRef.value = document.querySelector('.v-slide-group__container');

  if (slideGroupRef.value) {
    slideGroupRef.value.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    slideGroupRef.value.addEventListener('mouseleave', handleMouseLeave);
    slideGroupRef.value.addEventListener('dragstart', (e) => e.preventDefault());
  }

  customizeArrowScroll();
});

onUnmounted(() => {
  if (slideGroupRef.value) {
    slideGroupRef.value.removeEventListener('mousedown', handleMouseDown);
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  }
});
</script>