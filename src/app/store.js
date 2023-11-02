import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  state: () => ({ count: 20, showModal: false }),
  actions: {
    increment() {
      this.count += 1;
    },
    decrement() {
      this.count -= 1;
    },
    viewModal() {
      this.showModal = true;
    },
    hideModal() {
      this.showModal = false;
    },
  },
});
