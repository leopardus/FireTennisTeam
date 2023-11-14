import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import { TennisEventModel } from "../models/model";

export const deleteEvent = async (arg: TennisEventModel) => {
  console.log("arg" + arg);
  const db = getFirestore();
  const firebaseDoc = doc(db, "/tennis-events/" + arg.year + "-" + arg.month + "-" + arg.day + "/dailyEvents/" + arg.guid);

  await deleteDoc(firebaseDoc);

  console.log("Document with ID was deleted:", arg.guid);
};
