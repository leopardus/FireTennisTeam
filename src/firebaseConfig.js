import { initializeApp } from "firebase/app";

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

export const initializeFirebase = () => {
    initializeApp(firebaseConfig);
}