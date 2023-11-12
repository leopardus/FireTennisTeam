<script setup lang="ts">
interface TennisEvent {
  tennisField: String;
  tennisTrainer: String;
  warm: String;
  year: Number;
}

const props = defineProps({
  msg: {
    type: Object, //as ()=> TennisEvent
  },
});

console.log("123123");
const players = JSON.parse(props.msg?.players);
const numeList = players.map(item => item.name);
const jucatori = numeList.join(', ');

const clickON = () => {
  console.log("123123");
};

const paddingTime = (input: any) => {
  return (input + "").padStart(2, "0");
};
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
        <p style="text-align: start;"><b>Players: </b>{{jucatori}}</p>

        <p><b>Conditii</b></p>
        <p>[in work] Aero liber, cu lumina, fara caldura</p>

      </div>

      <!-- <div class="right">
        <p><b>Players</b></p>
        <p>{{jucatori}}</p>
        <div style="height: 5px"></div>
        <p><b>Conditii</b></p>
        <p>Aero liber, cu lumina, fara caldura</p>
      </div> -->
    </div>
  </div>
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
