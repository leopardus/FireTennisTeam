<script setup>
import { useCounterStore } from "../app/store";
import { ref } from "vue";

const emit = defineEmits(["changeNote", "submit"]);

function buttonClick() {
  emit("submit");
}

const store = useCounterStore();

const newNote = ref("");
const notes = ref([
{
  text: "newNote.value",
    date: new Date(),
    color: getRandomColor()
},
{
  text: "newNote.value",
    date: new Date(),
    color: getRandomColor()
},
{
  text: "newNote.value",
    date: new Date(),
    color: getRandomColor()
},
{
  text: "newNote.value",
    date: new Date(),
    color: getRandomColor()
},
{
  text: "newNote.value",
    date: new Date(),
    color: getRandomColor()
}
]);

function getRandomColor() {
  const color = "hsl(" + Math.random() * 360 + ", 100%, 75%)";
  return color;
}

const addNote = () => {
  emit("changeNote", 311);
  store.hideModal();

  notes.value.push({
    text: newNote.value,
    date: new Date(),
    color: getRandomColor(),
  });
};
</script>

<template>
  <main>
    <div v-if="false" class="overlay">
      <div class="modal">
        <textarea v-model="newNote" name="note" id="note" cols="30" rows="10"></textarea>
        <button @click="addNote">Add Note</button>
        <button @click="$emit('changeNote', 1)">Change Note</button>
        <button @click="store.hideModal">Close</button>
      </div>
    </div>
    <div class="container">
      <header>
        <h1>Notes</h1>
        <button @click="store.viewModal">+</button>
      </header>
      <div class="cards-container">
        <div v-for="note in notes" :key="note" class="card" :style="{ backgroundColor: note.color }">
          <p class="main-text">{{ note.text }}</p>
          <p class="date">../../....</p>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  height: 70vh;
  width: 80vw;
  background-color: rgb(238, 238, 238);
}

.container {
  max-width: 1000px;
  padding: 10px;
  margin: 0 auto;
  background-color: rgb(245, 245, 245);
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px;
  font-size: 20px;
}

header button {
  border: none;
  padding: 10px;
  width: 50px;
  height: 50px;
  cursor: pointer;
  background-color: black;
  color: aliceblue;
  border-radius: 100%;
  font: 30px;
}

.card {
  width: 220px;
  height: 220px;
  background-color: chocolate;
  padding: 10px;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  margin: 20px;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
}

.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgb(8, 8, 8, 0.9);
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  width: 750px;
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  position: relative;
  display: flex;
  flex-direction: column;
}

.modal button {
  padding: 10px 20px;
  font-size: 20px;
  width: 100%;
  background-color: rgb(122, 104, 138);
  color: aliceblue;
  border: none;
  cursor: pointer;
  margin-top: 15px;
}
</style>
