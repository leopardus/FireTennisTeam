import { getFirestore, query, collection, collectionGroup, where, getDocs } from "firebase/firestore";
import { Player } from "../models/model";

export const loadPlayers = async (arg: any) => {
  const db = getFirestore();

  //const querySnap = await getDocs(collectionGroup(db, "players"));
  const querySnap = await getDocs(query(collection(db, "players"), where("active", "==", true)));

  const players: Player[] = [];

  querySnap.forEach((doc) => {
    const player = doc.data() as Player;
    players.push(player);
  });

  players.sort((a, b) => a.name.localeCompare(b.name))

  console.log("loaded no of players:" + players.length);
  return { players };
};
