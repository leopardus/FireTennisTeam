<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { loadEvents } from "../database/loadEventsQuery";
import { TennisEventModel } from "../models/model";
import TennisEvent from "./TennisEvent.vue";
import { useCounterStore } from "../app/store";

const props = defineProps({
  date: String,
});

const items = ref<TennisEventModel[]>([]);
const store = useCounterStore();
let info = ref("loading..");

const getEvents = async () => {
  if (store.isUserLogged2) {
    try {
      const response = await loadEvents(props.date, store.getUserName);
      items.value = response.events;
    } catch (error: any) {
      console.error(error.message);
    }
    info.value = items.value.length + "";
  } else {
    console.error("the user is not yet logged.");
  }
};

onMounted(async () => {
  getEvents();
});

watch(store.$state, (newStore) => {
  getEvents();
});

const handleItemUpdated = async (updatedItem: any) => {
  await getEvents();
};
</script>

<template>
  <div style="min-height: 530px">
    <div class="main" style="height: 100px; padding-top: 10px">
      <div
        class="header"
        style="background-color: #ffffff; padding: 9px 9px 9px 9px; border-radius: 5px 5px 5px 5px; border: 1px solid #464646; max-width: 400px; width: 90%"
      >
        <div style="display: flex; flex-direction: row; justify-content: space-between; width: 100%">
          <div>
            <div class="text-left">Antrenamente</div>
            <div class="text-left">
              <h5>Data: {{ date }}</h5>
            </div>
            <div class="text-left">
              <h5>Total : {{ info }}</h5>
            </div>
          </div>
          <div>
            <!-- <v-btn @click="addTennisEvent" color="#ffffff" icon="mdi-sticker-plus-outline" elevation="0" style="padding: 1px"> </v-btn> -->
          </div>
        </div>
      </div>
      <div></div>
    </div>
    <div v-for="item in items" :key="item.guid">
      <div class="main">
        <TennisEvent :msg="item" @item-updated="handleItemUpdated" />
      </div>
    </div>
    <div style="height: 35px"></div>
  </div>
</template>

<style>
.main {
  align-items: center;
  display: flex;
  justify-content: start;
  flex-direction: column;
}
.header {
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
i.v-icon.v-icon {
  color: rgb(161, 161, 161);
}
</style>
