<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
// Import Swiper Vue.js components
import dayjs, { Dayjs } from "dayjs";
import { createEvent } from "../database/addEventCommand";
import { loadPlayers } from "../database/loadPlayersQuery";
import { DateTimeField, Player, TennisEventModel, TimePickerModel } from "../models/model";
import { useRouter } from "vue-router";
import { calendar } from "./SmartCalendar";

const props = defineProps(["customDate"]);
const emit = defineEmits(["update:customDate"]);


//model
const selectedDate2 = ref("");
const isCalendarOpen = ref(false); // Starea pentru deschiderea/închiderea calendarului
const selectedDate = ref<Date>(new Date());

onMounted(async () => {
  const queryParams = new URLSearchParams(window.location.search);
  const dateParam = queryParams.get("date") + "";
  console.log("date din url: " + dateParam);
  const dateUrl = calendar.getDateFromString(dateParam, "YYYY-MM-DD");
  selectedDate.value = dateUrl;
  const dateJS = dayjs(selectedDate.value).format("DD/MM/YYYY");
  console.log(dateJS);
  selectedDate2.value = dateJS;
});

const showCalendar = () => {
  isCalendarOpen.value = true; // Deschide calendarul când se apasă butonul
};
const close = () => {
  isCalendarOpen.value = false;
  const dates = selectedDate.value;
};
const closeAndSet = (date: any) => {
  const dateJS = dayjs(date).format("DD/MM/YYYY");
  console.log(dateJS);
  selectedDate2.value = dateJS;
  isCalendarOpen.value = false;
};

watch(selectedDate, (selectedDateX) => {
  emit("update:customDate", selectedDateX);
});

</script>

<template>
  
        <div style="display: flex; justify-content: flex-end; align-items: center; height: 20px">
          <v-dialog v-model="isCalendarOpen" persistent>
            <v-date-picker v-model="selectedDate" @input="selectedDate" @update:model-value="closeAndSet" min="2023-11-20" @click:save="close"></v-date-picker>
          </v-dialog>
          <v-text-field
            append-inner-icon="mdi-calendar-range"
            style="padding-left: 10px !important"
            color="blue"
            class="custom-text-field"
            @click="showCalendar"
            v-model="selectedDate2"
            label=""
            variant="outlined"
            readonly
          />
        </div>
</template>

<style>
.v-text-field--outlined fieldset {
  color: red !important;
}

.v-btn {
  /* min-width: 0; */
  /* padding: 1; */
  font-size: 12px;
  min-width: 44px !important;
  /* padding: 1px; */
}

.v-text-field.custom-text-field input.v-field__input {
  min-height: 10px !important;
  height: 37px !important;
  padding: 5px !important;
}

.custom-text-field {
  margin-top: 24px;
}

.v-btn-toggle .v-btn--size-default {
  min-width: 64px;
  padding: 1px !important;
}
</style>
