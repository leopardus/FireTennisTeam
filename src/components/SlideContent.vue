<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { loadEvents } from "../database/loadEventsQuery";

import { calendar } from "./SmartCalendar";
import { TennisEventModel } from "../models/model";

import TennisEvent from "./TennisEvent.vue";

const props = defineProps({
  date: String,
});

const items = ref<TennisEventModel[]>([]);

const loadEventsInner = async () => {
  try {
    const dateIeri = calendar.getDateAfterXNumberOfDays(-1);

    const response = await loadEvents(props.date);
    items.value = response.events;
  } catch (error: any) {
    console.error(error.message);
  }
};
onMounted(async () => {
  await loadEventsInner();
});

watch(items, (newItems) => {
  console.log("Items have changed:", newItems);
});

const handleItemUpdated = async(updatedItem:any) => {
  await loadEventsInner();
};
</script>

<template>
  <div class="main" style="height: 100px; padding-top: 20px">
    <div
      class="header"
      style="background-color: #ffffff; padding: 9px 9px 9px 9px; border-radius: 5px 5px 5px 5px; border: 1px solid #464646; max-width: 400px; width: 90%"
    >
      <div>Antrenamente Dani {{}}</div>
      <!-- <div><h2>Dani Mitranca</h2></div> -->
      <div>
        <h5>Data: {{ date }}</h5>
      </div>
      <div>
        <h5>Total : {{ items.length }}</h5>
      </div>
    </div>
  </div>
  <div v-for="item in items" :key="item.guid">
    <!-- <div v-for="item in items"> -->
    <div class="main">
      <TennisEvent :msg="item" @item-updated="handleItemUpdated" />
    </div>
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
