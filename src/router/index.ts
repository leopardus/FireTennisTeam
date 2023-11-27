import { createRouter, createWebHistory } from "vue-router";

import Login from "../pages/Login.vue";
import TennisFeed from "../components/TennisFeed.vue";
import AddTraining from "../pages/AddTraining.vue";
import InProgress from "../pages/InProgress.vue";
import Note from "../components/NoteItems.vue"
import { getAuth } from "firebase/auth";
import { useCounterStore } from "../app/store";

export const router = createRouter({
  history: createWebHistory(),

  routes: [
    { path: "/", component: TennisFeed },
    { path: "/login", component: Login },
    { path: "/add", component: AddTraining },
    { path: "/note", component: Note },
    { path: "/statistica", component: InProgress },
    // { path: "/register", component: Register },
    { path: "/feed", component: TennisFeed, meta: { requiresAuth: true } },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((route) => route.meta.requiresAuth)) {
    const store = useCounterStore();
    console.log(store);
    //const isUserLogged = store.$state.userLogged;
    const isUserLogged = store.isUserLogged2;
    console.log("user logged in: " + isUserLogged);
    if (isUserLogged) {
      next();
      console.log("authenticated route");
    } else {
      console.log("authenticated route required");
      next("/login");
    }
  } else {
    next();
  }
});
