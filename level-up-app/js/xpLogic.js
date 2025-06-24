import { auth, db } from "./firebase.js";
import { doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

export async function updateXP(amount) {
  const userDoc = doc(db, "users", auth.currentUser.uid);
  const userSnap = await getDoc(userDoc);
  if (userSnap.exists()) {
    const currentXP = userSnap.data().xp || 0;
    await updateDoc(userDoc, { xp: currentXP + amount });
  }
}
