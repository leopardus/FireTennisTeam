<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

import { calendar } from "./SmartCalendar";

// Import Swiper styles
import "swiper/css";
import { Pagination, Navigation, Virtual } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/virtual";
import type SwiperClass from "swiper";
import SlideContent from "./SlideContent.vue";
import { useCounterStore } from "../app/store";
import { useRouter } from "vue-router";

interface ISliderItem {
  key: string;
  index?: number;
}

const store = useCounterStore();
const router = useRouter();

let today = ref(calendar.getDayNameDayNumberMonthEx(new Date()));

let modules = [Pagination, Navigation, Virtual];
let swiperRef: SwiperClass | null = null;

const addTennisEvent = async (updatedItem: any) => {
  store.setCurrentDate(swiperRef?.activeIndex! + 1 + "");
  router.push("/new?date=" + slides[swiperRef?.activeIndex!].key);
};

const onSwiper = (swiper: any) => {
  console.log(swiper);
  swiperRef = swiper;
};
const onSlideChange = () => {
  console.log("slide change: " + swiperRef?.activeIndex);
  today.value = calendar.getDayNameDayNumberMonth(slides[swiperRef?.activeIndex!].key);
  console.log(today.value);
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
  const currentDate = store.getCurrentDate;

  if (parseInt(currentDate)) {
    console.log("try mount:" + currentDate);
    slideTo(parseInt(currentDate));
  } else {
    slideTo(31);
  }
  console.log("mounted");
});

const slideTo = (index: number) => {
  console.log("slide to: " + index);
  swiperRef?.slideTo(index - 1, 300);
};
</script>

<template>
  <div class="toolbar" style="margin-top: 15px; height: 20px">
    <!-- <v-btn :elevation="0" class="buttonNav" @click="slideToPrev()"> &lt;&lt; </v-btn>
    
    <v-btn :elevation="0" variant="flat" class="buttonNav" @click="slideTo(31)"><div style="border: solid 0px red;  
    text-transform: capitalize; width: 230px !important">{{today}}</div></v-btn> -->

    <span style="border: solid 0px red; text-transform: capitalize; width: 230px !important">{{ today }}</span>
    <!-- <v-btn :elevation="0" class="buttonNav" @click="slideToNext()"> >> </v-btn> -->
  </div>
  <VLayoutItem model-value position="bottom" class="text-end" size="100">
    <div class="ma-4">
      <VBtn icon="mdi-plus" @click="addTennisEvent" size="large" color="black" elevation="8" />
    </div>
  </VLayoutItem>

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
      <SlideContent :date="slideContent.key" />
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
