import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  state: () => ({ userLogged: false, userLoggedName: "", currentDate: "" }),
  actions: {
    userLogged() {
      this.$state.userLogged = true;
      localStorage.setItem("userLogged", "true");
    },
    userLoggedName(arg: string) {
      this.$state.userLoggedName = arg;
      localStorage.setItem("userLoggedName", arg);
    },
    userLoggedOff() {
      this.$state.userLogged = false;
      this.$state.userLoggedName = "";
      localStorage.removeItem("userLogged");
      localStorage.removeItem("userLoggedName");
    },
    setCurrentDate(date: string) {
      this.$state.currentDate = date;
      localStorage.setItem("currentDate", date);
    },
  },
  getters: {
    isUserLogged2() {
      const logged = JSON.parse(localStorage.getItem("userLogged") ?? "false");
      // @ts-expect-error can set the type for $state for now
      // keep this.$state.userLogged even in console to force getters that are computed function to refresh when the userLogged is changed.
      console.log("userLogged: " + this.$state.userLogged);

      return logged;
    },
    getUserName() {
      const logged = localStorage.getItem("userLoggedName") ?? "";
      // @ts-expect-error can set the type for $state for now
      // keep this.$state.userLogged even in console to force getters that are computed function to refresh when the userLogged is changed.
      console.log("userLoggedName: " + this.$state.userLoggedName);

      return logged;
    },
    getCurrentDate(): any {
      //const logged = localStorage.getItem("currentDate") ?? "";
      const logged = this.currentDate;
      // @ts-expect-error can set the type for $state for now
      // keep this.$state.userLogged even in console to force getters that are computed function to refresh when the userLogged is changed.
      console.log("currentDate: " + this.$state.currentDate);

      return logged;
    },
  },
});
