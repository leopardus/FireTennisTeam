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

import "@mdi/font/css/materialdesignicons.min.css";

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

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
  icons: {
    iconfont: "mdi",
  },
});

app.component('VueDatePicker', VueDatePicker);
app.use(vuetify);
app.use(pinia);
app.use(router);

app.mount("#app");
