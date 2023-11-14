// mouse.js
import { ref, onMounted, onUnmounted } from "vue";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, onSnapshot, collectionGroup } from "firebase/firestore";

import { query, where, collection, getDocs, getDoc, doc, addDoc, setDoc } from "firebase/firestore";
import { v1 as uuidGenerator } from "uuid";
import { TennisEventModel } from "../models/model";

export const createEvent = async (arg: TennisEventModel) => {
  console.log("arg" + arg);
  const db = getFirestore();

  // 'users' collection reference
  const guid = uuidGenerator();
  const colRef = collection(db, "/tennis-events/2025-01-04/daily-events");
  // data to send
  const dataObj = {
    ...arg,
    players: JSON.stringify(arg.players),
    guid: guid,
  };

  
  const firebaseDoc = doc(db, "/tennis-events/" + arg.year + "-" + arg.month + "-" + arg.day + "/dailyEvents/" + guid);
  //const firebaseDoc = doc(db, "/events/" + arg.year + "-" + arg.month + "-" + arg.day + "/dailyEvents/" + guid);
  

  await setDoc(firebaseDoc, dataObj);

  // create document and return reference to it

  //const docRef = await addDoc(colRef, dataObj)

  // access auto-generated ID with '.id'
  console.log("Document was created with ID:", guid);
};
