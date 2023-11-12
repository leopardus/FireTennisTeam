import { createStore } from "vuex";

export const useCounterStore = createStore({
  state() {
    return {
      count: 0,
    };
  },
  mutations: {
    increment(state) {
      state.count++;
    },
  },
});

// export const useCounterStore = defineStore("counter", {
//   state: () => ({ userLogged: false }),
//   actions: {
//     userLogged() {
//       //this.$state.userLogged = true;
//       localStorage.setItem("userLogged", true);
//     },
//     userLoggedOff() {
//       //this.$state.userLogged = false;
//       localStorage.removeItem('userLogged');

//     },
//   },
//   getters: {
//     isUserLogged2() {
//       const logged = JSON.parse(localStorage.getItem("userLogged"));
//       console.log("logged: " + logged);

//       return logged;
//     },
//   },
// });
