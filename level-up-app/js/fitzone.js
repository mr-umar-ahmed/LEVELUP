import { auth, db } from "./firebase.js";
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

export async function addWorkout(activityText) {
  const activityRef = collection(db, "activities");
  await addDoc(activityRef, {
    uid: auth.currentUser.uid,
    activity: activityText,
    completed: false,
    timestamp: Date.now()
  });
}

export async function getWorkouts() {
  const snapshot = await getDocs(collection(db, "activities"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}