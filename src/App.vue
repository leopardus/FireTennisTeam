<script setup>
import { ref, onMounted, computed, watch } from "vue";

import Notes from "./components/Notes.vue";
import HelloWorld from "./components/HelloWorld.vue";
import Swiper from "./components/Swiper.vue";

const onChangeNote = (event) => {
  console.log("changed");
  console.log(event);
}

</script>

<template>
  <!-- <Notes @changeNote="onChangeNote" /> -->
  <HelloWorld @:msg="asdas" ></HelloWorld>
  <Swiper></Swiper>

</template>
