<script setup lang="ts">
import { ref, watch } from "vue";
import { TimePickerModel } from "../models/model";

const props = defineProps(["customTime"]);
const emit = defineEmits(["update:customTime"]);

let inputTime = props.customTime as TimePickerModel
//model
const time = ref<TimePickerModel>({ hours: (inputTime.hours), minutes: 0, seconds: 0 });

const disabledTimes = [{ hours: 4, minutes: 15 }];

watch(time, (timeX) => {
  emit("update:customTime", timeX);
});

</script>

<template>
  <div class="d-flex flex-column align-center">
    <VueDatePicker v-model="time" minutes-increment="30" time-picker :disabled-times="disabledTimes" placeholder="Select Time" />
  </div>
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
