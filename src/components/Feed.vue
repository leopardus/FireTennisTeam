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
    slides.push({ key: nextDate });
  }
};


onMounted(()=>{
  slideTo(2);
})

//const slides = Array.from({ length: 10 }).map((_, index) => index + 1);
const slides: ISliderItem[] = [
  { key: "2023-10-31", index: 10 },
  { key: "2023-12-01", index: 21 },
  { key: "2023-11-02", index: 2 },
  { key: "2023-11-03", index: 32 },
];
const slideTo = (index: number) => {
  console.log("111");
  swiperRef?.slideTo(index - 1, 0);
};
const append = () => {
  //slides.push(slides.length);
};
</script>

<template>
  <div class="toolbar">
    <button @click="slideTo(1)" class="prepend-slide">Slide 1</button>
    <button @click="slideTo(2)" class="slide-250">Slide 2</button>
    <button @click="slideTo(10)" class="slide-500">Slide 10</button>
    <button @click="append()" class="append-slides">Append Slide</button>
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
</style>
