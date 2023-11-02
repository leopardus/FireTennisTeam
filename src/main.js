import { createApp } from 'vue'
import {createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyD_fvoczUX9uBzR-0vHHeZzazPwzLEacbc",
    authDomain: "fireone-d080e.firebaseapp.com",
    databaseURL: "https://fireone-d080e.firebaseio.com",
    projectId: "fireone-d080e",
    storageBucket: "fireone-d080e.appspot.com",
    messagingSenderId: "959104802859",
    appId: "1:959104802859:web:5e4464e0c67dcb9e0e0a6e",
    measurementId: "G-G7LQ4PCYYG"
};

initializeApp(firebaseConfig);

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.mount('#app');


