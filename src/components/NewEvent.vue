<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
// Import Swiper Vue.js components
import dayjs, { Dayjs } from "dayjs";
import { createEvent } from "./addEventCommand";
import { loadPlayers } from "../database/loadPlayersQuery";
import { DateTimeField, Player, TennisEventModel } from "../models/model";

let options = ref<Player[]>();

interface TimePickerModel {
  hours: number;
  minutes: number;
  seconds: number;
}

const loadTennisPlayers = async () => {
  const options2 = await loadPlayers("");

  options2.players.forEach((item) => {
    item.color = item.level;
    item.fullName = item.nickName + " - " + item.name;
  });

  options.value = options2.players;

  console.log(options.value);
};

const AddTennisEvent = async () => {
  getSelectedPlayers();
  const timePicker = time.value as TimePickerModel;
  0;
  console.log(time.value);

  const newEvent: TennisEventModel = {
    day: selectedDate.value.getDate(),
    month: selectedDate.value.getMonth() + 1,
    year: selectedDate.value.getFullYear(),
    conditions: conditii.value,
    duration: durata.value,
    light: lumina.value,
    tennisField: field.value,
    tennisTrainer: trainers.value,
    guid: "empty",
    players: getSelectedPlayers(),
    startHour: { hour: timePicker.hours, minutes: timePicker.minutes },
    endHour: { hour: timePicker.hours, minutes: timePicker.minutes },
    warm: caldura.value,
  };

  await createEvent(newEvent);
};

const getSelectedPlayers = () => {
  const selectedPlayers: Player[] = [];

  selectedItems.value.forEach((element) => {
    console.log(element);
    const player = options.value?.find((option) => option.id === element);
    selectedPlayers.push(player!);
  });

  return selectedPlayers;
};

onMounted(() => {
  loadTennisPlayers();
});

const items = ["foo", "bar", "fizz", "buzz"];
const values = ["foo", "bar", "fizz", "buzz"];

const selectedItems = ref([]);

const level = (arg) => {
  console.log(arg);
  return "red";
};

const isCalendarOpen = ref(false); // Starea pentru deschiderea/închiderea calendarului
const selectedDate = ref<Date>(new Date());

onMounted(async () => {
  selectedDate.value = new Date();
  const dateJS = dayjs(selectedDate.value).format("DD/MM/YYYY");
  console.log(dateJS);
  selectedDate2.value = dateJS;
});

//model
const selectedDate2 = ref("");
const time = ref();
const durata = ref("60");
const field = ref("1");
const conditii = ref("aer liber");
const lumina = ref("Nu");
const caldura = ref("Nu");
const trainers = ref("DaniM");

const showCalendar = () => {
  isCalendarOpen.value = true; // Deschide calendarul când se apasă butonul
};
const close = () => {
  isCalendarOpen.value = false;
  const dates = selectedDate.value;
  console.log(dates[0]);
};
const closeAndSet = (date) => {
  const dateJS = dayjs(date).format("DD/MM/YYYY");
  console.log(dateJS);
  selectedDate2.value = dateJS;
  isCalendarOpen.value = false;
};

const toggle = ref();
const disabledTimes = [
  { hours: 4, minutes: 15 },
  { hours: 4, minutes: 11 },
  { hours: 4, minutes: 12 },
  { hours: 4, minutes: 13 },
  { hours: 16, minutes: 20 },
  { hours: 18, minutes: 40 },
  { hours: 18, minutes: 41 },
  { hours: 18, minutes: 42 },
  { hours: 18, minutes: 43 },
  { hours: 18, minutes: 44 },
];
</script>

