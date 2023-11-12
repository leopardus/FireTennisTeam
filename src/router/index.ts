import { createRouter, createWebHistory } from "vue-router";

import SignIn from "../views/SignIn.vue";
import TennisFeed from "../components/TennisFeed.vue";
import NewEvent from "../components/NewEvent.vue";
import { getAuth } from "firebase/auth";
import { useCounterStore } from "../app/store";

export const router = createRouter({
  history: createWebHistory(),

  routes: [
    { path: "/", component: TennisFeed },
    { path: "/signin", component: SignIn },
    { path: "/new", component: NewEvent },
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
      next("/signin");
    }
  } else {
    next();
  }
});
