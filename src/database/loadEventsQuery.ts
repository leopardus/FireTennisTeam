import { getFirestore, query, where, collection, getDocs, getDoc, doc } from "firebase/firestore";
import { TennisEventModel } from "../models/model";

export const loadEvents = async (date: any, user: any) => {
  const db = getFirestore();
  const events: TennisEventModel[] = [];
  const docSnap = await getDoc(doc(db, "settings", "summer2020"));
  
  const querySnap = await getDocs(query(collection(db, "events", date, "dailyEvents"), where("tennisTrainer", "!=", "111_DaniM")));
  //const querySnap = await getDocs(query(collection(db, "tennis-events", date, "dailyEvents"), where("tennisTrainer", "!=", "111_DaniM")));

  querySnap.forEach((doc) => {
    const tennisEvent = doc.data() as TennisEventModel;
    if (tennisEvent.tennisTrainer.toLocaleLowerCase().includes(user.toLocaleLowerCase())) {
      events.push(tennisEvent);
    }
  });

  events.sort((a,b) => (a.startHour.hour > b.startHour.hour) ? 1 : ((b.startHour.hour > a.startHour.hour) ? -1 : 0));
  return { events };
};
