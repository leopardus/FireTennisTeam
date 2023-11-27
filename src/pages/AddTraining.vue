<script setup lang="ts">
import { ref } from "vue";
import { createEvent } from "../database/addEventCommand";
import { TennisEventModel, TimePickerModel } from "../models/model";
import { useRouter } from "vue-router";
import { calendar } from "../components/SmartCalendar";
import PlayersComponent from "../components/PlayersComboBox.vue";
import TimePicker from "../components/TimePickerTextBox.vue";
import DateTimePicker from "../components/DateTimePickerField.vue";
const router = useRouter();

const snackbar = ref(false);
const snackbarTitle = ref("");
const snackbarDescription = ref("");

//model
const selectedDate3 = ref<Date>(new Date());
const startTime = ref<TimePickerModel>({ hours: new Date().getHours(), minutes: 0, seconds: 0 });
const duration = ref("60");
const field = ref("1");
const conditions = ref("aer liber");
const lumina = ref("Nu");
const caldura = ref("Nu");
const trainers = ref([]);
const selectedPlayers = ref([]);

const AddTennisEvent = async () => {
  if (selectedPlayers.value.length === 0) {
    snackbarTitle.value = "Alege jucatori";
    snackbarDescription.value = "Pentru a putea adauga un antrenament trebuie selectat cel putin un jucator.";
    snackbar.value = true;
    return;
  }

  if (trainers.value.length === 0) {
    snackbarTitle.value = "Alege antrenor";
    snackbarDescription.value = "Pentru a putea adauga un antrenament trebuie selectat cel putin un antrenor.";
    snackbar.value = true;
    return;
  }

  const timePicker = startTime.value as TimePickerModel;

  trainers.value.sort();
  const trainersStr = JSON.stringify(trainers.value).replace("[", "").replace("]", "").replaceAll('"', "");

  const timePickerEnd: Date = calendar.getEndHour(timePicker.hours, timePicker.minutes, parseInt(duration.value));

  const newEvent: TennisEventModel = {
    day: selectedDate3.value.getDate(),
    month: selectedDate3.value.getMonth() + 1,
    year: selectedDate3.value.getFullYear(),
    conditions: conditions.value,
    duration: duration.value,
    light: lumina.value,
    tennisField: field.value,
    tennisTrainer: trainersStr,
    guid: "empty",
    players: selectedPlayers.value,
    startHour: { hour: timePicker.hours, minutes: timePicker.minutes },
    endHour: { hour: timePickerEnd.getHours(), minutes: timePickerEnd.getMinutes() },
    warm: caldura.value,
  };

  await createEvent(newEvent);

  router.push("/");
};

const Cancel = async () => {
  router.push("/feed");
};

</script>

<template>
  <div>
    <v-snackbar v-model="snackbar" color="red" vertical>
      <div class="text-subtitle-1 pb-2">{{ snackbarTitle }}</div>

      <p>{{ snackbarDescription }}</p>

      <template v-slot:actions>
        <v-btn variant="outlined" @click="snackbar = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </div>
  <v-container>
    <v-row><div style="height: 12px"></div></v-row>
    <v-row>
      <v-col class="text-start align-self-center font-weight-bold">Data</v-col>
      <v-col>
        <DateTimePicker v-model:custom-date="selectedDate3" />
      </v-col>
    </v-row>

    <v-row>
      <v-col class="text-start align-self-center font-weight-bold">Ora de start</v-col>
      <v-col>
        <TimePicker v-model:custom-time="startTime" />
      </v-col>
    </v-row>

    <v-row>
      <v-col class="text-start align-self-center font-weight-bold">Durata </v-col>
      <v-col class="text-end">
        <!-- <div class="d-flex flex-column align-center"> -->
        <v-btn-toggle v-model="duration" color="deep-purple-accent-2">
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
        <v-btn-toggle v-model="conditions" color="deep-purple-accent-3">
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
      <v-col class="text-start align-self-center" style="font-weight: 700">Antrenori</v-col>
      <v-col class="text-end">
        <v-btn-toggle v-model="trainers" multiple color="deep-purple-accent-2">
          <v-btn value="Alice" style="text-transform: capitalize !important">Alice</v-btn>
          <v-btn value="Alina" style="text-transform: capitalize !important">Alina</v-btn>
          <v-btn value="DaniM" style="text-transform: capitalize !important">Dani</v-btn>
          <v-btn value="Beatrice" style="text-transform: capitalize !important">Beatrice</v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="text-end" style="display: flex; justify-content: flex-end">
        <PlayersComponent v-model:modelValue2="selectedPlayers" />
      </v-col>
    </v-row>

    <v-row><div style="height: 10px"></div></v-row>

    <v-row>
      <div style="display: flex; justify-content: flex-end; align-items: flex-end; width: 100%">
        <v-btn class="text-none" color="grey-lighten-3" variant="flat" @click="Cancel"> Renunta </v-btn>

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
