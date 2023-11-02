<script setup lang="ts">
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

let modules = [Pagination, Navigation, Virtual];
let swiperRef: SwiperClass | null = null;
const onSwiper = (swiper) => {
  console.log(swiper);
  swiperRef = swiper;
};
const onSlideChange = () => {
  console.log("slide change");
};
const slides = Array.from({ length: 10 }).map((_, index) => index + 1);
const slideTo = (index: number) => {
  console.log("111");
  swiperRef?.slideTo(index - 1, 0);
};
const append = () => {
  slides.push(slides.length);
};
</script>

<template>
  <div class="toolbar">
    <button @click="slideTo(1)" class="prepend-slide">Slide 1</button>
    <button @click="slideTo(250)" class="slide-250">Slide 250</button>
    <button @click="slideTo(500)" class="slide-500">Slide 500</button>
    <button @click="append()" class="append-slides">Append Slide</button>
  </div>
  <swiper
    class="swiper"
    :slides-per-view="1"
    :modules="modules"
    :space-between="50"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
    :virtual="true"
    :navigation="false"
    :pagination="{ type: 'fraction' }"
  >
    <swiper-slide v-for="(slideContent, index) in slides" :key="index" :virtual-index="index" class="slide">
      Slide {{ slideContent }}
      <SlideContentVue :msg="slideContent"></SlideContentVue>
    </swiper-slide>
  </swiper>
</template>

<style scoped>
.swiper {
  width: 100%;
  height: 100%;
  
}
</style>
