<script setup lang="ts">
import { ref } from "vue";
import TennisEvent from "./TennisEvent.vue";

defineProps({
  msg: Number,
});

const items = ["11", "12","123"];
//console.log("input arg: " + {{msg}});
const push = () => {
  console.log("push");
};
const count = ref(0);
</script>

<template>
  <div v-for="item in items" class="main">
    <TennisEvent :msg="item" />
  </div>
  <div style="height: 35px;">
    
  </div>
</template>

<style scoped>
.main{
  /*
  background-color: aquamarine;
  */
  align-items: center;
  display: flex;
  justify-content:start;
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
