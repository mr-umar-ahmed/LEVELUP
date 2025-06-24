import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

export async function getLeaderboard() {
  const snapshot = await getDocs(collection(db, "users"));
  const users = snapshot.docs.map(doc => doc.data());
  return users.sort((a, b) => b.xp - a.xp);
}