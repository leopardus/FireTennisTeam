import { createRouter, createWebHistory } from "vue-router";

import SignIn from "../views/SignIn.vue"
import Feed from "../components/Feed.vue"

export const router = createRouter({
  history: createWebHistory(),

  routes: [
    { path: "/", component:  SignIn},
    // { path: "/register", component: Register },
    { path: "/feed", component: Feed },
  ],
});
