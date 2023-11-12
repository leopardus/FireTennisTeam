import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  state: () => ({ userLogged: false }),
  actions: {
    userLogged() {
      this.$state.userLogged = true;
      
      localStorage.setItem("userLogged", "true");
    },
    userLoggedOff() {
      this.$state.userLogged = false;
      localStorage.removeItem('userLogged');
      
    },
  },
  getters: {
    isUserLogged2() {
      const logged = JSON.parse(localStorage.getItem("userLogged") ?? "false");
      console.log("logged: " + this.$state.userLogged);
      
      return logged;
    },
  },
});
