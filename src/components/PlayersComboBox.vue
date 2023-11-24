<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { loadPlayers } from "../database/loadPlayersQuery";
import { Player } from "../models/model";

const props = defineProps(["modelValue2"]);
const emit = defineEmits(["update:modelValue2"]);

let options = ref<Player[]>();

const loadTennisPlayers = async () => {
  const options2 = await loadPlayers("");

  options2.players.forEach((item) => {
    item.color = item.level;
    item.fullName = item.nick + " - " + item.name;
  });

  options.value = options2.players;
};

onMounted(() => {
  loadTennisPlayers();
});

const selectedItems = ref([]);

watch(selectedItems, (selectedItemsX) => {
  console.log(`x is ${selectedItemsX}`);
  const selectedPlayers: Player[] = [];

  selectedItemsX.forEach((element) => {
    const player = options.value?.find((option) => option.id === element);
    selectedPlayers.push(player!);
  });

  emit("update:modelValue2", selectedPlayers);
});

</script>

<template>
  <!-- <v-autocomplete -->
  <v-select
    style="width: 96%"
    color="deep-purple-accent-2"
    v-model="selectedItems"
    :items="options"
    label="Alege jucatori"
    label-color="red"
    item-value="id"
    item-color="deep-purple-accent-2"
    item-title="fullName"
    multiple
    chips
    closable-chips
  />
</template>
