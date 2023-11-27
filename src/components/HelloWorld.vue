<script setup lang="ts">
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, onSnapshot, collectionGroup } from "firebase/firestore";

import { query, where, collection, getDocs, getDoc, doc } from "firebase/firestore";

const register = () => {
  const db = getFirestore();

  const auth = getAuth();
  signInWithEmailAndPassword(auth, "dani@firetennis.com", "firetennis")
    .then(() => {
      alert("Successfully registered!");
      console.log(auth.currentUser);
      //this.$router.push("/");
    })
    .catch((error) => {
      alert(error.message);
    });
};

const getItems = async (xx :any) => {
  const db = getFirestore();

  const docSnap = await getDoc(doc(db, "settings", "summer2020"));
  console.log(docSnap.data());

  console.log("collections");

  //const querySnap = await getDocs(collectionGroup(db, "events"));
  const querySnap = await getDocs(query(collection(db, "events", "2023-10-31", "dailyEvents"), where("tennisTrainer", "!=", "11")));
  //events/2020-02-11/dailyEvents

  querySnap.forEach((doc) => {
    const tennisEvent = doc.data();// as TennisEvent;
    console.log(tennisEvent);
    console.log(tennisEvent.tennisTrainer);
    console.log(tennisEvent.startHour.hour);
    console.log(tennisEvent.startHour.minute);
  });
  console.log(querySnap);
};

defineProps({
  msg: String,
});

const count = ref(0);
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld123.vue</code> to test HMR
    </p>
    <button @click="register">Register</button>
    <button @click="getItems(22)">GetItem</button>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
