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

import { calendar } from "./SmartCalendar";

interface ISliderItem {
  key: string;
  index?: number;
}

let modules = [Pagination, Navigation, Virtual];
let swiperRef: SwiperClass | null = null;
const onSwiper = (swiper: any) => {
  console.log(swiper);
  swiperRef = swiper;
};
const onSlideChange = () => {
  console.log("slide change: " + swiperRef?.activeIndex);
};

const onPrevSlideChange = () => {
  if (swiperRef?.activeIndex! === 0) {
    const keyDate = slides[swiperRef?.activeIndex!].key;

    const prevDate = calendar.getDateAfterXNumberOfDays(-1, calendar.getDateFromString(keyDate, "YYYY-MM-DD"));
    console.log("lungimeX" + slides.length);
    // slides.unshift({ key: prevDate });
    // console.log("lungimeXX" + slides.length);
    // swiperRef?.slideTo(swiperRef.activeIndex + 1, 500)
  }
};

const onNextSlideChange = () => {
  if (slides.length === swiperRef?.activeIndex! + 1) {
    const keyDate = slides[swiperRef?.activeIndex!].key;
    const nextDate = calendar.getDateAfterXNumberOfDays(1, calendar.getDateFromString(keyDate, "YYYY-MM-DD"));
    //slides.push({ key: nextDate });
  }
};

const generateScrollDays = () => {
  for (let index = -30; index <= 7; index++) {
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

  swiperRef?.slideTo(index - 1, 300);
};

const slideToPrev = () => {
  const prev = swiperRef?.activeIndex! - 1;
  console.log("slide to prev: " + prev);

  swiperRef?.slideTo(prev, 300);
};
const slideToNext = () => {
  const next = swiperRef?.activeIndex! + 1;
  console.log("slide to prev: " + next);

  swiperRef?.slideTo(next, 300);
};
const append = () => {
  //slides.push(slides.length);
};

const items = ["foo", "bar", "fizz", "buzz"];
const values = ["foo", "bar", "fizz", "buzz"];

const selectedItems = ref([]);

const options = ref([
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
]);
</script>

<template>
  <div class="toolbar">
    <v-btn :elevation="0" class="buttonNav" @click="slideToPrev()"> &lt;&lt; </v-btn>
    <v-btn :elevation="0" class="buttonNav" @click="slideTo(30)">Ieri </v-btn>
    <v-btn :elevation="0" class="buttonNav" @click="slideTo(31)"><div style="width: 20px !important">Azi</div></v-btn>
    <v-btn :elevation="0" class="buttonNav" @click="slideTo(32)"> Maine </v-btn>
    <v-btn :elevation="0" class="buttonNav" @click="slideToNext()"> >> </v-btn>
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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
./SmartCalendar