<template>
  <v-container>
    <v-row><div style="height: 12px"></div></v-row>
    <v-row>
      <v-col class="text-start align-self-center font-weight-bold">Data</v-col>
      <v-col>
        <div style="display: flex; justify-content: flex-end; align-items: center; height: 20px">
          <v-dialog v-model="isCalendarOpen" persistent>
            <v-date-picker v-model="selectedDate" @input="selectedDate" @update:model-value="closeAndSet" @click:save="close"></v-date-picker>
          </v-dialog>
          <!-- <div @click="showCalendar" style="border: 1px solid red; width: 120px;height: 30px;">{{ selectedDate2 }}</div> -->
          <!-- <v-btn @click="showCalendar" icon="mdi-calendar-range" elevation="0"></v-btn> -->
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
      </v-col>
    </v-row>

    <v-row>
      <v-col class="text-start align-self-center font-weight-bold">Ora de start</v-col>
      <v-col>
        <div class="d-flex flex-column align-center">
          <VueDatePicker v-model="time" minutes-increment="30" time-picker :disabled-times="disabledTimes" placeholder="Select Time" />
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="text-start align-self-center font-weight-bold">Durata </v-col>
      <v-col class="text-end">
        <!-- <div class="d-flex flex-column align-center"> -->
        <v-btn-toggle v-model="durata" color="deep-purple-accent-2">
          <v-btn value="30">30</v-btn>
          <v-btn value="60">60</v-btn>
          <v-btn value="90">90</v-btn>
          <v-btn value="120">120</v-btn>
        </v-btn-toggle>
        <!-- </div> -->
      </v-col>
    </v-row>

    <v-row>
      <v-col class="text-start align-self-center font-weight-bold">Teren</v-col>
      <v-col>
        <div class="d-flex flex-column align-center">
          <v-btn-toggle v-model="field" color="deep-purple-accent-3" style="font-size: 10px">
            <v-btn value="extern" style="max-width: 70px">extern</v-btn>
            <v-btn value="1">1</v-btn>
            <v-btn value="2">2</v-btn>
            <v-btn value="3">3</v-btn>
            <v-btn value="4">4</v-btn>
          </v-btn-toggle>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="text-start align-self-center font-weight-bold">Conditii joc</v-col>
      <v-col>
        <v-btn-toggle v-model="conditii" color="deep-purple-accent-3">
          <v-btn value="in balon" style="text-transform: capitalize !important">In Balon</v-btn>
          <v-btn value="aer liber" style="text-transform: capitalize !important">Aer Liber</v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="text-start align-self-center font-weight-bold">Lumina </v-col>
      <v-col class="text-end">
        <!-- <div class="d-flex flex-column align-center"> -->
        <v-btn-toggle v-model="lumina" color="deep-purple-accent-2">
          <v-btn value="Nu" style="text-transform: capitalize !important">Nu</v-btn>
          <v-btn value="30">30</v-btn>
          <v-btn value="60">60</v-btn>
          <v-btn value="90">90</v-btn>
          <v-btn value="120">120</v-btn>
        </v-btn-toggle>
        <!-- </div> -->
      </v-col>
    </v-row>

    <v-row>
      <v-col class="text-start align-self-center font-weight-bold">Caldura</v-col>
      <v-spacer></v-spacer>
      <v-col class="text-end">
        <v-btn-toggle v-model="caldura" color="deep-purple-accent-2">
          <v-btn value="Da" style="text-transform: capitalize !important">Da</v-btn>
          <v-btn value="Nu" style="text-transform: capitalize !important">Nu</v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
    <!-- color="blue-grey-lighten-2" -->
    <v-row>
      <v-col class="text-start align-self-center bold" style="font-weight: 700"></v-col>
      <v-col class="text-end" style="display: flex; justify-content: flex-end">
        <v-card color="deep-purple-accent-2" max-width="450" width="390">
          <!-- <v-select -->
          <v-autocomplete
            color="deep-purple-accent-2"
            v-model="selectedItems"
            :items="options"
            label="Alege jucatori"
            label-color="red"
            item-value="id"
            item-color="red"
            item-title="nick"
            multiple
            chips
            closable-chips
          />
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-start align-self-center" style="font-weight: 700">Antrenori</v-col>
      <v-col class="text-end">
        <v-btn-toggle v-model="trainers" color="deep-purple-accent-2">
          <v-btn value="Alice" style="text-transform: capitalize !important">Alice</v-btn>
          <v-btn value="Alina" style="text-transform: capitalize !important">Alina</v-btn>
          <v-btn value="DaniM" style="text-transform: capitalize !important">Dani</v-btn>
          <v-btn value="Beatrice" style="text-transform: capitalize !important">Beatrice</v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>

    <v-row><v-divider></v-divider></v-row>
    <v-row><div style="height: 15px"></div></v-row>

    <v-row>
      <div style="display: flex; justify-content: flex-end; align-items: flex-end; width: 100%">
        <v-btn class="text-none" color="grey-lighten-3" variant="flat"> Renunta </v-btn>

        <div style="width: 15px"></div>

        <v-btn class="text-none" color="deep-purple-accent-2" variant="flat" @click="AddTennisEvent"> Adauga </v-btn>
        <div style="width: 15px"></div>
      </div>
    </v-row>
  </v-container>
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
