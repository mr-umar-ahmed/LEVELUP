// js/auth.js
import { auth } from './firebase.js';
import { createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

window.handleRegister = async function () {
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const errorMessage = document.getElementById("error-message");

  errorMessage.style.display = "none";

  if (!username || !email || !password) {
    errorMessage.textContent = "All fields are required.";
    errorMessage.style.display = "block";
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: username });
    alert("Registration successful!");
    window.location.href = "login.html";
  } catch (error) {
    errorMessage.textContent = error.message;
    errorMessage.style.display = "block";
  }
}
