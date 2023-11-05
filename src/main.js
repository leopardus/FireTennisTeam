import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";
import { router } from "./router/index";
import { initializeFirebase } from "./firebaseConfig";

import "vuetify/dist/vuetify.min.css";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { BiCalendar2Week, PrUser, OiSquare, OiThreeBars } from "oh-vue-icons/icons";
addIcons(BiCalendar2Week, PrUser, OiSquare, OiThreeBars);

initializeFirebase();

const app = createApp(App);
app.component("v-icon", OhVueIcon);

const pinia = createPinia();
const vuetify = createVuetify({
  components,
  directives,
});
app.use(vuetify);

app.use(router);
app.use(pinia);
app.mount("#app");
