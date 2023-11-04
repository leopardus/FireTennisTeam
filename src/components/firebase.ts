// mouse.js
import { ref, onMounted, onUnmounted } from "vue";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, onSnapshot, collectionGroup } from "firebase/firestore";

import { query, where, collection, getDocs, getDoc, doc } from "firebase/firestore";

export interface TennisEvent {
  tennisField: String;
  tennisTrainer: String;
  warm: String;
  year: Number;
}

let loggedIn = ref(false);
const login = () => {
  if (loggedIn.value) return;

  const auth = getAuth();
  signInWithEmailAndPassword(auth, "dani@firetennis.com", "firetennis")
    .then(() => {
      //alert("Successfully registered!");
      console.log(auth.currentUser);
      loggedIn.value = true;
      //this.$router.push("/");
    })
    .catch((error) => {
      //alert(error.message);
      console.log(error.message);
    });
};

export const useTennisEvents = async (arg) => {
  if (!loggedIn.value) {
    console.log("loggggggin");
    login();
  }
  const db = getFirestore();

  const docSnap = await getDoc(doc(db, "settings", "summer2020"));
  console.log(docSnap.data());

  console.log("collections");

  //const querySnap = await getDocs(collectionGroup(db, "events"));
  //const querySnap = await getDocs(query(collection(db, "events", "2023-10-31", "dailyEvents"), where("tennisTrainer", "!=", "11")));
  console.log("query using date: " + arg);
  const querySnap = await getDocs(query(collection(db, "events", arg, "dailyEvents"), where("tennisTrainer", "!=", "11")));
  //events/2020-02-11/dailyEvents

  const events: TennisEvent[] = [];

  querySnap.forEach((doc) => {
    const tennisEvent = doc.data() as TennisEvent;
    events.push(tennisEvent);
    //console.log(tennisEvent);
    //console.log(tennisEvent.tennisTrainer);
    //console.log(tennisEvent.startHour.hour);
    //console.log(tennisEvent.startHour.minute);
  });
  console.log(events);

  return { events };
};
