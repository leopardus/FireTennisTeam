<script setup lang="ts">
import { deleteEvent } from "../database/deleteEventCommand";
import { TennisEventModel } from "../models/model";

const emit = defineEmits(['item-updated'])

const props = defineProps({
  msg: {
    type: Object, //as ()=> TennisEvent
  },
});

const players = JSON.parse(props.msg?.players);
const numeList = players.map((item:any) => item.name);
const jucatori = numeList.join(", ");

const clickON = () => {
  console.log("123123");
};

const paddingTime = (input: any) => {
  return (input + "").padStart(2, "0");
};

const clickaction = (arg:any) => {
  console.log("click");

  console.log(arg);
};

const deleteCurrentEvent = async(arg:any) => {
  console.log("delete: " + props.msg?.guid);
  const tennisEvent = props.msg as TennisEventModel;
  await deleteEvent(tennisEvent);

  emit('item-updated', tennisEvent);
};

const a1 = props.msg?.guid;
</script>

<template>
  <div class="card">
    <div class="container">
      <div class="left">
        <p>
          <b
            >{{ paddingTime(msg?.startHour.hour) }}:{{ paddingTime(msg?.startHour.minutes) }} - {{ paddingTime(msg?.endHour.hour) }}:{{
              paddingTime(msg?.endHour.minutes)
            }}</b
          >
        </p>
        <p><b>Antrenori:</b> {{ msg?.tennisTrainer }}</p>
        <!-- <p><b>Terenul:</b> {{ msg?.tennisField }}</p> -->
        <p style="text-align: start"><b>Players: </b>{{ jucatori }}</p>

        <p><b>Conditii</b> {{ msg?.conditions }} &nbsp;  <b>Lumina</b> {{ msg?.light }} &nbsp; <b>Caldura</b> {{ msg?.warm }}</p>
      </div>

      <div class="right">
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" color="darkolivegreen" icon="mdi-dots-horizontal" elevation="0"></v-btn>
          </template>

          <v-list>
            <v-list-item key="0">Inchide</v-list-item>
            <v-list-item key="1">Modifica Antrenament (in work)</v-list-item>
            <v-list-item key="2" style="background-color: red; color: azure;"  @click="deleteCurrentEvent">Sterge Antrenament</v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
  </div>
  <div class="text-center"></div>
</template>

<style scoped>
.card {
  /* height: 100px; */
  width: 90%;
  max-width: 400px;
  padding: 8px 8px 1px 12px;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: #fdfdfd;
  border-radius: 5px 5px 5px 5px;
  border: 1px solid #464646;
  display: flex;

  justify-content: space-between;
  flex-direction: column;
}

.left {
  display: flex;
  align-items: start;
  justify-content: space-between;
  flex-direction: column;
}

.right {
  display: flex;
  align-items: end;
  justify-content: space-between;
  flex-direction: column;
}

.container {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}
p {
  font-size: 14px;
  font-family: "Proxima Nova", "Roboto";
  display: block;
  margin-block-start: 1px;
  margin-block-end: 1px;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}
b {
  font-weight: 800;
}
</style>

function emit(arg0: string, tennisEvent: TennisEventModel) {
  throw new Error("Function not implemented.");
}
