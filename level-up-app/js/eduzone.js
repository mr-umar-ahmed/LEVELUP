import { auth, db, storage } from "./firebase.js";
import { collection, addDoc, getDocs, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

export async function addStudyTask(taskText) {
  const taskRef = collection(db, "tasks");
  await addDoc(taskRef, {
    uid: auth.currentUser.uid,
    task: taskText,
    completed: false,
    timestamp: Date.now()
  });
}

export async function getStudyTasks() {
  const snapshot = await getDocs(collection(db, "tasks"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}