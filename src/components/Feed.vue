<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";
import { Pagination, Navigation, Virtual } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/virtual";
import type SwiperClass from "swiper";
import SlideContentVue from "./SlideContent.vue";
import { calendar } from "./SmartCallendar";

interface ISliderItem {
  key: string;
  index?: number;
}

let modules = [Pagination, Navigation, Virtual];
let swiperRef: SwiperClass | null = null;
const onSwiper = (swiper) => {
  console.log(swiper);
  swiperRef = swiper;
};
const onSlideChange = () => {
  console.log("slide change: " + swiperRef?.activeIndex);
};

const onPrevSlideChange = () => {
  console.log("ON PREV SLICE");
  if (swiperRef?.activeIndex! === 0) {
    const keyDate = slides[swiperRef?.activeIndex!].key;
    console.log("keyDate:" + keyDate);

    const prevDate = calendar.getDateAfterXNumberOfDays(-1, calendar.getDateFromString(keyDate, "YYYY-MM-DD"));
    console.log("lungimeX" + slides.length);
    // slides.unshift({ key: prevDate });
    // console.log("lungimeXX" + slides.length);
    // swiperRef?.slideTo(swiperRef.activeIndex + 1, 500)
  }
};

const onNextSlideChange = () => {
  console.log("ON NEXT SLICE");
  if (slides.length === swiperRef?.activeIndex! + 1) {
    const keyDate = slides[swiperRef?.activeIndex!].key;
    console.log("keyDate:" + keyDate);

    const nextDate = calendar.getDateAfterXNumberOfDays(1, calendar.getDateFromString(keyDate, "YYYY-MM-DD"));
    //slides.push({ key: nextDate });
  }
};

const generateScrollDays = () => {
  for (let index = -30; index <= 7; index++) {
    console.log("index:" + index);
    
    const today = calendar.getDateAfterXNumberOfDays(index, new Date());
    slides.push({ key: today });
  }

  console.log(slides);
};

const slides: ISliderItem[] = [];
generateScrollDays();

onMounted(() => {
  slideTo(31);
});

//const slides = Array.from({ length: 10 }).map((_, index) => index + 1);

const slideTo = (index: number) => {
  console.log("slide to: " + index);
  
  swiperRef?.slideTo(index - 1, 0);
};
const append = () => {
  //slides.push(slides.length);
};
</script>

<template>
  <div class="toolbar">
    <v-btn :elevation="0" class="buttonNav" @click="slideTo(5)"> &lt;&lt; </v-btn>
    <v-btn :elevation="0" class="buttonNav" @click="slideTo(30)"> Ieri </v-btn>
    <v-btn :elevation="0" class="buttonNav" @click="slideTo(31)"> Azi </v-btn>
    <v-btn :elevation="0" class="buttonNav" @click="slideTo(32)"> Maine </v-btn>
    <v-btn :elevation="0" class="buttonNav" @click="slideTo(37)"> >> </v-btn>
  </div>
  <swiper
    class="swiper"
    :slides-per-view="1"
    :modules="modules"
    :space-between="50"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
    @slide-prev-transition-start="onPrevSlideChange"
    @slide-next-transition-start="onNextSlideChange"
    @real-index-change=""
    :virtual="true"
    :navigation="false"
    :pagination="{ type: 'fraction' }"
  >
    <swiper-slide v-for="(slideContent, index) in slides" :key="index" :virtual-index="index" class="slide">
      <SlideContentVue :date="slideContent.key"></SlideContentVue>
    </swiper-slide>
  </swiper>
</template>

<style scoped>
.swiper {
  width: 100%;
  height: 100%;
}

.buttonNav {
  border: 1px solid black;
  margin-left: 5px;
  margin-top: 10px;
}
</style>
