<script setup>
import { onMounted, ref, watchEffect } from "vue"; // used for conditional rendering
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useCounterStore } from "./app/store";
import { useRouter } from "vue-router";
const router = useRouter();

const store = useCounterStore();

const isLoggedIn = ref(true);
// runs after firebase is initialized
const auth = getAuth();
auth.onAuthStateChanged(function (user) {
  console.log("changed auth user state: " + auth.currentUser.email);
  if (user) {
    console.log("user logged in");
    store.userLogged();
    isLoggedIn.value = true; // if we have a user
    userEmail.value = auth.currentUser.email.substr(0, auth.currentUser.email.indexOf("@"));
    store.userLoggedName(userEmail.value);
  } else {
    console.log("user logged off");
    store.userLoggedOff();
    isLoggedIn.value = false; // if we do not
  }
});
const signOut = () => {
  auth.signOut();
  router.push("/");
};

const drawer = ref(false);
const menuItems = [
  { text: "Antrenamente", icon: "mdi-home", link: "/feed" },
  { text: "Adaugare", icon: "mdi-package-variant", link: "/add" },
  { text: "Statistica", icon: "mdi-email", link: "/statistica" },
  { text: "Logare", icon: "mdi-email", link: "/login" },
];

const navigateTo = (route) => {
  router.push(route);
  //this.drawer = false; // Închide drawer-ul după selectarea unui link
};

let userEmail = ref("...");

onMounted(() => {
  console.log(auth);
  //console.log("email" + auth.currentUser.email);
});
</script>

<template>
  <!-- <nav>
      <router-link to="/"> Home </router-link> | <router-link to="/feed"> Feed </router-link> |
      <span v-if="isLoggedIn"
        >>
        <button @click="signOut">Logout</button>
      </span>
      <span v-else>
        <router-link to="/register"> Register </router-link> |
        <router-link to="/sign-in"> Login </router-link>
      </span>
    </nav> -->
  <v-app>
    <v-navigation-drawer app v-model="drawer" color="black">
      <v-list>
        <div style="height: 100px"></div>
        <v-list-item v-for="(item, index) in menuItems" :key="index" link class="custom-list-item1" @click="navigateTo(item.link)">
          <v-list-item-content class="custom-list-item-content">
            <v-list-item-icon style="padding-right: 10px">
              <v-icon name="oi-square" />
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="black" elevation="0">
      <v-btn icon>
        <v-icon name="oi-three-bars" @click="drawer = !drawer" style="font-size: 20px" />
      </v-btn>
      <v-app-bar-title class="d-flex self-start">Fire Tennis</v-app-bar-title>

      <!-- <v-spacer style="width: 2px;"></v-spacer> -->
      <v-btn icon>
        <v-icon name="bi-calendar2-week" class="icon2" fill="white" scale="1" />
      </v-btn>
      <v-btn style="text-transform: capitalize !important">{{ userEmail }}</v-btn>
      <!-- <v-btn >
        ALICE
        <v-icon name="pr-user" class="icon2" fill="white" scale="1" />
      </v-btn> -->
    </v-app-bar>
    <div>
      <router-view />
    </div>
  </v-app>
</template>

<style>
#app {
  font-family: Nunito, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.custom-list-item {
  display: flex;
  align-items: center;
  justify-content: start;
}

.custom-list-item-content {
  display: flex;
  align-items: start;
  justify-content: start;
  width: 100%; /* Asigurați-vă că elementul ocupă tot spațiul disponibil */
}

.custom-icon {
  margin-right: 10px; /* Spațiu între iconiță și text (opțional) */
}

.custom-text {
  margin: 0; /* Eliminați marginile implicite */
}
</style>
