<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import TennisEventComp from "./TennisEvent.vue";
import { TennisEvent, useTennisEvents } from "./firebase";

import {calendar} from "./SmartCallendar"

const props = defineProps({
  date: String,
});

const items = ref<TennisEvent[]>([]);



onMounted(async () => {
  try {

    const dateIeri = calendar.getDateAfterXNumberOfDays(-1);
    
    console.log("data ieri:" + dateIeri);
    
    
    console.log("Loading from date: " + props.date);
    const response = await useTennisEvents(props.date);
    items.value = response.events;
    console.log("Finish");
  } catch (error) {
    console.error(error.message);
  }
});

watch(items, (newItems) => {
  console.log("Items have changed:", newItems);
});

const push = () => {
  console.log("push");
};
</script>

<template>
  <div class="main" style="height: 100px; padding-top: 50px">
    <div class="header">
      <div>Antrenamente FireTennis</div>
      <div>Dani Mitranca</div>
      {{ date }}
    </div>
  </div>
  <div v-for="item in items">
    <!-- <div v-if="item.tennisTrainer.includes('DaniM')" class="main"> -->
    <div class="main">
      <TennisEventComp :msg="item" />
    </div>
    <!-- </div> -->
  </div>

  <div v-if="items.length === 0" class="main">
    <h1>Zi fara antrenamente</h1>
  </div>
  <div style="height: 35px"></div>
</template>

<style scoped>
.main {
  /*
  background-color: aquamarine;
  */
  align-items: center;
  display: flex;
  justify-content: start;
  flex-direction: column;
}
.header {
  /*
  background-color: aquamarine;
  */
  align-items: self-start;
  display: flex;
  justify-content: start;
  flex-direction: column;
}
.card2 {
  height: 100px;
  padding: 8px 8px 8px 8px;
  margin-bottom: 20px;
  background-color: #f8f8f8;
  border-radius: 5px 5px 5px 5px;
  border: 1px solid #e9e9e9;
}
</style>
