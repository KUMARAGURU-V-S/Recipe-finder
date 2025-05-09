// Import Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// ✅ Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXZ52AIGtU1hcOyomdeVSpi5IUagUHk4k",
  authDomain: "recipefinder-90338.firebaseapp.com",
  projectId: "recipefinder-90338",
  storageBucket: "recipefinder-90338.appspot.com",
  messagingSenderId: "726956991271",
  appId: "1:726956991271:web:3f4286a97cc8c0a9b13f02",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize Firebase Authentication

// ✅ Handle Login
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("login-form").addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            // ✅ Firebase Sign-in
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            console.log("Login successful:", user.email);

            // ✅ Store user info in localStorage (optional)
            localStorage.setItem("user", JSON.stringify({ email: user.email }));

            // ✅ Redirect to RecipeFinder Page
            window.location.href = "index.html";
        } catch (error) {
            console.error("Login failed:", error.message);
            document.getElementById("error-message").innerText = "Invalid email or password.";
        }
    });
});
