<script setup lang="ts">
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, onSnapshot, collectionGroup } from "firebase/firestore";

import { query, where, collection, getDocs, getDoc, doc } from "firebase/firestore";



defineProps({
  msg: String,
});

const count = ref(0);
</script>

<template>
  <h1>&nbsp;</h1>
  <h1>&nbsp;</h1>
  <h1>&nbsp;</h1>

  <div class="card">
    <p>
      Page In Work..
    </p>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
