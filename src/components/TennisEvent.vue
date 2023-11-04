<script setup lang="ts">

interface TennisEvent {
  tennisField: String;
  tennisTrainer: String;
  warm: String;
  year: Number;
}

defineProps({
  msg: {
        type: Object as ()=> TennisEvent
    },
});

const clickON = () => {
  console.log("123123");
  
};


</script>

<template>
  <div class="card">
    <div class="container">
      <div class="left">
        <p><b>10:30 - 11:30</b></p>
        <p>60 min {{ msg?.tennisTrainer }}</p>
        <p>Terenul 4</p>
      </div>
      
      <div class="right">
        <p><b>Players</b></p>
        <p>Ducu, Amalia ,Maria</p>
        <div style="height: 5px;"></div>
        <p><b>Conditii</b></p>
        <p>Aero liber, cu lumina, fara caldura </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  height: 100px;
  width: 90%;
  max-width: 400px;
  padding: 8px 8px 1px 12px;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: #fdfdfd;
  border-radius: 5px 5px 5px 5px;
  border: 1px solid #e9e9e9;
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
