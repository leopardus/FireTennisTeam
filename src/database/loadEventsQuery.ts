import { getFirestore, query, where, collection, getDocs, getDoc, doc } from "firebase/firestore";
import { TennisEventModel } from "../models/model";

export const loadEvents = async (arg: any) => {
  const db = getFirestore();
  const events: TennisEventModel[] = [];
  const docSnap = await getDoc(doc(db, "settings", "summer2020"));

  //const querySnap = await getDocs(collectionGroup(db, "events"));
  //const querySnap = await getDocs(query(collection(db, "events", "2023-10-31", "dailyEvents"), where("tennisTrainer", "!=", "11")));
  //const querySnap = await getDocs(query(collection(db, "events", arg, "dailyEvents"), where("tennisTrainer", "!=", "11")));
  const querySnap = await getDocs(query(collection(db, "tennis-events", arg, "dailyEvents"), where("tennisTrainer", "==", "DaniM")));

  querySnap.forEach((doc) => {
    const tennisEvent = doc.data() as TennisEventModel;
    events.push(tennisEvent);
  });

  return { events };
};
